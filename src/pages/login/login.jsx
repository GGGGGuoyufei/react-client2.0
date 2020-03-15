import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button,message} from 'antd'


import logo from './images/logo512.png'
import './login.less'
import {reqLogin} from '../../api/index'
import storageUtils from '../../utils/storageUtils.js'
const Item = Form.Item

class Login extends Component {


  handleSubmit = e => {
    e.preventDefault()
    //对表单所有字段统一验证
    this.props.form.validateFields(async(err,{username,password})=>{
      if(!err){
       const result = await reqLogin(username,password)
       if(result.status=== 0){
          const user =result.data
          // 将user信息保存到local
          storageUtils.saveUser(user)
          // 跳转到管理界面
          this.props.history.replace('/')
          message.success(result.data.username+'登录成功')
       }else{
         message.error(result.msg)
       }
      }
    })
  }
  validator=(rule,value,callback)=>{
    value = value.trim()
    if(!value){
      callback('密码必须输入')
    }else if(value.length<4){
      callback('密码不能小于4位')
    }else if(value.length>12){
      callback('密码不能大于12位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码必须是英文、数字或下划线组成')
    }else{
      callback()
    }
  }
  

  render() {
    const user = storageUtils.getUser()
    if(user._id){
      return <Redirect to='/'/>
    }
    const {getFieldDecorator} = this.props.form
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                getFieldDecorator('username',{
                  initialValue: '', // 初始值
                  rules:[
                    {required:true,whitespace: true,message: '用户名是必须输入' },
                    {min:4,message:'用户名不能小于4位'},
                    {max:12,message:'用户名不能大于12位'},
                    {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
                  ]
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名"/> 
                )
              }
              
            </Item>

            <Item>
            {
                getFieldDecorator('password',{
                  initialValue: '', // 初始值
                  rules:[
                    {validator:this.validator}
                  ]
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  type="password" placeholder="密码"/>
                )
              }
                  
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登 陆</Button>
            </Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrapperForm = Form.create()(Login)

export default WrapperForm  
