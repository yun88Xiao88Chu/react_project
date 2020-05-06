import React,{ Component } from "react"
import { Button,Modal } from "antd";
import { FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import screenfull from "screenfull";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { deleteUserInfo } from "@/redux/actions/login";
import { reqWeatherData } from "@/api";
import "./css/header.less";

const { confirm } = Modal;

@connect(
  state=>({username:state.userInfo.user.username}),
  {deleteUserInfo}
)
class Header extends Component{

  state = {
    isFull:false,
    time: dayjs().format('YYYY年MM月DD日 HH:mm:ss'), // display
    weatherData: {}
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

  getWeather =async ()=>{
    //函数体
    const result = await reqWeatherData()
    const {dayPictureUrl,weather,temperature} = result
    this.setState({weatherData:{dayPictureUrl,weather,temperature}})
  }

  componentDidMount(){
    screenfull.onchange(()=>{ //检测屏幕改变时就改变状态数据,真正把数据改变,页面就变了
      const {isFull} = this.state
      this.setState({isFull:!isFull})
    })
    this.timer=setInterval(() => {
      this.setState({time:dayjs().format('YYYY年MM月DD日 HH:mm:ss')})
    }, 1000);
    // this.getWeather()
  }

  componentWillUnmount(){
    clearInterval(this.timer)
  }

  render(){
    const {username} = this.props
    const {isFull,time,weatherData} = this.state
    return (
      <div className='header'>
          <div className='header-top'>
              <Button size='small' onClick={this.fullscreen}>{/* 绑定状态数据 */}
                {isFull? <FullscreenExitOutlined />:<FullscreenOutlined />}
              </Button>
              <span className='username'>欢迎,{username}</span>
              <Button type='link' size='small' onClick={this.logout}>退出登录</Button>
          </div>
          <div className='header-bottom'>
             <div className='bottom-left'>
                <span>首页</span>
             </div>
             <div className='bottom-right'>
                <span>{time}</span>
                <img src={weatherData.dayPictureUrl} alt="src_img"/>
                <span>{weatherData.weather}</span>
                <span>{weatherData.temperature}</span>
             </div>
          </div>
      </div>
    )
  }
}

export default Header