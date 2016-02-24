'use strict';


var MusicBtnUI = qc.defineBehaviour('qc.engine.MusicBtnUI', qc.Behaviour, function() {
    var self = this;

    self._playing = qc.CatchGame.DEFAULT_MUSIC_PLAYING;
}, {
});


MusicBtnUI.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    //设置图片默认状态
    if (self._playing === false) {
        o.frame = "music_off.png";
    }
    else {
        o.frame = "music_on.png";
    }
};


MusicBtnUI.prototype.update = function() {

};


MusicBtnUI.prototype.onClick = function() {
    var self = this,
        o = self.gameObject;

    if (self._playing === false) {
        //TODO: 播放音乐
        self._playing = true;
        o.frame = "music_on.png";
        console.log('music playing');
    }
    else {
        //TODO: 暂停音乐
        self._playing = false;
        o.frame = "music_off.png";
        console.log('music pause');
    }
};