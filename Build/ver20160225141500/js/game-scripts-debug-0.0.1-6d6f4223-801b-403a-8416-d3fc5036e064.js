/**
 * 用户自定义脚本.
 */
(function(window, Object, undefined) {





window.inBox = function (box, pos) {
    if (inBox_x(box, pos)) {
        if (inBox_y(box, pos)) {
            return true;
        };
    };
    return false;
};

window.inBox_x = function (box, pos) {
    if (box.x <= pos.x && pos.x <= (box.x + box.width)) {
        return true;
    };
    return false;
};

window.inBox_y = function (box, pos) {
    if (box.y <= pos.y && pos.y <= (box.y + box.height)) {
        return true;
    };
    return false;
};

//两点的平方和
window.distanceSquare = function (a_X, a_Y, b_X, b_Y) {
    var x = Math.pow(Math.abs(a_X - b_X), 2);
    var y = Math.pow(Math.abs(a_Y - b_Y), 2);
    return x + y;
}

//计算两者距离
window.distance = function distance(a_X, a_Y, b_X, b_Y) {
    return Math.sqrt(distanceSquare(a_X, a_Y, b_X, b_Y));
}

//点是否在半径区域内
window.checkPointInRadius = function (posCenter, radius, posOther) {
    if (distance(posCenter.x, posCenter.y, posOther.x, posOther.y) < radius) {
        return true;
    } else {
        return false;
    };
}

window.arrRemove = function(arr ,b) {
    var a = arr.indexOf(b);
    if (a >= 0) {
        arr.splice(a, 1);
        return true;
    }
    return false;
}

//类似于foreach
window.doPoolObject = function(poolObj, func) {
    for (var i = 0; i < poolObj.length; i++) {
        if (func) {
            func(poolObj, i, poolObj[i]);
        };
    };
};

//删除指定indexgroup的元素
window.arrayDelIndexGroup = function(indexgroup, poolObj) {
    indexgroup.sort(function(a, b) {
        return a > b ? 1 : -1 });
    for (var i = indexgroup.length - 1; i >= 0; i--) {
        if (poolObj.length > indexgroup[i]) {
            poolObj.splice(indexgroup[i], 1);
        };
    };
}
'use strict';
/**
 * 游戏入口
 */
window.CatchGame = qc.CatchGame = {

    FALL_SPEED : 4,

    RAISE_LEVEL : -20,
    SEA_LEVEL : 980,
    SPEAK_BOX_MIX_WIDTH : 600,
    DEFAULT_PAGE: "reward",

    DEFAULT_MUSIC_PLAYING : false,


    DATA_SOURCE : [
        { id: 0, icon: "13.png", score: 10, noRepeatRadius: 1500, noOtherRadius: 160 },
        { id: 1, icon: "12.png", score: 10, noRepeatRadius: 1500, noOtherRadius: 160 },
        { id: 2, icon: "11.png", score: 10, noRepeatRadius: 1500, noOtherRadius: 160 },
        { id: 3, icon: "10.png", score: 10, noRepeatRadius: 1500, noOtherRadius: 160 },
        { id: 4, icon: "7.png", score: 1, noRepeatRadius: 150, noOtherRadius: 160 },
        { id: 5, icon: "8.png", score: 1, noRepeatRadius: 150, noOtherRadius: 160 },
        { id: 6, icon: "9.png", score: 1, noRepeatRadius: 150, noOtherRadius: 160 },
        { id: 7, icon: "1.png", score: -3, noRepeatRadius: 150, noOtherRadius: 160 },
        { id: 8, icon: "2.png", score: -3, noRepeatRadius: 150, noOtherRadius: 160 },
        { id: 9, icon: "3.png", score: -3, noRepeatRadius: 150, noOtherRadius: 160 },
        { id: 10, icon: "0.png", score: -100, noRepeatRadius: 1000, noOtherRadius: 160 },
        { id: 11, icon: "4.png", score: 5, noRepeatRadius: 500, noOtherRadius: 160 },
        { id: 12, icon: "5.png", score: 5, noRepeatRadius: 500, noOtherRadius: 160 },
        { id: 13, icon: "6.png", score: 5, noRepeatRadius: 500, noOtherRadius: 160 },
    ],

    REWARD_GROUP:[
        { icon: "jiang1.png" , url : "" , score_limit: 10, },
        { icon: "jiang2.png" , url : "" , score_limit: 10, },
        { icon: "jiang3.png" , url : "" , score_limit: 10, },
        { icon: "jiang4.png" , url : "" , score_limit: 10, },
        { icon: "jiang5.png" , url : "" , score_limit: 10, },
    ],

    _introduced : false,


    _status : "welcome",
    set Status(v) {
        this.statusSignal.dispatch(this._status,v);
        this._status = v;
    },
    get Status() {
        return this._status;
    },



    // 所有的操作指令集合
    operation: {},
};

// 游戏逻辑初始化
qc.initGame = function(game) {

    // 全局通知事件
    CatchGame.itemSignal = new qc.Signal();//下落元素变化事件
    CatchGame.statusSignal = new qc.Signal();//游戏状态变化


    // 初始化捕获者
    CatchGame.catcher = new qc.CatchGame.CatcherLogic();

    // 初始化下落物工厂
    CatchGame.fallitemFactory = new qc.CatchGame.FallItemFactory();

    // 初始化下落物
    CatchGame.fallitemPool = new qc.CatchGame.FallItemPoolLogic();

    //初始化提示语言
    CatchGame.speaker = new qc.CatchGame.SpeakerLogic();

    // 设置监听全局消息
    CatchGame.itemSignal.add(qc.CatchGame.onItemSignal);

    CatchGame.Status = CatchGame.DEFAULT_PAGE;
};


qc.CatchGame.onItemSignal = function(obj){
    //碰撞结果事件：碰撞加减分，碰撞提示语，碰撞特殊信息，碰撞游戏结束
    switch(obj.eventType){
        case 1://TODO: 统一成字符串
            qc.CatchGame.speaker.setScore(obj);
        default:
            break;
    }
};


//绑定对象到
qc.CatchGame.isIntroduced = function(){
    return this._introduced;
}

//绑定对象到
qc.CatchGame.bandUIObj  = function(uiObj){
    this.uiObj = uiObj;
}

//游戏是否在运行
qc.CatchGame.isRunning = function(){
    var self = this;
    switch(self.Status){
        case "welcome":
            return false;
            break;
        case "introduce":
            return false;
            break;
        case "playing":
            return true;
            break;
        case "reward":
            return false;
            break;
        default:
            return false;
    }
}

//坐标是否和当前捕获者有碰撞
qc.CatchGame.isCrash = function(pos){
    var crash_box = qc.CatchGame.catcher.getDetectBox();
    var crash2 = {
        x: crash_box.x - 40,
        y: crash_box.y - 40,
        width: crash_box.width + 80,
        height: crash_box.height +80,
    }
    //该点到box上2个角距离>到
    if (crash2.x < pos.x && pos.x < (crash2.x + crash2.width)) {
        if (crash2.y < pos.y && pos.y < (crash2.y + crash2.height)) {
            return true;
        };
    };
    return false;
}

//TODO: 操作开始
//开始游戏
qc.CatchGame.setStart = function() {
    this.Status = "playing";
    
    //初始化提示语言
    // 初始化下落物

};

//重新开始游戏
qc.CatchGame.reStart = function(){
    //TODO: 重新开始游戏
};

//获取当前奖品的地址（用于转跳）
qc.CatchGame.getCurrentReward = function(){
    return "http://getgeektest.applinzi.com/";
};





















// qc.CatchGame.getFaillingData = function(){
//     var data = [
//         //先分成大类
//         //稀有物品类
//         {
//             isObject :true, //本元素是对象
//             isRelative : false, //同一嵌套层次下是否使用相同index
//             clazz : "稀有物品类",    //物品分类
//             rate : 0.01,    //出现概率
//             icon: [//包含元素
//                 {
//                     isObject :true,
//                     isRelative :true,
//                     icon:"10.png",  //使用图标 unido图标
//                 },
//             ],
//             id: 0 ,
//             score: 10,
//             noRepeatRadius: 1500,
//             noOtherRadius: 160,
//             catching: [
//                 {
//                     isObject :true,
//                     isRelative :true,
//                     catching : [
//                         "unido，是四大认证之一",
//                     ],
//                 },
//             ],
//             missing: [
//                 {
//                     isObject :true,
//                     isRelative :true,
//                     missing : [
//                         "错过了unido认证等十年",
//                     ],
//                 },
//             ],
//         },
//         //宝贵物品类
//         {

//         },
//         //一般物品类
//         {},
//         //垃圾物品类
//         {}，
//         //非常垃圾物品类
//         {},
//     ];
// };
// qc.CatchGame.getFaillingDataTest = function(){
//     data = getFaillingData();
//     // 本元素是对象元素
//     if (data.isObject === true) {

//     };
//     //本元素是相关元素，嵌套层次固定应该保持使用上个嵌套层次的序号
//     if (data.isRelative === true) {

//     };
//     // 本元素是数组，应该取其中随机一个元素
//     if (Array === typeof(data)) {
        
//         getRandomIndex();
//     };
// };
"use strict";

/**
 * 维护分数信息
 */
var FallItemFactory = qc.CatchGame.FallItemFactory = function() {
    var self = this;

    self.factorydata = qc.CatchGame.DATA_SOURCE;

    self.data = [];
    for (var i = 0; i < self.factorydata.length; i++) {
        var item = new qc.CatchGame.FallItemLogic();
        item.initObj(self.factorydata[i]);
        self.data.push(item);
    };


    self.tryUpTimes = 5;
};
FallItemFactory.prototype = {};
FallItemFactory.prototype.constructor = FallItemFactory;

Object.defineProperties(FallItemFactory.prototype, {

});

//填充区域
FallItemFactory.prototype.fillPoolWithArea = function(area,pool) {
    var self = this;
    var bigPool = [];

    //每个对象循环放置
    for (var i = 0; i < self.data.length; i++) {
        var everyElement = self.data[i];

        //以当前池已经拥有的对象和新建的对象为基础，创建新的元素
        var newItems = self.fillUP(everyElement,area,bigPool.concat(pool))

        //所有新增加的元素都应该放置在这，以备后续添加
        bigPool = bigPool.concat(newItems);
    };
    //先排序，方便后续使用
    bigPool.sort(function(a, b) {
        if (a.y>=b.y) {
            return 1;
        }
        else {
            if (a.x>=b.x) {
                return 1;
            };
        };
        return -1; 
    });
    return bigPool;
};

//使用一个元素填充，直到5次填充失败，则这个元素填充完成
FallItemFactory.prototype.fillUP = function(everyElement,area,bigPool) {
    var self = this;
    var trytime = self.tryUpTimes;
    var pool = [];

    while (true) {
        //随机位置
        var pos_random = {
            x: Math.random() * area.width + area.x,
            y: Math.random() * area.height + area.y,
        };

        //该位置没有元素，或者没有同ID元素
        if (self.putCheck(everyElement.id, pos_random , pool.concat(bigPool))) {
            //放置成功,退出循环
            everyElement.x=pos_random.x;
            everyElement.y=pos_random.y;
            pool.push(everyElement.clone());
        } else {
            trytime--;
            if (trytime < 0) {
                break;
            };
        };
    };
    return pool;
};


//改点是否能放下检测
FallItemFactory.prototype.putCheck = function(id, pos ,pool) {
    var self = this;

    //循环对象池是否有不符合规则的地方
    for (var i = 0; i < pool.length; i++) {
        var poolItem = pool[i];
        //ID相等，重复区域内不得放置
        if (poolItem.id == id && checkPointInRadius({x:poolItem.x,y:poolItem.y,}, poolItem.noRepeatRadius, pos)) {
            return false;
        }
        //ID不相等，排他区域内不得放置
        if (checkPointInRadius({x:poolItem.x,y:poolItem.y,}, poolItem.noOtherRadius, pos)) {
            return false;
        };
    };
    return true;
};






"use strict";

/**
 * 维护分数信息
 */
var FallItemLogic = qc.CatchGame.FallItemLogic = function() {
    var self = this;

    self.icon = "";
    self.id = "";
    self._x = 0;
    self._y = 0;
    self.noRepeatRadius = 0;
    self.noOtherRadius = 0;
    self.score = 0;
    self.o = null;
};
FallItemLogic.prototype = {};
FallItemLogic.prototype.constructor = FallItemLogic;

//更新自己坐标同时，同步到外部元素
Object.defineProperties(FallItemLogic.prototype, {
    x: {
        get: function() {
            return this._x;
        },
        set: function(v) {
            this._x = v;
            if (this.o) {
                this.o.x = v;
            };
        }
    },
    y: {
        get: function(){
            return this._y;
        },
        set: function(v){
            this._y = v;
            if (this.o) {
                this.o.y = v;
            };
        }
    }
});

//初始化
FallItemLogic.prototype.init = function(id,icon,x,y,noRepeatRadius,noOtherRadius,score) {
    var self = this;

    self.icon = icon;
    self.id = id;
    self.x = x;
    self.y = y;
    self.noRepeatRadius = noRepeatRadius;
    self.noOtherRadius = noOtherRadius;
    self.score = score;
};

//初始化
FallItemLogic.prototype.initObj = function(Obj) {
    var self = this;

    self.icon = Obj.icon;
    self.id = Obj.id;
    self.noRepeatRadius = Obj.noRepeatRadius;
    self.noOtherRadius = Obj.noOtherRadius;
    self.score = Obj.score;
};

//克隆自身
FallItemLogic.prototype.clone = function() {
    var self = this;
    var obj = new FallItemLogic();

    obj.icon = self.icon;
    obj.id = self.id;
    obj.x = self.x;
    obj.y = self.y;
    obj.noRepeatRadius = self.noRepeatRadius;
    obj.noOtherRadius = self.noOtherRadius;
    obj.score = self.score;

    return obj;
};

//对象用于分派的信息
FallItemLogic.prototype.getInfo = function(status) {
    var self = this;//TODO: 被销毁后返回的内容，用于设置到对话框
    var info = {
        eventType : 1,
        score : self.score,
    };
    return info;
};

//碰撞返回信息
FallItemLogic.prototype.getCrashInfo = function(status) {
    // var self = this;//TODO: 被销毁后返回的内容，用于设置到对话框
    // var info = {
    //     score : self.score,
    // };
    // console.log('item getInfo');
    // return info;
};

//跌落返回信息
FallItemLogic.prototype.getFallInfo = function(status) {
    // var self = this;//TODO: 被销毁后返回的内容，用于设置到对话框
    // var info = {
    //     score : self.score,
    // };
    // console.log('item getInfo');
    // return info;
};

//如果是某种表情则替换
FallItemLogic.prototype.onChangeEvent = function() {
    var self = this;
    if (self.icon == "7.png" || self.icon == "8.png") {
        self.o.frame = "9.png";
        self.timer = setTimeout(function(){
            clearTimeout(self.timer);
            self.o.frame = self.icon;
        }, 1000);
    };
};
"use strict";

/**
 * 维护分数信息
 */
var FallItemPoolLogic = qc.CatchGame.FallItemPoolLogic = function() {
    var self = this;

    self.currentPool = [];

    self.raiseLine = qc.CatchGame.RAISE_LEVEL;
    self.fallOutLine = qc.CatchGame.SEA_LEVEL;
    
};
FallItemPoolLogic.prototype = {};
FallItemPoolLogic.prototype.constructor = FallItemPoolLogic;

Object.defineProperties(FallItemPoolLogic.prototype, {

});

FallItemPoolLogic.prototype.init = function(uiObj) {
    this.uiObj = uiObj;
};

//所有池中的对象全部偏移指定的数值
FallItemPoolLogic.prototype.updateAllPoolObject = function(pos_diff) {
    var self = this;

    //处理位置偏移
    var pos_add = function(operaPool,index,value){
        value.x += pos_diff.x;
        value.y += pos_diff.y;
    };
    doPoolObject(self.currentPool,pos_add);
};


//返回超出掉出线的物品index数组
FallItemPoolLogic.prototype.checkFalloutPoolObject = function() {
    var self = this;
    var indexgroup = [];

    //处理位置偏移
    var check_fallout = function(operaPool,index,value){
        if (value.y > self.fallOutLine) {
            var effect = value.o.getScript("qc.engine.FallItemUI");
            effect.onFallout();
            indexgroup.push(index);
            //下落元素跌出屏幕后事件派发
            qc.CatchGame.itemSignal.dispatch(value.getInfo());
        };
    };
    doPoolObject(self.currentPool,check_fallout);
    self.delItemIndexArr(indexgroup);
};

//返回发生碰撞的物品index数组
FallItemPoolLogic.prototype.checkCrashPoolObject = function() {
    var self = this;
    var indexgroup = [];

    //处理位置偏移
    var check_crash = function(operaPool,index,value){
        if (qc.CatchGame.isCrash({x:value.x,y:value.y})) {
            //下落元素显示效果
            var effect = value.o.getScript("qc.engine.FallItemUI");
            effect.score = value.score;
            effect.onCrash();
            //下落元素删除准备
            indexgroup.push(index);
            //下落元素触碰后事件派发
            qc.CatchGame.itemSignal.dispatch(value.getInfo());
        };
    };
    doPoolObject(self.currentPool,check_crash);
    self.delItemIndexArr(indexgroup);
};

//增加元素
FallItemPoolLogic.prototype.additem = function(item) {
    var self = this;
    
    self.currentPool.push(item);

    self.uiObj.additem(item);
};

//增加元素数组
FallItemPoolLogic.prototype.additems = function(items) {
    var self = this;
    
    for (var i = 0; i < items.length; i++) {
        self.currentPool.push(items[i]);
        self.uiObj.additem(item);
    };
    
};

//删除元素
FallItemPoolLogic.prototype.delItem = function(item) {
    var self = this;
    
    self.currentPool.remove(item);
};

//删除元素数组
FallItemPoolLogic.prototype.delItem = function(items) {
    var self = this;
    
    for (var i = 0; i < items.length; i++) {
        self.currentPool.remove(items[i]);
    };
    
};

//删除元素index
FallItemPoolLogic.prototype.delItemIndex = function(index) {
    var self = this;
    var indexGroup = [index];
    arrayDelIndexGroup(indexgroup,self.currentPool);
};

//删除元素index数组
FallItemPoolLogic.prototype.delItemIndexArr = function(indexgroup) {
    var self = this;
    
    arrayDelIndexGroup(indexgroup,self.currentPool);
};

//返回自身
FallItemPoolLogic.prototype.getPool = function() {
    return this.currentPool;
};

//检测是否最后一个元素已经跌过出生线了，是的话返回真
//根据这个判断是不是需要增加新元素
FallItemPoolLogic.prototype.isPoolNeedNew = function() {
    var self = this;
    if (self.currentPool.length > 0) {
        if (self.currentPool[self.currentPool.length -1].y > self.raiseLine) {
            return true;
        };
    }
    else{
        return true;
    };
    return false;
};

/**
 * 维护介绍页面是否出现过
 */
var Introduced = qc.CatchGame.Introduced = function() {
    var self = this;

    self._introduced = false;

    // 将本地数据读取出来
    var game = qc.CatchGame.game;
    var introduced = game.storage.get('introduced'); 
    if (introduced) self._introduced = introduced;
};
Introduced.prototype = {};
Introduced.prototype.constructor = Introduced;

Object.defineProperties(Introduced.prototype, {
    state: {
        get: function() { return this._introduced; },
        set: function(v) {
            this._introduced = v;
            var storage = qc.Tetris.game.storage;
            storage.set('introduced', v);
            storage.save();
        }
    }
});
"use strict";

/**
 * 维护分数信息
 */
var SpeakerLogic = qc.CatchGame.SpeakerLogic = function() {
    var self = this;

    self.score = 0;
};
SpeakerLogic.prototype = {};
SpeakerLogic.prototype.constructor = SpeakerLogic;

Object.defineProperties(SpeakerLogic.prototype, {
});

//设置UI对象
SpeakerLogic.prototype.init = function(uiObj) {
    this.uiObj = uiObj;
};

//设置显示内容
SpeakerLogic.prototype.eventLisenter = function(score) {
    var self = this;
    self.score = score;
    console.log('SpeakerLogic score:',self.score);
};

SpeakerLogic.prototype.setScore = function(obj) {
    var self = this;

    //当前得分字符串
    self.score += obj.score;
    var textScore = "Score : " + self.score.toString();
    self.uiObj.setWord(textScore);
};
'use strict';


var UIManager = qc.defineBehaviour('qc.engine.UIManager', qc.Behaviour, function() {

    var self = this;

    self.gameStatusChange = false;
    self.stage = [];
}, {
    WelcomeNode: qc.Serializer.NODE,
    IntroduceNode: qc.Serializer.NODE,
    PlayingNode: qc.Serializer.NODE,
    RewardNode: qc.Serializer.NODE,
});


UIManager.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    //页面node初始化
    if (true) {
        // 页面
        if (self.WelcomeNode) {
            //self.FallCreateArea = self.WelcomeNode.getScript("qc.engine.ObjectAreaUI");
            self.WelcomeNode.visible = false;
            self.stage.push({ name: "welcome", node: self.WelcomeNode, });
        }

        // 页面
        if (self.IntroduceNode) {
            //self.FallCreateArea = self.IntroduceNode.getScript("qc.engine.ObjectAreaUI");
            self.IntroduceNode.visible = false;
            self.stage.push({ name: "introduce", node: self.IntroduceNode, });
        }

        // 页面
        if (self.PlayingNode) {
            //self.FallCreateArea = self.PlayingNode.getScript("qc.engine.ObjectAreaUI");
            self.PlayingNode.visible = false;
            self.stage.push({ name: "playing", node: self.PlayingNode, });
        }

        // 页面
        if (self.RewardNode) {
            //self.FallCreateArea = self.RewardNode.getScript("qc.engine.ObjectAreaUI");
            self.RewardNode.visible = false;
            self.stage.push({ name: "reward", node: self.RewardNode, });
        }
    }

    //打开默认的页面
    self.openDefaultPage();

    //游戏状态变化响应切换
    qc.CatchGame.statusSignal.add(function(oldStatus, newStatus) {
        self.gameStatusChange = true;

        var switchOnStage = function(operaPool, index, value) {
            if (value.name === newStatus) {
                value.node.visible = true;

                //设置已经介绍信息状态为真
                if (value.name === "introduce") {
                    qc.CatchGame._introduced = true;  
                };
                //设置已经介绍信息状态为真
                if (value.name === "playing") {
                    qc.CatchGame.reStart();
                };
            };
        };
        var switchOffStage = function(operaPool, index, value) {
            if (value.name != newStatus) {
                value.node.visible = false;
            };
        };
        doPoolObject(self.stage, switchOnStage);
        doPoolObject(self.stage, switchOffStage);
    });
};


UIManager.prototype.update = function() {
    var self = this;
};

//打开默认页面
UIManager.prototype.openDefaultPage = function() {
    var self = this;
    var switchOnStage = function(operaPool, index, value) {
        if (value.name == qc.CatchGame.Status) {
            value.node.visible = true;
        };
    };
    doPoolObject(self.stage, switchOnStage);
};
'use strict';


var ItroduceUI = qc.defineBehaviour('qc.engine.ItroduceUI', qc.Behaviour, function() {
}, {
});


ItroduceUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;
};


ItroduceUI.prototype.update = function() {

};

ItroduceUI.prototype.onClick = function() {
    qc.CatchGame.Status = "playing";
};

'use strict';


var TeachImageUI = qc.defineBehaviour('qc.engine.TeachImageUI', qc.Behaviour, function() {

    var self = this;

}, {
});


// TeachImageUI.prototype.awake = function() {
//     var self = this,
//         o = self.gameObject;
// };


// TeachImageUI.prototype.update = function() {
// };


/**
 * 鼠标拖拽事件
 */
/**
 * 鼠标按下
 */
TeachImageUI.prototype.onClick = function(e) {
    var self = this,
        o = self.gameObject;
    
    qc.CatchGame.setStart();
};


'use strict';


var BackCountUI = qc.defineBehaviour('qc.engine.BackCountUI', qc.Behaviour, function() {
}, {
});


BackCountUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    o.visible = false;
};


BackCountUI.prototype.update = function() {

};

BackCountUI.prototype.show = function() {
    var self = this,
        o = self.gameObject,
        tAlpha = self.getScript('qc.TweenAlpha');

    var group = ["3","2","1","Go!"];

    o.text = text;
    o.visible = true;

    var currentIndex = 0;
    function doShow(){

        if (currentIndex < group.length) {
            o.text = group[currentIndex];
            o.visible = true;
            tAlpha.resetToBeginning();
            tAlpha.onFinished.addOnce(doShow());
            tAlpha.playForward();
        }
        else {
            // 隐藏掉
            o.visible = false;
            o.destroy();
        };
    };
};

BackCountUI.prototype.setPos = function(x,y) {
    var self = this,
        o = self.gameObject;
    o.x = x;
    o.y = y;
};
'use strict';


var CatcherUI = qc.defineBehaviour('qc.engine.CatcherUI', qc.Behaviour, function() {

    var self = this;

    self.moveing_area = {
        x: 0,
        y: 0,
        width: 640,
        height: 960,
    }

    self._mousepos = { x: 0, y: 0 };
    self.logicObj = null;

    //游戏对象转换为世界坐标
    self.pos = { 
        get x() {
            return this._x;
        },
        set x(v) {
            self.updateLogicX(v);
            this._x = v;
        },
        get y() {
            return this._y;
        },
        set y(v) {
            self.updateLogicY(v);
            this._y = v;
        },
        _x: 0,
        _y: 0,
    };
}, {
    CheckAreaNode: qc.Serializer.NODE,
    ImageNode: qc.Serializer.NODE,
    AreaNode: qc.Serializer.NODE,
    WorldNode: qc.Serializer.NODE,
});


CatcherUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    //获取鼠标移动的范围
    if (self.AreaNode) {
        self.Area = self.AreaNode.getScript("qc.engine.ObjectAreaUI");
        self.moveing_area = self.Area.currentBox();
        self.AreaNode.visable = false;
    }

    //获取名下检测区域
    var detectArea = {};
    if (self.CheckAreaNode) {
        self.CheckArea = self.CheckAreaNode.getScript("qc.engine.ObjectAreaUI");
        detectArea = self.CheckArea.currentBox();
        self.CheckAreaNode.visable = false;
        detectArea.x += o.x;
        detectArea.y += o.y;
    }
    
    //关联本对象和逻辑对象
    self.init(qc.CatchGame.catcher,detectArea);

};


CatcherUI.prototype.update = function() {

};

//绑定游戏实际逻辑对象
CatcherUI.prototype.init = function(logicObj,detectArea) {
    var self = this,
        o = self.gameObject;

    self.logicObj = logicObj;
    self.logicObj.x = o.x;
    self.logicObj.y = o.y;

    self.logicObj.detectArea = detectArea;

    self.logicObj.countBoxOffset();

};
//更新游戏实际逻辑对象位置
CatcherUI.prototype.updateLogicX = function(v){
    this.logicObj.x = v;
}
//更新游戏实际逻辑对象位置
CatcherUI.prototype.updateLogicY = function(v){
    this.logicObj.y = v;
}

/**
 * 鼠标拖拽事件
 */
/**
 * 鼠标按下
 */
CatcherUI.prototype.onDown = function(e) {
    var self = this,
        o = self.gameObject;
    self._press = true;
    self._mousepos = o.getWorldPosition();
    console.log("dragStart");
};

/**
 * 拖拽中
 */
CatcherUI.prototype.onDrag = function(e) {
    var self = this,
        o = self.gameObject;
    if (self._press) {
        //更新鼠标位置
        self._mousepos.x += e.source.deltaX;
        self._mousepos.y += e.source.deltaY;

        //判断元素位置变化
        var item_pos = self.WorldNode.toLocal(self._mousepos);

        var p = o.getWorldPosition();


        //可移动区域仅限于父亲范围内,赋值
        if (window.inBox(self.moveing_area, item_pos)) {
            var lp = o.parent.toLocal(self._mousepos);
            this.pos.x = o.x = lp.x;
            this.pos.y = o.y = lp.y;
        } else if (window.inBox_x(self.moveing_area, item_pos)) {
            var lp_x = o.parent.toLocal(self._mousepos);
            var lp_y = o.parent.toLocal(p);
            this.pos.x = o.x = lp_x.x;
            this.pos.y = o.y = lp_y.y;
        } else if (window.inBox_y(self.moveing_area, item_pos)) {
            var lp_x = o.parent.toLocal(p);
            var lp_y = o.parent.toLocal(self._mousepos);
            this.pos.x = o.x = lp_x.x;
            this.pos.y = o.y = lp_y.y;
        } else {
            var lp_x = o.parent.toLocal(p);
            var lp_y = o.parent.toLocal(p);
            this.pos.x = o.x = lp_x.x;
            this.pos.y = o.y = lp_y.y;
        };
    }
};

/**
 * 拖拽结束
 */
CatcherUI.prototype.onDragEnd = function(e) {
    var self = this,
        o = self.gameObject;
    self._press = false;

    console.log("dragEnd");
};

'use strict';


var FallItemPoolUI = qc.defineBehaviour('qc.engine.FallItemPoolUI', qc.Behaviour, function() {

    var self = this;

    self.fallSpeed = qc.CatchGame.FALL_SPEED;
}, {
    FallItemPrefab: qc.Serializer.PREFAB,
});


// FallItemPoolUI.prototype.awake = function() {
//     var self = this,
//         o = self.gameObject;
// };


// FallItemPoolUI.prototype.update = function() {
// };

//外部传入fallmodel，这里创建图形，同时在逻辑对象创建匹配的对象
FallItemPoolUI.prototype.additem = function(datainfo) {
    var self = this,
        o = self.gameObject;

    //添加UI对象
    var fallitem = self.game.add.clone(self.FallItemPrefab, o);
    fallitem.frame = datainfo.icon;
    fallitem.x = datainfo.x;
    fallitem.y = datainfo.y;
    fallitem.visable = true;

    datainfo.o = fallitem;
};

FallItemPoolUI.prototype.fallAll = function() {
    var self = this;
    qc.CatchGame.fallitemPool.updateAllPoolObject({
        x:0,
        y:self.fallSpeed,
    });
};

FallItemPoolUI.prototype.fallOut = function() {
    var self = this;
    qc.CatchGame.fallitemPool.checkFalloutPoolObject();
};

FallItemPoolUI.prototype.crashUp = function() {
    var self = this;
    qc.CatchGame.fallitemPool.checkCrashPoolObject();
};

FallItemPoolUI.prototype.need2Create = function() {
    return qc.CatchGame.fallitemPool.isPoolNeedNew();
};





// define a user behaviour
var FallItemUI = qc.defineBehaviour('qc.engine.FallItemUI', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;

    var self = this,
        o = self.gameObject;
    // self._press = false;
    // self._pos = new qc.Point(0, 0);
    // self._mousepos = new qc.Point(0, 0);
    // 
    self.score = 10;
}, {
    testPrefab: qc.Serializer.PREFAB
});

Object.defineProperties(FallItemUI.prototype, {
    pos_x: {
        get: function() {
            return this._pos.x;
        },
        set: function(v) {
            this._pos.x = v;
        }
    },

    pos_y: {
        get: function() {
            return this._pos.y;
        },
        set: function(v) {
            this._pos.y = v;
        }
    },

    pos: {
        get: function() {
            return this._pos;
        },
        set: function(v) {
            this._pos = v;
        }
    }

});

// Called when the script instance is being loaded.
FallItemUI.prototype.awake = function() {
    var self = this;
};

// Called every frame, if the behaviour is enabled.
//FallItemUI.prototype.update = function() {
//
//};



//碰撞显示得分
FallItemUI.prototype.onCrash = function() {
    var self = this,
        o = self.gameObject;
        
    //自己消失
    var ta = self.getScript("qc.TweenAlpha");
    o.visible = true;
    ta.resetToBeginning();
    ta.onFinished.addOnce(function() {
        // 隐藏掉
        o.visible = false;
        o.destroy();
    });
    ta.playForward();

    //分数效果
        //加载积分对象，加载对象相关脚本
    if (self.testPrefab) {
        var testScript = self.game.add.clone(self.testPrefab, self.gameObject.parent);
        self.test = testScript.getScript("qc.engine.ScoreUI");
        self.test.setPos(o.x,o.y);
    };

    var textScore = self.score > 0 ? "+"+self.score.toString() : self.score.toString();
    self.test.show(textScore);
};

//跌出区域删除自己
FallItemUI.prototype.onFallout = function() {
    var self = this,
        o = self.gameObject;

    o.destroy();
};
"use strict";

/**
 * 维护分数信息
 */
var CatcherLogic = qc.CatchGame.CatcherLogic = function() {
    var self = this;

    self.x = 0;
    self.y = 0;
    //定义碰撞范围
    self.detectArea = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
    //用于计算坐标变化
    self._countOffset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
};
CatcherLogic.prototype = {};
CatcherLogic.prototype.constructor = CatcherLogic;

Object.defineProperties(CatcherLogic.prototype, {
});

//计算当前偏差值，创建时一次即可
CatcherLogic.prototype.countBoxOffset = function() {
    var self = this;
	self._countOffset.x = self.x - self.detectArea.x;
	self._countOffset.y = self.y - self.detectArea.y;
};

//更新detectArea位置
CatcherLogic.prototype.updateBox = function() {
    var self = this;
    self.detectArea.x = self.x - self._countOffset.x ;
	self.detectArea.y = self.y - self._countOffset.y ;
};

CatcherLogic.prototype.getDetectBox = function() {
    var self = this;
    self.updateBox();

    return self.detectArea;
};
'use strict';


var SpeakerUI = qc.defineBehaviour('qc.engine.SpeakerUI', qc.Behaviour, function() {

    var self = this;

    
}, {
    // BackgroundNode: qc.Serializer.NODE,
    TextNode: qc.Serializer.NODE,
});


SpeakerUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    
    //关联本对象和逻辑对象
    qc.CatchGame.speaker.init(self);
};


//绑定自己到游戏实际逻辑对象
SpeakerUI.prototype.init = function(logicObj,detectArea) {
    var self = this,
        o = self.gameObject;


};
//更新游戏实际逻辑对象位置
SpeakerUI.prototype.setWord = function(text){
    var self = this;


    self.TextNode.text = text;
    var nativeSize = self.TextNode.nativeSize;

    //匹配文字宽度
    // self.BackgroundNode.width = nativeSize.width + 40;
    // self.BackgroundNode.height = nativeSize.height + 40;
};

'use strict';


var MusicBtnUI = qc.defineBehaviour('qc.engine.MusicBtnUI', qc.Behaviour, function() {
    var self = this;

    self._playing = qc.CatchGame.DEFAULT_MUSIC_PLAYING;
}, {
});


MusicBtnUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    //设置图片默认状态
    if (self._playing === false) {
        o.frame = "music_off.png";
    }
    else {
        o.frame = "music_on.png";
    }
};


MusicBtnUI.prototype.update = function() {

};


MusicBtnUI.prototype.onClick = function() {
    var self = this,
        o = self.gameObject;

    if (self._playing === false) {
        //TODO: 播放音乐
        self._playing = true;
        o.frame = "music_on.png";
        console.log('music playing');
    }
    else {
        //TODO: 暂停音乐
        self._playing = false;
        o.frame = "music_off.png";
        console.log('music pause');
    }
};
'use strict';


var TestSpriteUI = qc.defineBehaviour('qc.engine.TestSpriteUI', qc.Behaviour, function() {

    var self = this;

    // self.itemFactory = new qc.CatchGame.FallItemFactory();

    // self.catcher = new qc.CatchGame.CatcherLogic();

}, {
    //     testPrefab: qc.Serializer.PREFAB,
    //     catcherPrefab: qc.Serializer.PREFAB,
    //     worldNode: qc.Serializer.NODE
});


TestSpriteUI.prototype.awake = function() {
    var self = this;
    self.getPlay = getPlayXunhuanLoop();
    // if (self.catcherPrefab) {
    //     var testObject = self.game.add.clone(self.catcherPrefab, self.worldNode);
    //     self.test = testObject.getScript("qc.engine.CathcerUI");
    // };
};


TestSpriteUI.prototype.update = function() {

};

TestSpriteUI.prototype.onClick = function() {
    var self = this;
    qc.CatchGame.Status = self.getPlay();
};


function getPlayXunhuanLoop() {
    var i = 0;

    var group = [
        {name : "welcome" },
        {name : "introduce" },
        {name : "playing" },
        {name : "reward" },
    ];
    function returnPlayName() {
        var index= 0;
        //获取当前位置
        for (var i = 0; i < group.length; i++) {
            if (group[i].name == qc.CatchGame.Status) {
                index = i;
            };
            
        };

        //循环复位
        index++;
        index = index % 4;
        return group[index].name;
    }
    return returnPlayName;
}



TestSpriteUI.prototype.onCreatePoolFallItem = function() {
    var self = this;

    var area = {
        x: 0,
        y: 0,
        width: 640,
        height: 960,
    };
    var pool = self.itemFactory.getFillAreaPool(area);

    for (var i = 0; i < pool.length; i++) {
        var datainfo = pool[i];

        var testScript = self.game.add.clone(self.testPrefab, self.worldNode);
        testScript.frame = datainfo.icon;
        testScript.x = datainfo.x;
        testScript.y = datainfo.y;
    };
};

TestSpriteUI.prototype.onCreateOneFallItem = function() {
    var self = this;

    console.log("onclick");
    //加载对象，设置标志位，下一次点击调用消失
    if (!self.flag) {
        self.flag = true;

        var testObject = self.game.add.clone(self.testPrefab, self.gameObject);
        self.test = testObject.getScript("qc.engine.FallItemUI");
    } else {
        self.flag = false;


        self.test.onCrash();
    };

};

TestSpriteUI.prototype.onScoreDispear = function() {
    //加载积分对象，加载对象相关脚本
    if (self.testPrefab) {
        var testObject = self.game.add.clone(self.testPrefab, self.gameObject);
        self.test = testObject.getScript("qc.engine.ScoreUI");
    };

    self.test.show("+5");
};

'use strict';


var GetRewardBtnUI = qc.defineBehaviour('qc.engine.GetRewardBtnUI', qc.Behaviour, function() {

    var self = this;

    self._clickable = true;

    self.onFinishClickCallback = null;
}, {
    StickNode: qc.Serializer.NODE,
    BallNode: qc.Serializer.NODE,
});


GetRewardBtnUI.prototype.awake = function() {
    var self = this;

    if (self.StickNode) {
    	self.stick = self.StickNode.getScript("qc.TweenScale");
    };

    if (self.BallNode) {
    	self.ball = self.BallNode.getScript("qc.TweenPosition");
    };
    // if (self.testNode) {
    //     self.test = self.testNode.getScript("qc.engine.ShowRewardUI");
    // };
};

GetRewardBtnUI.prototype.init = function(callback) {
    this.onFinishClickCallback = callback;
};

// GetRewardBtnUI.prototype.update = function() {

// };

GetRewardBtnUI.prototype.onClick = function() {
    var self = this;
    if (self._clickable === true) {
        self._clickable = false;

        //调用自己棍子动作动画
        self.stick.resetToBeginning();
        self.ball.resetToBeginning();
        self.stick.playGroupForward();
        self.ball.playGroupForward();

        //拉杆拉完再拉
        self.stick.onFinished.addOnce(function() {
            self._clickable = true;
            if (self.onFinishClickCallback) {
                self.onFinishClickCallback();
            };
        });

    };


};

'use strict';


var ReplayBtnUI = qc.defineBehaviour('qc.engine.ReplayBtnUI', qc.Behaviour, function() {

    var self = this;

}, {
});


// ReplayBtnUI.prototype.awake = function() {
//     var self = this;
// };


// ReplayBtnUI.prototype.update = function() {

// };

ReplayBtnUI.prototype.onClick = function() {
    var self = this;
    qc.CatchGame.setStart();
};

'use strict';


var RewardBtnUI = qc.defineBehaviour('qc.engine.RewardBtnUI', qc.Behaviour, function() {

    var self = this;

}, {
});


// RewardBtnUI.prototype.awake = function() {
//     var self = this;
// };


// RewardBtnUI.prototype.update = function() {

// };

RewardBtnUI.prototype.onClick = function() {
    var self = this;
    window.location.href=qc.CatchGame.getCurrentReward();
};

var ShowRewardUI = qc.defineBehaviour('qc.engine.ShowRewardUI', qc.Behaviour, function() {

    var self = this;

    self._update_enable = false;

    self._frameGroup = qc.CatchGame.REWARD_GROUP;

    self._endWith = "jiang1.png";

    self._frameName = "jiang1.png",
    self._blurValue = 3,
    self._durationValue = 0.1;
    self._showTimes = 10;
}, {
    Price1Node: qc.Serializer.NODE,
    Price2Node: qc.Serializer.NODE,
});


ShowRewardUI.prototype.awake = function() {
    var self = this;

    if (self.Price1Node) {
        self.price1Position = self.Price1Node.getScript("qc.TweenPosition");
        self.price1FilterGroup = self.Price1Node.getScript("qc.FilterGroup");
        self.price1BlurX = self.price1FilterGroup.filters[0];
        self.Price1Node.visible = false;
    };

    if (self.Price2Node) {
        self.price2Position = self.Price2Node.getScript("qc.TweenPosition");
        self.Price2Node.visible = true;
    };
};


// ShowRewardUI.prototype.update = function() {
//     var self = this;
//     if (self._update_enable === true) {

//     };
// };
// 


ShowRewardUI.prototype.init = function(callback) {
    var self = this;
    self.Price2Node.visible = true;
    self.Price1Node.visible = false;
    self.Price1Node.frame = "jiang0.png";

    self.callback = callback;
};

ShowRewardUI.prototype.showFastMove = function(blur, duration, onFinished) {
    var self = this,
        o = self.gameObject;

    self.Price1Node.frame = qc_game.math.getRandom(["jiang1.png","jiang2.png","jiang3.png","jiang4.png","jiang5.png"]);
    self.price1BlurX.blur = blur;
    self.price1Position.duration = duration;
    self.price1Position.playForward(true);

    self.price1Position.onFinished.addOnce(onFinished);
};

ShowRewardUI.prototype.showLastMove = function(onFinished) {
    var self = this,
        o = self.gameObject;

    self.Price2Node.frame = "jiang5.png";//TODO: 这里设置最终奖品
    self.Price2Node.visible = true;
    self.price2Position.playForward(true);

    self.price2Position.onFinished.addOnce(onFinished);
};


ShowRewardUI.prototype.onShow = function() {
    var self = this;

    self._frameName = "jiang1.png";
    self._blurValue = 3;
    self._durationValue = 0.1;


    self.Price1Node.visible = true;

    self.Price2Node.visible = false;

    self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
        self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
            self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                    self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                        self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                            self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                                self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                                    self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                                        self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                                            self.showLastMove(function(){
                                                if (self.callback) {
                                                    self.callback();
                                                };
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};

'use strict';


var ItroduceBtnUI = qc.defineBehaviour('qc.engine.ItroduceBtnUI', qc.Behaviour, function() {
}, {
});


ItroduceBtnUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;
};

ItroduceBtnUI.prototype.onClick = function() {
    qc.CatchGame.Status = "introduce";
};

'use strict';


var WelStartBtnUI = qc.defineBehaviour('qc.engine.WelStartBtnUI', qc.Behaviour, function() {
}, {
});


WelStartBtnUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;
};

WelStartBtnUI.prototype.onClick = function() {
    if (qc.CatchGame.isIntroduced()) {
        qc.CatchGame.Status = "playing"; 
    }
    else {
        qc.CatchGame.Status = "introduce";    
    }
};

var ObjectAreaUI = qc.defineBehaviour('qc.engine.ObjectAreaUI', qc.Behaviour, function() {

}, {});

ObjectAreaUI.prototype.currentBox = function() {
    var self = this,
        o = self.gameObject;

    var _worldBox = {
        x: o.x,
        y: o.y,
        width: o.width,
        height: o.height,
    };

    return _worldBox;
};

'use strict';


var PlayingPageUI = qc.defineBehaviour('qc.engine.PlayingPageUI', qc.Behaviour, function() {

    var self = this;

    var seaLevel = 0;

}, {
    FallCreateAreaNode: qc.Serializer.NODE,
    FallPoolNode: qc.Serializer.NODE,
    BackCountNode: qc.Serializer.NODE,
});


PlayingPageUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    // 查找下落区间
    if (self.FallCreateAreaNode) {
        self.FallCreateArea = self.FallCreateAreaNode.getScript("qc.engine.ObjectAreaUI");
        self.FallCreateAreaNode.visable = false;
    }

    //绑定对象池
    if (self.FallPoolNode) {
        self.fallPool = self.FallPoolNode.getScript("qc.engine.FallItemPoolUI");
        qc.CatchGame.fallitemPool.init(self.fallPool);
    };

    //绑定倒数对象
    if (self.BackCountNode) {
        self.backcount = self.BackCountNode.getScript("qc.engine.BackCountUI");
    };

    self.createItems();
};

PlayingPageUI.prototype.createItems = function() {
    var self = this;

    //获得游戏下落的区域
    var area = self.FallCreateArea.currentBox();
    var currentPool = qc.CatchGame.fallitemPool.getPool();
    var newItems = qc.CatchGame.fallitemFactory.fillPoolWithArea(area,currentPool);
    
    while(newItems.length > 0 ){
        var item = newItems.pop();
        qc.CatchGame.fallitemPool.additem(item);
    }
};

PlayingPageUI.prototype.beginGameCall = function() {
    //TODO: 调用游戏开始
    //TODO: 调用游戏倒计时
    //TODO: 调用创建下落元素
};



PlayingPageUI.prototype.update = function() {
    var self = this;
	//调用游戏类进行判断，游戏是否结束，是否碰撞得分，是否超出边界删除对象
    if (qc.CatchGame.isRunning()) {
        self.fallPool.fallAll();//TODO: 考虑到帧率问题，这里下落速度应该同帧率有关，待修改
        self.fallPool.fallOut();
        self.fallPool.crashUp();
        if (self.fallPool.need2Create()) {
            self.createItems();
        };
    };
};



'use strict';


var RewardPageUI = qc.defineBehaviour('qc.engine.RewardPageUI', qc.Behaviour, function() {

    var self = this;

    self.gameStatusChange = false;
    self.stage = [];
}, {
    TigerStickNode: qc.Serializer.NODE,

    RewardAreaNode: qc.Serializer.NODE,

    ShareNode: qc.Serializer.NODE,
    ShadowNode: qc.Serializer.NODE,

    ReplayBtnNode: qc.Serializer.NODE,
    RewardBtnNode: qc.Serializer.NODE,
});


RewardPageUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

        
    if (self.TigerStickNode) {
        self.tiger = self.TigerStickNode.getScript("qc.engine.GetRewardBtnUI");
        self.TigerStickNode.visible = true;
        //TODO: 设置完成回调函数 - 》显示抽奖
        self.tiger.init(function(){
            self.reward.onShow();
        });
    }

    if (self.RewardAreaNode) {
        self.reward = self.RewardAreaNode.getScript("qc.engine.ShowRewardUI");
        self.RewardAreaNode.visible = true;
        self.reward.init(function(){
            //设置完成回调函数 -》 显示遮罩，显示分享，显示奖品情况，显示按钮
            if (self.ShareNode) { self.ShareNode.visible = true; }
            if (self.ShadowNode) { self.ShadowNode.visible = true; }
            if (self.ReplayBtnNode) { self.ReplayBtnNode.visible = true; }
            if (self.RewardBtnNode) { self.RewardBtnNode.visible = true; }
        });
        
    }

    if (self.ShareNode) {
        self.ShareNode.visible = false;
    }

    if (self.ShadowNode) {
        self.ShadowNode.visible = false;
    }

    if (self.ReplayBtnNode) {
        self.ReplayBtnNode.visible = false;
    }

    if (self.RewardBtnNode) {
        self.RewardBtnNode.visible = false;
    }

};


RewardPageUI.prototype.update = function() {
    var self = this;
};

//显示抽奖
RewardPageUI.prototype.showReward = function(first_argument) {
    // body...
};
'use strict';


var ScoreUI = qc.defineBehaviour('qc.engine.ScoreUI', qc.Behaviour, function() {
}, {
});


ScoreUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    o.visible = false;
};


ScoreUI.prototype.update = function() {

};

ScoreUI.prototype.show = function(text) {
    var self = this,
        o = self.gameObject,
        tAlpha = self.getScript('qc.TweenAlpha'),
        tPosition = self.getScript('qc.TweenPosition');

    o.text = text;
    o.visible = true;
    //tAlpha.resetGroupToBeginning();

    //偏移到对象位置
    tPosition.from.x += o.x;
    tPosition.from.y += o.y;
    tPosition.to.x += o.x;
    tPosition.to.y += o.y;

    tAlpha.onFinished.addOnce(function() {
        // 隐藏掉
        o.visible = false;
        o.destroy();
    });

    tAlpha.playGroupForward();
};

ScoreUI.prototype.setPos = function(x,y) {
    var self = this,
        o = self.gameObject;
    o.x = x;
    o.y = y;
};

}).call(this, this, Object);
