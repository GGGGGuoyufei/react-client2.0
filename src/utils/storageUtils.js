/* 
操作local数据的工具函数模块
*/
export default{
  //保存
  saveUser(user){
    localStorage.setItem('user_key', JSON.stringify(user))
  },
  //读取
  getUser(){
    return JSON.parse(localStorage.getItem('user_key') || '{}')
  },
  //删除
  remoteUser(){
    localStorage.removeItem('user_key')
  }
}