import React, { Component } from 'react'
import { Card ,Button, Icon, Table, message, Modal,Form,Input} from 'antd'

import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api'
import './category.less'

const Item = Form.Item
/**
 * 分类管理
 */

class Category extends Component {
  state = {
    categorys : [], //初始化数据,table
    loading: false, // 加载中
    showStatus: 0, // 标识打开的是新增或修改 0: 不显示, 1: 显示添加, 2: 显示修改
  }
  //table的title的字段
  initColumns=()=>{
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => <Button type="primary" onClick={()=>{  
          this.category = category // 保存当前分类, 其它地方都可以读取到
          this.setState({ showStatus: 2})
        }}>修改分类</Button>
      }
    ];
  }
  //获取分类的请求
  getCategorys=()=>{
    //发请求前加载中
    this.setState({ loading: true })
    reqCategorys()
    .then((res)=>{
       if(res.status === 0){
        const categorys = res.data
        this.setState({categorys,loading:false})
       }else{
        message.error('获取分类失败')
       }
    })
  }
  //点击ok
  handleOk=()=>{
    this.props.form.validateFields((err, values)=>{
      if(!err){
        //取出输入的内容
        const {categoryName}  = values
        const {showStatus} = this.state
        if(showStatus === 1){//添加
          reqAddCategory(categoryName)
          .then((res)=>{
            if(res.status ===  0){
              // 重新获取分类列表显示
              this.getCategorys()
              message.success('添加分类成功')
              this.setState({
                showStatus:0
              })
              this.props.form.resetFields() // 重置输入数据
            }else{
              message.error( res.msg)
            }
          })
        }else{//修改
          const categoryId = this.category._id
          reqUpdateCategory({categoryId,categoryName})
          .then((res)=>{
            if(res.status === 0){
              // 重新获取分类列表显示
              this.getCategorys()
              message.success('修改分类成功')
              this.setState({ showStatus: 0 })
              this.props.form.resetFields()
            }else{
              message.error( '修改分类失败')
            }
          })
        }
      }
    })
  }
  //点击关闭
  handleCancel=()=>{
    //this.props.form.resetFields()
    this.setState({showStatus: 0})
  }
  //组件将要挂载时
  componentWillMount () {
    this.initColumns()
  }
  //组件挂载完成
  componentDidMount () {
    //获取分类(调用接口)
    this.getCategorys()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    let {categorys,loading,showStatus} = this.state
    const category = this.category || {} 
    let categoryName = category.name 
    // Card右上角的结构
    const extra = (
      <Button type="primary" onClick={() => { 
        this.category = null
        this.setState({ showStatus: 1 })
       }}>
        <Icon type="plus"/>
        添加
      </Button>
    )
    return (
      <Card extra={extra} style={{ width: '100%' }}>
        <Table bordered={true}
          rowKey="_id"
          columns={this.columns}
          dataSource={categorys}
          loading = {loading}
          pagination={{ defaultPageSize:6, showQuickJumper: true}}
        />
        <Modal
          title={showStatus === 1 ? "添加分类" : "修改分类"}
          visible={showStatus!==0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Item>
              {
                getFieldDecorator('categoryName', {
                  initialValue:categoryName || '',
                  rules: [
                    {required: true, message: '分类名称必须输入'}
                  ]
                })(
                  <Input type="text" placeholder="请输入分类名称"></Input>
                )
              }
            </Item>
          </Form>
        </Modal>
      </Card>
    )
  }
}
//想要使用form，就必须使用这个创建出一个高阶组件
export default Form.create()(Category)