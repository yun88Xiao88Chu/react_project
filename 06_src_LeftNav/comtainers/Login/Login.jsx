import React, { Component } from 'react'
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { saveUserInfo } from "@/redux/actions/login";
import Check from "@/comtainers/Hoc/Check";
import logo from "@/assets/images/logo.png";
import  "./css/login.less";
import {reqLogin} from "@/api";

const {Item} = Form


@connect(
  state=>({isLogin:state.userInfo.isLogin}),
  {saveUserInfo}
)
@Check
class Login extends Component {

  onFinish = async values => {
    // console.log('Received values of form: ', values);
    let result = await reqLogin(values)
    const {status,data,msg} = result
    if(status === 0){
      message.success('登录成功!',1)
      // console.log(data)
      this.props.saveUserInfo(data)
    }else if(msg){
      message.error(msg)
    }
  };

  pwValidator = (_,value='')=>{
    let errMsgArr = []
      if(!value || !value.trim()) return Promise.reject('密码不能为空')
      if(value.length < 4) errMsgArr.push('密码长度必须大于4')
      if(value.length > 12) errMsgArr.push('密码长度必须小于12')
      if(!(/^\w+$/).test(value)) errMsgArr.push('必须是英文、数字或下划线组成')
      if(errMsgArr !== 0) return Promise.reject(errMsgArr)
      else return Promise.resolve()
  }

  render() {
    return (
      <div className='login'>
         <header>
           <img src={logo} alt="logo"/>
           <h1>商品管理系统</h1>
         </header>
         <section>
            <span className='title'>用户登录</span>
            {/*
              用户名/密码的的合法性要求
                1). 必须输入
                2). 必须大于等于4位
                3). 必须小于等于12位
                4). 必须是英文、数字或下划线组成
           */}
            <Form
              className='login-form'
              onFinish={this.onFinish}
            >
              <Item
                name= 'username'  // 不写name规则不生效
                rules={[
                  {required:true,message:'用户名必须输入!'},
                  {min:4,message:'长度必须大于等于4!'},
                  {max:12,message:'长度必须小于等于12'},
                  {pattern:/^\w+$/,message:'必须是英文、数字或下划线组成!'}
                ]}
              >
                <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="用户名" />
              </Item>
              <Item
                name='password'
                rules={[{validator:this.pwValidator}]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Item>
              <Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Item>
            </Form>
         </section>
      </div>
    )
  }
}

export default Login