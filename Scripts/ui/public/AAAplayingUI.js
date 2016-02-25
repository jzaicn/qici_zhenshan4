'use strict';


var AAAplayingUI = qc.defineBehaviour('qc.engine.AAAplayingUI', qc.Behaviour, function() {

    var self = this;

    // self.itemFactory = new qc.CatchGame.FallItemFactory();

    // self.catcher = new qc.CatchGame.CatcherLogic();

}, {
    //     testPrefab: qc.Serializer.PREFAB,
    //     catcherPrefab: qc.Serializer.PREFAB,
    //     worldNode: qc.Serializer.NODE
});


AAAplayingUI.prototype.awake = function() {
    var self = this;
    self.getPlay = getPlayXunhuanLoop();
    // if (self.catcherPrefab) {
    //     var testObject = self.game.add.clone(self.catcherPrefab, self.worldNode);
    //     self.test = testObject.getScript("qc.engine.CathcerUI");
    // };
};


AAAplayingUI.prototype.update = function() {

};

AAAplayingUI.prototype.onClick = function() {
    var self = this;
    console.log('AAAreward')
};

