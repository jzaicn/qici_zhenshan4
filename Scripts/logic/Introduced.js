/**
 * 维护介绍页面是否出现过
 */
var Introduced = qc.CatchGame.Introduced = function() {
    var self = this;

    self._introduced = false;

    // 将本地数据读取出来
    var game = qc.CatchGame.game;
    var introduced = game.storage.get('introduced'); 
    if (introduced) self._introduced = introduced;
};
Introduced.prototype = {};
Introduced.prototype.constructor = Introduced;

Object.defineProperties(Introduced.prototype, {
    state: {
        get: function() { return this._introduced; },
        set: function(v) {
            this._introduced = v;
            var storage = qc.Tetris.game.storage;
            storage.set('introduced', v);
            storage.save();
        }
    }
});