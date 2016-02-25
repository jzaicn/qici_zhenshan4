'use strict';


var CatcherUI = qc.defineBehaviour('qc.engine.CatcherUI', qc.Behaviour, function() {

    var self = this;

    self.moveing_area = {
        x: 0,
        y: 0,
        width: 640,
        height: 960,
    }

    self._mousepos = { x: 0, y: 0 };
    self.logicObj = null;

    //游戏对象转换为世界坐标
    self.pos = { 
        get x() {
            return this._x;
        },
        set x(v) {
            self.updateLogicX(v);
            this._x = v;
        },
        get y() {
            return this._y;
        },
        set y(v) {
            self.updateLogicY(v);
            this._y = v;
        },
        _x: 0,
        _y: 0,
    };
}, {
    CheckAreaNode: qc.Serializer.NODE,
    ImageNode: qc.Serializer.NODE,
    AreaNode: qc.Serializer.NODE,
    WorldNode: qc.Serializer.NODE,
});


CatcherUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    //获取鼠标移动的范围
    if (self.AreaNode) {
        self.Area = self.AreaNode.getScript("qc.engine.ObjectAreaUI");
        self.moveing_area = self.Area.currentBox();
        self.AreaNode.visable = false;
    }

    //获取名下检测区域
    var detectArea = {};
    if (self.CheckAreaNode) {
        self.CheckArea = self.CheckAreaNode.getScript("qc.engine.ObjectAreaUI");
        detectArea = self.CheckArea.currentBox();
        self.CheckAreaNode.visable = false;
        detectArea.x += o.x;
        detectArea.y += o.y;
    }
    
    //关联本对象和逻辑对象
    self.init(qc.CatchGame.catcher,detectArea);

};


CatcherUI.prototype.update = function() {

};

//绑定游戏实际逻辑对象
CatcherUI.prototype.init = function(logicObj,detectArea) {
    var self = this,
        o = self.gameObject;

    self.logicObj = logicObj;
    self.logicObj.x = o.x;
    self.logicObj.y = o.y;

    self.logicObj.detectArea = detectArea;

    self.logicObj.countBoxOffset();

};
//更新游戏实际逻辑对象位置
CatcherUI.prototype.updateLogicX = function(v){
    this.logicObj.x = v;
}
//更新游戏实际逻辑对象位置
CatcherUI.prototype.updateLogicY = function(v){
    this.logicObj.y = v;
}

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
    self._mousepos = o.getWorldPosition();
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
        self._mousepos.x += e.source.deltaX;
        self._mousepos.y += e.source.deltaY;

        //判断元素位置变化
        var item_pos = self.WorldNode.toLocal(self._mousepos);

        var p = o.getWorldPosition();


        //可移动区域仅限于父亲范围内,赋值
        if (window.inBox(self.moveing_area, item_pos)) {
            var lp = o.parent.toLocal(self._mousepos);
            this.pos.x = o.x = lp.x;
            this.pos.y = o.y = lp.y;
        } else if (window.inBox_x(self.moveing_area, item_pos)) {
            var lp_x = o.parent.toLocal(self._mousepos);
            var lp_y = o.parent.toLocal(p);
            this.pos.x = o.x = lp_x.x;
            this.pos.y = o.y = lp_y.y;
        } else if (window.inBox_y(self.moveing_area, item_pos)) {
            var lp_x = o.parent.toLocal(p);
            var lp_y = o.parent.toLocal(self._mousepos);
            this.pos.x = o.x = lp_x.x;
            this.pos.y = o.y = lp_y.y;
        } else {
            var lp_x = o.parent.toLocal(p);
            var lp_y = o.parent.toLocal(p);
            this.pos.x = o.x = lp_x.x;
            this.pos.y = o.y = lp_y.y;
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
