'use strict';
/**
 * 游戏入口
 */
window.CatchGame = qc.CatchGame = {

    FALL_SPEED : 4,

    RAISE_LEVEL : -20,
    SEA_LEVEL : 980,
    SPEAK_BOX_MIX_WIDTH : 600,

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

    status : "run",

    // 所有的操作指令集合
    operation: {},
};

// 游戏逻辑初始化
qc.initGame = function(game) {

    // 全局通知事件
    CatchGame.itemSignal = new qc.Signal();

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
};


qc.CatchGame.onItemSignal = function(obj){
    //碰撞结果事件：碰撞加减分，碰撞提示语，碰撞特殊信息，碰撞游戏结束
    switch(obj.eventType){
        case 1:
            qc.CatchGame.speaker.setScore(obj);
        default:
            break;
    }
};

qc.CatchGame.restart = function(){
    var self = this;
    // 初始化捕获者
    self.status = "run";

    // 初始化下落物

    //初始化提示语言
}


//绑定对象到
qc.CatchGame.bandUIObj  = function(uiObj){
    this.uiObj = uiObj;
}

//游戏是否在运行
qc.CatchGame.isRunning = function(){
    var self = this;
    switch(self.status){
        case "run":
            return true;
            break;
        case "stop":
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