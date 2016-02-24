'use strict';


var ShowRewardUI = qc.defineBehaviour('qc.engine.ShowRewardUI', qc.Behaviour, function() {

    var self = this;

}, {
    PriceNode: qc.Serializer.NODE,
    Share1Node: qc.Serializer.NODE,
    Share2Node: qc.Serializer.NODE,
});


ShowRewardUI.prototype.awake = function() {
    var self = this;

    if (self.StackNode) {
    	self.stack = self.StackNode.getScript("qc.TweenScale");
    };

    if (self.BallNode) {
    	self.ball = self.BallNode.getScript("qc.TweenPosition");
    };
};


// ShowRewardUI.prototype.update = function() {

// };

ShowRewardUI.prototype.onShow = function() {
    var self = this;
    //TODO: 实现几等奖动画
    //TODO: 最后定格后显示分享
    
};
