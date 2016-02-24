'use strict';


var ItroduceBtnUI = qc.defineBehaviour('qc.engine.ItroduceBtnUI', qc.Behaviour, function() {
}, {
});


ItroduceBtnUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;
};

ItroduceBtnUI.prototype.onClick = function() {
    qc.CatchGame.Status = "introduce";
};
