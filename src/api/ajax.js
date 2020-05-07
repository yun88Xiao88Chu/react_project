import axios from 'axios';
import qs from "querystring";
import nprogress from "nprogress";
import { message as msg } from "antd";
import store from "@/redux/store";
import { deleteUserInfo } from "@/redux/actions/login";
import { save_title } from "@/redux/actions/title";
import "nprogress/nprogress.css";

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 2000

axios.interceptors.request.use((config)=>{
  nprogress.start()
  // console.log(config)
  const {method,data} = config
  if(method.toLowerCase() === 'post' && data instanceof Object){
      config.data = qs.stringify(data)
  }
  const {token} = store.getState().userInfo
  if(token) config.headers.Authorization = 'atguigu_'+token
  return config
})

axios.interceptors.response.use(
  response=>{
    nprogress.done()
    return response.data
  },
  error=>{
    nprogress.done()
    let errmsg = '未知错误,请联系管理员'
    const {message} = error
    if(message.indexOf('401') !== -1) {
      store.dispatch(deleteUserInfo())
      store.dispatch(save_title(''))
      errmsg = '未登录或身份过期,请重新登录'
    }
    else if(message.indexOf('timeout') !== -1) errmsg = '网络不稳定,连接超时'
    else if(message.indexOf('Network Error') !== -1) errmsg = '网络不通,请检查网络'
    msg.error(errmsg,1)
    return new Promise(()=>{})
  }
)

export default axios