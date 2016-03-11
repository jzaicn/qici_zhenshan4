'use strict';
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////  
////  游戏入口
////
window.CatchGame = qc.CatchGame = {

    RAISE_LEVEL: -20,
    SEA_LEVEL: 980,
    SPEAK_BOX_MIX_WIDTH: 600,
    DEFAULT_MUSIC_PLAYING: false,

    GAME_PLAY_TIME : 120000,//秒

    DEFAULT_PAGE: "welcome", //TODO: welcome


    //0 炸弹，1-3 垃圾食品 4-5 珍膳 6 有米 7-9 米粒 10-13 四大认证
    DATA_SOURCE: [
        { id: "auth", icon: "13.png", iconFrom: 10, iconTo: 13, score: 10, noRepeatRadius: 1500, noOtherRadius: 200 },
        { id: "rice", icon: "8.png", iconFrom: 7, iconTo: 9, score: 1, noRepeatRadius: 230, noOtherRadius: 200 },
        { id: "rubbish", icon: "1.png", iconFrom: 1, iconTo: 3, score: -3, noRepeatRadius: 230, noOtherRadius: 200 },
        { id: "bomb", icon: "0.png", iconFrom: 0, iconTo: 0, score: -100, noRepeatRadius: 1000, noOtherRadius: 200 },
        { id: "logo", icon: "4.png", iconFrom: 4, iconTo: 5, score: 3, noRepeatRadius: 500, noOtherRadius: 200 },
    ],

    REWARD_GROUP: [
        { icon: "jiang1.png", url: "http://wesite.yunyuev.com/yunyue/mall46.php/card/getCardByLink/tid/20/iskefu/1", score_limit: 100, },
        { icon: "jiang2.png", url: "http://wesite.yunyuev.com/yunyue/mall46.php/card/getCardByLink/tid/38/iskefu/1", score_limit: 10, },
        { icon: "jiang3.png", url: "http://wesite.yunyuev.com/yunyue/mall46.php/card/getCardByLink/tid/22/iskefu/1", score_limit: 10, },
        { icon: "jiang4.png", url: "http://wesite.yunyuev.com/yunyue/mall46.php/card/getCardByLink/tid/15/iskefu/1", score_limit: 10, },
        { icon: "jiang5.png", url: "http://wesite.yunyuev.com/yunyue/mall46.php/card/getCardByLink/tid/15/iskefu/1", score_limit: 10, },
    ],

    _introduced: false,
    _running: false,
    _gameStatus: "running",


    _speed: 250,
    set Speed(v) {
        this._speed = v;
    },
    get Speed() {
        return this._speed;
    },

    _status: "",
    set Status(v) {
        this.statusSignal.dispatch(this._status, v);
        this._status = v;
    },
    get Status() {
        return this._status;
    },


    _score: 0,
    set Score(v) {
        this._score = v;
        qc.CatchGame.score.setScore(this._score);
    },
    get Score() {
        return this._score;
    },

    _time: 0,
    set Time(v) {
        this._time = v;
        qc.CatchGame.score.setTime(this._time);
    },
    get Time() {
        return this._time;
    },

    // 所有的操作指令集合
    operation: {},
};

// 游戏逻辑初始化
qc.initGame = function(game) {

    // 全局通知事件
    CatchGame.itemSignal = new qc.Signal(); //下落元素变化事件
    CatchGame.statusSignal = new qc.Signal(); //游戏状态变化



    // 初始化捕获者
    CatchGame.catcher = new qc.CatchGame.CatcherLogic();
    // 初始化下落物工厂
    CatchGame.fallitemFactory = new qc.CatchGame.FallItemFactory();
    // 初始化下落物
    CatchGame.fallitemPool = new qc.CatchGame.FallItemPoolLogic();
    //初始化提示语言
    CatchGame.score = new qc.CatchGame.ScoreLogic();
    //初始化提示语言
    CatchGame.time = new qc.CatchGame.TimeLogic();



    // 设置监听全局消息
    CatchGame.itemSignal.add(qc.CatchGame.onItemSignal);

    CatchGame.Status = CatchGame.DEFAULT_PAGE;
};




/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////  
////  游戏分支控制部分
////

////////////////////////////////////////////////
//
//  welcome page 欢迎页面
//  页面切换通过```qc.CatchGame.Status = "welcome";```切换
//


////////////////////////////////////////////////
//
//  introduce page 介绍页面
//  页面切换通过```qc.CatchGame.Status = "introduce";```切换
//


////////////////////////////////////////////////
//
//  playing page 游戏页面
//  页面切换通过```qc.CatchGame.Status = "playing";```切换
//

//游戏操作-游戏结束
qc.CatchGame.gameInit = function() {
    this.Score = 0;
    this._running = false;
    this._gameStatus = "";
    this._gameLeftTime = this.GAME_PLAY_TIME;
};

//游戏操作-游戏开始
qc.CatchGame.gameStart = function() {
    this.Score = 0;
    this._running = true;
    this._gameStatus = "running";
    this._gameLeftTime = this.GAME_PLAY_TIME;
};

//游戏操作-游戏结束
qc.CatchGame.gameOver = function() {
    this._running = false;
    this._gameStatus = "lose";
};

//游戏操作-游戏结束
qc.CatchGame.gameWin = function() {
    this._running = false;
    this._gameStatus = "win";
};


//游戏操作-游戏结束状态
qc.CatchGame.getGameEndStatus = function() {
    return this._gameStatus;
};

//游戏是否在运行
qc.CatchGame.isGameRunning = function() {
    return this._running;
};

//游戏介绍是否出现过
qc.CatchGame.setIntroduced = function() {
    this._introduced = true;
};

//游戏介绍是否出现过
qc.CatchGame.isIntroduced = function() {
    return this._introduced;
};



////////////////////////////////////////////////
//
//  reward page 抽奖页面
//  页面切换通过```qc.CatchGame.Status = "reward";```切换
//

//获取当前奖品的地址（用于转跳）
qc.CatchGame.getCurrentRewardURL = function() {
    //TODO: 根据奖励等级切换这个
    return "http://wesite.yunyuev.com/yunyue/mall46.php/card/getCardByLink/tid/15/iskefu/1";
};

//获取当前奖品的图片名称
qc.CatchGame.getCurrentRewardPng = function() {
    //TODO: 根据奖励等级切换这个
    return "jiang4.png";
};

//获取当前奖品的地址（用于转跳）
qc.CatchGame.getWinTitle = function() {
    //TODO: 根据奖励等级切换这个
    return "Yeah~满堂彩";
};

//获取当前奖品的图片名称
qc.CatchGame.getLoseTitle = function() {
    //TODO: 根据奖励等级切换这个
    return "好难，输了输了";
};



/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////  
////  游戏逻辑控制部分
////

qc.CatchGame.timePass = function(deltaTime){
    this._gameLeftTime -= deltaTime;
};

//坐标是否和当前捕获者有碰撞
qc.CatchGame.isCrash = function(pos) {
    var crash_box = qc.CatchGame.catcher.getDetectBox();
    var crash2 = {
            x: crash_box.x - 40,
            y: crash_box.y - 40,
            width: crash_box.width + 80,
            height: crash_box.height + 80,
        }
        //该点到box上2个角距离>到
    if (crash2.x < pos.x && pos.x < (crash2.x + crash2.width)) {
        if (crash2.y < pos.y && pos.y < (crash2.y + crash2.height)) {
            return true;
        };
    };
    return false;
};


//物品碰撞事件
qc.CatchGame.onItemSignal = function(obj) {
    //碰撞结果事件：碰撞加减分，碰撞提示语，碰撞特殊信息，碰撞游戏结束
    switch (obj.eventType) {
        case "crash":
            qc.CatchGame.onItemSignal_crash(obj);
            break;
        case "fallout":
            qc.CatchGame.onItemSignal_fallout(obj);
            break;
        case "appear":
            qc.CatchGame.onItemSignal_appear(obj);
            break;
        default:
            break;
    }
};

//检测当前状态是否获胜
qc.CatchGame.checkStatus = function() {
    var self = this;
    if (self._gameLeftTime <= 0) {
        self.gameOver();//TODO: 终结条件之一
    }

    if (self.Score > 200) {
        self.gameWin();
    } else if (self.Score < -200) {
        self.gameOver();
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////  
////  游戏逻辑控制部分
////

//碰撞事件
qc.CatchGame.onItemSignal_crash = function(obj) {
    qc_game.log.trace("obj " , obj);
    //不同对象碰撞捕捉到后使用不同效果
    switch (obj.obj.id) {
        //碰撞到认证后
        case "auth":
            // statements_1
            break;
        case "rice":
            // statements_1
            break;
        case "rubbish":
            CatchGame.fallitemPool.riceFaceCry();
            break;
        case "bomb":
            // statements_1
            break;
        //碰撞到logo后，所有大米点赞两秒
        case "logo":
            CatchGame.fallitemPool.riceFaceSmile();
            break;
        default:
            // statements_def
            break;
    }

    qc.CatchGame.Score += obj.obj.score;
};


//跌落事件
qc.CatchGame.onItemSignal_fallout = function(obj) {};

//跌落事件
qc.CatchGame.onItemSignal_appear = function(obj) {};

