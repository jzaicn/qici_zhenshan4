var ShowRewardUI = qc.defineBehaviour('qc.engine.ShowRewardUI', qc.Behaviour, function() {

    var self = this;

    self._update_enable = false;

    self._frameGroup = qc.CatchGame.REWARD_GROUP;

    self._frameName = "jiang1.png",
    self._blurValue = 3,
    self._durationValue = 0.1;
}, {
    Fast1Node: qc.Serializer.NODE,
    LastNode: qc.Serializer.NODE,
});


ShowRewardUI.prototype.awake = function() {
    var self = this;

    if (self.Fast1Node) {
        self.fast1Position = self.Fast1Node.getScript("qc.TweenPosition");
        self.fast1FilterGroup = self.Fast1Node.getScript("qc.FilterGroup");
        self.fast1BlurX = self.fast1FilterGroup.filters[0];
        self.Fast1Node.visible = false;
    };

    if (self.LastNode) {
        self.last2Position = self.LastNode.getScript("qc.TweenPosition");
        self.LastNode.visible = true;
    };
};


ShowRewardUI.prototype.setup = function() {
    var self = this;
    self.LastNode.visible = true;
    self.Fast1Node.visible = false;
    self.Fast1Node.frame = "jiang0.png";
};


ShowRewardUI.prototype.init = function(callback) {

    self.callback = callback;
};

ShowRewardUI.prototype.showFastMove = function(blur, duration, onFinished) {
    var self = this,
        o = self.gameObject;

    self.Fast1Node.frame = qc_game.math.getRandom(qc.CatchGame.REWARD_GROUP).icon;
    self.fast1BlurX.blur = blur;
    self.fast1Position.duration = duration;
    self.fast1Position.playForward(true);

    self.fast1Position.onFinished.addOnce(onFinished);
};

ShowRewardUI.prototype.showLastMove = function(onFinished) {
    var self = this,
        o = self.gameObject;

    //这里设置最终奖品
    self.LastNode.frame = qc.CatchGame.getCurrentRewardPng();
    self.LastNode.visible = true;
    self.last2Position.playForward(true);

    self.last2Position.onFinished.addOnce(onFinished);
};


ShowRewardUI.prototype.onShow = function() {
    var self = this;

    self._frameName = "jiang1.png";
    self._blurValue = 3;
    self._durationValue = 0.1;


    self.Fast1Node.visible = true;

    self.LastNode.visible = false;

    self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
        self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
            self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                    self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                        self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                            self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                                self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                                    self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                                        self.showFastMove(self._blurValue-=0.3, self._durationValue += 0.1, function() {
                                            self.showLastMove(function(){
                                                if (self.callback) {
                                                    self.callback();
                                                };
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};
