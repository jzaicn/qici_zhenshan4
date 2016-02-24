'use strict';


var GetRewardBtnUI = qc.defineBehaviour('qc.engine.GetRewardBtnUI', qc.Behaviour, function() {

    var self = this;

}, {
    StackNode: qc.Serializer.NODE,
    BallNode: qc.Serializer.NODE
});


GetRewardBtnUI.prototype.awake = function() {
    var self = this;

    if (self.StackNode) {
    	self.stack = self.StackNode.getScript("qc.TweenScale");
    };

    if (self.BallNode) {
    	self.ball = self.BallNode.getScript("qc.TweenPosition");
    };
};


// GetRewardBtnUI.prototype.update = function() {

// };

GetRewardBtnUI.prototype.onClick = function() {
    var self = this;
    //TODO: 调用自己棍子动作动画
    
    //TODO: 调用动画刷新几等奖
    
    //TODO: 复位显示状态
};
