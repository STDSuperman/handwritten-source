class TwoWayNode {
    next: TwoWayNode | null = null;
    pre: TwoWayNode | null = null;
    constructor(public key: number | null, public val: any) {}
}

class LRUCache {
    head: TwoWayNode = new TwoWayNode(null, null);
    tail: TwoWayNode = new TwoWayNode(null, null);
    cache: Record<string, TwoWayNode> = {}
    size: number = 0
    maxSize: number = 0;
    constructor(capacity: number) {
        this.head.next = this.tail;
        this.tail.pre = this.head;
        this.maxSize = capacity;
    }

    get(key: number): number {
        const node = this.cache[key];
        if (node) {
            this.moveToHead(node);
            return node.val
        }
        return -1;
    }

    put(key: number, value: number): void {
        const node = this.cache[key];
        if (node) {
            node.val = value;
            this.moveToHead(node);
        } else {
            const newNode = new TwoWayNode(key, value);
            if (this.size < this.maxSize) {
                this.size++;
            } else {
                delete this.cache[this.tail.pre!.key!]
                this.delNode(this.tail.pre!);
            }
            this.cache[key] = newNode;
            this.moveToHead(newNode);
        }
    }

    moveToHead(node: TwoWayNode): void {
        this.delNode(node);
        node.pre = this.head;
        node.next = this.head.next;
        this.head!.next!.pre = node;
        this.head.next = node;
    }
    delNode(node: TwoWayNode) {
        if (node.pre) {
            node.pre.next = node.next;
        }
        if (node.next) {
            node.next.pre = node.pre;
        }
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
// console.log(lRUCache.cache, lRUCache.head, lRUCache.size)