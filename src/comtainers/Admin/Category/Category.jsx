import React, { Component } from 'react'
import { connect } from "react-redux";
import { Card, Button,Table,Modal,Form,Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { save_categoryAsync } from "@/redux/actions/category";

const {Item} = Form

@connect(
  state=>({categoryList:state.categoryList}),
  {save_categoryAsync}
)
class Category extends Component {

  state = { visible: false }

  showModal = () => {
    this.setState({visible: true,});
  };

  handleOk = e => {
    this.setState({visible: false,});
  };

  handleCancel = e => {
    this.setState({visible: false,});
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
        title: '姓名',
        dataIndex: 'name',
        key: '1',
      },
      {
        title: '操作',
        // dataIndex: 'age',
        width:'20%',
        align:'center',
        render:()=><Button type='link'>修改分类</Button>,
        key: '2',
      }
    ];
    return (
      <div> {/* Card展示组件 */}
        <Card extra={<Button type='primary' onClick={this.showModal}><PlusCircleOutlined />添加</Button>}>
            <Table 
            dataSource={dataSource} 
            columns={columns} 
            bordered
            rowKey= '_id'
            pagination={{pageSize:8}}/>
        </Card>
        <Modal  /* Modal弹框 */
          title="添加分类"
          visible={this.state.visible}
          okText='确定'
          cancelText = '取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
             <Item
              name='category'
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