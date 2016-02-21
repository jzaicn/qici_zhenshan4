'use strict';


var UIManager = qc.defineBehaviour('qc.engine.UIManager', qc.Behaviour, function() {

    var self = this;

    var seaLevel = 0;

    var stage_welcome_page = [];
    var stage_palying_page = [];
    var stage_goodbye_page = [];
}, {
});


UIManager.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    if (self.FallItemAreaNode) {
    	self.FallItemArea = self.FallItemAreaNode.getScript("qc.engine.FallItemAreaUI");
    }

    if (self.FallItemPoolNode) {
    	self.FallItemPool = self.FallItemPoolNode.getScript("qc.engine.FallItemPoolUI");
    }
};


UIManager.prototype.update = function() {
	//TODO: 调用游戏类进行判断，游戏是否结束，是否碰撞得分，是否超出边界删除对象
};


UIManager.prototype.shutdown = function() {
	
};