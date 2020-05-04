import React,{ Component } from "react"
import { Button } from "antd";
import { FullscreenOutlined } from '@ant-design/icons';
import "./css/header.less";
import demo from "./demo.jpg";

export default class Header extends Component{
  render(){
    return (
      <div className='header'>
          <div className='header-top'>
              <Button size='small'>
                <FullscreenOutlined />
              </Button>
              <span className='username'>欢迎,admin</span>
              <Button type='link' size='small'>退出登录</Button>
          </div>
          <div className='header-bottom'>
             <div className='bottom-left'>
                <span>首页</span>
             </div>
             <div className='bottom-right'>
                <span>2020年5月4日 00:00:00</span>
                <img src={demo} alt="image"/>
                <span>多云转晴</span>
                <span>温度:18~25℃</span>
             </div>
          </div>
      </div>
    )
  }
}
