import axios from 'axios'
export function request(config) {
  //1. 创建 axios 的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //2. axios的拦截器
  // 2.1 请求拦截   config 是自定义的  可以是 aaa
  instance.interceptors.request.use(config => {
    // 请求成功时 拦截 拦截要发送到服务器的信息
    // 作用 比如
    /*
      1. config 中一些不符合服务器的要求
      2. 每次发送网络请求时，都希望界面中显示一个 请求的图标
      3. 某些网络请求，必须携带一些特殊信息 （比如登录(token)）
    */
     //console.log(config)
     return config
  },err => {
    console.log(err)
  })

  // 2.2 响应拦截  拦截服务器响应回来的信息
  instance.interceptors.response.use(res => {
    // 响应成功时 拦截
    return res.data
  },err => {
    console.log(err)
  })


  //3. 发送真正的网络请求
  return instance(config)
}


// export function request(config) {
//   return new Promise((resolve,reject) => {
//     // 创建 axios 的实例
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:80000',
//       timeout: 5000
//     })

//     // 发送真正的网络请求
//     instance(config) // 这个本身返回的就是一个 promise
//     .then(res => {
//       resolve(res)
//     })
//     .catch(err => {
//       reject(err)
//     })


//   })
// }
