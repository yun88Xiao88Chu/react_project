import React, { Component } from 'react'
import { Menu } from 'antd';
import { NavLink,withRouter} from "react-router-dom";
import { connect } from "react-redux";
import menus from "@/config/menu_config";
import { save_title } from "@/redux/actions/title";
import logo from "@/assets/images/logo.png";
import "./css/left_nav.less";

const { SubMenu,Item } = Menu;

@connect(
  state=>({}),
  {save_title}
)
@withRouter
class LeftNav extends Component {

  saveTitle = (title)=>{
    //函数体
    this.props.save_title(title)
  }
  createMenu = (menuArr)=>{
    //函数体
    return menuArr.map(menuObj=>{
      if(!menuObj.children){
        return (                                  /* 点击更新title */
          <Item key={menuObj.key} onClick={()=>{this.saveTitle(menuObj.title)}}>
             <NavLink to={menuObj.path}>
                <menuObj.icon />{menuObj.title}
             </NavLink>
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

  mountErgodic=(menus)=>{
    //得到当前路径
    const {pathname} = this.props.location 
    if(pathname === '/admin'){   //第一次登陆或者直接访问/admin时redux中没有title
      this.props.save_title('首页')
      return
    }
    const titleObj = result(menus)
    function result(menus){
     return (
        menus.find(menuObj=>{ //递归找到和当前菜单匹配的菜单配置对象
          if(menuObj.children){
            return result(menuObj.children)
          }else{
            return menuObj.path === pathname
          }
        })
      )
    }
     this.saveTitle(titleObj.title)
  }

      //组件挂载更新title  
  componentDidMount(){
    this.mountErgodic(menus)
  }

  render() {
    const {pathname} = this.props.location
    const openedKey = pathname.split('/')
    const checkedKey = openedKey.slice(-1)
    return (
      <div className='left-nav'>
         <div className='nav-top'>
            <img src={logo} alt="图片"/>
            <span>商品管理系统</span>
         </div>
         {/* antd的Menu组件开始了 */} 
         <Menu
              selectedKeys={checkedKey} //默认选中
              defaultOpenKeys={openedKey}  //默认展开
              mode="inline"
              theme="dark"
            >
             {this.createMenu(menus)}
            </Menu>
      </div>
    )
  }
}

export default LeftNav