// 模拟 网络请求
function mockFetch(url) {
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.3) reject("network error");

    const value = Math.floor(Math.random() * 10) % 3;

    setTimeout(() => resolve(value), Math.random() * 1000);
  });
}

// 使用mockFetch模拟发送网络请求
// 返回一个对象，key不变，value为网络请求的结果
async function test1(obj) {
  let all = {};
  for (let i in obj) {
    try {
      let result = await mockFetch(obj[i]);
      all[i] = result;
    } catch (e) {
      all[i] = e;
    }
  }
  console.log(all);
}
async function test(obj) {
  let keys = Object.keys(obj);
  try {
    let result = await Promise.all(
      Object.values(obj).map(item => mockFetch(item))
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function test2(obj) {
  let keys = Object.keys(obj);
  let result = {};
  for (let i = 0; i < keys.length; i++) {
    try {
      result[keys[i]] = await mockFetch(obj[keys[i]]);
    } catch (error) {
      result[i] = error;
    }
  }
  console.log(result);
}
const res = {
  a: "http://www.baidu.com",
  b: "api path",
  c: "api path",
  d: "api path",
  e: "api path",
  f: "api path",
  g: "api path",
  h: "api path"
  // ...
};
test2(res);
