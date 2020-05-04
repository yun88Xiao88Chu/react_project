import React,{ Component } from "react"
import { Button,Modal } from "antd";
import { FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import screenfull from "screenfull";
import { connect } from "react-redux";
import { deleteUserInfo } from "@/redux/actions/login";
import "./css/header.less";
import demo from "./demo.jpg";

const { confirm } = Modal;

class Header extends Component{

  state = {
    isFull:false
  }

  logout = ()=>{
    //函数体
    confirm({
      title: '确定退出登录吗?',
      icon: <ExclamationCircleOutlined />,
      content: '退出后需要重新登录',
      okText:'确认',
      cancelText:'取消',
      onOk:()=>{
        this.props.deleteUserInfo()
      },
    });
  }

  fullscreen = ()=>{  //点击改变屏幕大小变相改变状态数据
    //函数体
    screenfull.request()
  }

  componentDidMount(){
    screenfull.onchange(()=>{ //检测屏幕改变时就改变状态数据,真正把数据改变,页面就变了
      const {isFull} = this.state
      this.setState({isFull:!isFull})
    })
  }

  render(){
    return (
      <div className='header'>
          <div className='header-top'>
              <Button size='small' onClick={this.fullscreen}>{/* 绑定状态数据 */}
                {this.state.isFull? <FullscreenExitOutlined />:<FullscreenOutlined />}
              </Button>
              <span className='username'>欢迎,admin</span>
              <Button type='link' size='small' onClick={this.logout}>退出登录</Button>
          </div>
          <div className='header-bottom'>
             <div className='bottom-left'>
                <span>首页</span>
             </div>
             <div className='bottom-right'>
                <span>2020年5月4日 00:00:00</span>
                <img src={demo} alt="src_img"/>
                <span>多云转晴</span>
                <span>温度:18~25℃</span>
             </div>
          </div>
      </div>
    )
  }
}

export default connect(
  state=>({}),
  {deleteUserInfo}
)(Header)