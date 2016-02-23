function PlanA() {
    //设置默认规则参数
    this.rule_default = {
        "time_begin": 3,
        "score": 0, //当前得分
        "time": 120, //当前时间
        "timer": null, //当前定时器
        //"fall_storage" : 30,    //所有下落元素
        "fall_max": 3, //最大下落数 测试机大于130，后面的还没来得及刷出来
        //"fall_count" : 5,
        "fall_now": 0, //当前下落数
        "level": 0,
        "status": "init",
        "speed_base": 2, //初始speed比重
        "speed_range": 2, //速度变化范围[0,n)
    };
    //实际运行规则参数
    this.rule = {};
    //当前精灵管理
    this.sprites = {
        "background": new PIXI.Sprite.fromImage(src.background),
        "catcher": new PIXI.Sprite.fromImage(src.catcher.src),
        "time_up": new PIXI.Text("0", game_time_style),
        "game_start": new PIXI.Text("0", game_ready_style),
        "score_show": new PIXI.Text("0", game_score_style),
        "falls": [],
    };
};

////////////////////////////////////////////////////////////////////
///初始化
PlanA.prototype.classname = "PlanA";
PlanA.prototype.init = function() {
    this.reset_game();

    //设置背景
    this.sprites.background.width = config.width;
    this.sprites.background.height = config.height;
    vstage.addChild(this.sprites.background);

    //设置捕捉器
    vstage.addChild(this.sprites.catcher);
    this.sprites.catcher.position.x = src.catcher.x;
    this.sprites.catcher.position.y = src.catcher.y;
    this.sprites.catcher.moveable = false;
    this.sprites.catcher.offset = {
        x: 0,
        y: 0,
    };

    //设置开始倒计时
    vstage.addChild(this.sprites.game_start);
    this.sprites.game_start.x = config.width / 2 - 30;
    this.sprites.game_start.y = config.height / 2 - 70;
    this.sprites.game_start.style.align = "center";
    this.sprites.game_start.update = function(second) {
        this.text = second.toString();
    }


    //设置时间
    vstage.addChild(this.sprites.time_up);
    this.sprites.time_up.x = 10;
    this.sprites.time_up.y = 0;
    this.sprites.time_up.update = function(time) {
        this.text = time.toString();
    }

    //设置积分
    vstage.addChild(this.sprites.score_show);
    this.sprites.score_show.x = config.width - 70;
    this.sprites.score_show.y = 0;
    this.sprites.score_show.style.align = "right";
    this.sprites.score_show.update = function(score) {
        this.text = score.toString();
    }


    //捕获者跟随鼠标事件
    this.catcherMouseEventInit();


    //系统倒计时时间
    if (this.rule.timer != null) {
        clearInterval(this.rule.timer);
    };
    this.rule.timer = setInterval(function() {
        switch (window.game.rule.status) {

            case "init":
                if (true) {
                    window.game.rule.time_begin--;
                    if (window.game.rule.time_begin == 0) {
                        window.game.rule.status = "run";
                        vstage.removeChild(window.game.sprites.game_start);
                    };
                };
                break;
            case "run":
                if (true) {
                    window.game.time_pass();
                    if (window.game.rule.time == 0) {
                        window.game.sprites.time_up.update(window.game.rule.time);
                        clearInterval(this);
                    };
                };
                break;
        }
    }, 1000);
};
PlanA.prototype.reset_game = function() {
    this.rule = deep_clone(this.rule_default);
};
//捕获者跟随鼠标事件
PlanA.prototype.catcherMouseEventInit = function() {
    //背景
    var bg = this.sprites.background;

    //捕获者鼠标事件       
    var catcher = this.sprites.catcher;
    catcher.interactive = true;
    this.sprites.catcher.mousedown =
        this.sprites.catcher.touchstart = function(data) {
            this.moveable = true;
            this.offset.x = data.data.global.x - this.position.x;
            this.offset.y = data.data.global.y - this.position.y;
            data.data.originalEvent.stopPropagation();
        }
    catcher.mousemove =
        catcher.touchmove = function(data) {
            if (this.moveable === true) {
                //移动坐标
                this.position.x = data.data.global.x - this.offset.x;
                this.position.y = data.data.global.y - this.offset.y;

                //处理有效区域以及复位
                if (this.position.x + config.crash_radius > config.width) {
                    this.position.x = config.width - config.crash_radius - 1;
                } else if (this.position.y + config.crash_radius > config.height) {
                    this.position.y = config.height - config.crash_radius - 1;
                } else if (this.position.x + config.crash_radius < 0) {
                    this.position.x = 1 - config.crash_radius;
                } else if (this.position.y + config.crash_radius < 0) {
                    this.position.y = 1 - config.crash_radius;
                }
            };
            data.data.originalEvent.stopPropagation();
        }
    catcher.mouseup = catcher.touchend = function(data) {
        this.moveable = false;
        data.data.originalEvent.stopPropagation();
    }
};


////////////////////////////////////////////////////////////////
//执行事件
PlanA.prototype.run = function() {

    switch (this.rule.status) {

        case "init":
            this.show_count()
            break;
        case "run":
            if (true) {
                //监测并创建精灵
                this.run_sprite_create();

                //处理精灵下落
                for (var i = 0; i < this.sprites.falls.length; i++) {
                    this.process_sprite(i);
                };

                //判断积分，更改等级
                this.show_time_score();
            };
            break;
        case "stop":
            break;
    }
};

////////////////////////////////////////////////////////////////
//执行事件 running
//监测并创建精灵
PlanA.prototype.run_sprite_create = function() {
    if (this.rule.fall_now < this.rule.fall_max) {
        //产生随机数，判断是在下落哪个精灵的范围内（快递/大米/其他）
        var rand = Math.random(); //[0,1)
        for (var i = 0; i < src.falls.length; i++) {
            //精灵机会是累计的，所以产生随机数循环减去当前精灵的权重
            if (rand > src.falls[i].chance) {
                rand = rand - src.falls[i].chance;
            }
            //选定目标，下落
            else {
                //产生对象
                var fall_item = this.create_fall_item(
                    src.falls[i].id,
                    src.falls[i].src,
                    src.falls[i].score
                );

                this.sprites.falls.push(fall_item);
                vstage.addChild(fall_item.getSprite());
                this.rule.fall_now++;

                break;
            };
        };
    };
};
//创建下落元素
PlanA.prototype.create_fall_item = function(id, imgsrc, score) {
    //产生对象
    var sprite = new PIXI.Sprite.fromImage(imgsrc);
    //下落速度 [0,1) * level * 初始speed比重
    var speed = this.getSpeed();

    //横坐标位置 画布宽度 - 一个元素宽度
    var posx = Math.random() * (config.width - sprite.width);
    sprite.position.x = posx;
    sprite.position.y = config.begin_height;


    var fall_item = {
        "id": id,
        "sprite": sprite,
        "speed": speed,
        "score": score,

        //获得本地精灵
        "getSprite": function() {
            return this.sprite;
        },
        //处理自身下落
        "fall_down": function() {
            //处理精灵下落
            this.sprite.position.y = this.speed + this.sprite.position.y;
        },
        //处理碰撞是否发生
        "crash_down": function(x, y) {
            //计算碰撞距离
            var dist = distance(
                this.sprite.position.x + this.sprite.width / 2,
                this.sprite.position.y + this.sprite.height / 2,
                x, y);
            if (config.crash_radius > dist) {
                return true;
            };
            return false;
        },
    };
    return fall_item;
};
//精灵循环处理
PlanA.prototype.process_sprite = function(i) {
    var fall_item = this.sprites.falls[i];
    var sprite = this.sprites.falls[i].sprite;

    //处理精灵下落
    fall_item.fall_down();

    //精灵消失
    if (sprite.position.y > (config.height - 50)) {
        this.remove_fall_item(fall_item);
    };

    //碰撞
    var catcherx = this.sprites.catcher.position.x + this.sprites.catcher.width / 2;
    var catchery = this.sprites.catcher.position.y + this.sprites.catcher.height / 2;
    if (fall_item.crash_down(catcherx, catchery)) {
        this.remove_fall_item(fall_item);
        this.crash_event(fall_item);
    };
};
//碰撞效果计算
PlanA.prototype.crash_event = function(fall_item) {
    this.rule.score += fall_item.score;
    console.log("score" + this.rule.score);
};
//移除精灵
PlanA.prototype.remove_fall_item = function(fall_item) {
    vstage.removeChild(fall_item.getSprite());
    this.sprites.falls.removeItem(fall_item);
    this.rule.fall_now--;
};
//界面元素展示
PlanA.prototype.show_time_score = function() {
    //刷新显示时间
    this.sprites.time_up.update(this.rule.time);
    //刷新积分
    this.sprites.score_show.update(this.rule.score);

    //积分跟游戏难度挂钩
    if (this.rule.score > 0) {
        this.rule.level = this.getLevel();
        this.rule.fall_max = this.getFallMax();
    };

    //终止条件
    if (this.rule.score < config.game_lose || this.rule.score > config.game_win || this.rule.time < 1) {
        this.rule.status = "stop";
        end_game();
    };
};
//显示倒计时
PlanA.prototype.show_count = function() {
    //开始倒计时
    this.sprites.game_start.update(this.rule.time_begin);
    //刷新显示时间
    this.sprites.time_up.update(this.rule.time);
    //刷新积分
    this.sprites.score_show.update(this.rule.score);
};
//时间递减
PlanA.prototype.time_pass = function() {
    this.rule.time--;
};

/////////////////////////////////////////////
//游戏规则
PlanA.prototype.getSpeed = function() {
    var speed = 0;
    if (onfig.game_lose <= this.score && this.score < 10) {
        speed = Math.random() + 3;
    }
    else if (10 <= this.score && this.score < 30) {
        speed = Math.random()*2 + 4;
    }
    else if (30 <= this.score && this.score < config.game_win){
        speed = Math.random() + 6;
    }

    return speed;
};
PlanA.prototype.getLevel = function() {
    var level = 0;
    if (this.score <10) {
        level = 0;
    }
    else if (this.score >= 10) {
        level = this.score /10;
    };
    return level;
};
PlanA.prototype.getFallMax = function() {
    var max = this.rule.fall_max;
    if (this.score < 20) {
        max = 3;
    }
    else if (this.score < 30) {
        max = 4;
    }
    else if (this.score <40) {
        max = 5;
    }
    else if (this.score <50) {
        max =6;
    }
    else{
        max = 7;
    }
    return max;
};