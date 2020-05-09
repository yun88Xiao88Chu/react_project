import React, { Component } from 'react'
import { Card, Button,Table, message,Select,Input } from 'antd';
import { PlusCircleOutlined,SearchOutlined } from '@ant-design/icons';
import { reqProductList,reqSearchList } from "@/api";
import { PAGE_SIZE } from "@/config";

const {Option} = Select

export default class Product extends Component {
  state = {
    productList:[],
    total: 0,
    pageNum:0,
    searchType:'productName',
    keyWord:''
  }
 
  getProductList = async (pageNumer=1)=>{
    //函数体
    let result
    if(this.isSearch){  //点击搜索之后就一直是搜索true了,点分页不生效了
       const {searchType,keyWord} = this.state
        result = await reqSearchList(searchType,keyWord,pageNumer,PAGE_SIZE)
    }else{
        result = await reqProductList(pageNumer,PAGE_SIZE)
    }
   
    // console.log(result)
    const {status,data,msg} = result
    if(status === 0){
       message.success(this.isSearch ? '请求搜索商品成功':'请求商品列表成功')
       const {list,total,pageNum} = data
       this.setState({productList:list,total,pageNum})
    }else{
      message.error(msg)
    }
  }

  componentDidMount(){
    this.getProductList() //初始化商品列表
  }

  render() {
    const dataSource = this.state.productList
    
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render:price => '¥' + price
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align:'center',
        render: status=>{
          return (
            <div>
               <Button type={status === 1 ? 'danger':'primary'}>
                  {status === 1 ? '下架': '上架'}
               </Button>
               <span>{status === 1 ? '在售':'售罄'}</span>
            </div>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align:'center',
        render:()=>(
          <div>
             <Button type='link'>详情</Button><br/>
             <Button type='link'>修改</Button>
          </div>
        )
      },
    ];
    return (
      <div>
         <Card 
           title={
             <div>
                <Select
                   onChange={value=>this.setState({searchType:value})} 
                   defaultValue='productName'
                >
                   <Option value="productName">按名称搜索</Option>
                   <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input
                  onChange={event=>this.setState({keyWord:event.target.value})}
                  allowClear style = {{width:'20%',margin:'10px'}}   
                  placeholder='请输入关键字'/>
                <Button type='primary' onClick={()=>{
                  this.isSearch = true
                  this.getProductList()
                  }}><SearchOutlined />搜索</Button>
             </div>
           } 
           extra={
              <Button type='primary'>
                 <PlusCircleOutlined />添加商品
              </Button>}
         >
            <Table 
              dataSource={dataSource} 
              columns={columns} 
              rowKey='_id'
              bordered
              pagination={{
                pageSize:PAGE_SIZE, //分页器每页数据
                total:this.state.total,  //数据总数 onChange方法不支持动态指定
                current:this.state.pageNum,
                onChange:pageNumer=> this.getProductList(pageNumer)
              }}
            />
         </Card>
      </div>
    )
  }
}
