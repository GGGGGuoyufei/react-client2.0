/* 
封装的接口函数
*/
import ajax from './ajax'

// 登录
export const reqLogin=(username,password)=> ajax.post('/login', {username, password})

//获取分类列表
export const reqCategorys = () => ajax('/manage/category/list')
//添加分类
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add',{
  categoryName
})
//编辑分类
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax.post('/manage/category/update',{
  categoryId,
  categoryName
})