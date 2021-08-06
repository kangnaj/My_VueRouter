# Axios

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中

## Axios功能

- 从浏览器中创建 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 XSRF

## Axios使用

axios(option)

```
axios({
  url,
  method,
  headers,
})

```

axios.method(url[, option])

```
axios.get(url, {
  headers,
})

```

## Axios拦截器

请求拦截器

```
const myRequestInterceptor = axios.interceptors.request.use(config => {
    // 在发送http请求之前做些什么
    return config; // 有且必须有一个config对象被返回
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});
```

响应拦截器

```
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response; // 有且必须有一个response对象被返回
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

```

移除拦截器

```
axios.interceptors.request.eject(myRequestInterceptor);
```

## Axios原理

执行axios(option)和axios.method(url[, option])时，其实执行的是Axios原型上的request方法，在request里，将请求拦截器、响应拦截器和发送的请求的方法(dispatchRequest)放到一个list,请求拦截器在请求方法前，响应拦截器在后，遍历执行组成Promise链，最后返回Promise实例，

dispatchRequest 最终派发请求，如果已经取消，则 `throw` 原因报错，使`Promise`走向`rejecte`，主要是new XMLHttpRequest()