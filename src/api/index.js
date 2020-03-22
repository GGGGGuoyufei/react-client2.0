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
//对商品进行上架/下架处理
export const reqUpdateStatus =((productId,status)=> ajax.post('/manage/product/updateStatus',{
  productId,
  status
}))
/* 删除图片 */
export const reqDeleteImg = (name) => ajax.post('/manage/img/delete', {name})

/* 添加/修改商品 */
export const reqAddUpdateProduct = (product) => ajax.post(
    '/manage/product/' + (product._id ? 'update' : 'add'), 
    product
)

// 获取所有角色的列表
export const reqRoles = () => ajax('/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax.post('/manage/role/add', {
  roleName
})
// 更新角色
export const reqUpdateRole = (role) => ajax.post('/manage/role/update', role)

// 获取所有用户的列表
export const reqUsers = () => ajax('/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax.post('/manage/user/delete', {
  userId
})
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax.post('/manage/user/' + (user._id ? 'update' : 'add'), user)