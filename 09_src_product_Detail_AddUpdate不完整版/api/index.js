import ajax from "./ajax";
import jsonp from "jsonp";
import { message } from "antd";
import { CITY,WEATHER_AK } from "@/config";


//请求登录的函数,loginObj形如 {username:'xx',password:'xx'}
export const reqLogin = loginObj => ajax.post('/login',loginObj)
//异步获取天气
export const reqWeatherData = ()=>{
  const URL = `http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${WEATHER_AK}`
  return new Promise((resolve)=>{
    jsonp(URL,{
      timeout:2000
    },(err,data)=>{
        if(!err){
          resolve(data.results[0].weather_data[0])
        }else{
          message.error('请求天气有误,请联系管理员')
        }
    })
  })
} 
//请求分类列表
export const reqCategoryList = () => ajax.get('/manage/category/list')
//请求添加分类
export const reqAddCategory = categoryName => ajax.post('/manage/category/add',{categoryName})
//请求修改分类
export const reqUpdateCategory = (categoryId,categoryName) => ajax.post('/manage/category/update',{categoryId,categoryName})
//请求商品列表(分页)
export const reqProductList = (pageNum,pageSize) => ajax.get('/manage/product/list',{params:{pageNum,pageSize}})
//请求搜索商品列表(分页)
export const reqSearchList = (searchType,keyWord,pageNum,pageSize) => ajax.get('/manage/product/search',{params:{[searchType]:keyWord,pageNum,pageSize}})
//请求商品上架与下架状态
export const reqUpdateProductStatus = (productId,status) => ajax.post('/manage/product/updateStatus',{productId,status})
//根据商品的id请求商品详细信息
export const reqProductInfoById = productId => ajax.get('/manage/product/info',{params:{productId}})
//请求删除图片
export const reqDeleteImgs = name => ajax.post('/manage/img/delete',{name})