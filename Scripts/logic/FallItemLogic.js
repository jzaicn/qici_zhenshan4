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

FallItemLogic.prototype.initObj = function(Obj) {
    var self = this;

    self.icon = Obj.icon;
    self.id = Obj.id;
    self.noRepeatRadius = Obj.noRepeatRadius;
    self.noOtherRadius = Obj.noOtherRadius;
    self.score = Obj.score;
};

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
