'use strict';


var AAAintroduceUI = qc.defineBehaviour('qc.engine.AAAintroduceUI', qc.Behaviour, function() {

    var self = this;

    // self.itemFactory = new qc.CatchGame.FallItemFactory();

    // self.catcher = new qc.CatchGame.CatcherLogic();

}, {
    //     testPrefab: qc.Serializer.PREFAB,
    //     catcherPrefab: qc.Serializer.PREFAB,
    //     worldNode: qc.Serializer.NODE
});


AAAintroduceUI.prototype.awake = function() {
    var self = this;
    self.getPlay = getPlayXunhuanLoop();
    // if (self.catcherPrefab) {
    //     var testObject = self.game.add.clone(self.catcherPrefab, self.worldNode);
    //     self.test = testObject.getScript("qc.engine.CathcerUI");
    // };
};


AAAintroduceUI.prototype.update = function() {

};

AAAintroduceUI.prototype.onClick = function() {
    var self = this;
    console.log('AAAreward')
};

