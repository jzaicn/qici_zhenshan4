"use strict";

/**
 * 维护分数信息
 */
var SpeakerLogic = qc.CatchGame.SpeakerLogic = function() {
    var self = this;

};
SpeakerLogic.prototype = {};
SpeakerLogic.prototype.constructor = SpeakerLogic;

Object.defineProperties(SpeakerLogic.prototype, {
});

//设置UI对象
SpeakerLogic.prototype.init = function(uiObj) {
    this.uiObj = uiObj;
};

SpeakerLogic.prototype.setScore = function(score) {
    var self = this;

    //当前得分字符串
    var textScore = "Score : " + qc.CatchGame.Score;
    self.uiObj.setWord(textScore);
};