'use strict';


var FallItemPoolUI = qc.defineBehaviour('qc.engine.FallItemPoolUI', qc.Behaviour, function() {

    var self = this;

    var fallSpeed = qc.CatchGame.FALL_SPEED;
}, {
    FallItemPrefab: qc.Serializer.PREFAB,
    FallAreaNode: qc.Serializer.NODE,
    NewAreaNode: qc.Serializer.NODE,
});


FallItemPoolUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    if (self.FallItemPrefab) {
        // var fallitem = self.game.add.clone(self.FallItemPrefab, self.gameObject);
        // var FallItem = fallitem.getScript("qc.engine.FallItemUI");
    }

};


FallItemPoolUI.prototype.update = function() {
    //TODO: 更新自己池子里面元素下落坐标
};

FallItemPoolUI.prototype.init = function(fallItemPoolLogicObj) {
    //UI绑定逻辑对象
    this.poolObj = fallItemPoolLogicObj;

    //逻辑对象范围设置



};



//删除指定元素
FallItemPoolUI.prototype.remove = function(data) {
    // body...
};

//外部传入fallmodel，这里创建图形，同时在逻辑对象创建匹配的对象
FallItemPoolUI.prototype.add = function(datainfo) {
    var self = this,
        o = self.gameObject;

    var testScript = self.game.add.clone(self.testPrefab, o);
    testScript.frame = datainfo.icon;
    testScript.x = datainfo.x;
    testScript.y = datainfo.y;
};

FallItemPoolUI.prototype.fallAll = function() {
    // body...
};
