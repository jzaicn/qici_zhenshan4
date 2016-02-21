'use strict';


var CatcherDetectAreaUI = qc.defineBehaviour('qc.engine.CatcherDetectAreaUI', qc.Behaviour, function() {

}, {
});


CatcherDetectAreaUI.prototype.currentBox = function() {
    var self = this,
        o = self.gameObject;

    var _worldBox = {
        x: o.x,
        y: o.y,
        width: o.width,
        height: o.height,
    };
    console.log(_worldBox);
    return _worldBox;
};
