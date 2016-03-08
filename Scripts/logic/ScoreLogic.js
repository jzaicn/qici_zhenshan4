"use strict";

/**
 * 维护分数信息
 */
var ScoreLogic = qc.CatchGame.ScoreLogic = function() {
    var self = this;

};
ScoreLogic.prototype = {};
ScoreLogic.prototype.constructor = ScoreLogic;

Object.defineProperties(ScoreLogic.prototype, {
});

//设置UI对象
ScoreLogic.prototype.init = function(uiObj) {
    this.uiObj = uiObj;
};

ScoreLogic.prototype.setScore = function(score) {
    var self = this;

    //当前得分字符串
    var textScore = "score : " + qc.CatchGame.Score;
    self.uiObj.setWord(textScore);
};