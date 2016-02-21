'use strict';
/**
 * 游戏入口
 */
window.CatchGame = qc.CatchGame = {

	FALL_SPEED : 2,

	DATA_SOURCE : [
        { id: 3, icon: "3.png", score: 10, noRepeatRadius: 500, noOtherRadius: 100 },
        { id: 0, icon: "0.png", score: 10, noRepeatRadius: 300, noOtherRadius: 100 },
        { id: 1, icon: "1.png", score: 10, noRepeatRadius: 180, noOtherRadius: 100 },
        { id: 2, icon: "2.png", score: 10, noRepeatRadius: 180, noOtherRadius: 100 },
    ],

	// 所有的操作指令集合
    operation: {},
};

// 游戏逻辑初始化
qc.initGame = function(game) {

	// 初始化分数信息
    CatchGame.catcher = new qc.CatchGame.CatcherLogic();
};