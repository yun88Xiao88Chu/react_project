import React,{ Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default function(ReceiveComponent){
  @connect(
    state=>({isLogin:state.userInfo.isLogin}),
    {}
  )
  class TargetComponent extends Component{
    render(){
      const {isLogin} = this.props
      const {pathname} = this.props.location
      if(!isLogin && pathname !== '/login') return <Redirect to='/login'/>
      if(isLogin && pathname === '/login') return <Redirect to='/admin' />
      return <ReceiveComponent {...this.props} />
    }
  }
  return TargetComponent
}