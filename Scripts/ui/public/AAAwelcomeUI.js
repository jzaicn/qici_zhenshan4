'use strict';


var AAAwelcomeUI = qc.defineBehaviour('qc.engine.AAAwelcomeUI', qc.Behaviour, function() {

    var self = this;

    // self.itemFactory = new qc.CatchGame.FallItemFactory();

    // self.catcher = new qc.CatchGame.CatcherLogic();

}, {
    //     testPrefab: qc.Serializer.PREFAB,
    //     catcherPrefab: qc.Serializer.PREFAB,
    //     worldNode: qc.Serializer.NODE
});


AAAwelcomeUI.prototype.awake = function() {
    var self = this;
    // if (self.catcherPrefab) {
    //     var testObject = self.game.add.clone(self.catcherPrefab, self.worldNode);
    //     self.test = testObject.getScript("qc.engine.CathcerUI");
    // };
};


AAAwelcomeUI.prototype.update = function() {

};

AAAwelcomeUI.prototype.onClick = function() {
    var self = this;
    console.log('AAAwelcomeUI');
    qc.CatchGame.Status = "welcome";
};

