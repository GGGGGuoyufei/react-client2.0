import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import storageUtils from '../../utils/storageUtils.js'

export default class Admin extends Component {
  render() {
    const user= storageUtils.getUser()
    if(!user._id){
      return <Redirect to='/login'/>
    }
    return (
      <div>
        hello, {user.username}
      </div>
    )
  }
}
