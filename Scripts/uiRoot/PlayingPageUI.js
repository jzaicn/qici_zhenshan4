'use strict';


var PlayingPageUI = qc.defineBehaviour('qc.engine.PlayingPageUI', qc.Behaviour, function() {

    var self = this;

    self._onEffect = false;

}, {
    FallCreateAreaNode: qc.Serializer.NODE,
    FallPoolNode: qc.Serializer.NODE,
    BackCountNode: qc.Serializer.NODE,
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
    };

    //绑定倒数对象
    if (self.BackCountNode) {
        self.backcount = self.BackCountNode.getScript("qc.engine.BackCountUI");
    };

};

//被上层调用，重新初始化相关地方
PlayingPageUI.prototype.setup = function() {
    var self = this;

    self.clearItems();
    self.createItems();
    qc.CatchGame.gameInit();
    
    self.backcount.showBackCount(function(){
        qc.CatchGame.gameStart();
    });
};

//被上层调用，关闭相关地方
PlayingPageUI.prototype.clearup = function() {
    var self = this;
    self.backcount.showLose(function(){
        self.clearItems();
        qc.CatchGame.gameInit();
    });
};


////////////////////////////////////////////////////////////////////////////
///   创建对象相关


//清空下落对象池
PlayingPageUI.prototype.clearItems = function() {
    var self = this;
    self.fallPool.clearAll();
};

//创建对象池
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


/////////////////////////////////////////////////////////////////////////////
///  游戏过程

PlayingPageUI.prototype.update = function() {
    var self = this;
	//调用游戏类进行判断，游戏是否结束，是否碰撞得分，是否超出边界删除对象
    if (qc.CatchGame.isGameRunning()) {
        qc.CatchGame.checkStatus();
        self.fallPool.fallAll();//TODO: 考虑到帧率问题，这里下落速度应该同帧率有关，待修改
        self.fallPool.fallOut();
        self.fallPool.crashUp();
        if (self.fallPool.need2Create()) {
            self.createItems();
        };
    }
    else if (self._onEffect === false) {
        switch (qc.CatchGame.getGameEndStatus()) {
            case "lose":
                self._onEffect = true;
                self.backcount.showLose(function(){
                    console.log('lose 输了');
                    qc.CatchGame.Status = "reward";
                    self._onEffect = false;
                });
                break;
            case "win":
                self._onEffect = true;
                self.backcount.showWin(function(){
                    qc.CatchGame.Status = "reward";
                    self._onEffect = false;
                });
                break;
        }
    };
};


