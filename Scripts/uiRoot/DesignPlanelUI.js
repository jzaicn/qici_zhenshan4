'use strict';


var DesignPlanelUI = qc.defineBehaviour('qc.engine.DesignPlanelUI', qc.Behaviour, function() {

    var self = this;

}, {
    FallItemPrefab: qc.Serializer.PREFAB,
});


DesignPlanelUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    o.visible = true;
};


DesignPlanelUI.prototype.update = function() {};

//被上层调用，重新初始化相关地方
DesignPlanelUI.prototype.setup = function() {};

//被上层调用，关闭相关地方
DesignPlanelUI.prototype.clearup = function() {};

DesignPlanelUI.prototype.onPosition = function() {
    var self = this,
        o = self.gameObject;

    var pool = o.children;
    var str = "";
    for (var i = 0; i < pool.length; i++) {
        var pos = {
            x: pool[i].x,
            y: pool[i].y,
        };

        str += pos.x + "," + pos.y + "|";
    };
    qc_game.log.trace(str);
};

DesignPlanelUI.prototype.onClick = function(e) {
    var self = this;
    var o = self.gameObject;

    if (qc.CatchGame.ok) {
        var pos = {
            x: e.source.x,
            y: e.source.y,
        }

        if (self.FallItemPrefab) {
            var newItem = self.game.add.clone(self.FallItemPrefab, o);

            //判断元素位置变化
            var item_pos = o.toLocal(pos);

            newItem.x = item_pos.x;
            newItem.y = item_pos.y;

        };
    };


};
/*
1

292.8813359602672,902.1468359681029|178.98303802450616,818.9829993800869|79.5480160170957,730.3954343189395|47.005645178306835,578.531037071258|135.59321023945432,414.0112733862698|265.76269359460986,274.8022425758952|399.547995931853,157.2881256580465|526.1016603049208,61.468922632723725|623.7287728212874,10.847456883496593| 

2.



*/