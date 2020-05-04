import ajax from "./ajax";

//请求登录的函数,loginObj形如 {username:'xx',password:'xx'}
export const reqLogin = loginObj => ajax.post('/login',loginObj)