'use strict';
/**
 * 游戏入口
 */
window.CatchGame = qc.CatchGame = {

    FALL_SPEED : 4,

    RAISE_LEVEL : -20,
    SEA_LEVEL : 980,
    SPEAK_BOX_MIX_WIDTH : 600,
    DEFAULT_PAGE: "welcome",

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


    _status : "",
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

//物品碰撞事件
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
    //this.Status = "playing";
    
    //初始化提示语言
    // 初始化下落物

};

//重新开始游戏
qc.CatchGame.reStart = function(){
    //TODO: 重新开始游戏
};











//游戏参数加载
//
//游戏参数获取
//
//游戏操作-欢迎
qc.CatchGame.gameWelcome = function(){

};

//游戏操作-介绍
qc.CatchGame.gameIntroduce = function(){

};

//游戏操作-游戏开始
qc.CatchGame.gameStart = function(){

};

//游戏操作-游戏结束
qc.CatchGame.gameOver = function(){
    CatchGame.fallitemPool.clear();
};
















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


////////////////////////////////////////////////
//
//  reward page 抽奖页面
//  页面切换通过```qc.CatchGame.Status = "reward";```切换
//

//获取当前奖品的地址（用于转跳）
qc.CatchGame.getCurrentRewardURL = function(){
    //TODO: 根据奖励等级切换这个
    return "http://getgeektest.applinzi.com/";
};

//获取当前奖品的图片名称
qc.CatchGame.getCurrentRewardPng = function(){
    //TODO: 根据奖励等级切换这个
    return "jiang4.png";
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