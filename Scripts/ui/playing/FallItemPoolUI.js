'use strict';


var FallItemPoolUI = qc.defineBehaviour('qc.engine.FallItemPoolUI', qc.Behaviour, function() {

    var self = this;

    self.fallSpeed = qc.CatchGame.FALL_SPEED;
}, {
    FallItemPrefab: qc.Serializer.PREFAB,
});


FallItemPoolUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;


    qc.CatchGame.fallitemPool.init(self);
};


// FallItemPoolUI.prototype.update = function() {
// };

//外部传入fallmodel，这里创建图形，同时在逻辑对象创建匹配的对象
FallItemPoolUI.prototype.additem = function(datainfo) {
    var self = this,
        o = self.gameObject;

    //添加UI对象
    var fallitem = self.game.add.clone(self.FallItemPrefab, o);
    fallitem.frame = datainfo.icon;
    fallitem.x = datainfo.x;
    fallitem.y = datainfo.y;
    fallitem.visable = true;

    datainfo.o = fallitem;
};

FallItemPoolUI.prototype.fallAll = function() {
    var self = this;
    qc.CatchGame.fallitemPool.updateAllPoolObject({
        x:0,
        y:self.fallSpeed,
    });
};

FallItemPoolUI.prototype.fallOut = function() {
    var self = this;
    qc.CatchGame.fallitemPool.checkFalloutPoolObject();
};

FallItemPoolUI.prototype.crashUp = function() {
    var self = this;
    qc.CatchGame.fallitemPool.checkCrashPoolObject();
};

FallItemPoolUI.prototype.need2Create = function() {
    return qc.CatchGame.fallitemPool.isPoolNeedNew();
};

FallItemPoolUI.prototype.clearAll = function() {
    qc.CatchGame.fallitemPool.clearAll();
};


