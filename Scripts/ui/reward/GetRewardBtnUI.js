'use strict';


var GetRewardBtnUI = qc.defineBehaviour('qc.engine.GetRewardBtnUI', qc.Behaviour, function() {

    var self = this;

    self._clickable = true;

    self.onFinishClickCallback = null;
}, {
    StickNode: qc.Serializer.NODE,
    BallNode: qc.Serializer.NODE,
});


GetRewardBtnUI.prototype.awake = function() {
    var self = this;

    if (self.StickNode) {
    	self.stick = self.StickNode.getScript("qc.TweenScale");
    };

    if (self.BallNode) {
    	self.ball = self.BallNode.getScript("qc.TweenPosition");
    };
};

//完成回调函数
GetRewardBtnUI.prototype.init = function(callback) {
    this.onFinishClickCallback = callback;
};

//点击事件
//拉动抽奖拉杆
GetRewardBtnUI.prototype.onClick = function() {
    var self = this;
    if (self._clickable === true) {
        self._clickable = false;

        //调用自己棍子动作动画
        self.stick.resetToBeginning();
        self.ball.resetToBeginning();
        self.stick.playGroupForward();
        self.ball.playGroupForward();

        //拉杆拉完再拉
        self.stick.onFinished.addOnce(function() {
            if (self.onFinishClickCallback) {
                self.onFinishClickCallback();
            };
            
            self._clickable = true;
        });

    };


};
