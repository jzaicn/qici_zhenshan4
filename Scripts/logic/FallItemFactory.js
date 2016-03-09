"use strict";

/**
 * 维护分数信息
 */
var FallItemFactory = qc.CatchGame.FallItemFactory = function() {
    var self = this;

    self.factorydata = qc.CatchGame.DATA_SOURCE;

    self.data = [];
    for (var i = 0; i < self.factorydata.length; i++) {
        var item = new qc.CatchGame.FallItemLogic();
        item.initObj(self.factorydata[i]);
        self.data.push(item);
    };


    self.tryUpTimes = 5;
    self._chapter = 0;

};
FallItemFactory.prototype = {};
FallItemFactory.prototype.constructor = FallItemFactory;

Object.defineProperties(FallItemFactory.prototype, {

});

//填充区域
FallItemFactory.prototype.fillPoolWithArea = function(area,pool) {
    var self = this;

    //这里可以更改方法
    var bigPool = self.randomPoolWithArea(area,pool);

    //先排序，方便后续使用
    bigPool.sort(function(a, b) {
        if (a.y>=b.y) { return 1; }
        else if (a.x>=b.x) { return 1; }
        else { return -1; };
    });

    return bigPool;
};
///////////////////////////////////////////////////////////////////
///  功能函数

//填充区域
FallItemFactory.prototype.randomPoolWithArea = function(area,pool) {
    var self = this;
    var bigPool = [];

    //每个对象循环放置
    for (var i = 0; i < self.data.length; i++) {
        var everyElement = self.data[i];

        //以当前池已经拥有的对象和新建的对象为基础，创建新的元素
        var newItems = self.fillUP(everyElement,area,bigPool.concat(pool))

        //所有新增加的元素都应该放置在这，以备后续添加
        bigPool = bigPool.concat(newItems);
    };
    return bigPool;
};

//使用一个元素填充，直到5次填充失败，则这个元素填充完成
FallItemFactory.prototype.fillUP = function(everyElement,area,bigPool) {
    var self = this;
    var trytime = self.tryUpTimes;
    var pool = [];

    while (true) {
        //随机位置
        var pos_random = {
            x: Math.random() * area.width + area.x,
            y: Math.random() * area.height + area.y,
        };

        //该位置没有元素，或者没有同ID元素
        if (self.putCheck(everyElement.id, pos_random , pool.concat(bigPool))) {
            //放置成功,退出循环
            everyElement.x=pos_random.x;
            everyElement.y=pos_random.y;
            pool.push(everyElement.clone());
        } else {
            trytime--;
            if (trytime < 0) {
                break;
            };
        };
    };
    return pool;
};

//改点是否能放下检测
FallItemFactory.prototype.putCheck = function(id, pos ,pool) {
    var self = this;

    //循环对象池是否有不符合规则的地方
    for (var i = 0; i < pool.length; i++) {
        var poolItem = pool[i];
        //ID相等，重复区域内不得放置
        if (poolItem.id == id && checkPointInRadius({x:poolItem.x,y:poolItem.y,}, poolItem.noRepeatRadius, pos)) {
            return false;
        }
        //ID不相等，排他区域内不得放置
        if (checkPointInRadius({x:poolItem.x,y:poolItem.y,}, poolItem.noOtherRadius, pos)) {
            return false;
        };
    };
    return true;
};

///////////////////////////////////////////////////////////////////
///  x 功能函数

//按设计关卡取出物品
FallItemFactory.prototype.chapterPoolWithArea = function(area,pool) {
    var self = this;
    var itemPools = [
        [[320,0],[320,-100],[320,-200],[320,-300],[320,-400],[320,-500],[320,-600],[320,-700],[320,-800],[320,-900],[320,-1000]],
    ];
    var thisPool = itemPools[this._chapter];
    var pools = [];


    this._chapter = (this._chapter ++ )% itemPools.length;


    for (var i = 0; i < thisPool.length; i++) {
        var everyElement = self.data[0];

        everyElement.x = thisPool[i][0];
        everyElement.y = thisPool[i][1];

        pools.push(everyElement.clone());
    };
    
    return pools;
};


///////////////////////////////////////////////////////////////////
///  功能函数

//按设计关卡取出物品
FallItemFactory.prototype.randLinePoolWithArea = function(area,pool) {
    var self = this;
    var bigPool = [];

    var maxLength = 6;
    var currLength = pool.length + bigPool.length
    if (currLength < maxLength) {
        //随意创建一个ID索引
        var everyElement = qc_game.math.getRandom(self.data);
        //随意创建一个位置
        everyElement.x= Math.random() * area.width + area.x;
        everyElement.y= 1 * area.height + area.y;

        bigPool.push(everyElement.clone());
    };
    return bigPool;
};
