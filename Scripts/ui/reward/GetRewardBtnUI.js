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
    // if (self.testNode) {
    //     self.test = self.testNode.getScript("qc.engine.ShowRewardUI");
    // };
};

GetRewardBtnUI.prototype.init = function(callback) {
    this.onFinishClickCallback = callback;
};

// GetRewardBtnUI.prototype.update = function() {

// };

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
            self._clickable = true;
            if (self.onFinishClickCallback) {
                self.onFinishClickCallback();
            };
        });

    };


};
