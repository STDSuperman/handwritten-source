/**
143. 重排链表
给定一个单链表 L 的头节点 head ，单链表 L 表示为：

 L0 → L1 → … → Ln-1 → Ln
请将其重新排列后变为：

L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …

不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

输入: head = [1,2,3,4]
输出: [1,4,2,3]
 */
class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

function reorderList(head: ListNode | null): void {
    if (head === null) return;
	let l1: ListNode | null = head;
	let l2: ListNode | null = head;
    let isEnd = false;
	const recursive = (ln: ListNode) => {
		if (ln.next) recursive(ln.next);
        if (!l2) return;
		const temp = l2.next;
        if (isEnd) return;
		if (temp === ln || l2 === ln) {
			isEnd = true;
            ln.next = null;
            return;
		}
		l2.next = ln;
		ln.next = temp;
		l2 = temp;
	};
	recursive(l1);
}

const linkNodeExa = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 4,
                next: {
                    val: 5,
                    next: null
                }
            }
        }
    }
}

reorderList(linkNodeExa);

console.log(linkNodeExa.next.next)