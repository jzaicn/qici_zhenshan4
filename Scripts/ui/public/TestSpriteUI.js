'use strict';


var TestSpriteUI = qc.defineBehaviour('qc.engine.TestSpriteUI', qc.Behaviour, function() {

    var self = this;

    // self.itemFactory = new qc.CatchGame.FallItemFactory();

    // self.catcher = new qc.CatchGame.CatcherLogic();

}, {
    //     testPrefab: qc.Serializer.PREFAB,
    //     catcherPrefab: qc.Serializer.PREFAB,
    testNode: qc.Serializer.NODE
});


TestSpriteUI.prototype.awake = function() {
    var self = this;

    if (self.testNode) {
        self.test = self.testNode.getScript("qc.engine.BackCountUI");
    };

    // self.getPlay = getPlayXunhuanLoop();
    // if (self.catcherPrefab) {
    //     var testObject = self.game.add.clone(self.catcherPrefab, self.worldNode);
    //     self.test = testObject.getScript("qc.engine.CathcerUI");
    // };
};


TestSpriteUI.prototype.update = function() {

};

TestSpriteUI.prototype.onClick = function() {
    var self = this;
    // self.test.showYouWin();
    qc.CatchGame.gameOver();
};


function getPlayXunhuanLoop() {
    var i = 0;

    var group = [
        {name : "welcome" },
        {name : "introduce" },
        {name : "playing" },
        {name : "reward" },
    ];
    function returnPlayName() {
        var index= 0;
        //获取当前位置
        for (var i = 0; i < group.length; i++) {
            if (group[i].name == qc.CatchGame.Status) {
                index = i;
            };
            
        };

        //循环复位
        index++;
        index = index % 4;
        return group[index].name;
    }
    return returnPlayName;
}



TestSpriteUI.prototype.onCreatePoolFallItem = function() {
    var self = this;

    var area = {
        x: 0,
        y: 0,
        width: 640,
        height: 960,
    };
    var pool = self.itemFactory.getFillAreaPool(area);

    for (var i = 0; i < pool.length; i++) {
        var datainfo = pool[i];

        var testScript = self.game.add.clone(self.testPrefab, self.worldNode);
        testScript.frame = datainfo.icon;
        testScript.x = datainfo.x;
        testScript.y = datainfo.y;
    };
};

TestSpriteUI.prototype.onCreateOneFallItem = function() {
    var self = this;

    console.log("onclick");
    //加载对象，设置标志位，下一次点击调用消失
    if (!self.flag) {
        self.flag = true;

        var testObject = self.game.add.clone(self.testPrefab, self.gameObject);
        self.test = testObject.getScript("qc.engine.FallItemUI");
    } else {
        self.flag = false;


        self.test.onCrash();
    };

};

TestSpriteUI.prototype.onScoreDispear = function() {
    //加载积分对象，加载对象相关脚本
    if (self.testPrefab) {
        var testObject = self.game.add.clone(self.testPrefab, self.gameObject);
        self.test = testObject.getScript("qc.engine.ScoreUI");
    };

    self.test.show("+5");
};
