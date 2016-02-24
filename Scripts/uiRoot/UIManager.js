'use strict';


var UIManager = qc.defineBehaviour('qc.engine.UIManager', qc.Behaviour, function() {

    var self = this;

    self.gameStatusChange = false;
    self.stage = [];
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
        self.stage.push({name:"welcome",  node:self.WelcomeNode,});
    }

    // 页面
    if (self.IntroduceNode) {
        //self.FallCreateArea = self.IntroduceNode.getScript("qc.engine.ObjectAreaUI");
        self.IntroduceNode.visible = true;
        self.stage.push({name:"introduce",  node:self.IntroduceNode,});
    }

    // 页面
    if (self.PlayingNode) {
        //self.FallCreateArea = self.PlayingNode.getScript("qc.engine.ObjectAreaUI");
        self.PlayingNode.visible = false;
        self.stage.push({name:"playing",  node:self.PlayingNode,});
    }

    // 页面
    if (self.RewardNode) {
        //self.FallCreateArea = self.RewardNode.getScript("qc.engine.ObjectAreaUI");
        self.RewardNode.visible = false;
        self.stage.push({name:"reward",  node:self.RewardNode,});
    }

    qc.CatchGame.statusSignal.add(function(oldStatus, newStatus) {
        self.gameStatusChange = true;
        
        var switchOnStage = function(operaPool,index,value){
            if (value.name == newStatus) {
                value.node.visible = true;
            };
        };
        var switchOffStage = function(operaPool,index,value){
            if (value.name != newStatus) {
                value.node.visible = false;
            };
        };
        doPoolObject(self.stage,switchOnStage);
        doPoolObject(self.stage,switchOffStage);
    });

};


UIManager.prototype.update = function() {
    var self = this;
    if (self.gameStatusChange) {
        self.gameStatusChange = false;
    };
};


UIManager.prototype.shutdown = function() {

};
