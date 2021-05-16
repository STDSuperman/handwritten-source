var data = {
  name: "root",
  children: [
    {
      name: "a",
      children: [
        { name: "b", children: [{ name: "e" }] },
        { name: "c", children: [{ name: "f" }] },
        { name: "d", children: [{ name: "g" }] }
      ]
    },
    {
      name: "a2",
      children: [
        { name: "b2", children: [{ name: "e2" }] },
        { name: "c2", children: [{ name: "f2" }] },
        { name: "d2", children: [{ name: "g2" }] }
      ]
    }
  ]
};

/**深度遍历递归法 */
function dfs(node, nodeList = []) {
  if (node) {
    nodeList.push(node.name);
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        dfs(node.children[i], nodeList);
      }
    }
  }
  return nodeList;
}

/**神深度遍历非递归法 */
function _dfs(node, nodeList = []) {
  if (node) {
    let stack = [];
    stack.push(node);
    while (stack.length !== 0) {
      let item = stack.pop();
      nodeList.push(item.name);
      if (item.children && item.children.length !== 0) {
        for (let i = item.children.length - 1; i >= 0; i--) {
          stack.push(item.children[i]);
        }
      }
    }
  }
  return nodeList;
}

function bfs(node, nodeList = []) {
  if (node) {
    let stack = [];
    stack.push(node);
    while (stack.length !== 0) {
      let item = stack.shift();
      nodeList.push(item.name);
      if (item.children && item.children.length !== 0) {
        for (let i = 0; i < item.children.length; i++) {
          stack.push(item.children[i]);
        }
      }
    }
  }
  return nodeList;
}

console.log(bfs(data));
