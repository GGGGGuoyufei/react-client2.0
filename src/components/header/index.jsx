import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'

import storageUtils from '../../utils/storageUtils.js'
import { formateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import './index.less'
class Header extends Component {
  state={
    currentTime: formateDate(Date.now())
  }
  //退出登录
  logout=()=>{
    // 显示确认提示
    Modal.confirm({
      title: '确认退出登录?',
      onOk: () => {
        console.log('OK');
        //删除信息
        storageUtils.remoteUser()
        // 跳转到登陆界面
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }
  /* 
  根据当前请求的path得到对应的title
  */
 getTitle = () => {
  let title = ''
  const path = this.props.location.pathname
  menuList.forEach(item => {
    if (item.key===path) {
      title = item.title
    } else if (item.children) {
      const cItem = item.children.find(cItem => cItem.key===path)
      if (cItem) {
        title = cItem.title
      }
    }
    
  })

  return title
}
componentDidMount () {
  this.intervalId = setInterval(() => {
    this.setState({
      currentTime: formateDate(Date.now())
    })
  }, 1000)
}
  render() {
    const { currentTime } = this.state 
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          欢迎, admin &nbsp;&nbsp;

          {/* 组件的标签体作为标签的children属性传入 */}
          <a href="#1" onClick={this.logout}>退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{ currentTime }</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)