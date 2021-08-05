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
// axios.get(url, data , config)

// axios本质是函数，赋值了一些别名方法，比如get、post方法，可被调用，最终调用的还是Axios.prototype.request函数。

// var Axios = require('./core/Axios');
// axios入口其实就是一个创建好的实例
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
   // 也就是为什么默认配置 axios.defaults 和拦截器  axios.interceptors 可以使用的原因
  // 其实是new Axios().defaults 和 new Axios().interceptors
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
// 导出 创建默认实例
var axios = createInstance(defaults);
// Expose Axios class to allow class inheritance
// 暴露 Axios class 允许 class 继承 也就是可以 new axios.Axios()
// 但  axios 文档中 并没有提到这个，我们平时也用得少。
axios.Axios = Axios;

// Factory for creating new instances
// 工厂模式 创建新的实例 用户可以自定义一些参数
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};


// 核心构造函数 Axios
function Axios(instanceConfig) {
  // 默认参数
  this.defaults = instanceConfig;
  // 拦截器 请求和响应拦截器
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}