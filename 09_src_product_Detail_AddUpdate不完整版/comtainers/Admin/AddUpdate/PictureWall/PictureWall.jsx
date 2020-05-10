import React,{ Component } from "react";
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqDeleteImgs } from "@/api";

//图片上传失败时会调用此函数,为用户良好体验,将图片转成base64编码形式,用于页面展示
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false, //图片预览状态标识
    previewImage: '',     // 预览图片url或base64 
    previewTitle: '',     //图片标题
    fileList: [           //上传过的图片重要数据
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',  还有uploading done error removed
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // }
    ],
  };
  //控制预览状态的回调
  handleCancel = () => this.setState({ previewVisible: false });
  // 如果上传失败,就调用getBase64处理图片
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async ({ file,fileList }) => {
    // console.log(fileList)
    if(file.status === 'done'){
        //  console.log(file)
        const {status,data} = file.response
        if(status === 0){
          message.success('恭喜上传图片成功')
          const {name,url} = data
          fileList[fileList.length-1].name = name
          fileList[fileList.length-1].url = url
        }
        else message.error('上传图片失败')
    }else if(file.status === 'removed'){
      const result = await reqDeleteImgs(file.name)
      const {status} = result
      if(status === 0) message.success('删除图片成功')
      else message.error('删除图片失败')
    }
    return this.setState({ fileList });
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action= '/api/manage/img/upload'
          name='image'
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}