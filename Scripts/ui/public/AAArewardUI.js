'use strict';


var AAArewardUI = qc.defineBehaviour('qc.engine.AAArewardUI', qc.Behaviour, function() {

    var self = this;

    // self.itemFactory = new qc.CatchGame.FallItemFactory();

    // self.catcher = new qc.CatchGame.CatcherLogic();

}, {
    //     testPrefab: qc.Serializer.PREFAB,
    //     catcherPrefab: qc.Serializer.PREFAB,
    //     worldNode: qc.Serializer.NODE
});


AAArewardUI.prototype.awake = function() {
    var self = this;
    // if (self.catcherPrefab) {
    //     var testObject = self.game.add.clone(self.catcherPrefab, self.worldNode);
    //     self.test = testObject.getScript("qc.engine.CathcerUI");
    // };
};


AAArewardUI.prototype.update = function() {

};

AAArewardUI.prototype.onClick = function() {
    var self = this;
    console.log('AAAreward');
    qc.CatchGame.Status = "reward";
};

