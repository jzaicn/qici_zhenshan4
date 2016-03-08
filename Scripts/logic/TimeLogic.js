"use strict";

/**
 * 维护分数信息
 */
var TimeLogic = qc.CatchGame.TimeLogic = function() {
    var self = this;

};
TimeLogic.prototype = {};
TimeLogic.prototype.constructor = TimeLogic;

Object.defineProperties(TimeLogic.prototype, {
});

//设置UI对象
TimeLogic.prototype.init = function(uiObj) {
    this.uiObj = uiObj;
};

TimeLogic.prototype.setTime = function(time) {
    var self = this;

    //当前得分字符串
    var textTime = "time : " + qc.CatchGame.Time;
    self.uiObj.setWord(textTime);
};