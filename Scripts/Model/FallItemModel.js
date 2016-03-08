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
    self._size = 0;
    self._collision = 0;
};
FallItemModel.prototype = {};
FallItemModel.prototype.constructor = FallItemModel;

//更新自己坐标同时，同步到外部元素
Object.defineProperties(FallItemModel.prototype, {
    icon: {
        get: function(){
            return this._icon;
        },
        set: function(v){
            this._icon = v;
        }
    },
    x: {
        get: function() {
            return this._x;
        },
        set: function(v) {
            this._x = v;
        }
    },
    y: {
        get: function(){
            return this._y;
        },
        set: function(v){
            this._y = v;
        }
    },
    type: {
        get: function(){
            return this._type;
        },
        set: function(v){
            this._type = v;
        }
    },
    speed: {
        get: function(){
            return this._speed;
        },
        set: function(v){
            this._speed = v;
        }
    },
    size: {
        get: function(){
            return this._size;
        },
        set: function(v){
            this._size = v;
        }
    },
    collision: {
        get: function(){
            return this._collision;
        },
        set: function(v){
            this._collision = v;
        }
    },
});

//克隆自身
FallItemModel.prototype.clone = function() {
    var self = this;
    var obj = new FallItemModel();

    self._icon =objf._icon ;
    self._x =obj._x;
    self._y =obj._y;
    self._type =objf._type ;
    self._speed =obj._speed;
    self._size =obj._size;
    self._collision =obj._collision;

    return obj;
};

FallItemModel.prototype.loadSetting = function() {
    // 从数据源加载构造参数
};