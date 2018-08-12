/**
 * 用户自定义脚本.
 */
(function(window, Object, undefined) {

'use strict';
/**
 * 游戏入口
 */
window.CatchGame = qc.CatchGame = {

	// 所有的操作指令集合
    operation: {},
};

// 游戏逻辑初始化
qc.initGame = function(game) {

};
"use strict";

/**
 * 维护分数信息
 */
var CatcherLogic = qc.CatchGame.CatcherLogic = function() {
    var self = this;

    //定义坐标
    self._pos = {
        x: 0,
        y: 0,
    };

    //定义碰撞范围
    self.box = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    //用于计算坐标变化后
    self._offset = {
        x: 0,
        y: 0,
    };
};
CatcherLogic.prototype = {};
CatcherLogic.prototype.constructor = CatcherLogic;

Object.defineProperties(CatcherLogic.prototype, {
    pos_x: {
        get: function() { return this._pos.x; },
        set: function(v) {
            this._pos.x = v;
            updateBox();
        }
    },
    pos_y: {
        get: function() { return this._pos.y; },
        set: function(v) {
            this._pos.y = v;
            updateBox();
        }
    },
});

//计算当前偏差值，创建时一次即可
CatcherLogic.prototype.countBoxOffset = function() {
	self._offset.x = self._pos.x - self.box.x;
	self._offset.y = self._pos.y - self.box.y;
};

//更新box位置
CatcherLogic.prototype.updateBox = function() {
    self.box.x = self._pos.x - self._offset.x ;
	self.box.y = self._pos.y - self._offset.y ;
};

"use strict";

/**
 * 维护分数信息
 */
var FallItemFactory = qc.CatchGame.FallItemFactory = function() {
    var self = this;

    self.factorydata = [
        { id: 3, icon: "3.png", score: 10, noRepeatRadius: 500, noOtherRadius: 100 },
        { id: 0, icon: "0.png", score: 10, noRepeatRadius: 300, noOtherRadius: 100 },
        { id: 1, icon: "1.png", score: 10, noRepeatRadius: 180, noOtherRadius: 100 },
        { id: 2, icon: "2.png", score: 10, noRepeatRadius: 180, noOtherRadius: 100 },
    ];

    self.data = [];
    for (var i = 0; i < self.factorydata.length; i++) {
        var item = new qc.CatchGame.FallItemLogic();
        item.initObj(self.factorydata[i]);
        self.data.push(item);
    };


    self.pool = [];

    self.range = {
        x: 0,
        y: 0,
        width: 640,
        height: 960,
    };

    self.tryUpTimes = 5;
};
FallItemFactory.prototype = {};
FallItemFactory.prototype.constructor = FallItemFactory;

Object.defineProperties(FallItemFactory.prototype, {

});

//填充区域
FallItemFactory.prototype.fillAreaPool = function(area) {
    var self = this;
    self.pool = self.getFillAreaPool(area);
};

//填充区域
FallItemFactory.prototype.getFillAreaPool = function(area) {
    var self = this;
    var bigPool = [];

    //每个对象循环放置
    for (var i = 0; i < self.data.length; i++) {
        var everyElement = self.data[i];//TODO: 

        bigPool = bigPool.concat(self.fillUP(everyElement,area,bigPool));
    };
    return bigPool;
};

//使用一个元素填充，直到5次填充失败，则这个元素填充完成
FallItemFactory.prototype.fillUP = function(everyElement,area,bigPool) {
    var self = this;
    var trytime = self.tryUpTimes;
    var pool = bigPool;

    while (true) {
        //随机位置
        var pos_random = {
            x: Math.random() * area.width - area.x,
            y: Math.random() * area.height - area.y,
        };

        //该位置没有元素，或者没有同ID元素
        if (self.putCheck(everyElement.id, pos_random , pool)) {
            //放置成功,退出循环
            everyElement.x=pos_random.x;
            everyElement.y=pos_random.y;
            pool.push(everyElement.clone());
        } else {
            trytime--;
            if (trytime < 0) {
                break;
            };
        };
    };
    return pool;
};


//改点是否能放下检测
FallItemFactory.prototype.putCheck = function(id, pos ,pool) {
    var self = this;

    //循环对象池是否有不符合规则的地方
    for (var i = 0; i < pool.length; i++) {
        var poolItem = pool[i];
        //ID相等，重复区域内不得放置
        if (poolItem.id == id && checkPointInRadius({x:poolItem.x,y:poolItem.y,}, poolItem.noRepeatRadius, pos)) {
            return false;
        }
        //ID不相等，排他区域内不得放置
        if (checkPointInRadius({x:poolItem.x,y:poolItem.y,}, poolItem.noOtherRadius, pos)) {
            return false;
        };
    };
    return true;
};






"use strict";

/**
 * 维护分数信息
 */
var FallItemLogic = qc.CatchGame.FallItemLogic = function() {
    var self = this;

    self.icon = "";
    self.id = "";
    self.x = 0;
    self.y = 0;
    self.noRepeatRadius = 0;
    self.noOtherRadius = 0;
    self.score = 0;
};
FallItemLogic.prototype = {};
FallItemLogic.prototype.constructor = FallItemLogic;

Object.defineProperties(FallItemLogic.prototype, {
    pos: {
        get: function() {
            return {
                x: this._pos.x,
                y: this._pos.y,
            };
        },
        set: function(v) {
            this.x = v.x;
            this.y = v.y;
        }
    },
});


FallItemLogic.prototype.init = function(id,icon,x,y,noRepeatRadius,noOtherRadius,score) {
    var self = this;

    self.icon = icon;
    self.id = id;
    self.x = x;
    self.y = y;
    self.noRepeatRadius = noRepeatRadius;
    self.noOtherRadius = noOtherRadius;
    self.score = score;
};

FallItemLogic.prototype.initObj = function(Obj) {
    var self = this;

    self.icon = Obj.icon;
    self.id = Obj.id;
    self.noRepeatRadius = Obj.noRepeatRadius;
    self.noOtherRadius = Obj.noOtherRadius;
    self.score = Obj.score;
};

FallItemLogic.prototype.clone = function() {
    var self = this;
    var obj = {};

    obj.icon = self.icon;
    obj.id = self.id;
    obj.x = self.x;
    obj.y = self.y;
    obj.noRepeatRadius = self.noRepeatRadius;
    obj.noOtherRadius = self.noOtherRadius;
    obj.score = self.score;

    return obj;
};





window.inBox = function (box, pos) {
    if (inBox_x(box, pos)) {
        if (inBox_y(box, pos)) {
            return true;
        };
    };
    return false;
};

window.inBox_x = function (box, pos) {
    if (box.x <= pos.x && pos.x <= (box.x + box.width)) {
        return true;
    };
    return false;
};

window.inBox_y = function (box, pos) {
    if (box.y <= pos.y && pos.y <= (box.y + box.height)) {
        return true;
    };
    return false;
};

//两点的平方和
window.distanceSquare = function (a_X, a_Y, b_X, b_Y) {
    var x = Math.pow(Math.abs(a_X - b_X), 2);
    var y = Math.pow(Math.abs(a_Y - b_Y), 2);
    return x + y;
}

//计算两者距离
window.distance = function distance(a_X, a_Y, b_X, b_Y) {
    return Math.sqrt(distanceSquare(a_X, a_Y, b_X, b_Y));
}

//点是否在半径区域内
window.checkPointInRadius = function (posCenter, radius, posOther) {
    if (distance(posCenter.x, posCenter.y, posOther.x, posOther.y) < radius) {
        return true;
    } else {
        return false;
    };
}
'use strict';


var CatcherUI = qc.defineBehaviour('qc.engine.CatcherUI', qc.Behaviour, function() {

    var self = this;

    self.moveing_area = {
        x: 0,
        y: 0,
        width: 640,
        height: 960,
    }

    self._mousepos = { x: 0, y: 0 };
    self._pos = {x:0,y:0};

}, {
    CheckAreaNode: qc.Serializer.NODE,
    ImageNode: qc.Serializer.NODE,
    WorldNode: qc.Serializer.NODE,
});


CatcherUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    // if (self.WorldNode) {
    //     //self.moveing_area
        

    // };

    // if (self.MoveAreaNode) {
    //         //var world_bound = qc.Bounds.getBox(self.MoveAreaNode, qc.Bounds.USE_BOUNDS, true, -1, o.game.world);

    //         self.moveing_area.x = self.MoveAreaNode.x;
    //         self.moveing_area.y = self.MoveAreaNode.y;
    //         self.moveing_area.width = self.MoveAreaNode.width;
    //         self.moveing_area.height = self.MoveAreaNode.height;
    //         console.log(self.moveing_area);
    //     };
};


CatcherUI.prototype.update = function() {

};

CatcherUI.prototype.init = function(logicObj) {
    // body...
};

/**
 * 鼠标拖拽事件
 */
/**
 * 鼠标按下
 */
CatcherUI.prototype.onDown = function(e) {
    var self = this,
        o = self.gameObject;
    self._press = true;
    self._mousepos = o.getWorldPosition();
    console.log("dragStart");
};

/**
 * 拖拽中
 */
CatcherUI.prototype.onDrag = function(e) {
    var self = this,
        o = self.gameObject;
    if (self._press) {
        //更新鼠标位置
        self._mousepos.x += e.source.deltaX;
        self._mousepos.y += e.source.deltaY;

        //判断元素位置变化
        var item_pos = self.WorldNode.toLocal(self._mousepos);

        var p = o.getWorldPosition();


        //可移动区域仅限于父亲范围内,赋值
        if (window.inBox(self.moveing_area, item_pos)) {
            var lp = o.parent.toLocal(self._mousepos);
            this._pos.x = o.x = lp.x;
            this._pos.y = o.y = lp.y;
        } 
        else if (window.inBox_x(self.moveing_area, item_pos)){
            var lp_x = o.parent.toLocal(self._mousepos);
            var lp_y = o.parent.toLocal(p);
            this._pos.x = o.x = lp_x.x;
            this._pos.y = o.y = lp_y.y;
        }
        else if (window.inBox_y(self.moveing_area, item_pos)) {
            var lp_x = o.parent.toLocal(p);
            var lp_y = o.parent.toLocal(self._mousepos);
            this._pos.x = o.x = lp_x.x;
            this._pos.y = o.y = lp_y.y;
        }
        else {
            var lp_x = o.parent.toLocal(p);
            var lp_y = o.parent.toLocal(p);
            this._pos.x = o.x = lp_x.x;
            this._pos.y = o.y = lp_y.y;
        };
    }
};

/**
 * 拖拽结束
 */
CatcherUI.prototype.onDragEnd = function(e) {
    var self = this,
        o = self.gameObject;
    self._press = false;

    console.log("dragEnd");
};

// define a user behaviour
var FallItemUI = qc.defineBehaviour('qc.engine.FallItemUI', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;

    var self = this,
        o = self.gameObject;
    // self._press = false;
    // self._pos = new qc.Point(0, 0);
    // self._mousepos = new qc.Point(0, 0);
    // 
    self.score = 10;
}, {
    testPrefab: qc.Serializer.PREFAB
});

Object.defineProperties(FallItemUI.prototype, {
    pos_x: {
        get: function() {
            return this._pos.x;
        },
        set: function(v) {
            this._pos.x = v;
        }
    },

    pos_y: {
        get: function() {
            return this._pos.y;
        },
        set: function(v) {
            this._pos.y = v;
        }
    },

    pos: {
        get: function() {
            return this._pos;
        },
        set: function(v) {
            this._pos = v;
        }
    }

});

// Called when the script instance is being loaded.
FallItemUI.prototype.awake = function() {
    var self = this;
};

// Called every frame, if the behaviour is enabled.
//FallItemUI.prototype.update = function() {
//
//};


/**
 * 鼠标按下：放大区块
 */
// FallItemUI.prototype.onClick = function(e) {
//     var self = this,
//         o = self.gameObject;
// };



FallItemUI.prototype.dispear = function() {
    var self = this,
        o = self.gameObject;
        
    //自己消失
    var ta = self.getScript("qc.TweenAlpha");
    o.visible = true;
    ta.resetToBeginning();
    ta.onFinished.addOnce(function() {
        // 隐藏掉
        o.visible = false;
        o.destroy();
    });
    ta.playForward();

    //分数效果
        //加载积分对象，加载对象相关脚本
    if (self.testPrefab) {
        var testScript = self.game.add.clone(self.testPrefab, self.gameObject.parent);
        self.test = testScript.getScript("qc.engine.ScoreUI");
    };

    var textScore = self.score > 0 ? "+"+self.score.toString() : self.score.toString();
    self.test.show(textScore);
};
'use strict';


var ScoreUI = qc.defineBehaviour('qc.engine.ScoreUI', qc.Behaviour, function() {
}, {
});


ScoreUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    o.visible = false;
};


ScoreUI.prototype.update = function() {

};

ScoreUI.prototype.show = function(text) {
    var self = this,
        o = self.gameObject,
        group = self.getScript('qc.TweenAlpha');

    o.text = text;
    o.visible = true;
    group.resetGroupToBeginning();
    group.onFinished.addOnce(function() {
        // 隐藏掉
        o.visible = false;
        o.destroy();
    });
    group.playGroupForward();
};

'use strict';


var TestSpriteUI = qc.defineBehaviour('qc.engine.TestSpriteUI', qc.Behaviour, function() {

    var self = this;

    self.itemFactory = new qc.CatchGame.FallItemFactory();

    self.catcher = new qc.CatchGame.CatcherLogic();

}, {
    testPrefab: qc.Serializer.PREFAB,
    catcherPrefab: qc.Serializer.PREFAB,
    worldNode: qc.Serializer.NODE
});


TestSpriteUI.prototype.awake = function() {
    var self = this;

    if (self.catcherPrefab) {
        var testObject = self.game.add.clone(self.catcherPrefab, self.worldNode);
        self.test = testObject.getScript("qc.engine.CathcerUI");
    };
};


TestSpriteUI.prototype.update = function() {

};

TestSpriteUI.prototype.onClick = function(){
    this.onCreatePoolFallItem();
};

TestSpriteUI.prototype.onCreatePoolFallItem = function() {
    var self = this;

    var area = {
        x:0,
        y:0,
        width:640,
        height:960,
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
    }
    else {
        self.flag = false;


        self.test.dispear();
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



}).call(this, this, Object);
