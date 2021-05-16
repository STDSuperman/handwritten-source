/**
 * 事件通用类
 */

let event = {
	version: "1.0.0",
	author: "molu",
	date: "2019/5/21",
	addEvent(ele, event, func) {
		if (ele.addEventListener) {
			ele.addEventListener(event, func, false); //这里以冒泡形式
		} else if (ele.attachEvent) {
			ele.attachEvent("on" + event, func); //IE需要加上on
		} else {
			/**老版本0级事件 可以用[]代替*/
			ele["on" + event] = func;
		}
	},
	removeEvent(ele, event, func) {
		if (ele.removeEventListener) {
			ele.removeEventListener(event, func, false); //这里以冒泡形式
		} else if (ele.detachEvent) {
			ele.detachEvent("on" + event, func); //IE需要加上on
		} else {
			/**老版本0级事件 可以用[]代替*/
			ele["on" + event] = null;
		}
	},
	/**获取触发事件的源DOM元素 */
	getSrcElement(event) {
		return event.target || event.srcElement;
	},
	/**获取事件类型 */
	getEventType(event) {
		return event.type;
	},
	/**获取事件 */
	getEvent(event) {
		return event ? event : window.event;
	},
	/**阻止事件冒泡 */
	stopBuble(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBuble = false; //IE
		}
	},
	/**禁止默认行为 */
	preventDefault(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false; //IE
		}
	},
	/**根据ID名称获取元素 */
	$id(eleid) {
		return document.getElementById(eleid);
	},
	/**根据className获取元素数组，提供父元素提高检索效率 */
	getByClass(classname, parentId) {
		let parent = parentId ? this.$id(parentId) : document; //通过ID检索parent元素
		if (parentId.getElementsByClassName) {
			return parentId.getElementsByClassName(classname);
		} else {
			/**遍历所有子元素 */
			let eleList = [];
			let childs = parent.getElementsByTagName("*");
			for (let i = 0, len = childs.length; i < len; i++) {
				if (childs[i].className == classname) {
					eleList.push(childs[i]);
				}
			}
			return eleList;
		}
	},
	/**根据classname获取首元素 */
	getFirstByClass(classname, parent) {
		let eleList = this.getByClass(classname, parent);
		return eleList[0];
	},
	/**获取版本信息 */
	getVersion() {
		return this.version;
	},
};
