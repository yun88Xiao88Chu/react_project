import { SAVE_USERINFO,DELETE_USERINFO } from "../action_type";
let _user
try {
  _user = JSON.parse(localStorage.getItem('user_key'))
  const a = JSON.parse(localStorage.getItem('demo'))
  console.log(localStorage.getItem('demo'),a)
} catch (error) {
  _user = null
}
let _token = localStorage.getItem('token_key')
const initState = {
  user:_user || {},
  token: _token || '',
  isLogin: _user && _token ? true:false 
} 
export default function (preState=initState,action){
  const {type,data} = action
  let newState
  switch (type) {
    case SAVE_USERINFO:
         newState = {...data,isLogin:true}
      return newState
    case DELETE_USERINFO:
         newState = {user:{},token:'',isLogin:false}
      return newState
    default:
      return preState
  }
}