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
//获取商品分类列表
export const reqShopsList = ((pageNum, pageSize)=> ajax('/manage/product/list',{
  params: { // 页码 每页条目数
    pageNum,
    pageSize
  }
}))
//根据ID/Name搜索产品分页列表
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType 
}) => ajax('/manage/product/search', {
params: {
  pageNum,
  pageSize,
  [searchType]: searchName,
}
})