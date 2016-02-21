'use strict';


var UIManager = qc.defineBehaviour('qc.engine.UIManager', qc.Behaviour, function() {

    var self = this;

    var seaLevel = 0;

    var stage_welcome_page = [];
    var stage_palying_page = [];
    var stage_goodbye_page = [];
}, {
    FallCreateAreaNode: qc.Serializer.NODE,
    FallPoolNode: qc.Serializer.NODE,
});


UIManager.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    // 查找下落区间
    if (self.FallCreateAreaNode) {
        self.FallCreateArea = self.FallCreateAreaNode.getScript("qc.engine.ObjectAreaUI");
    }

    //绑定对象池
    if (self.FallPoolNode) {
        self.fallPool = self.FallPoolNode.getScript("qc.engine.FallItemPoolUI");
        qc.CatchGame.fallitemPool.init(self.fallPool);
    };

    //Gameinit
    qc.CatchGame.bandUIObj(self);

    //TODO: startgame
    if (true) {
        self.createItems();
    };
};

UIManager.prototype.createItems = function() {
    var self = this;

    //获得游戏下落的区域
    var area = self.FallCreateArea.currentBox();
    var currentPool = qc.CatchGame.fallitemPool.getPool();
    var newItems = qc.CatchGame.fallitemFactory.fillPoolWithArea(area,currentPool);
    
    while(newItems.length > 0 ){
        var item = newItems.pop();
        qc.CatchGame.fallitemPool.additem(item);
    }
};





UIManager.prototype.update = function() {
    var self = this;
	//TODO: 调用游戏类进行判断，游戏是否结束，是否碰撞得分，是否超出边界删除对象
    if (qc.CatchGame.isRunning()) {
        self.fallPool.fallAll();
        self.fallPool.fallOut();
        self.fallPool.crashUp();
    };
};


UIManager.prototype.shutdown = function() {
	
};

