'use strict';


var IntroducePageUI = qc.defineBehaviour('qc.engine.IntroducePageUI', qc.Behaviour, function() {

    var self = this;

}, {
});


IntroducePageUI.prototype.awake = function() {
};


IntroducePageUI.prototype.update = function() {
};

//被上层调用，重新初始化相关地方
IntroducePageUI.prototype.setup = function() {
    qc.CatchGame._introduced = true;  
};