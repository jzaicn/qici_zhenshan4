var ShowRewardUI = qc.defineBehaviour('qc.engine.ShowRewardUI', qc.Behaviour, function() {

    var self = this;

    self._update_enable = false;

    self._frameGroup = qc.CatchGame.REWARD_GROUP;

    self._endWith = "jiang1.png";

    self._frameName = "jiang1.png",
    self._blurValue = 3,
    self._durationValue = 0.1;
    self._showTimes = 10;
}, {
    Price1Node: qc.Serializer.NODE,
    Price2Node: qc.Serializer.NODE,
});


ShowRewardUI.prototype.awake = function() {
    var self = this;

    if (self.Price1Node) {
        self.price1Position = self.Price1Node.getScript("qc.TweenPosition");
        self.price1FilterGroup = self.Price1Node.getScript("qc.FilterGroup");
        self.price1BlurX = self.price1FilterGroup.filters[0];
        self.Price1Node.visible = false;
    };

    if (self.Price2Node) {
        self.price2Position = self.Price2Node.getScript("qc.TweenPosition");
        self.Price2Node.visible = true;
    };
};


// ShowRewardUI.prototype.update = function() {
//     var self = this;
//     if (self._update_enable === true) {

//     };
// };
// 


ShowRewardUI.prototype.init = function(callback) {
    var self = this;
    self.Price2Node.visible = true;
    self.Price1Node.visible = false;
    self.Price1Node.frame = "jiang0.png";

    self.callback = callback;
};

ShowRewardUI.prototype.showFastMove = function(blur, duration, onFinished) {
    var self = this,
        o = self.gameObject;

    self.Price1Node.frame = qc_game.math.getRandom(["jiang1.png","jiang2.png","jiang3.png","jiang4.png","jiang5.png"]);
    self.price1BlurX.blur = blur;
    self.price1Position.duration = duration;
    self.price1Position.playForward(true);

    self.price1Position.onFinished.addOnce(onFinished);
};

ShowRewardUI.prototype.showLastMove = function(onFinished) {
    var self = this,
        o = self.gameObject;

    self.Price2Node.frame = "jiang5.png";//TODO: 这里设置最终奖品
    self.Price2Node.visible = true;
    self.price2Position.playForward(true);

    self.price2Position.onFinished.addOnce(onFinished);
};


ShowRewardUI.prototype.onShow = function() {
    var self = this;

    self._frameName = "jiang1.png";
    self._blurValue = 3;
    self._durationValue = 0.1;


    self.Price1Node.visible = true;

    self.Price2Node.visible = false;

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
