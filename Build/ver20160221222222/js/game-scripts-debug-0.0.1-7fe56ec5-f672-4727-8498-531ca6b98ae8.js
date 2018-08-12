/**
 * 用户自定义脚本.
 */
(function(window, Object, undefined) {





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

window.arrRemove = function(arr ,b) {
    var a = arr.indexOf(b);
    if (a >= 0) {
        arr.splice(a, 1);
        return true;
    }
    return false;
}

//类似于foreach
window.doPoolObject = function(poolObj, func) {
    for (var i = 0; i < poolObj.length; i++) {
        if (func) {
            func(poolObj, i, poolObj[i]);
        };
    };
};

//删除指定indexgroup的元素
window.arrayDelIndexGroup = function(indexgroup, poolObj) {
    indexgroup.sort(function(a, b) {
        return a > b ? 1 : -1 });
    for (var i = indexgroup.length - 1; i >= 0; i--) {
        if (poolObj.length > indexgroup[i]) {
            poolObj.splice(indexgroup[i], 1);
        };
    };
}
'use strict';
/**
 * 游戏入口
 */
window.CatchGame = qc.CatchGame = {

    FALL_SPEED : 2,

    RAISE_LEVEL : -20,
    SEA_LEVEL : 980,

    DATA_SOURCE : [
        { id: 3, icon: "3.png", score: 10, noRepeatRadius: 500, noOtherRadius: 200 },
        { id: 0, icon: "0.png", score: 10, noRepeatRadius: 300, noOtherRadius: 200 },
        { id: 1, icon: "1.png", score: 10, noRepeatRadius: 180, noOtherRadius: 100 },
        { id: 2, icon: "2.png", score: 10, noRepeatRadius: 180, noOtherRadius: 100 },
    ],

    status : "run",

    // 所有的操作指令集合
    operation: {},
};

// 游戏逻辑初始化
qc.initGame = function(game) {

    // 初始化捕获者
    CatchGame.catcher = new qc.CatchGame.CatcherLogic();

    // 初始化下落物工厂
    CatchGame.fallitemFactory = new qc.CatchGame.FallItemFactory();

    // 初始化下落物
    CatchGame.fallitemPool = new qc.CatchGame.FallItemPoolLogic();

    //初始化提示语言

};

qc.CatchGame.restart = function(){
    var self = this;
    // 初始化捕获者
    self.status = "run";

    // 初始化下落物

    //初始化提示语言
}

qc.CatchGame.updateScore = function(v){
    //更新分数
};

qc.CatchGame.isCrash = function(pos){
    var crash_box = qc.CatchGame.catcher.getDetectBox();
    var crash2 = {
        x: crash_box.x - 40,
        y: crash_box.y - 40,
        width: crash_box.width + 80,
        height: crash_box.height +80,
    }
    //该点到box上2个角距离>到
    if (crash2.x < pos.x && pos.x < (crash2.x + crash2.width)) {
        if (crash2.y < pos.y && pos.y < (crash2.y + crash2.height)) {
            return true;
        };
    };
    return false;
}


qc.CatchGame.bandUIObj  = function(uiObj){
    this.uiObj = uiObj;
}

qc.CatchGame.isRunning = function(){
    var self = this;
    switch(self.status){
        case "run":
            return true;
            break;
        case "stop":
        default:
            return false;
    }
}
"use strict";

/**
 * 维护分数信息
 */
var FallItemFactory = qc.CatchGame.FallItemFactory = function() {
    var self = this;

    self.factorydata = qc.CatchGame.DATA_SOURCE;

    self.data = [];
    for (var i = 0; i < self.factorydata.length; i++) {
        var item = new qc.CatchGame.FallItemLogic();
        item.initObj(self.factorydata[i]);
        self.data.push(item);
    };


    self.tryUpTimes = 5;
};
FallItemFactory.prototype = {};
FallItemFactory.prototype.constructor = FallItemFactory;

Object.defineProperties(FallItemFactory.prototype, {

});

//填充区域
FallItemFactory.prototype.fillPoolWithArea = function(area,pool) {
    var self = this;
    var bigPool = [];

    //每个对象循环放置
    for (var i = 0; i < self.data.length; i++) {
        var everyElement = self.data[i];

        //以当前池已经拥有的对象和新建的对象为基础，创建新的元素
        var newItems = self.fillUP(everyElement,area,bigPool.concat(pool))

        //所有新增加的元素都应该放置在这，以备后续添加
        bigPool = bigPool.concat(newItems);
    };
    //先排序，方便后续使用
    bigPool.sort(function(a, b) {
        if (a.y>=b.y) {
            return 1;
        }
        else {
            if (a.x>=b.x) {
                return 1;
            };
        };
        return -1; 
    });
    return bigPool;
};

//使用一个元素填充，直到5次填充失败，则这个元素填充完成
FallItemFactory.prototype.fillUP = function(everyElement,area,bigPool) {
    var self = this;
    var trytime = self.tryUpTimes;
    var pool = [];

    while (true) {
        //随机位置
        var pos_random = {
            x: Math.random() * area.width + area.x,
            y: Math.random() * area.height + area.y,
        };

        //该位置没有元素，或者没有同ID元素
        if (self.putCheck(everyElement.id, pos_random , pool.concat(bigPool))) {
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
    self._x = 0;
    self._y = 0;
    self.noRepeatRadius = 0;
    self.noOtherRadius = 0;
    self.score = 0;
    self.o = null;
};
FallItemLogic.prototype = {};
FallItemLogic.prototype.constructor = FallItemLogic;

Object.defineProperties(FallItemLogic.prototype, {
    x: {
        get: function() {
            return this._x;
        },
        set: function(v) {
            this._x = v;
            if (this.o) {
                this.o.x = v;
            };
        }
    },
    y: {
        get: function(){
            return this._y;
        },
        set: function(v){
            this._y = v;
            if (this.o) {
                this.o.y = v;
            };
        }
    }
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
    var obj = new FallItemLogic();

    obj.icon = self.icon;
    obj.id = self.id;
    obj.x = self.x;
    obj.y = self.y;
    obj.noRepeatRadius = self.noRepeatRadius;
    obj.noOtherRadius = self.noOtherRadius;
    obj.score = self.score;

    return obj;
};

"use strict";

/**
 * 维护分数信息
 */
var FallItemPoolLogic = qc.CatchGame.FallItemPoolLogic = function() {
    var self = this;

    self.currentPool = [];

    self.raiseLine = qc.CatchGame.RAISE_LEVEL;
    self.fallOutLine = qc.CatchGame.SEA_LEVEL;
    
};
FallItemPoolLogic.prototype = {};
FallItemPoolLogic.prototype.constructor = FallItemPoolLogic;

Object.defineProperties(FallItemPoolLogic.prototype, {

});

FallItemPoolLogic.prototype.init = function(uiObj) {
    this.uiObj = uiObj;
};

//所有池中的对象全部偏移指定的数值
FallItemPoolLogic.prototype.updateAllPoolObject = function(pos_diff) {
    var self = this;

    //处理位置偏移
    var pos_add = function(operaPool,index,value){
        value.x += pos_diff.x;
        value.y += pos_diff.y;
    };
    doPoolObject(self.currentPool,pos_add);
};


//返回超出掉出线的物品index数组
FallItemPoolLogic.prototype.checkFalloutPoolObject = function() {
    var self = this;
    var indexgroup = [];

    //处理位置偏移
    var check_fallout = function(operaPool,index,value){
        if (value.y > self.fallOutLine) {
            var effect = value.o.getScript("qc.engine.FallItemUI");
            effect.onFallout();
            indexgroup.push(index);
        };
    };
    doPoolObject(self.currentPool,check_fallout);
    self.delItemIndexArr(indexgroup);
};

//返回发生碰撞的物品index数组
FallItemPoolLogic.prototype.checkCrashPoolObject = function() {
    var self = this;
    var indexgroup = [];

    //处理位置偏移
    var check_crash = function(operaPool,index,value){
        if (qc.CatchGame.isCrash({x:value.x,y:value.y})) {
            var effect = value.o.getScript("qc.engine.FallItemUI");
            effect.onCrash();
            indexgroup.push(index);
            console.log("score:",value.score);
        };
    };
    doPoolObject(self.currentPool,check_crash);
    self.delItemIndexArr(indexgroup);
};

//增加元素
FallItemPoolLogic.prototype.additem = function(item) {
    var self = this;
    
    self.currentPool.push(item);

    self.uiObj.additem(item);
};

//增加元素数组
FallItemPoolLogic.prototype.additems = function(items) {
    var self = this;
    
    for (var i = 0; i < items.length; i++) {
        self.currentPool.push(items[i]);
        self.uiObj.additem(item);
    };
    
};

//删除元素
FallItemPoolLogic.prototype.delItem = function(item) {
    var self = this;
    
    self.currentPool.remove(item);//TODO: 更改ui部分
};

//删除元素数组
FallItemPoolLogic.prototype.delItem = function(items) {
    var self = this;
    
    for (var i = 0; i < items.length; i++) {
        self.currentPool.remove(items[i]);
    };
    
};

//删除元素index
FallItemPoolLogic.prototype.delItemIndex = function(index) {
    var self = this;
    var indexGroup = [index];
    arrayDelIndexGroup(indexgroup,self.currentPool);
};

//删除元素index数组
FallItemPoolLogic.prototype.delItemIndexArr = function(indexgroup) {
    var self = this;
    
    arrayDelIndexGroup(indexgroup,self.currentPool);
};


FallItemPoolLogic.prototype.getPool = function() {
    return this.currentPool;
};


FallItemPoolLogic.prototype.checkPoolNeedNew = function() {
    var self = this;
    if (self.currentPool.length > 0) {
        if (self.currentPool[self.currentPool.length -1].y > self.raiseLine) {
            return true;
        };
    }
    else{
        return true;
    };
    return false;
};

'use strict';


var UIManager = qc.defineBehaviour('qc.engine.UIManager', qc.Behaviour, function() {

    var self = this;

    var seaLevel = 0;

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
        self.FallCreateAreaNode.visable = false;
    }

    //绑定对象池
    if (self.FallPoolNode) {
        self.fallPool = self.FallPoolNode.getScript("qc.engine.FallItemPoolUI");
        qc.CatchGame.fallitemPool.init(self.fallPool);
    };

    //Gameinit
    qc.CatchGame.bandUIObj(self);

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
        self.fallPool.fallOut();//TODO: 考虑这个是不是移动到自定义计时器
        self.fallPool.crashUp();
        if (self.fallPool.need2Create()) {
            self.createItems();
        };
    };
};


UIManager.prototype.shutdown = function() {
	
};


"use strict";

/**
 * 维护分数信息
 */
var CatcherLogic = qc.CatchGame.CatcherLogic = function() {
    var self = this;

    self.x = 0;
    self.y = 0;
    //定义碰撞范围
    self.detectArea = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
    //用于计算坐标变化
    self._countOffset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
};
CatcherLogic.prototype = {};
CatcherLogic.prototype.constructor = CatcherLogic;

Object.defineProperties(CatcherLogic.prototype, {
});

//计算当前偏差值，创建时一次即可
CatcherLogic.prototype.countBoxOffset = function() {
    var self = this;
	self._countOffset.x = self.x - self.detectArea.x;
	self._countOffset.y = self.y - self.detectArea.y;
};

//更新detectArea位置
CatcherLogic.prototype.updateBox = function() {
    var self = this;
    self.detectArea.x = self.x - self._countOffset.x ;
	self.detectArea.y = self.y - self._countOffset.y ;
};

CatcherLogic.prototype.getDetectBox = function() {
    var self = this;
    self.updateBox();

    return self.detectArea;
};
'use strict';


var FallItemPoolUI = qc.defineBehaviour('qc.engine.FallItemPoolUI', qc.Behaviour, function() {

    var self = this;

    self.fallSpeed = qc.CatchGame.FALL_SPEED;
}, {
    FallItemPrefab: qc.Serializer.PREFAB,
});


FallItemPoolUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

};


FallItemPoolUI.prototype.update = function() {
    //TODO: 更新自己池子里面元素下落坐标
};

//外部传入fallmodel，这里创建图形，同时在逻辑对象创建匹配的对象
FallItemPoolUI.prototype.additem = function(datainfo) {
    var self = this,
        o = self.gameObject;

    //添加UI对象
    var fallitem = self.game.add.clone(self.FallItemPrefab, o);
    fallitem.frame = datainfo.icon;
    fallitem.x = datainfo.x;
    fallitem.y = datainfo.y;
    fallitem.visable = true;

    datainfo.o = fallitem;
};

FallItemPoolUI.prototype.fallAll = function() {
    var self = this;
    qc.CatchGame.fallitemPool.updateAllPoolObject({
        x:0,
        y:self.fallSpeed,
    });
};

FallItemPoolUI.prototype.fallOut = function() {
    var self = this;
    qc.CatchGame.fallitemPool.checkFalloutPoolObject();
};

FallItemPoolUI.prototype.crashUp = function() {
    var self = this;
    qc.CatchGame.fallitemPool.checkCrashPoolObject();
};

FallItemPoolUI.prototype.need2Create = function() {
    return qc.CatchGame.fallitemPool.checkPoolNeedNew();
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



//碰撞显示得分
FallItemUI.prototype.onCrash = function() {
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
        self.test.setPos(o.x,o.y);
    };

    var textScore = self.score > 0 ? "+"+self.score.toString() : self.score.toString();
    self.test.show(textScore);
};

//跌出区域删除自己
FallItemUI.prototype.onFallout = function() {
    var self = this,
        o = self.gameObject;

    o.destroy();
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
        tAlpha = self.getScript('qc.TweenAlpha'),
        tPosition = self.getScript('qc.TweenPosition');

    o.text = text;
    o.visible = true;
    //tAlpha.resetGroupToBeginning();

    //偏移到对象位置
    tPosition.from.x += o.x;
    tPosition.from.y += o.y;
    tPosition.to.x += o.x;
    tPosition.to.y += o.y;

    tAlpha.onFinished.addOnce(function() {
        // 隐藏掉
        o.visible = false;
        o.destroy();
    });

    tAlpha.playGroupForward();
};

ScoreUI.prototype.setPos = function(x,y) {
    var self = this,
        o = self.gameObject;
    o.x = x;
    o.y = y;
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
    this.onCreateOneFallItem()
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


var ObjectAreaUI = qc.defineBehaviour('qc.engine.ObjectAreaUI', qc.Behaviour, function() {

}, {});

ObjectAreaUI.prototype.currentBox = function() {
    var self = this,
        o = self.gameObject;

    var _worldBox = {
        x: o.x,
        y: o.y,
        width: o.width,
        height: o.height,
    };

    return _worldBox;
};

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
    self.logicObj = null;

    //游戏对象转换为世界坐标
    self.pos = { 
        get x() {
            return this._x;
        },
        set x(v) {
            self.updateLogicX(v);
            this._x = v;
        },
        get y() {
            return this._y;
        },
        set y(v) {
            self.updateLogicY(v);
            this._y = v;
        },
        _x: 0,
        _y: 0,
    };
}, {
    CheckAreaNode: qc.Serializer.NODE,
    ImageNode: qc.Serializer.NODE,
    AreaNode: qc.Serializer.NODE,
    WorldNode: qc.Serializer.NODE,
});


CatcherUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    //获取鼠标移动的范围
    if (self.AreaNode) {
        self.Area = self.AreaNode.getScript("qc.engine.ObjectAreaUI");
        self.moveing_area = self.Area.currentBox();
        self.AreaNode.visable = false;
    }

    //获取名下检测区域
    var detectArea = {};
    if (self.CheckAreaNode) {
        self.CheckArea = self.CheckAreaNode.getScript("qc.engine.ObjectAreaUI");
        detectArea = self.CheckArea.currentBox();
        self.CheckAreaNode.visable = false;
        detectArea.x += o.x;
        detectArea.y += o.y;
    }
    
    //关联本对象和逻辑对象
    self.init(qc.CatchGame.catcher,detectArea);

};


CatcherUI.prototype.update = function() {

};

//绑定游戏实际逻辑对象
CatcherUI.prototype.init = function(logicObj,detectArea) {
    var self = this,
        o = self.gameObject;

    self.logicObj = logicObj;
    self.logicObj.x = o.x;
    self.logicObj.y = o.y;

    self.logicObj.detectArea = detectArea;

    self.logicObj.countBoxOffset();

};
//更新游戏实际逻辑对象位置
CatcherUI.prototype.updateLogicX = function(v){
    this.logicObj.x = v;
}
//更新游戏实际逻辑对象位置
CatcherUI.prototype.updateLogicY = function(v){
    this.logicObj.y = v;
}

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
            this.pos.x = o.x = lp.x;
            this.pos.y = o.y = lp.y;
        } else if (window.inBox_x(self.moveing_area, item_pos)) {
            var lp_x = o.parent.toLocal(self._mousepos);
            var lp_y = o.parent.toLocal(p);
            this.pos.x = o.x = lp_x.x;
            this.pos.y = o.y = lp_y.y;
        } else if (window.inBox_y(self.moveing_area, item_pos)) {
            var lp_x = o.parent.toLocal(p);
            var lp_y = o.parent.toLocal(self._mousepos);
            this.pos.x = o.x = lp_x.x;
            this.pos.y = o.y = lp_y.y;
        } else {
            var lp_x = o.parent.toLocal(p);
            var lp_y = o.parent.toLocal(p);
            this.pos.x = o.x = lp_x.x;
            this.pos.y = o.y = lp_y.y;
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


}).call(this, this, Object);
