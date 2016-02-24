'use strict';


var BackCountUI = qc.defineBehaviour('qc.engine.BackCountUI', qc.Behaviour, function() {
}, {
});


BackCountUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    o.visible = false;
};


BackCountUI.prototype.update = function() {

};

BackCountUI.prototype.show = function() {
    var self = this,
        o = self.gameObject,
        tAlpha = self.getScript('qc.TweenAlpha');

    var group = ["3","2","1","Go!"];

    o.text = text;
    o.visible = true;

    var currentIndex = 0;
    function doShow(){

        if (currentIndex < group.length) {
            o.text = group[currentIndex];
            o.visible = true;
            tAlpha.resetToBeginning();
            tAlpha.onFinished.addOnce(doShow());
            tAlpha.playForward();
        }
        else {
            // 隐藏掉
            o.visible = false;
            o.destroy();
        };
    };
};

BackCountUI.prototype.setPos = function(x,y) {
    var self = this,
        o = self.gameObject;
    o.x = x;
    o.y = y;
};