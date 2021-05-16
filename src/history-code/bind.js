 /**严谨的bind函数实现 */
 if (!Function.prototype.bind) {
     Function.prototype.bind = function (othis) {
         /**判断调用者是否为函数 */
         if (typeof this !== 'function') {
             throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
         }

         var args = Array.prototype.slice.apply(arguments, 1)
         /**这里使用self保存this的目的是改变当前调用bind函数的this而不是调用bind返回的函数 */
         var self = this;
         var fn = function () {}
         var fBound = function () {
             return function () {
                 /**
                  * this instanceof fBound用与检测是否是 new fBound
                  * 如果是构造函数的形式则会忽略传入的othis */
                 self.apply(this instanceof fBound ? this : othis, args.concat(Array.prototype.slice.call(arguments)))
             }
         }
         /**实现继承 */
         if (this.prototype) {
             fn.prototype = this.prototype
             fBound.prototype = new fn();
         }
         return fBound;
     }
 }