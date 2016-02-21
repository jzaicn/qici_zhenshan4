"use strict";

/**
 * 维护分数信息
 */
var FallItemPoolLogic = qc.CatchGame.FallItemPoolLogic = function() {
    var self = this;

    self.currentPool = [];
    self.createArea = {
        x:0,
        y:-950,
        width:640,
        height:960,
    };
    self.fallingArea = {
        x:0,
        y:-10,
        width:640,
        height:1000,
    };
    self.addUpLine = self.createArea.y + self.createArea.height;
    self.fallOutLine = self.fallingArea.y + self.fallingArea.height;
    
};
FallItemPoolLogic.prototype = {};
FallItemPoolLogic.prototype.constructor = FallItemPoolLogic;

Object.defineProperties(FallItemPoolLogic.prototype, {

});

//从新计算线段
FallItemPoolLogic.prototype.recountLine = function() {
    var self = this;

    self.addUpLine = self.createArea.y + self.createArea.height;
    self.fallOutLine = self.fallingArea.y + self.fallingArea.height;
};

//所有池中的对象全部偏移指定的数值
FallItemPoolLogic.prototype.updateAllPoolObject = function(pos_diff) {
    var self = this;

    //处理位置偏移
    var pos_add = function(operaPool,index,value){
        value.x += pos_diff.x;
        value.y += pos_diff.y;
    };
    doPoolObject(self.currentPool,pos_add);
};


//返回超出掉出线的物品index数组
FallItemPoolLogic.prototype.checkFalloutPoolObject = function() {
    var self = this;
    var indexgroup = [];

    //处理位置偏移
    var check_fallout = function(operaPool,index,value){
        if (value.y > self.fallOutLine) {
            indexgroup.push(index);
        };
    };
    doPoolObject(self.currentPool,check_fallout);

    return indexgroup;
};

//返回发生碰撞的物品index数组
FallItemPoolLogic.prototype.checkCrashPoolObject = function(crashBox) {
    var self = this;
    var indexgroup = [];

    //处理位置偏移
    var check_crash = function(operaPool,index,value){
        if (qc.CatchGame.isCrash({x:value.x,y:value.y},crashBox)) {
            indexgroup.push(index);
        };
    };
    doPoolObject(self.currentPool,check_crash);

    return indexgroup;
};

//增加元素
FallItemPoolLogic.prototype.additem = function(item) {
    var self = this;
    
    self.currentPool.push(item);
};

//增加元素数组
FallItemPoolLogic.prototype.additems = function(items) {
    var self = this;
    
    for (var i = 0; i < items.length; i++) {
        self.currentPool.push(items[i]);
    };
    
};

//删除元素
FallItemPoolLogic.prototype.delItem = function(item) {
    var self = this;
    
    self.currentPool.remove(item);
};

//删除元素数组
FallItemPoolLogic.prototype.delItem = function(items) {
    var self = this;
    
    for (var i = 0; i < items.length; i++) {
        self.currentPool.remove(items[i]);
    };
    
};

//删除元素index
FallItemPoolLogic.prototype.delItemIndex = function(index) {
    var self = this;
    var indexGroup = [index];
    arrayDelIndexGroup(indexgroup,self.currentPool);
};

//删除元素index数组
FallItemPoolLogic.prototype.delItemIndexArr = function(indexgroup) {
    var self = this;
    
    arrayDelIndexGroup(indexgroup,self.currentPool);
};




