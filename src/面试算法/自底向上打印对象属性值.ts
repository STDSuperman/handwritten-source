var obj = {
    a:{
      b:{
        c:{f:"aa"}
      },
      d:{
        e:{g:"bb"},
        h:{i:"cc"}
      },
      j:{
        k:"dd"
      }
    }
}

const stack = [obj];

function getTreePrint1() {
  const result = [];
  while (stack.length) {
      const length = stack.length;
      for (let i = 0; i < length; i++) {
          const data: any = stack.shift();
          const keys = Object.keys(data);
          for (let i = keys.length - 1; i >= 0; i--) {
              const item = data[keys[i]];
              const key = keys[i];
              result.unshift(key);
              if (typeof data[key] === 'object') stack.push(data[key]);
          }
      }
  }
  console.log(result)
}

function getTreePrint(arr: any[]) {
  const childArr = [];
  const keyList = [];
  for (let i = 0; i < arr.length; i++) {
    for (let key in arr[i]) {
      keyList.push(key);
      typeof arr[i][key] === 'object' && childArr.push(arr[i][key]);
    }
  }
  childArr.length && getTreePrint(childArr);
  console.log(keyList)
}
getTreePrint(stack);