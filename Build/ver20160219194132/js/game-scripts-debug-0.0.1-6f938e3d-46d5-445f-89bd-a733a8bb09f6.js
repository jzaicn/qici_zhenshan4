/**
 * 用户自定义脚本.
 */
(function(window, Object, undefined) {

'use strict';
/**
 * 游戏入口
 */
window.CatchGame = qc.CatchGame = {

	// 所有的操作指令集合
    operation: {},
};

// 游戏逻辑初始化
qc.initGame = function(game) {

};
"use strict";

/**
 * 维护分数信息
 */
var CatcherLogic = qc.CatchGame.CatcherLogic = function() {
    var self = this;

    //定义坐标
    self._pos = {
        x: 0,
        y: 0,
    };

    //定义碰撞范围
    self.box = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    //用于计算坐标变化后
    self._offset = {
        x: 0,
        y: 0,
    };
};
CatcherLogic.prototype = {};
CatcherLogic.prototype.constructor = CatcherLogic;

Object.defineProperties(CatcherLogic.prototype, {
    pos_x: {
        get: function() { return this._pos.x; },
        set: function(v) {
            this._pos.x = v;
            updateBox();
        }
    },
    pos_y: {
        get: function() { return this._pos.y; },
        set: function(v) {
            this._pos.y = v;
            updateBox();
        }
    },
});

//计算当前偏差值，创建时一次即可
CatcherLogic.prototype.countBoxOffset = function() {
	self._offset.x = self._pos.x - self.box.x;
	self._offset.y = self._pos.y - self.box.y;
};

//更新box位置
CatcherLogic.prototype.updateBox = function() {
    self.box.x = self._pos.x - self._offset.x ;
	self.box.y = self._pos.y - self._offset.y ;
};





function inBox(box, pos) {
    if (inBox_x(box, pos)) {
        if (inBox_y(box, pos)) {
            return true;
        };
    };
    return false;
};

function inBox_x(box, pos) {
    if (box.x <= pos.x && pos.x <= (box.x + box.width)) {
        return true;
    };
    return false;
};

function inBox_y(box, pos) {
    if (box.y <= pos.y && pos.y <= (box.y + box.height)) {
        return true;
    };
    return false;
};


window.inBox = inBox;
window.inBox_x = inBox_x;
window.inBox_y = inBox_y;
'use strict';


var CatcherUI = qc.defineBehaviour('qc.engine.CatcherUI', qc.Behaviour, function() {

    var self = this;

    self.moveing_area = {
        x: 0,
        y: 0,
        width: 640,
        height: 960,
    }

    self._mousepos = {x:0,y:0};
}, {
    CheckAreaNode: qc.Serializer.NODE,
    ImageNode: qc.Serializer.NODE,
    MoveAreaNode: qc.Serializer.NODE,
});


CatcherUI.prototype.awake = function() {
	var self = this,
        o = self.gameObject;

	//self.moveing_area
   if (self.MoveAreaNode) {
    // var world_bound = qc.Bounds.getBox(self.MoveAreaNode, qc.Bounds.USE_BOUNDS, true, -1, o.game.world);

    // self.moveing_area.x = world_bound.x;
    // self.moveing_area.y = world_bound.y;
    // self.moveing_area.width = world_bound.width;
    // self.moveing_area.height = world_bound.height;
    self.moveing_area.x = self.MoveAreaNode.x;
    self.moveing_area.y = self.MoveAreaNode.y;
    self.moveing_area.width =self.MoveAreaNode.width;
    self.moveing_area.height = self.MoveAreaNode.height;
   };
    
};


CatcherUI.prototype.update = function() {

};

/**
 * 鼠标拖拽事件
 */
/**
 * 鼠标按下
 */
CatcherUI.prototype.onDown = function(e) {
    var self = this,
        o = self.gameObject;
    self._press = true;
    //self._mousepos = o.getWorldPosition();
    self._mousepos.x = o.x;
    self._mousepos.y = o.y;
    console.log("dragStart");
};

/**
 * 拖拽中
 */
CatcherUI.prototype.onDrag = function(e) {
    var self = this,
        o = self.gameObject;
    if (self._press) {
        //更新鼠标位置
        //var p = o.getWorldPosition();
        var p = {x:0,y:0};
        p.x = o.x;
        p.y = o.y;

        self._mousepos.x += e.source.deltaX;
        self._mousepos.y += e.source.deltaY;

        //可移动区域仅限于父亲范围内,赋值
        if (window.inBox(self.moveing_area, self._mousepos)) {
            //var lp = o.parent.toLocal(self._mousepos);
            var lp = self._mousepos;
            o.x = lp.x;
            o.y = lp.y;
            // this._pos.x = o.x = lp.x;
            // this._pos.y = o.y = lp.y;
        } else if (window.inBox_x(self.moveing_area, self._mousepos)) {
            // var lp_x = o.parent.toLocal(self._mousepos);
            // var lp_y = o.parent.toLocal(p);
            var lp_x = self._mousepos;
            var lp_y = p;
            o.x = lp_x.x;
            o.y = lp_y.y;
            // this._pos.x = o.x = lp_x.x;
            // this._pos.y = o.y = lp_y.y;
        } else if (window.inBox_y(self.moveing_area, self._mousepos)) {
            // var lp_x = o.parent.toLocal(p);
            // var lp_y = o.parent.toLocal(self._mousepos);
            var lp_x = p;
            var lp_y = self._mousepos;
            o.x = lp_x.x;
            o.y = lp_y.y;
            // this._pos.x = o.x = lp_x.x;
            // this._pos.y = o.y = lp_y.y;
        } else {
            // var lp_x = o.parent.toLocal(p);
            // var lp_y = o.parent.toLocal(p);
            var lp_x = p;
            var lp_y = p;
            o.x = lp_x.x;
            o.y = lp_y.y;
            // this._pos.x = o.x = lp_x.x;
            // this._pos.y = o.y = lp_y.y;
        };
    }
};

/**
 * 拖拽结束
 */
CatcherUI.prototype.onDragEnd = function(e) {
    var self = this,
        o = self.gameObject;
    self._press = false;

    console.log("dragEnd");
};


}).call(this, this, Object);
