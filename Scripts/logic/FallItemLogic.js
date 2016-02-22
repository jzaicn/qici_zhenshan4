"use strict";

/**
 * 维护分数信息
 */
var FallItemLogic = qc.CatchGame.FallItemLogic = function() {
    var self = this;

    self.icon = "";
    self.id = "";
    self._x = 0;
    self._y = 0;
    self.noRepeatRadius = 0;
    self.noOtherRadius = 0;
    self.score = 0;
    self.o = null;
};
FallItemLogic.prototype = {};
FallItemLogic.prototype.constructor = FallItemLogic;

//更新自己坐标同时，同步到外部元素
Object.defineProperties(FallItemLogic.prototype, {
    x: {
        get: function() {
            return this._x;
        },
        set: function(v) {
            this._x = v;
            if (this.o) {
                this.o.x = v;
            };
        }
    },
    y: {
        get: function(){
            return this._y;
        },
        set: function(v){
            this._y = v;
            if (this.o) {
                this.o.y = v;
            };
        }
    }
});

//初始化
FallItemLogic.prototype.init = function(id,icon,x,y,noRepeatRadius,noOtherRadius,score) {
    var self = this;

    self.icon = icon;
    self.id = id;
    self.x = x;
    self.y = y;
    self.noRepeatRadius = noRepeatRadius;
    self.noOtherRadius = noOtherRadius;
    self.score = score;
};

//初始化
FallItemLogic.prototype.initObj = function(Obj) {
    var self = this;

    self.icon = Obj.icon;
    self.id = Obj.id;
    self.noRepeatRadius = Obj.noRepeatRadius;
    self.noOtherRadius = Obj.noOtherRadius;
    self.score = Obj.score;
};

//克隆自身
FallItemLogic.prototype.clone = function() {
    var self = this;
    var obj = new FallItemLogic();

    obj.icon = self.icon;
    obj.id = self.id;
    obj.x = self.x;
    obj.y = self.y;
    obj.noRepeatRadius = self.noRepeatRadius;
    obj.noOtherRadius = self.noOtherRadius;
    obj.score = self.score;

    return obj;
};

//对象用于分派的信息
FallItemLogic.prototype.getInfo = function(status) {
    var self = this;//TODO: 被销毁后返回的内容，用于设置到对话框
    var info = {
        eventType : 1,
        score : self.score,
    };
    return info;
};

//碰撞返回信息
FallItemLogic.prototype.getCrashInfo = function(status) {
    // var self = this;//TODO: 被销毁后返回的内容，用于设置到对话框
    // var info = {
    //     score : self.score,
    // };
    // console.log('item getInfo');
    // return info;
};

//跌落返回信息
FallItemLogic.prototype.getFallInfo = function(status) {
    // var self = this;//TODO: 被销毁后返回的内容，用于设置到对话框
    // var info = {
    //     score : self.score,
    // };
    // console.log('item getInfo');
    // return info;
};

//如果是某种表情则替换
FallItemLogic.prototype.onChangeEvent = function() {
    var self = this;
    if (self.icon == "7.png" || self.icon == "8.png") {
        self.o.frame = "9.png";
        self.timer = setTimeout(function(){
            clearTimeout(self.timer);
            self.o.frame = self.icon;
        }, 1000);
    };
};