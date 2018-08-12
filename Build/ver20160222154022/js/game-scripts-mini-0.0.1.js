(function(e,t,n){e.inBox=function(e,t){return inBox_x(e,t)&&inBox_y(e,t)?!0:!1},e.inBox_x=function(e,t){return e.x<=t.x&&t.x<=e.x+e.width?!0:!1},e.inBox_y=function(e,t){return e.y<=t.y&&t.y<=e.y+e.height?!0:!1},e.distanceSquare=function(e,t,n,r){var i=Math.pow(Math.abs(e-n),2),s=Math.pow(Math.abs(t-r),2);return i+s},e.distance=function(t,n,r,i){return Math.sqrt(distanceSquare(t,n,r,i))},e.checkPointInRadius=function(e,t,n){return distance(e.x,e.y,n.x,n.y)<t?!0:!1},e.arrRemove=function(e,t){var n=e.indexOf(t);return n>=0?(e.splice(n,1),!0):!1},e.doPoolObject=function(e,t){for(var n=0;n<e.length;n++)t&&t(e,n,e[n])},e.arrayDelIndexGroup=function(e,t){e.sort(function(e,t){return e>t?1:-1});for(var n=e.length-1;n>=0;n--)t.length>e[n]&&t.splice(e[n],1)},"use strict",e.CatchGame=qc.CatchGame={FALL_SPEED:4,RAISE_LEVEL:-20,SEA_LEVEL:980,SPEAK_BOX_MIX_WIDTH:600,DATA_SOURCE:[{id:0,icon:"13.png",score:10,noRepeatRadius:1500,noOtherRadius:160},{id:1,icon:"12.png",score:10,noRepeatRadius:1500,noOtherRadius:160},{id:2,icon:"11.png",score:10,noRepeatRadius:1500,noOtherRadius:160},{id:3,icon:"10.png",score:10,noRepeatRadius:1500,noOtherRadius:160},{id:4,icon:"7.png",score:1,noRepeatRadius:150,noOtherRadius:160},{id:5,icon:"8.png",score:1,noRepeatRadius:150,noOtherRadius:160},{id:6,icon:"9.png",score:1,noRepeatRadius:150,noOtherRadius:160},{id:7,icon:"1.png",score:-3,noRepeatRadius:150,noOtherRadius:160},{id:8,icon:"2.png",score:-3,noRepeatRadius:150,noOtherRadius:160},{id:9,icon:"3.png",score:-3,noRepeatRadius:150,noOtherRadius:160},{id:10,icon:"0.png",score:-100,noRepeatRadius:1e3,noOtherRadius:160},{id:11,icon:"4.png",score:5,noRepeatRadius:500,noOtherRadius:160},{id:12,icon:"5.png",score:5,noRepeatRadius:500,noOtherRadius:160},{id:13,icon:"6.png",score:5,noRepeatRadius:500,noOtherRadius:160}],status:"run",operation:{}},qc.initGame=function(e){CatchGame.itemSignal=new qc.Signal,CatchGame.catcher=new qc.CatchGame.CatcherLogic,CatchGame.fallitemFactory=new qc.CatchGame.FallItemFactory,CatchGame.fallitemPool=new qc.CatchGame.FallItemPoolLogic,CatchGame.speaker=new qc.CatchGame.SpeakerLogic,CatchGame.itemSignal.add(qc.CatchGame.onItemSignal)},qc.CatchGame.onItemSignal=function(e){switch(e.eventType){case 1:qc.CatchGame.speaker.setScore(e);default:}},qc.CatchGame.restart=function(){var e=this;e.status="run"},qc.CatchGame.bandUIObj=function(e){this.uiObj=e},qc.CatchGame.isRunning=function(){var e=this;switch(e.status){case"run":return!0;case"stop":default:return!1}},qc.CatchGame.isCrash=function(e){var t=qc.CatchGame.catcher.getDetectBox(),n={x:t.x-40,y:t.y-40,width:t.width+80,height:t.height+80};return n.x<e.x&&e.x<n.x+n.width&&n.y<e.y&&e.y<n.y+n.height?!0:!1},"use strict";var r=qc.CatchGame.FallItemFactory=function(){var e=this;e.factorydata=qc.CatchGame.DATA_SOURCE,e.data=[];for(var t=0;t<e.factorydata.length;t++){var n=new qc.CatchGame.FallItemLogic;n.initObj(e.factorydata[t]),e.data.push(n)}e.tryUpTimes=5};r.prototype={},r.prototype.constructor=r,t.defineProperties(r.prototype,{}),r.prototype.fillPoolWithArea=function(e,t){var n=this,r=[];for(var i=0;i<n.data.length;i++){var s=n.data[i],o=n.fillUP(s,e,r.concat(t));r=r.concat(o)}return r.sort(function(e,t){return e.y>=t.y?1:e.x>=t.x?1:-1}),r},r.prototype.fillUP=function(e,t,n){var r=this,i=r.tryUpTimes,s=[];for(;;){var o={x:Math.random()*t.width+t.x,y:Math.random()*t.height+t.y};if(r.putCheck(e.id,o,s.concat(n)))e.x=o.x,e.y=o.y,s.push(e.clone());else{i--;if(i<0)break}}return s},r.prototype.putCheck=function(e,t,n){var r=this;for(var i=0;i<n.length;i++){var s=n[i];if(s.id==e&&checkPointInRadius({x:s.x,y:s.y},s.noRepeatRadius,t))return!1;if(checkPointInRadius({x:s.x,y:s.y},s.noOtherRadius,t))return!1}return!0},"use strict";var i=qc.CatchGame.FallItemLogic=function(){var e=this;e.icon="",e.id="",e._x=0,e._y=0,e.noRepeatRadius=0,e.noOtherRadius=0,e.score=0,e.o=null};i.prototype={},i.prototype.constructor=i,t.defineProperties(i.prototype,{x:{get:function(){return this._x},set:function(e){this._x=e,this.o&&(this.o.x=e)}},y:{get:function(){return this._y},set:function(e){this._y=e,this.o&&(this.o.y=e)}}}),i.prototype.init=function(e,t,n,r,i,s,o){var u=this;u.icon=t,u.id=e,u.x=n,u.y=r,u.noRepeatRadius=i,u.noOtherRadius=s,u.score=o},i.prototype.initObj=function(e){var t=this;t.icon=e.icon,t.id=e.id,t.noRepeatRadius=e.noRepeatRadius,t.noOtherRadius=e.noOtherRadius,t.score=e.score},i.prototype.clone=function(){var e=this,t=new i;return t.icon=e.icon,t.id=e.id,t.x=e.x,t.y=e.y,t.noRepeatRadius=e.noRepeatRadius,t.noOtherRadius=e.noOtherRadius,t.score=e.score,t},i.prototype.getInfo=function(e){var t=this,n={eventType:1,score:t.score};return n},i.prototype.getCrashInfo=function(e){},i.prototype.getFallInfo=function(e){},i.prototype.onChangeEvent=function(){var e=this;if(e.icon=="7.png"||e.icon=="8.png")e.o.frame="9.png",e.timer=setTimeout(function(){clearTimeout(e.timer),e.o.frame=e.icon},1e3)},"use strict";var s=qc.CatchGame.FallItemPoolLogic=function(){var e=this;e.currentPool=[],e.raiseLine=qc.CatchGame.RAISE_LEVEL,e.fallOutLine=qc.CatchGame.SEA_LEVEL};s.prototype={},s.prototype.constructor=s,t.defineProperties(s.prototype,{}),s.prototype.init=function(e){this.uiObj=e},s.prototype.updateAllPoolObject=function(e){var t=this,n=function(t,n,r){r.x+=e.x,r.y+=e.y};doPoolObject(t.currentPool,n)},s.prototype.checkFalloutPoolObject=function(){var e=this,t=[],n=function(n,r,i){if(i.y>e.fallOutLine){var s=i.o.getScript("qc.engine.FallItemUI");s.onFallout(),t.push(r),qc.CatchGame.itemSignal.dispatch(i.getInfo())}};doPoolObject(e.currentPool,n),e.delItemIndexArr(t)},s.prototype.checkCrashPoolObject=function(){var e=this,t=[],n=function(e,n,r){if(qc.CatchGame.isCrash({x:r.x,y:r.y})){var i=r.o.getScript("qc.engine.FallItemUI");i.score=r.score,i.onCrash(),t.push(n),qc.CatchGame.itemSignal.dispatch(r.getInfo())}};doPoolObject(e.currentPool,n),e.delItemIndexArr(t)},s.prototype.additem=function(e){var t=this;t.currentPool.push(e),t.uiObj.additem(e)},s.prototype.additems=function(e){var t=this;for(var n=0;n<e.length;n++)t.currentPool.push(e[n]),t.uiObj.additem(item)},s.prototype.delItem=function(e){var t=this;t.currentPool.remove(e)},s.prototype.delItem=function(e){var t=this;for(var n=0;n<e.length;n++)t.currentPool.remove(e[n])},s.prototype.delItemIndex=function(e){var t=this,n=[e];arrayDelIndexGroup(indexgroup,t.currentPool)},s.prototype.delItemIndexArr=function(e){var t=this;arrayDelIndexGroup(e,t.currentPool)},s.prototype.getPool=function(){return this.currentPool},s.prototype.isPoolNeedNew=function(){var e=this;return e.currentPool.length>0?e.currentPool[e.currentPool.length-1].y>e.raiseLine?!0:!1:!0},"use strict";var o=qc.CatchGame.SpeakerLogic=function(){var e=this;e.score=0};o.prototype={},o.prototype.constructor=o,t.defineProperties(o.prototype,{}),o.prototype.init=function(e){this.uiObj=e},o.prototype.eventLisenter=function(e){var t=this;t.score=e,console.log("SpeakerLogic score:",t.score)},o.prototype.setScore=function(e){var t=this;t.score+=e.score;var n="Score : "+t.score.toString();t.uiObj.setWord(n)},"use strict";var u=qc.defineBehaviour("qc.engine.UIManager",qc.Behaviour,function(){var e=this,t=0},{FallCreateAreaNode:qc.Serializer.NODE,FallPoolNode:qc.Serializer.NODE});u.prototype.awake=function(){var e=this,t=e.gameObject;e.FallCreateAreaNode&&(e.FallCreateArea=e.FallCreateAreaNode.getScript("qc.engine.ObjectAreaUI"),e.FallCreateAreaNode.visable=!1),e.FallPoolNode&&(e.fallPool=e.FallPoolNode.getScript("qc.engine.FallItemPoolUI"),qc.CatchGame.fallitemPool.init(e.fallPool)),qc.CatchGame.bandUIObj(e)},u.prototype.createItems=function(){var e=this,t=e.FallCreateArea.currentBox(),n=qc.CatchGame.fallitemPool.getPool(),r=qc.CatchGame.fallitemFactory.fillPoolWithArea(t,n);while(r.length>0){var i=r.pop();qc.CatchGame.fallitemPool.additem(i)}},u.prototype.update=function(){var e=this;qc.CatchGame.isRunning()&&(e.fallPool.fallAll(),e.fallPool.fallOut(),e.fallPool.crashUp(),e.fallPool.need2Create()&&e.createItems())},u.prototype.shutdown=function(){},"use strict";var a=qc.CatchGame.CatcherLogic=function(){var e=this;e.x=0,e.y=0,e.detectArea={x:0,y:0,width:0,height:0},e._countOffset={x:0,y:0,width:0,height:0}};a.prototype={},a.prototype.constructor=a,t.defineProperties(a.prototype,{}),a.prototype.countBoxOffset=function(){var e=this;e._countOffset.x=e.x-e.detectArea.x,e._countOffset.y=e.y-e.detectArea.y},a.prototype.updateBox=function(){var e=this;e.detectArea.x=e.x-e._countOffset.x,e.detectArea.y=e.y-e._countOffset.y},a.prototype.getDetectBox=function(){var e=this;return e.updateBox(),e.detectArea},"use strict";var f=qc.defineBehaviour("qc.engine.FallItemPoolUI",qc.Behaviour,function(){var e=this;e.fallSpeed=qc.CatchGame.FALL_SPEED},{FallItemPrefab:qc.Serializer.PREFAB});f.prototype.awake=function(){var e=this,t=e.gameObject},f.prototype.update=function(){},f.prototype.additem=function(e){var t=this,n=t.gameObject,r=t.game.add.clone(t.FallItemPrefab,n);r.frame=e.icon,r.x=e.x,r.y=e.y,r.visable=!0,e.o=r},f.prototype.fallAll=function(){var e=this;qc.CatchGame.fallitemPool.updateAllPoolObject({x:0,y:e.fallSpeed})},f.prototype.fallOut=function(){var e=this;qc.CatchGame.fallitemPool.checkFalloutPoolObject()},f.prototype.crashUp=function(){var e=this;qc.CatchGame.fallitemPool.checkCrashPoolObject()},f.prototype.need2Create=function(){return qc.CatchGame.fallitemPool.isPoolNeedNew()};var l=qc.defineBehaviour("qc.engine.FallItemUI",qc.Behaviour,function(){var e=this,t=e.gameObject;e.score=10},{testPrefab:qc.Serializer.PREFAB});t.defineProperties(l.prototype,{pos_x:{get:function(){return this._pos.x},set:function(e){this._pos.x=e}},pos_y:{get:function(){return this._pos.y},set:function(e){this._pos.y=e}},pos:{get:function(){return this._pos},set:function(e){this._pos=e}}}),l.prototype.awake=function(){var e=this},l.prototype.onCrash=function(){var e=this,t=e.gameObject,n=e.getScript("qc.TweenAlpha");t.visible=!0,n.resetToBeginning(),n.onFinished.addOnce(function(){t.visible=!1,t.destroy()}),n.playForward();if(e.testPrefab){var r=e.game.add.clone(e.testPrefab,e.gameObject.parent);e.test=r.getScript("qc.engine.ScoreUI"),e.test.setPos(t.x,t.y)}var i=e.score>0?"+"+e.score.toString():e.score.toString();e.test.show(i)},l.prototype.onFallout=function(){var e=this,t=e.gameObject;t.destroy()},"use strict";var c=qc.defineBehaviour("qc.engine.ScoreUI",qc.Behaviour,function(){},{});c.prototype.awake=function(){var e=this,t=e.gameObject;t.visible=!1},c.prototype.update=function(){},c.prototype.show=function(e){var t=this,n=t.gameObject,r=t.getScript("qc.TweenAlpha"),i=t.getScript("qc.TweenPosition");n.text=e,n.visible=!0,i.from.x+=n.x,i.from.y+=n.y,i.to.x+=n.x,i.to.y+=n.y,r.onFinished.addOnce(function(){n.visible=!1,n.destroy()}),r.playGroupForward()},c.prototype.setPos=function(e,t){var n=this,r=n.gameObject;r.x=e,r.y=t},"use strict";var h=qc.defineBehaviour("qc.engine.SpeakerUI",qc.Behaviour,function(){var e=this},{TextNode:qc.Serializer.NODE});h.prototype.awake=function(){var e=this,t=e.gameObject;qc.CatchGame.speaker.init(e)},h.prototype.init=function(e,t){var n=this,r=n.gameObject},h.prototype.setWord=function(e){var t=this;t.TextNode.text=e;var n=t.TextNode.nativeSize},"use strict";var p=qc.defineBehaviour("qc.engine.TestSpriteUI",qc.Behaviour,function(){var e=this;e.itemFactory=new qc.CatchGame.FallItemFactory,e.catcher=new qc.CatchGame.CatcherLogic},{testPrefab:qc.Serializer.PREFAB,catcherPrefab:qc.Serializer.PREFAB,worldNode:qc.Serializer.NODE});p.prototype.awake=function(){var e=this;if(e.catcherPrefab){var t=e.game.add.clone(e.catcherPrefab,e.worldNode);e.test=t.getScript("qc.engine.CathcerUI")}},p.prototype.update=function(){},p.prototype.onClick=function(){this.onCreateOneFallItem()},p.prototype.onCreatePoolFallItem=function(){var e=this,t={x:0,y:0,width:640,height:960},n=e.itemFactory.getFillAreaPool(t);for(var r=0;r<n.length;r++){var i=n[r],s=e.game.add.clone(e.testPrefab,e.worldNode);s.frame=i.icon,s.x=i.x,s.y=i.y}},p.prototype.onCreateOneFallItem=function(){var e=this;console.log("onclick");if(!e.flag){e.flag=!0;var t=e.game.add.clone(e.testPrefab,e.gameObject);e.test=t.getScript("qc.engine.FallItemUI")}else e.flag=!1,e.test.onCrash()},p.prototype.onScoreDispear=function(){if(self.testPrefab){var e=self.game.add.clone(self.testPrefab,self.gameObject);self.test=e.getScript("qc.engine.ScoreUI")}self.test.show("+5")};var d=qc.defineBehaviour("qc.engine.ObjectAreaUI",qc.Behaviour,function(){},{});d.prototype.currentBox=function(){var e=this,t=e.gameObject,n={x:t.x,y:t.y,width:t.width,height:t.height};return n},"use strict";var v=qc.defineBehaviour("qc.engine.CatcherUI",qc.Behaviour,function(){var e=this;e.moveing_area={x:0,y:0,width:640,height:960},e._mousepos={x:0,y:0},e.logicObj=null,e.pos={get x(){return this._x},set x(t){e.updateLogicX(t),this._x=t},get y(){return this._y},set y(t){e.updateLogicY(t),this._y=t},_x:0,_y:0}},{CheckAreaNode:qc.Serializer.NODE,ImageNode:qc.Serializer.NODE,AreaNode:qc.Serializer.NODE,WorldNode:qc.Serializer.NODE});v.prototype.awake=function(){var e=this,t=e.gameObject;e.AreaNode&&(e.Area=e.AreaNode.getScript("qc.engine.ObjectAreaUI"),e.moveing_area=e.Area.currentBox(),e.AreaNode.visable=!1);var n={};e.CheckAreaNode&&(e.CheckArea=e.CheckAreaNode.getScript("qc.engine.ObjectAreaUI"),n=e.CheckArea.currentBox(),e.CheckAreaNode.visable=!1,n.x+=t.x,n.y+=t.y),e.init(qc.CatchGame.catcher,n)},v.prototype.update=function(){},v.prototype.init=function(e,t){var n=this,r=n.gameObject;n.logicObj=e,n.logicObj.x=r.x,n.logicObj.y=r.y,n.logicObj.detectArea=t,n.logicObj.countBoxOffset()},v.prototype.updateLogicX=function(e){this.logicObj.x=e},v.prototype.updateLogicY=function(e){this.logicObj.y=e},v.prototype.onDown=function(e){var t=this,n=t.gameObject;t._press=!0,t._mousepos=n.getWorldPosition(),console.log("dragStart")},v.prototype.onDrag=function(t){var n=this,r=n.gameObject;if(n._press){n._mousepos.x+=t.source.deltaX,n._mousepos.y+=t.source.deltaY;var i=n.WorldNode.toLocal(n._mousepos),s=r.getWorldPosition();if(e.inBox(n.moveing_area,i)){var o=r.parent.toLocal(n._mousepos);this.pos.x=r.x=o.x,this.pos.y=r.y=o.y}else if(e.inBox_x(n.moveing_area,i)){var u=r.parent.toLocal(n._mousepos),a=r.parent.toLocal(s);this.pos.x=r.x=u.x,this.pos.y=r.y=a.y}else if(e.inBox_y(n.moveing_area,i)){var u=r.parent.toLocal(s),a=r.parent.toLocal(n._mousepos);this.pos.x=r.x=u.x,this.pos.y=r.y=a.y}else{var u=r.parent.toLocal(s),a=r.parent.toLocal(s);this.pos.x=r.x=u.x,this.pos.y=r.y=a.y}}},v.prototype.onDragEnd=function(e){var t=this,n=t.gameObject;t._press=!1,console.log("dragEnd")}}).call(this,this,Object)