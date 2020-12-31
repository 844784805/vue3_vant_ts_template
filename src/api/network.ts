import axios from 'axios'

// 全局配置
axios.defaults.baseURL = 'http://47.93.137.172:3000' // 默认请求地址
axios.defaults.timeout = 5000 // 超时时间

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前需要进行的操作
    return config
  },
  function (error) {
    // 请求发生错误时进行的操作
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做些什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 配置请求方式
export default {
  // get请求
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios
        .get(path, {
          params: data
        })
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  // post请求
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios
        .post(path, data)
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  // delete请求
  delete: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios
        .delete(path, { data: data })
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  // put请求
  put: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios
        .put(path, data)
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  // all请求
  all: function (list: any[]) {
    return new Promise(function (resolve, reject) {
      axios
        .all(list)
        .then(
          axios.spread(function (...result) {
            // 两个请求现在都执行完成
            resolve(result)
          })
        )
        .catch(function (err) {
          reject(err)
        })
    })
  }
}
