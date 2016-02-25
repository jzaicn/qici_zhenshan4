'use strict';


var ShowRewardUI = qc.defineBehaviour('qc.engine.ShowRewardUI', qc.Behaviour, function() {

    var self = this;

    self._update_enable = false;

    self._frameGroup = qc.CatchGame.REWARD_GROUP;

    self._endWith = "jiang1.png";

    self._frame = "jiang1.png",
        self._blur = 3,
        self._duration = 0.1;
    self._showtimes = 10;
}, {
    Price1Node: qc.Serializer.NODE,
    Price2Node: qc.Serializer.NODE,
    Share1Node: qc.Serializer.NODE,
    Share2Node: qc.Serializer.NODE,
});


ShowRewardUI.prototype.awake = function() {
    var self = this;

    if (self.Price1Node) {
        self.price1Position = self.Price1Node.getScript("qc.TweenPosition");
        self.price1FilterGroup = self.Price1Node.getScript("qc.FilterGroup");
        self.price1BlurX = self.price1FilterGroup.filters[0];
    };

    if (self.Price2Node) {
        self.price2Position = self.Price2Node.getScript("qc.TweenPosition");
        self.Price2Node.visible = false;
    };
};


// ShowRewardUI.prototype.update = function() {
//     var self = this;
//     if (self._update_enable === true) {

//     };
// };

ShowRewardUI.prototype.onDetail = function(frame, blur, duration, onFinished) {
    var self = this,
        o = self.gameObject;

    o.frame = frame;
    self.price1BlurX.blur = blur;
    self.price1Position.duration = duration;
    self.price1Position.resetToBeginning();
    self.price1Position.playForward();

    self.price1Position.onFinished.addOnce(onFinished);
};

ShowRewardUI.prototype.onFinished = function() {
    var self = this;
    console.log("onFinished");

    self._showtimes--;
    if (self._showtimes > 0) {
        self.onDetail(self._frame, self._blur -= 0.3, self._duration += 0.1, self.onFinished);
    } else {
        console.log("over");
    };
};

ShowRewardUI.prototype.onShow = function() {
    var self = this;

    self._frame = "jiang1.png",
        self._blur = 3,
        self._duration = 0.1;
    self._showtimes = 10;

    self.onDetail(self._frame, self._blur, self._duration, self.onFinished);









    // var self = this;

    // var len = qc.CatchGame.REWARD_GROUP.length;
    // var len_double = qc.CatchGame.REWARD_GROUP.length * 2;

    // //先确定是哪个结果
    // var index = 0;
    // for (var i = 0; i < self._frameGroup.length; i++) {
    //     if (self._endWith === self._frameGroup[i].icon) {//TODO: 确认这个调用
    //         index = i;
    //         break;
    //     };
    // };

    // //建立显示用数组
    // var showGroupIndex = [];
    // for (var i = 0; i < len_double; i++) {
    //     showGroupIndex.push(index%len);
    //     index++;
    // };
    // var showGroup = [];
    // showGroupIndex.map(function(v){
    //     showGroup.push(self._frameGroup[v].icon);
    // });

    // var status = 0;
    // clearInterval(self.timer);
    // self.timer = setInterval(function(){
    //     switch(status){
    //         case 0 :

    //     }
    // }, 500);


    //TODO: 实现几等奖动画
    //TODO: 最后定格后显示分享

};
