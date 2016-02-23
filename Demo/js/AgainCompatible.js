/*****
 **
 ****/
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

Array.prototype.removeItem = function(item) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == item) {
            this.splice(i, 1);
        };
    };
};

Array.prototype.each = function(fn) {
    return this.length ? [fn(this.slice(0, 1))].concat(this.slice(1).each(fn)) : [];
};

function distanceSquare(a_X, a_Y, b_X, b_Y) {
    var x = Math.pow(Math.abs(a_X - b_X), 2);
    var y = Math.pow(Math.abs(a_Y - b_Y), 2);
    return x + y;
}

//计算两者距离
function distance(a_X, a_Y, b_X, b_Y) {
    return Math.sqrt(distanceSquare(a_X, a_Y, b_X, b_Y));
}


/**
 * 克隆一个对象
 * @param Obj
 * @returns
 */
function deep_clone(Obj) {
    var buf;
    if (Obj instanceof Array) {
        buf = []; //创建一个空的数组 
        var i = Obj.length;
        while (i--) {
            buf[i] = deep_clone(Obj[i]);
        }
        return buf;
    } else if (Obj instanceof Object) {
        buf = {}; //创建一个空对象 
        for (var k in Obj) { //为这个对象添加新的属性 
            buf[k] = deep_clone(Obj[k]);
        }
        return buf;
    } else {
        return Obj;
    }
}

// /*******************************
//  ** 随机返回参数中的一员
//  *******************************/
// function get_random_menber(arr) {
//     if (arr instanceof Array) {
//         //是数组，随机返回数组中一员
//         var i = parseInt(Math.random() * arr.length);
//         return arr[i];
//     } else {
//         //非数组返回该元素
//         return arr;
//     };
// }

// /*******************************
//  ** 获得 每次调用顺序返回数组成员 的函数
//  *******************************/
// function get_order_member_call(arr, on_last_call) {
//     var i = 0;
//     var call_last = function() {
//         if (on_last_call instanceof Function) {
//             on_last_call();
//         };
//     };
//     return function() {
//         //是数组
//         if (arr instanceof Array) {
//             if (i<arr.length) {
//                 //最后一个成员被返回前调用回调函数
//                 if (i == arr.length - 1) {
//                     call_last();
//                 };
//                 //顺序返回数组中一员
//                 return arr[i++];
//             }
//             else{
//                 return null;
//             };
//         } 
//         //非数组返回该元素
//         else {
//             call_last();
//             return arr;
//         };
//     }
// }
