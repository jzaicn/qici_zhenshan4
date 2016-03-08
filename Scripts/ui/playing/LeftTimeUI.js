'use strict';


var LeftTimeUI = qc.defineBehaviour('qc.engine.LeftTimeUI', qc.Behaviour, function() {

    var self = this;

    
}, {
    // BackgroundNode: qc.Serializer.NODE,
    TextNode: qc.Serializer.NODE,
});


LeftTimeUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    
    //关联本对象和逻辑对象
    qc.CatchGame.time.init(self);
};


//绑定自己到游戏实际逻辑对象
LeftTimeUI.prototype.init = function(logicObj,detectArea) {
    var self = this,
        o = self.gameObject;


};
//更新游戏实际逻辑对象位置
LeftTimeUI.prototype.setWord = function(text){
    var self = this;


    self.TextNode.text = text;
    var nativeSize = self.TextNode.nativeSize;

};
