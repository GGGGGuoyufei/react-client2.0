import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import menuList from '../../config/menuConfig'
import logo from './images/logo512.png'
import './index.less'

const { SubMenu } = Menu

/* 
左侧导航组件
*/
class Home extends Component {
  getMenuNodes = (menuList) => {
    // 得到当前请求的path
    const path = this.props.location.pathname

    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else{
         // 如果当前请求路由与当前菜单的某个子菜单的key匹配, 将菜单的key保存为openKey
        if (item.children.find(cItem => path.indexOf(cItem.key) === 0)) {
          this.openKey = item.key
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
     
    })
  }
  render() {
    const menuNodes =  this.getMenuNodes(menuList)
    // 得到当前路径, 作为选中菜单项的key
    const selectKey = this.props.location.pathname
    return (
      <div className="left-nav">
        <Link className="left-nav-link" to="/home">
          <img src={logo} alt="logo"/>
          <h1>管理系统</h1>
        </Link>
        <Menu
          selectedKeys={[selectKey]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          { menuNodes }
        </Menu>
      </div>
    )
  }
}
//使用  withRouter(Home)包装非路由组件，让这个组件拥有hostiory/localtion/match
export default withRouter(Home)
