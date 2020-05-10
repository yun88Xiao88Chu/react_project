import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card, Button,Form,Input,Select } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import PictureWall from "./PictureWall/PictureWall";
import { save_categoryAsync } from "@/redux/actions/category";

const {Item} = Form
const {Option} = Select

@connect(
  state => ({categoryList:state.categoryList}),
  {save_categoryAsync}
)
class AddUpdate extends Component {

  onFinish=(values)=>{
    //函数体
    console.log(values)
  }
  componentDidMount(){
    const {categoryList,save_categoryAsync} = this.props
    if(categoryList.length === 0) save_categoryAsync()
  }
  render() {
    return (
      <div>
         <Card title={
           <div>
              <Button type='link' onClick={this.props.history.goBack}><ArrowLeftOutlined/></Button>
              <span>添加商品</span>
           </div> 
         }
        >
          <Form
            onFinish={this.onFinisha} 
            initialValues={{categoryId:''}}>
            <Item
             name= 'name'
             rules={[{required:true,message:'输入不能为空'}]}
             label='商品名称'
             wrapperCol={{span:6}}
            >
               <Input placeholder='请输入商品名称'/>
            </Item>
            <Item
             name= 'desc'
             rules={[{required:true,message:'输入不能为空'}]}
             label='商品描述'
             wrapperCol={{span:6}}

            >
               <Input placeholder='请输入商品描述'/>
            </Item>
            <Item
             name= 'price'
             rules={[{required:true,message:'输入不能为空'}]}
             label='商品价格'
             wrapperCol={{span:6}}
            >
               <Input
                 type = 'number'
                 prefix = '¥'
                 addonAfter= '元'
                 placeholder='请输入商品价格'/>
            </Item>
            <Item
             name= 'categoryId'
             rules={[{required:true,message:'选择一个分类'}]}
             label='商品分类'
             wrapperCol={{span:6}}
            >
               <Select>
                 <Option value='' disabled>请选择分类</Option>
                 {this.props.categoryList.map(categoryObj=><Option key={categoryObj._id}>{categoryObj.name}</Option>)}
               </Select>
            </Item>
            <Item
             name= 'imgs'
             label='商品图片'
             wrapperCol={{span:6}}
             style={{marginLeft:'12px'}}
            >
               <PictureWall />
            </Item>
            <Item
             name= 'detail'
             rules={[{required:true,message:'输入不能为空'}]}
             label='商品详情'
             wrapperCol={{span:6}}
            >
               <Input placeholder='请输入商品详情'/>
            </Item>
            <Item>
               <Button type='primary' htmlType='submit'>提交</Button>
            </Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default AddUpdate
