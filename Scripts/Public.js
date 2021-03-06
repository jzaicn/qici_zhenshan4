



window.inBox = function (box, pos) {
    if (inBox_x(box, pos)) {
        if (inBox_y(box, pos)) {
            return true;
        };
    };
    return false;
};

window.inBox_x = function (box, pos) {
    if (box.x <= pos.x && pos.x <= (box.x + box.width)) {
        return true;
    };
    return false;
};

window.inBox_y = function (box, pos) {
    if (box.y <= pos.y && pos.y <= (box.y + box.height)) {
        return true;
    };
    return false;
};

//两点的平方和
window.distanceSquare = function (a_X, a_Y, b_X, b_Y) {
    var x = Math.pow(Math.abs(a_X - b_X), 2);
    var y = Math.pow(Math.abs(a_Y - b_Y), 2);
    return x + y;
}

//计算两者距离
window.distance = function distance(a_X, a_Y, b_X, b_Y) {
    return Math.sqrt(distanceSquare(a_X, a_Y, b_X, b_Y));
}

//点是否在半径区域内
window.checkPointInRadius = function (posCenter, radius, posOther) {
    if (distance(posCenter.x, posCenter.y, posOther.x, posOther.y) < radius) {
        return true;
    } else {
        return false;
    };
}

window.arrRemove = function(arr ,b) {
    var a = arr.indexOf(b);
    if (a >= 0) {
        arr.splice(a, 1);
        return true;
    }
    return false;
}

//类似于foreach
window.doPoolObject = function(poolObj, func) {
    for (var i = 0; i < poolObj.length; i++) {
        if (func) {
            func(poolObj, i, poolObj[i]);
        };
    };
};

//删除指定indexgroup的元素
window.arrayDelIndexGroup = function(indexgroup, poolObj) {
    indexgroup.sort(function(a, b) {
        return a > b ? 1 : -1 });
    for (var i = indexgroup.length - 1; i >= 0; i--) {
        if (poolObj.length > indexgroup[i]) {
            poolObj.splice(indexgroup[i], 1);
        };
    };
}