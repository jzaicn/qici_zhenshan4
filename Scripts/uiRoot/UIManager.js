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

    //页面node初始化
    if (true) {
        // 页面
        if (self.WelcomeNode) {
            //self.FallCreateArea = self.WelcomeNode.getScript("qc.engine.ObjectAreaUI");
            self.WelcomeNode.visible = false;
            self.stage.push({ name: "welcome", node: self.WelcomeNode, });
        }

        // 页面
        if (self.IntroduceNode) {
            //self.FallCreateArea = self.IntroduceNode.getScript("qc.engine.ObjectAreaUI");
            self.IntroduceNode.visible = false;
            self.stage.push({ name: "introduce", node: self.IntroduceNode, });
        }

        // 页面
        if (self.PlayingNode) {
            //self.FallCreateArea = self.PlayingNode.getScript("qc.engine.ObjectAreaUI");
            self.PlayingNode.visible = false;
            self.stage.push({ name: "playing", node: self.PlayingNode, });
        }

        // 页面
        if (self.RewardNode) {
            //self.FallCreateArea = self.RewardNode.getScript("qc.engine.ObjectAreaUI");
            self.RewardNode.visible = false;
            self.stage.push({ name: "reward", node: self.RewardNode, });
        }
    }

    //打开默认的页面
    self.openDefaultPage();

    //游戏状态变化响应切换
    qc.CatchGame.statusSignal.add(function(oldStatus, newStatus) {
        self.gameStatusChange = true;

        var switchOnStage = function(operaPool, index, value) {
            if (value.name === newStatus) {
                value.node.visible = true;

                //设置已经介绍信息状态为真
                if (value.name === "introduce") {
                    qc.CatchGame._introduced = true;  
                };
            };
        };
        var switchOffStage = function(operaPool, index, value) {
            if (value.name != newStatus) {
                value.node.visible = false;
            };
        };
        doPoolObject(self.stage, switchOnStage);
        doPoolObject(self.stage, switchOffStage);
    });
};


UIManager.prototype.update = function() {
    var self = this;
};

//打开默认页面
UIManager.prototype.openDefaultPage = function() {
    var self = this;
    var switchOnStage = function(operaPool, index, value) {
        if (value.name == qc.CatchGame.Status) {
            value.node.visible = true;
        };
    };
    doPoolObject(self.stage, switchOnStage);
};