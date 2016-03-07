"use strict";

/**
 * 维护分数信息
 */
var FallItemModel = qc.CatchGame.FallItemModel = function() {
    var self = this;

    self._icon = "";
    self._x = 0;
    self._y = 0;
    self._type = "";
    self._speed = 0;








    self._icon = "";
    self.id = "";
    self._x = 0;
    self._y = 0;
    self.noRepeatRadius = 0;
    self.noOtherRadius = 0;
    self.score = 0;
    self.o = null;
};
FallItemModel.prototype = {};
FallItemModel.prototype.constructor = FallItemModel;

//更新自己坐标同时，同步到外部元素
Object.defineProperties(FallItemModel.prototype, {
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
FallItemModel.prototype.init = function(id,_icon,x,y,noRepeatRadius,noOtherRadius,score) {
    var self = this;

    self._icon = _icon;
    self.id = id;
    self.x = x;
    self.y = y;
    self.noRepeatRadius = noRepeatRadius;
    self.noOtherRadius = noOtherRadius;
    self.score = score;
};

//初始化
FallItemModel.prototype.initObj = function(Obj) {
    var self = this;

    self._icon = Obj._icon;
    self.id = Obj.id;
    self.noRepeatRadius = Obj.noRepeatRadius;
    self.noOtherRadius = Obj.noOtherRadius;
    self.score = Obj.score;
};

//克隆自身
FallItemModel.prototype.clone = function() {
    var self = this;
    var obj = new FallItemModel();

    obj._icon = self._icon;
    obj.id = self.id;
    obj.x = self.x;
    obj.y = self.y;
    obj.noRepeatRadius = self.noRepeatRadius;
    obj.noOtherRadius = self.noOtherRadius;
    obj.score = self.score;

    return obj;
};

//对象用于分派的信息
FallItemModel.prototype.getInfo = function(status) {
    var self = this;//TODO: 被销毁后返回的内容，用于设置到对话框
    var info = {
        eventType : 1,
        score : self.score,
    };
    return info;
};


//如果是某种表情则替换
FallItemModel.prototype.onChangeEvent = function() {
    var self = this;
    if (self._icon == "7.png" || self._icon == "8.png") {
        self.o.frame = "9.png";
        self.timer = setTimeout(function(){
            clearTimeout(self.timer);
            self.o.frame = self._icon;
        }, 1000);
    };
};