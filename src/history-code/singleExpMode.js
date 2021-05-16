/**js 单例模式进行通信 */

let MrLi = (function () {
	let MrLiHome = function (msg) {
		this.doorRing = msg;
	};
	let MrLiFnc;
	let info = {
		sendMsg: function (msg) {
			if (!MrLiFnc) {
				MrLiFnc = new MrLiHome(msg);
			}
			return MrLiFnc;
		},
	};
	return info;
})();

let MrWang = {
	callMrLi(msg) {
		return MrLi.sendMsg(msg);
	},
};

let test = MrWang.callMrLi("你好啊小李");
console.log(test.doorRing);
test = null; //等待垃圾回收
