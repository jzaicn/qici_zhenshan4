
/*****
**
****/
var config = {
    "width": 320,
    "height": 480,
    "backgroundColor": 0xFFFFFF,
    "begin_height" : -220,
    "end_height" : 500,
    "crash_radius" : 50,
    "game_win" : 49,
    "game_lose" : -4,
    "path" : "/static/getgeekfun_app/collect/img/",
}
var src = {

    "background": config.path + "bg.jpg",
    "catcher": {
        "id": "catcher",
        "src": config.path + "basket.png",
        "x": config.width / 2 - 40,
        "y": config.height -120,
    },
    //下落物品ID，下落物品图片文件路径
    //每项只管自己的概率选项概率区间，前面项目概率和满1不进入后面概率中，
    "falls": [{
        "id": "rice",
        "src": config.path + "rice2.png",
        "chance": 0.2,
        "score":1,
    }, {
        "id": "rice2",
        "src": config.path + "rice1.png",
        "chance": 0.1,
        "score":3,
    },{
        "id": "package",
        "src": config.path + "bunny.png",
        "chance": 0.01,
        "score":8,
    }, {
        "id": "bad",
        "src": config.path + "bad.png",
        "chance": 1,
        "score":-1,
    }, ],
};
var game_time_style = {
    font : 'bold italic 46px Arial',
    fill : '#F7EDCA',   //字体中间色
    stroke : '#4a1850', //字体包边色
    strokeThickness : 10,
    dropShadow : true,
    dropShadowColor : '#000000',
    dropShadowAngle : Math.PI / 6,
    dropShadowDistance : 6,
    wordWrap : true,
    wordWrapWidth : 440
};
var game_ready_style = {
    font : 'bold italic 100px Arial',
    fill : '#F7EDCA',   //字体中间色
    stroke : '#4a1850', //字体包边色
    strokeThickness : 10,
    dropShadow : true,
    dropShadowColor : '#000000',
    dropShadowAngle : Math.PI / 6,
    dropShadowDistance : 6,
    wordWrap : true,
    wordWrapWidth : 440
};
var game_score_style = {
    font : 'bold italic 46px Arial',
    fill : '#F7EDCA',   //字体中间色
    stroke : '#4a1850', //字体包边色
    strokeThickness : 10,
    dropShadow : true,
    dropShadowColor : '#000000',
    dropShadowAngle : Math.PI / 6,
    dropShadowDistance : 6,
    wordWrap : true,
    wordWrapWidth : 440
};