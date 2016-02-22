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