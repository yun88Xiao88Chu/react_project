import React, { Component } from 'react'
import { connect } from "react-redux";
import { Card, Button,List,message } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import { reqProductInfoById } from "@/api";
import { save_categoryAsync } from "@/redux/actions/category";
import { IMAGE_BASE_URL } from "@/config";
import "./css/detail.less";


const {Item} = List

@connect(
  state=>({categoryList:state.categoryList}),
  {save_categoryAsync}
)
class Detail extends Component {

  state = {
    currentProduct:{imgs:[]}
  }
  //根据id获取商品信息
  getProductInfoById = async (id)=>{
    const result = await reqProductInfoById(id)
    const {status,data,msg} = result
    // console.log(result)
    if(status === 0){
      message.success('获取商品信息成功')
      this.setState({currentProduct:data})
    }else{
      message.error(msg)
    }
  }

  //根据商品信息返回的Id去redux中找categoryList要商品分类名,若redux没有则需要在挂载时发请求保存一份
  findCategoryName = (id)=>{
    const result = this.props.categoryList.find(categoryObj=>{
      return categoryObj._id === id
    })
    if(result) return result.name
  }

  componentDidMount(){
    const {match,categoryList,save_categoryAsync} = this.props
    const {id} = match.params
    this.getProductInfoById(id)
    //发请求将商品分类保存到redux
    if(categoryList.length === 0){
        save_categoryAsync()
    }
  }

  render() {
    const {name,desc,price,categoryId,imgs,detail} = this.state.currentProduct
    // console.log(imgs)
    // const url = imgs.join('')
    // console.log(url)
    return (
      <div>
        <Card title={
           <div>
              <Button type='link' onClick={this.props.history.goBack}><ArrowLeftOutlined/></Button>
              <span>商品详情</span>
           </div> 
         }
        >
          <List>
             <Item className='item'>
                <span className='title'>商品名称:</span>
                <span>{name}</span>
             </Item>
             <Item className='item'>
                <span className='title'>商品描述:</span>
                <span>{desc}</span>
             </Item>
             <Item className='item'>
                <span className='title'>商品价格:</span>
                <span>{'¥'+price}</span>
             </Item>
             <Item className='item'>
                <span className='title'>商品分类:</span>
                <span>{this.findCategoryName(categoryId)}</span>
             </Item>
             <Item className='item'>
                <span className='title'>商品图片:</span>
                {/* <img src={IMAGE_BASE_URL+url} alt="图片"/> */}
                {
                  imgs.map(imgNameObj=>{
                    console.log(imgs,'-----',imgNameObj) 
                    return <img key={imgNameObj} src={IMAGE_BASE_URL+imgNameObj} alt="图片"/>
                  })
                }
             </Item>
             <Item className='item'>
                <span className='title'>商品详情:</span>
                <span dangerouslySetInnerHTML={{__html:detail}}/>
             </Item>
          </List>
        </Card>
      </div>
    )
  }
}

export default Detail
