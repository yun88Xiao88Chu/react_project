import React, { Component } from 'react'
import { Menu } from 'antd';
import menus from "@/config/menu_config";
import logo from "@/assets/images/logo.png";
import "./css/left_nav.less";

const { SubMenu,Item } = Menu;

export default class LeftNav extends Component {

  createMenu = (menuArr)=>{
    //函数体
    return menuArr.map(menuObj=>{
      if(!menuObj.children){
        return (
          <Item key={menuObj.key} icon={<menuObj.icon />}>
             {menuObj.title}
          </Item>
        )
      }else{
        return (
          <SubMenu key={menuObj.key} icon={<menuObj.icon/>} title={menuObj.title}>
              {this.createMenu(menuObj.children)}
          </SubMenu>
        )
      }
    })
  }
  
  render() {
    return (
      <div className='left-nav'>
         <div className='nav-top'>
            <img src={logo} alt="图片"/>
            <span>商品管理系统</span>
         </div>
         {/* antd的Menu组件开始了 */} 
         <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              // inlineCollapsed={this.state.collapsed}
            >
             {this.createMenu(menus)}
            </Menu>
      </div>
    )
  }
}
