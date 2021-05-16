// 链表

function LinkList() {
  // 创建一个链表节点
  let Node = function(val) {
    this.val = val;
    this.next = null;
  };
  this.head = new Node("head");
  // 查找某一个链表节点
  this.find = function(item) {
    let currentNode = this.head;
    while (currentNode.val !== item) {
      currentNode = currentNode.next;
    }
    return currentNode;
  };
  // 插入到某一节点后面
  this.insert = function(target, val) {
    let newNode = new Node(val);
    let targetNode = this.find(target);
    newNode.next = targetNode.next;
    targetNode.next = newNode;
  };
  /**倒叙遍历 */
  this.printListFromTailToHead = function() {
    let arr = [];
    let current = this.head;
    while (current != null) {
      arr.push(current);
      current = current.next;
    }
    return arr.reverse();
  };
  /**找出倒数第k个节点 */
  this.FindKthToTail = function(k) {
    /**遍历查询链表总节点数 */
    let allNodes = this.printListFromTailToHead();
    let len = allNodes.length;
    /**如果不存在这个节点则直接返回false */
    if (!(len - k + 1)) {
      return false;
    }
    return allNodes[k - 1];
  };
}

let linkNode = new LinkList();
linkNode.insert("head", "1");
linkNode.insert("1", "2");
linkNode.insert("2", "3");
linkNode.insert("3", "4");
linkNode.insert("4", "5");

//找出倒数第k个节点

// console.log(linkNode.FindKthToTail(2));

/**合并链表 */
function Merge(pHead1, pHead2) {
  // write code here
  let result = null;
  let temp = null;
  while (pHead1 && pHead2) {
    if (pHead1.val < pHead2.val) {
      if (!result) {
        result = pHead1;
        temp = result;
      } else {
        result.next = pHead1;
        result = result.next;
      }
      pHead1 = pHead1.next;
    } else {
      if (!result) {
        result = pHead2;
        temp = result;
      } else {
        result.next = pHead2;
        result = result.next;
      }
      pHead2 = pHead2.next;
    }
  }
  while (pHead1) {
    result.next = pHead1;
    pHead1 = pHead1.next;
    result = result.next;
  }
  while (pHead2) {
    result.next = pHead2;
    pHead2 = pHead2.next;
    result = result.next;
  }
  return temp;
}
let test = new LinkList();
test.insert("head", "1");
test.insert("1", "2");
test.insert("2", "3");
test.insert("3", "4");
test.insert("4", "5");
console.log(Merge(linkNode, test));
