"use strict";

/**
 * 维护分数信息
 */
var CatcherModel = qc.CatchGame.CatcherModel = function() {
    var self = this;

    self._x = 0;
    self._y = 0;
    self._detectArea = {x:0,y:0,width:0,height:0};
    self._countOffset = {x:0,y:0};
};
CatcherModel.prototype = {
    set x(v){
        this._x = v;
    },
    get x(){
        return this._x;
    },

    set y(v){
        this._y = v;
    },
    get y(){
        return this._y;
    },

    set DetectArea(v){
        this._detectArea.x = v.x;
        this._detectArea.y = v.y;
        this._detectArea.width = v.width;
        this._detectArea.height = v.height;
    },
    get DetectArea(){
        return this._detectArea;
    },
};
CatcherModel.prototype.constructor = CatcherModel;

Object.defineProperties(CatcherModel.prototype, {
});

//计算当前偏差值，创建时一次即可
CatcherModel.prototype.countBoxOffset = function() {
    var self = this;
	self._countOffset.x = self.x - self.detectArea.x;
	self._countOffset.y = self.y - self.detectArea.y;
};

//更新detectArea位置
CatcherModel.prototype.updateBox = function() {
    var self = this;
    self.detectArea.x = self.x - self._countOffset.x ;
	self.detectArea.y = self.y - self._countOffset.y ;
};

CatcherModel.prototype.getDetectBox = function() {
    var self = this;
    self.updateBox();

    return self.detectArea;
};