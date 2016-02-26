'use strict';


var ReplayBtnUI = qc.defineBehaviour('qc.engine.ReplayBtnUI', qc.Behaviour, function() {

    var self = this;

}, {
});


// ReplayBtnUI.prototype.awake = function() {
//     var self = this;
// };


// ReplayBtnUI.prototype.update = function() {

// };

ReplayBtnUI.prototype.onClick = function() {
    var self = this;
    qc.CatchGame.Status = "playing";
};
