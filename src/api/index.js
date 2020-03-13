/* 
封装的接口函数
*/
import ajax from './ajax'

// 登录
export const reqLogin=(username,password)=> ajax.post('/login', {username, password})

