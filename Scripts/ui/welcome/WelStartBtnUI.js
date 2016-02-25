'use strict';


var WelStartBtnUI = qc.defineBehaviour('qc.engine.WelStartBtnUI', qc.Behaviour, function() {
}, {
});


WelStartBtnUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;
};

WelStartBtnUI.prototype.onClick = function() {
    if (qc.CatchGame.isIntroduced()) {
        qc.CatchGame.Status = "playing"; 
    }
    else {
        qc.CatchGame.Status = "introduce";    
    }
};
