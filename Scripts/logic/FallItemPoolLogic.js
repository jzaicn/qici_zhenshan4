"use strict";

/**
 * 维护分数信息
 */
var FallItemPoolLogic = qc.CatchGame.FallItemPoolLogic = function() {
    var self = this;

    self.currentPool = [];
    self.preparePool = [];
};
FallItemPoolLogic.prototype = {};
FallItemPoolLogic.prototype.constructor = FallItemPoolLogic;

Object.defineProperties(FallItemPoolLogic.prototype, {

});

//所有池中的对象全部偏移指定的数值
FallItemPoolLogic.prototype.updatePoolObject = function(pos_diff) {
    var self = this;

    for (var i = 0; i < self.currentPool.length; i++) {
        self.currentPool[i].x += pos_diff.x;
        self.currentPool[i].y += pos_diff.y;
    };

    for (var i = 0; i < self.preparePool.length; i++) {
        self.preparePool[i].x += pos_diff.x;
        self.preparePool[i].y += pos_diff.y;
    };
};

//查找对象
FallItemPoolLogic.prototype.updatePoolObject = function(pos_diff) {
    //TODO: 用于查找掉落得差不多的元素取出来放到另一个池里
};





