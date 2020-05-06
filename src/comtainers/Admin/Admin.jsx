import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom";
import { Layout } from 'antd';
import Check from "@/comtainers/Hoc/Check";
import Header from "./Header/Header";
import LeftNav from "./LeftNav/LeftNav";
import "./css/admin.less";

const { Footer, Sider, Content } = Layout;

@connect(
  state => ({isLogin:state.userInfo.isLogin}),
  {}
)
@Check
class Admin extends Component {
  
  render() {
    return (
      <Layout className='admin-container'>
        <Sider>Sider</Sider>
        <Layout>
          <Header className='header'/>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin