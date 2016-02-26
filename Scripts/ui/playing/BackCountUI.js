'use strict';


var BackCountUI = qc.defineBehaviour('qc.engine.BackCountUI', qc.Behaviour, function() {
    this.callback = null;
}, {});


BackCountUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;
    o.visible = false;
};


BackCountUI.prototype.update = function() {
};

//设置回调函数
BackCountUI.prototype.init = function(callback) {
    this.callback = callback;
};

//内部显示一个数字
BackCountUI.prototype.doShow = function(text, time, func) {
    var self = this,
        o = self.gameObject,
        tAlpha = self.getScript('qc.TweenAlpha');

    o.text = text;
    o.visible = true;
    tAlpha.duration = time;
    tAlpha.onFinished.addOnce(func);
    tAlpha.playForward(true);
};

//对外可用的倒数事件（回调函数可不设）
BackCountUI.prototype.showBackCount = function(callback) {

    var self = this,
        o = self.gameObject;

    if (callback) {
        self.init(callback);
    };

    o.text = "";
    o.startColor = new qc.Color([255, 255, 255]);
    o.endColor = new qc.Color([201, 201, 201]);
    self.doShow("3", 0.8, function() {
        self.doShow("2", 0.8, function() {
            self.doShow("1", 0.8, function() {
                self.doShow("Go!", 0.8, function() {
                    //完成执行回调
                    if (self.callback) {
                        self.callback();
                    };

                    //消失
                    o.visible = false;
                    //o.destroy();
                });
            });
        });
    });
};

//对外可用的倒数事件（回调函数可不设）
BackCountUI.prototype.showGameOver = function(callback) {

    var self = this,
        o = self.gameObject;

    if (callback) {
        self.init(callback);
    };

    o.text = "";
    o.startColor = new qc.Color([158, 150, 0]);
    o.endColor = new qc.Color([255, 0, 0]);
    self.doShow("GameOver", 3, function() {
        //完成执行回调
        if (self.callback) {
            self.callback();
        };

        //消失
        o.visible = false;
    });
};