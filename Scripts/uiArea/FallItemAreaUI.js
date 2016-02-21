var FallItemAreaUI = qc.defineBehaviour('qc.engine.FallItemAreaUI', qc.Behaviour, function() {

}, {});

FallItemAreaUI.prototype.currentBox = function() {
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
