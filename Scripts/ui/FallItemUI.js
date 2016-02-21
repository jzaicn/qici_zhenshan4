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