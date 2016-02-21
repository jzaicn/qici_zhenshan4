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

//更新detectArea位置
CatcherLogic.prototype.updateBoxX = function() {
    var self = this;
    self.detectArea.x = self.x - self._countOffset.x ;
};
//更新detectArea位置
CatcherLogic.prototype.updateBoxY = function() {
    var self = this;
    self.detectArea.y = self.y - self._countOffset.y ;
};