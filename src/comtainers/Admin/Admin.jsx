import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom";
import { deleteUserInfo } from "@/redux/actions/login";
class Admin extends Component {
  logout = ()=>{
    //函数体
    this.props.deleteUserInfo()
  }
  render() {
    if(!this.props.isLogin) return <Redirect to='/login'/>
    return (
      <div>
         <button onClick={this.logout}>退出</button>
      </div>
    )
  }
}

export default connect(
  state => ({
    username:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin}),
  {deleteUserInfo}
)(Admin)