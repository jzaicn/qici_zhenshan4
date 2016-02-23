'use strict';


var PlayingPageUI = qc.defineBehaviour('qc.engine.PlayingPageUI', qc.Behaviour, function() {

    var self = this;

    var seaLevel = 0;

}, {
    FallCreateAreaNode: qc.Serializer.NODE,
    FallPoolNode: qc.Serializer.NODE,
});


PlayingPageUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    // 查找下落区间
    if (self.FallCreateAreaNode) {
        self.FallCreateArea = self.FallCreateAreaNode.getScript("qc.engine.ObjectAreaUI");
        self.FallCreateAreaNode.visable = false;
    }

    //绑定对象池
    if (self.FallPoolNode) {
        self.fallPool = self.FallPoolNode.getScript("qc.engine.FallItemPoolUI");
        qc.CatchGame.fallitemPool.init(self.fallPool);
    };

};

PlayingPageUI.prototype.createItems = function() {
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





PlayingPageUI.prototype.update = function() {
    var self = this;
	//调用游戏类进行判断，游戏是否结束，是否碰撞得分，是否超出边界删除对象
    if (qc.CatchGame.isRunning()) {
        self.fallPool.fallAll();//TODO: 考虑到帧率问题，这里下落速度应该同帧率有关，待修改
        self.fallPool.fallOut();
        self.fallPool.crashUp();
        if (self.fallPool.need2Create()) {
            self.createItems();
        };
    };
};

