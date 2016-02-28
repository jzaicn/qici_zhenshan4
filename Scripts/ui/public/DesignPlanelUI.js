'use strict';


var DesignPlanelUI = qc.defineBehaviour('qc.engine.DesignPlanelUI', qc.Behaviour, function() {

    var self = this;

}, {
});


DesignPlanelUI.prototype.awake = function() {
	var self = this,
		o = self.gameObject;

	o.visible = false;
};


DesignPlanelUI.prototype.update = function() {
};

//被上层调用，重新初始化相关地方
DesignPlanelUI.prototype.setup = function() {
};

//被上层调用，关闭相关地方
DesignPlanelUI.prototype.clearup = function() {
};

DesignPlanelUI.prototype.onClick = function() {
	var self = this,
		o = self.gameObject;

	var pool = [];
	var pos = {
		x:0,
		y:0,
	};
	qc_game.log.trace("{0},{1}|",pos.x,pos.y);
};