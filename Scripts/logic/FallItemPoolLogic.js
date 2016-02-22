"use strict";

/**
 * 维护分数信息
 */
var FallItemPoolLogic = qc.CatchGame.FallItemPoolLogic = function() {
    var self = this;

    self.currentPool = [];

    self.raiseLine = qc.CatchGame.RAISE_LEVEL;
    self.fallOutLine = qc.CatchGame.SEA_LEVEL;
    
};
FallItemPoolLogic.prototype = {};
FallItemPoolLogic.prototype.constructor = FallItemPoolLogic;

Object.defineProperties(FallItemPoolLogic.prototype, {

});

FallItemPoolLogic.prototype.init = function(uiObj) {
    this.uiObj = uiObj;
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
            var effect = value.o.getScript("qc.engine.FallItemUI");
            effect.onFallout();
            indexgroup.push(index);
            //下落元素跌出屏幕后事件派发
            qc.CatchGame.itemSignal.dispatch(value.getInfo());
        };
    };
    doPoolObject(self.currentPool,check_fallout);
    self.delItemIndexArr(indexgroup);
};

//返回发生碰撞的物品index数组
FallItemPoolLogic.prototype.checkCrashPoolObject = function() {
    var self = this;
    var indexgroup = [];

    //处理位置偏移
    var check_crash = function(operaPool,index,value){
        if (qc.CatchGame.isCrash({x:value.x,y:value.y})) {
            //下落元素显示效果
            var effect = value.o.getScript("qc.engine.FallItemUI");
            effect.score = value.score;
            effect.onCrash();
            //下落元素删除准备
            indexgroup.push(index);
            //下落元素触碰后事件派发
            qc.CatchGame.itemSignal.dispatch(value.getInfo());
        };
    };
    doPoolObject(self.currentPool,check_crash);
    self.delItemIndexArr(indexgroup);
};

//增加元素
FallItemPoolLogic.prototype.additem = function(item) {
    var self = this;
    
    self.currentPool.push(item);

    self.uiObj.additem(item);
};

//增加元素数组
FallItemPoolLogic.prototype.additems = function(items) {
    var self = this;
    
    for (var i = 0; i < items.length; i++) {
        self.currentPool.push(items[i]);
        self.uiObj.additem(item);
    };
    
};

//删除元素
FallItemPoolLogic.prototype.delItem = function(item) {
    var self = this;
    
    self.currentPool.remove(item);//TODO: 更改ui部分
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

//返回自身
FallItemPoolLogic.prototype.getPool = function() {
    return this.currentPool;
};

//检测是否最后一个元素已经跌过出生线了，是的话返回真
//根据这个判断是不是需要增加新元素
FallItemPoolLogic.prototype.isPoolNeedNew = function() {
    var self = this;
    if (self.currentPool.length > 0) {
        if (self.currentPool[self.currentPool.length -1].y > self.raiseLine) {
            return true;
        };
    }
    else{
        return true;
    };
    return false;
};
