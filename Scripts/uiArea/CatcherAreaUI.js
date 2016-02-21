var CatcherAreaUI = qc.defineBehaviour('qc.engine.CatcherAreaUI', qc.Behaviour, function() {

}, {});

CatcherAreaUI.prototype.currentBox = function() {
    var self = this,
        o = self.gameObject;

    var _worldBox = {
        x: o.x,
        y: o.y,
        width: o.width,
        height: o.height,
    };

    return _worldBox;
};
