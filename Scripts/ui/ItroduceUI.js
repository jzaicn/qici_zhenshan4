'use strict';


var ItroduceUI = qc.defineBehaviour('qc.engine.ItroduceUI', qc.Behaviour, function() {
}, {
});


ItroduceUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;
};


ItroduceUI.prototype.update = function() {

};

ItroduceUI.prototype.onClick = function() {
    qc.CatchGame.Status = "playing";
};
