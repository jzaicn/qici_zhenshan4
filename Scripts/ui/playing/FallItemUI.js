// define a user behaviour
var FallItemUI = qc.defineBehaviour('qc.engine.FallItemUI', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;

    var self = this,
        o = self.gameObject;
        
    self._scoretext = "";
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

    self.test.show(self._scoretext);
};

//跌出区域删除自己
FallItemUI.prototype.onFallout = function() {
    var self = this,
        o = self.gameObject;

    o.destroy();
};

//设置碰撞显示分数
FallItemUI.prototype.setScore = function(score) {
    var self = this;
    self._scoretext = score > 0 ? "+"+ score.toString() : score.toString();
};