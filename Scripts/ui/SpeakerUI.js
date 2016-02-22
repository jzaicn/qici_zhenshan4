'use strict';


var SpeakerUI = qc.defineBehaviour('qc.engine.SpeakerUI', qc.Behaviour, function() {

    var self = this;

    
}, {
    // BackgroundNode: qc.Serializer.NODE,
    TextNode: qc.Serializer.NODE,
});


SpeakerUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    
    //关联本对象和逻辑对象
    qc.CatchGame.speaker.init(self);
};


//绑定自己到游戏实际逻辑对象
SpeakerUI.prototype.init = function(logicObj,detectArea) {
    var self = this,
        o = self.gameObject;


};
//更新游戏实际逻辑对象位置
SpeakerUI.prototype.setWord = function(text){
    var self = this;


    self.TextNode.text = text;
    var nativeSize = self.TextNode.nativeSize;

    //匹配文字宽度
    // self.BackgroundNode.width = nativeSize.width + 40;
    // self.BackgroundNode.height = nativeSize.height + 40;
};
