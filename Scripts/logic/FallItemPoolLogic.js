"use strict";


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






//////////////////////////////////////////////////////////////////////////////////////////////
//    读取操作

//返回自身
FallItemPoolLogic.prototype.getPool = function() {
    return this.currentPool;
};

//一屏一屏刷
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

//////////////////////////////////////////////////////////////////////////////////////////////
//    基本操作

FallItemPoolLogic.prototype.addItemHook = function(item) {
    // body...
};

FallItemPoolLogic.prototype.eachItemHook = function(item) {
    
};

//增加元素
FallItemPoolLogic.prototype.additem = function(item) {
    var self = this;
    
    self.addItemHook(item);
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


//////////////////////////////////////////////////////////////////////////////////////////////
//    子元素处理

FallItemPoolLogic.prototype.clearAll = function() {
    var self = this;
    var indexgroup = [];

    //处理位置偏移
    var check_fallout = function(operaPool,index,value){
        if (true) {
            var effect = value.o.getScript("qc.engine.FallItemUI");
            effect.onFallout();
            indexgroup.push(index);
        };
    };
    doPoolObject(self.currentPool,check_fallout);
    self.delItemIndexArr(indexgroup);
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
            // value.selfDispatch(qc.CatchGame.itemSignal);
            qc.CatchGame.itemSignal.dispatch({
                eventType : "fallout",
                obj : value,
            });
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
            effect.setScore(value.score);
            effect.onCrash();
            //下落元素删除准备
            indexgroup.push(index);
            //下落元素触碰后事件派发
            // value.selfDispatch(qc.CatchGame.itemSignal);
            qc.CatchGame.itemSignal.dispatch({
                eventType : "crash",
                score : value.score,
                obj : value,
            });
            qc.CatchGame.itemSignal.dispatch(value.getInfo());
        };
    };
    doPoolObject(self.currentPool,check_crash);
    self.delItemIndexArr(indexgroup);
};


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////  
////  游戏逻辑控制部分
////

//下落中的大米变微笑两秒
FallItemPoolLogic.prototype.riceFaceSmile = function() {
    var self = this;

    //处理位置偏移
    var riceFaceChange = function(operaPool,index,value){
        if (value.id === "rice") {
            value.onChangeToDuring("7.png");
        }
    };
    doPoolObject(self.currentPool,riceFaceChange);
};

FallItemPoolLogic.prototype.riceFaceCry = function() {
    this.setItemFaceTimeout("rice","9.png","8.png" , 2000);
};

//公共函数设置图标变化
FallItemPoolLogic.prototype.setItemFace = function(targetID , setIcon) {
    var self = this;

    //设置图标
    var riceFaceChange = function(operaPool,index,value){
        if (value.id === targetID) {
            value.onChangeToDuring(setIcon);
        }
    };
    doPoolObject(self.currentPool,riceFaceChange);
    //var old_addItemHook = self.addItemHook;
    self.addItemHook = function(item){
        if (item.id === targetID) {
            item.onChangeToDuring(setIcon);
        }
    };
};

//公共函数设置图标变化
FallItemPoolLogic.prototype.setItemFaceTimeout = function(targetID , setIcon , revertIcon , timeout) {
    var self = this;

    self.setItemFace(targetID,setIcon);

    if (self.timer) {
        clearTimeout(self.timer);
    }

    self.timer = setTimeout(function(){
        self.setItemFace(targetID,revertIcon);
        self.addItemHook = function(item){};
    }, timeout);
};