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
    var bigPool = self.randLinePoolWithArea(area,pool);

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
///  功能函数

//按设计关卡取出物品
FallItemFactory.prototype.randLinePoolWithArea = function(area,pool) {
    var self = this;
    var bigPool = [];

    var maxLength = 15;
    var currLength = pool.length + bigPool.length
    if (currLength < maxLength) {
        //随意创建一个ID索引
        var everyElement = qc_game.math.getRandom(self.data);
        //随意创建一个位置
        everyElement.x= Math.random() * area.width + area.x;
        everyElement.y= Math.random() * area.height + area.y;

        bigPool.push(everyElement.clone());
    };
    return bigPool;
};




///////////////////////////////////////////////////////////////////
///  x 功能函数



//TODO: 最终要得到下落过程中每一段随机出现一个认证标记
//认证标记不需要固定顺序
//认证标记出现区间不重合

//传入时间轴节点，转换为具体空间坐标
FallItemFactory.prototype.getAreaFromTimePoint = function(createArea , timePos) {
    var timePos = {
        begin : 5,
        end: 10,
    };
    var speed = qc.CatchGame.Speed;
    var rarea = {
        x : createArea.x,
        width : createArea.width,
        y : timePos.end * speed * -1,
        height : (timePos.end - timePos.begin) * speed * -1,
    };
    return rarea;
};

//在Area中取出一个点
FallItemFactory.prototype.pickupInArea = function(area) {
    var pos = {
        x: Math.random() * area.width + area.x,
        y: Math.random() * area.height + area.y,
    };
    return pos;
};

FallItemFactory.prototype.getID = function(first_argument) {
    // body...
};

FallItemFactory.prototype.loadValuableItem = function(area,pool) {
    var self = this;
    var timeSpace = [
        { range : [0,10], insert : [ ["",3], ] },     //10
        { range : [10,25], insert : [ ["",1], ] },    //25
        { range : [25,50], insert : [ ["",1], ] },    //25
        { range : [50,75], insert : [ ["",1], ] },    //25
        { range : [75,100], insert : [ ["",1], ] },   //25
        { range : [100,110], insert : [ ] },   //10
    ];
    var valuePool = [];

    for (var i = 0; i < timeSpace.length; i++) {
        var area = self.getAreaFromTimePoint()

        
    };

    return valuePool;
};