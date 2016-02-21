'use strict';


var CatchGameUI = qc.defineBehaviour('qc.engine.CatchGameUI', qc.Behaviour, function() {

    var self = this;

    var seaLevel = 0;

    var stage_welcome_page = [];
    var stage_palying_page = [];
    var stage_goodbye_page = [];
}, {
	//区域对象
    FallItemAreaNode: qc.Serializer.NODE,

    //操作对象
    FallItemPoolNode: qc.Serializer.NODE,
});


CatchGameUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    if (self.FallItemAreaNode) {
    	self.FallItemArea = self.FallItemAreaNode.getScript("qc.engine.FallItemAreaUI");
    }

    if (self.FallItemPoolNode) {
    	self.FallItemPool = self.FallItemPoolNode.getScript("qc.engine.FallItemPoolUI");
    }
};


CatchGameUI.prototype.update = function() {
	//TODO: 调用游戏类进行判断，游戏是否结束，是否碰撞得分，是否超出边界删除对象
};


CatchGameUI.prototype.shutdown = function() {
	
};