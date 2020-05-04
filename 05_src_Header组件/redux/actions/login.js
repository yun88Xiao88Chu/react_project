import { SAVE_USERINFO,DELETE_USERINFO } from "../action_type";

export const saveUserInfo = userObj => {
  const {user,token} = userObj
  localStorage.setItem('user_key',JSON.stringify(user))
  localStorage.setItem('token_key',token)
  return {type:SAVE_USERINFO,data:userObj}
}

export const deleteUserInfo = () => {
  localStorage.clear()
  return {type:DELETE_USERINFO}
}