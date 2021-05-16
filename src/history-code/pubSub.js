'use strict';
/**
 * 发布订阅
 */

let publish = {
    clientList: {},
    /**添加订阅者 */
    listen(key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn)
    },

    trigger() {
        /**拿到订阅的消息类型 */
        let key = Array.prototype.shift.call(arguments);

        if (!this.clientList[key] || this.clientList[key].length == 0) {
            return false;
        }
        this.clientList[key].forEach(item => {
            item.apply(this, arguments);
        })
    }
}

publish.listen('测试订阅', function (a) {
    console.log("这个事件订阅成功" + a)
})
publish.listen("第二", function (a) {
    console.log("这是第二个" + a)
})

publish.trigger("第二", ':高兴')