'use strict';


var UIManager = qc.defineBehaviour('qc.engine.UIManager', qc.Behaviour, function() {

    var self = this;

    self.gameStatusChange = false;
}, {
    WelcomeNode: qc.Serializer.NODE,
    IntroduceNode: qc.Serializer.NODE,
    PlayingNode: qc.Serializer.NODE,
    RewardNode: qc.Serializer.NODE,
});


UIManager.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    // 页面
    if (self.WelcomeNode) {
        //self.FallCreateArea = self.WelcomeNode.getScript("qc.engine.ObjectAreaUI");
        self.WelcomeNode.visible = false;
    }

    // 页面
    if (self.IntroduceNode) {
        //self.FallCreateArea = self.IntroduceNode.getScript("qc.engine.ObjectAreaUI");
        self.IntroduceNode.visible = true;
    }

    // 页面
    if (self.PlayingNode) {
        //self.FallCreateArea = self.PlayingNode.getScript("qc.engine.ObjectAreaUI");
        self.PlayingNode.visible = false;
    }

    // 页面
    if (self.RewardNode) {
        //self.FallCreateArea = self.RewardNode.getScript("qc.engine.ObjectAreaUI");
        self.RewardNode.visible = false;
    }

    // qc.CatchGame.statusSignal.add(function(oldStatus, newStatus) {
    //     var self = this;
    //     self.gameStatusChange = true;
    //     if (newStatus == "playing") {
    //         self.WelcomeNode.visible = false;
    //         self.IntroduceNode.visible = false;
    //         self.PlayingNode.visible = true;
    //         self.RewardNode.visible = false;
    //     };
    // });

};

UIManager.prototype.update = function() {
    var self = this;
    if (self.gameStatusChange) {
        self.gameStatusChange = false;
    };
};


UIManager.prototype.shutdown = function() {

};
