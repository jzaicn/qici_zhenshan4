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
            self.Welcome = self.WelcomeNode.getScript("qc.engine.WelcomePageUI");
            self.WelcomeNode.visible = false;
            self.stage.push({ name: "welcome", node: self.WelcomeNode, setup: null, clearup: null, });
        }

        // 页面
        if (self.IntroduceNode) {
            self.Introduce = self.IntroduceNode.getScript("qc.engine.IntroducePageUI");
            self.IntroduceNode.visible = false;
            self.stage.push({ name: "introduce", node: self.IntroduceNode, setup: null, clearup: null, });
        }

        // 页面
        if (self.PlayingNode) {
            self.Playing = self.PlayingNode.getScript("qc.engine.PlayingPageUI");
            self.PlayingNode.visible = false;
            self.stage.push({ name: "playing", node: self.PlayingNode, setup: null, clearup: null, });
        }

        // 页面
        if (self.RewardNode) {
            self.Reward = self.RewardNode.getScript("qc.engine.RewardPageUI");
            self.RewardNode.visible = false;
            self.stage.push({ name: "reward", node: self.RewardNode, setup: null, clearup: null, });
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

                //每个页面的初始化动作
                switch (value.name) {
                    case "welcome":
                        self.Welcome.setup();
                        break;
                    case "introduce":
                        self.Introduce.setup();
                        break;
                    case "playing":
                        self.Playing.setup();
                        break;
                    case "reward":
                        self.Reward.setup();
                        break;
                    default:
                        break;
                }

            };
        };
        var switchOffStage = function(operaPool, index, value) {
            if (value.name != newStatus) {
                value.node.visible = false;

                //每个页面的结束动作
                switch (value.name) {
                    case "welcome":
                        self.Welcome.clearup();
                        break;
                    case "introduce":
                        self.Introduce.clearup();
                        break;
                    case "playing":
                        self.Playing.clearup();
                        break;
                    case "reward":
                        self.Reward.clearup();
                        break;
                    default:
                        break;
                }
            };
        };
        doPoolObject(self.stage, switchOnStage);    //打开指定页面
        doPoolObject(self.stage, switchOffStage);   //关闭其他页面
    });
};


// UIManager.prototype.update = function() {
//     var self = this;
// };

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