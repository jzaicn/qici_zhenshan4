'use strict';


var RewardPageUI = qc.defineBehaviour('qc.engine.RewardPageUI', qc.Behaviour, function() {

    var self = this;

    self.gameStatusChange = false;
    self.stage = [];
}, {
    TigerStickNode: qc.Serializer.NODE,

    RewardAreaNode: qc.Serializer.NODE,

    ShareNode: qc.Serializer.NODE,
    ShadowNode: qc.Serializer.NODE,

    ReplayBtnNode: qc.Serializer.NODE,
    RewardBtnNode: qc.Serializer.NODE,
});


RewardPageUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

        
    if (self.TigerStickNode) {
        self.tiger = self.TigerStickNode.getScript("qc.engine.GetRewardBtnUI");
        self.TigerStickNode.visible = true;
        //设置完成回调函数 - 》显示抽奖
        self.tiger.init(function(){
            self.reward.onShow();
        });
    }

    if (self.RewardAreaNode) {
        self.reward = self.RewardAreaNode.getScript("qc.engine.ShowRewardUI");
        self.RewardAreaNode.visible = true;
        self.reward.init(function(){
            //设置完成回调函数 -》 显示遮罩，显示分享，显示奖品情况，显示按钮
            if (self.ShareNode) { self.ShareNode.visible = true; }
            if (self.ShadowNode) { self.ShadowNode.visible = true; }
            if (self.ReplayBtnNode) { self.ReplayBtnNode.visible = true; }
            if (self.RewardBtnNode) { self.RewardBtnNode.visible = true; }

            //抽完奖显示
            document.title = qc.CatchGame.getWinTitle();
        });
        
    }



};

//被上层调用，重新初始化相关地方
RewardPageUI.prototype.setup = function() {
    var self = this;
    if (self.ShareNode) {
        self.ShareNode.visible = false;
    }

    if (self.ShadowNode) {
        self.ShadowNode.visible = false;
    }

    if (self.ReplayBtnNode) {
        self.ReplayBtnNode.visible = false;
    }

    if (self.RewardBtnNode) {
        self.RewardBtnNode.visible = false;
    }


    if (qc.CatchGame.getGameEndStatus() === "win") {
        self.reward.setup();
    }
    else {
        self.ShareNode.visible = true;
        self.ShadowNode.visible = true;
        self.ReplayBtnNode.visible = true;
        document.title = qc.CatchGame.getLoseTitle();
    }
};

//被上层调用，关闭相关地方
RewardPageUI.prototype.clearup = function() {
};