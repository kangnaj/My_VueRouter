/*
 * 2021-07-29 11:40:44
 * @create by: zj
 * @Description: axios原理
 */
// import axios from './myAxios'

// 从浏览器中创建 XMLHttpRequests
// 从 node.js 创建 http 请求
// 支持 Promise API
// 拦截请求和响应
// 转换请求数据和响应数据
// 取消请求
// 自动转换 JSON 数据
// 客户端支持防御 XSRF

// 如果是浏览器，就会基于XMLHttpRequests实现axios。
// 如果是node.js环境，就会基于node内置核心模块http实现axios

// 1. axios还是属于 XMLHttpRequest， 因此需要实现一个ajax。或者基于http 。

// 2. 还需要一个promise对象来对结果进行处理。

// axios基本使用方式主要有

// axios(config)
// axios.method(url, data , config)

var axios = createInstance(defaults)

function createInstance(defaultConfig) {
  // 实例化 Axios，
  var context = new Axios(defaultConfig);
  // 将 Axios.prototype.request 的执行上下文绑定到 context
  // bind 方法返回的是一个函数

  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  // 复制 Axios.prototype 到实例上。
  // 也就是为什么 有 axios.get 等别名方法，
  // 且调用的是 Axios.prototype.get 等别名方法。
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  // 将 context 继承给 instance
  utils.extend(instance, context);

  return instance;
}

axios.create()