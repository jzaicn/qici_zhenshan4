'use strict';


var FallItemPoolUI = qc.defineBehaviour('qc.engine.FallItemPoolUI', qc.Behaviour, function() {

    var self = this;

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
    fallitem.rotation = (Math.random() - 0.5) * 0.0174 * 35 ;
    fallitem.visable = true;

    datainfo.o = fallitem;
};

FallItemPoolUI.prototype.fallAll = function(deltaTime) {
    var self = this;
    if (deltaTime) {
        // 切换界面出去游戏继续进行，否则就有问题了
        // if (deltaTime > 1000) {
        //     deltaTime = 1000;
        // }
        qc.CatchGame.

        var fallSpeed = qc.CatchGame.Speed * deltaTime / 1000;
        qc.CatchGame.fallitemPool.updateAllPoolObject({
            x:0,
            y:fallSpeed,
        });
    }
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


