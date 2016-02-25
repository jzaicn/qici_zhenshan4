'use strict';


var ScoreUI = qc.defineBehaviour('qc.engine.ScoreUI', qc.Behaviour, function() {
}, {
});


ScoreUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    o.visible = false;
};


ScoreUI.prototype.update = function() {

};

ScoreUI.prototype.show = function(text) {
    var self = this,
        o = self.gameObject,
        tAlpha = self.getScript('qc.TweenAlpha'),
        tPosition = self.getScript('qc.TweenPosition');

    o.text = text;
    o.visible = true;
    //tAlpha.resetGroupToBeginning();

    //偏移到对象位置
    tPosition.from.x += o.x;
    tPosition.from.y += o.y;
    tPosition.to.x += o.x;
    tPosition.to.y += o.y;

    tAlpha.onFinished.addOnce(function() {
        // 隐藏掉
        o.visible = false;
        o.destroy();
    });

    tAlpha.playGroupForward();
};

ScoreUI.prototype.setPos = function(x,y) {
    var self = this,
        o = self.gameObject;
    o.x = x;
    o.y = y;
};