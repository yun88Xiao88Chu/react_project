import { message } from "antd";
import { SAVE_CATEGORY } from "../action_type";
import { reqCategoryList } from "@/api";

//保存category标题的同步action
export const save_category = categoryList => ({type:SAVE_CATEGORY,data:categoryList})

//保存category标题的异步action
export const save_categoryAsync = () =>{
  return async dispatch=>{
    const result = await reqCategoryList()
    const {status,data,msg} = result
    console.log(result)
    if(status === 0){
      dispatch(save_category(data))
    }else{
      message.error(msg)
    }
  }
}