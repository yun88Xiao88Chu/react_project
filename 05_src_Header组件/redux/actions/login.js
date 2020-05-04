import { SAVE_USERINFO,DELETE_USERINFO } from "../action_type";

export const saveUserInfo = userObj => {
  const {user,token} = userObj
  localStorage.setItem('user_key',JSON.stringify(user))
  localStorage.setItem('token_key',token)
  return {type:SAVE_USERINFO,data:userObj}
}

export const deleteUserInfo = () => {
  localStorage.clear()    // 数据清空初始化不会从本地读取
  return {type:DELETE_USERINFO} // 将redux状态数据直接给初始值,清空数据,那么Provider将会render整个App应用,
}                               //刷新后 状态数据isLogin的判断就自动退出跳转到login登录页面