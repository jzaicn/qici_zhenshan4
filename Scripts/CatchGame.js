'use strict';
/**
 * 游戏入口
 */
window.CatchGame = qc.CatchGame = {

    FALL_SPEED : 2,

    SEA_LEVEL : 1000,

    DATA_SOURCE : [
        { id: 3, icon: "3.png", score: 10, noRepeatRadius: 500, noOtherRadius: 100 },
        { id: 0, icon: "0.png", score: 10, noRepeatRadius: 300, noOtherRadius: 100 },
        { id: 1, icon: "1.png", score: 10, noRepeatRadius: 180, noOtherRadius: 100 },
        { id: 2, icon: "2.png", score: 10, noRepeatRadius: 180, noOtherRadius: 100 },
    ],

    status : "stop",

    // 所有的操作指令集合
    operation: {},
};

// 游戏逻辑初始化
qc.initGame = function(game) {

    // 初始化捕获者
    CatchGame.catcher = new qc.CatchGame.CatcherLogic();

    // 初始化下落物工厂
    CatchGame.fallitemFactory = new qc.CatchGame.FallItemFactory();

    // 初始化下落物
    CatchGame.fallitemPool = new qc.CatchGame.FallItemPoolLogic();

    //初始化提示语言

};

qc.CatchGame.restart = function(){
    var self = this;
    // 初始化捕获者
    self.status = "run";

    // 初始化下落物

    //初始化提示语言
}

qc.CatchGame.updateScore = function(v){
    //更新分数
};

qc.CatchGame.isCrash = function(pos,crashBox){
    return false;
}


qc.CatchGame.bandUIObj  = function(uiObj){
    this.uiObj = uiObj;
}

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