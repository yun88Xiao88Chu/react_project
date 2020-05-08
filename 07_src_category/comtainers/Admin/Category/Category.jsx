import React, { Component } from 'react'
import { connect } from "react-redux";
import { Card, Button,Table,Modal,Form,Input,message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { save_categoryAsync } from "@/redux/actions/category";
import { reqAddCategory,reqUpdateCategory } from "@/api";
import { PAGE_SIZE,MESSAGE_TIME } from "@/config";

const {Item} = Form

@connect(
  state=>({categoryList:state.categoryList}), //映射状态
  {save_categoryAsync}                        //映射方法
)
class Category extends Component {

  state = { visible: false }    //默认不显示弹框

  //展示弹窗(新增和修改调同一个函数)
  showModal = (categoryObj) => {
    const {categoryForm} = this.refs
    this.name = ''   //重置name
    this._id = ''    //重置_id
    this.isUpdate = false
    //获取当前分类的name和id
    const {name,_id} = categoryObj
    //判断是否为修改
    if(name && _id){  //修改分类
      this.name = name
      this._id = _id
      this.isUpdate = true 
    }//如果是新增就不走上面判断,name,_id都不会有值, 只是把弹框展开
    if(categoryForm) categoryForm.setFieldsValue({name:this.name})
    this.setState({visible: true,}); //修改状态数据展示弹框
  };

  // 新增和修改都调用同一个确认的回调
  handleOk = async e => {
    const {categoryForm} = this.refs
    //获取表单输入的值
    const {name} = categoryForm.getFieldsValue()
    //表单验证name
    if(!name || !name.trim()){
       message.error('输入不能为空',1)
    }else{
      let result
      if(this.isUpdate) result = await reqUpdateCategory(this._id,name) //发请求修改分类
      else result = await reqAddCategory(name)  //发请求添加分类
      const {status,msg} = result  
        //业务逻辑成功
      if(status === 0){
        message.success(this.isUpdate ? '修改分类成功':'添加分类成功',MESSAGE_TIME)
        //保存数据到redux,来更新页面
        this.props.save_categoryAsync()
        //关掉弹窗
        this.setState({visible:false})
        //销毁实例,清空输入
        categoryForm.resetFields()
      }else{  
        //业务逻辑失败提示信息
        message.error(msg,MESSAGE_TIME)
      }
    }
    
  };
  //取消的回调
  handleCancel = e => {
    //获取输入
    const {categoryForm} = this.refs
    //关闭弹窗
    this.setState({visible:false})
    //销毁实例,清空输入
    categoryForm.resetFields()
    // console.log(categoryForm.resetFields())
  };

   addRules = (_,value='')=>{
     //函数体
      let errMsgArr = []
      if(!value || !value.trim()) return Promise.reject('分类名输入不能为空')
      if(value.length < 4 ) errMsgArr.push('输入长度必须大于4')
      if(errMsgArr.length !== 0) return Promise.reject(errMsgArr)
      else return Promise.resolve()
   }
   componentDidMount(){
    this.props.save_categoryAsync()
  }

  render() {
    const dataSource = this.props.categoryList
    
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: '1',
      },
      {
        title: '操作',
        // dataIndex: 'age',
        width:'20%',
        align:'center',
        render:(categoryObj)=> <Button type='link' onClick={()=>{this.showModal(categoryObj)}}>修改分类</Button>,
        key: '2',
      }
    ];
    return (
      <div> {/* Card展示组件 */}
        <Card 
          extra={
            <Button type='primary' onClick={this.showModal}>
            <PlusCircleOutlined />添加
            </Button>
          }
        >
          <Table 
            dataSource={dataSource} 
            columns={columns} 
            bordered
            rowKey= '_id'
            pagination={{pageSize:PAGE_SIZE}}/>
        </Card>
        <Modal  /* Modal弹框 */
          title= {this.isUpdate ? '修改分类':'新增分类'}
          visible={this.state.visible}
          okText='确定'
          cancelText = '取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form ref='categoryForm' initialValues={{name:this.name}}>
             <Item
              name='name'
              // rules= {[{required:true,message:'分类名必须输入'}]}
              rules={[{validator:this.addRules}]}
              >
               <Input placeholder='请输入分类名'/>
             </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Category