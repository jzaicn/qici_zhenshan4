'use strict';


var FallItemPoolUI = qc.defineBehaviour('qc.engine.FallItemPoolUI', qc.Behaviour, function() {

    var self = this;

    var fallSpeed = qc.CatchGame.FALL_SPEED;
}, {
    FallItemPrefab: qc.Serializer.PREFAB,
});


FallItemPoolUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

};


FallItemPoolUI.prototype.update = function() {
    //TODO: 更新自己池子里面元素下落坐标
};

FallItemPoolUI.prototype.init = function(fallItemPoolLogicObj) {
    var self = this;
    //UI绑定逻辑对象
    self.poolObj = fallItemPoolLogicObj;
};

//外部传入fallmodel，这里创建图形，同时在逻辑对象创建匹配的对象
FallItemPoolUI.prototype.additem = function(datainfo) {
    var self = this,
        o = self.gameObject;

    //添加逻辑对象
    self.poolObj.additem(datainfo);

    //添加UI对象
    var testScript = self.game.add.clone(self.testPrefab, o);
    testScript.frame = datainfo.icon;
    testScript.x = datainfo.x;
    testScript.y = datainfo.y;
};










// //删除指定元素
// FallItemPoolUI.prototype.remove = function(data) {
//     // body...
// };



// FallItemPoolUI.prototype.fallAll = function() {
//     // body...
// };
