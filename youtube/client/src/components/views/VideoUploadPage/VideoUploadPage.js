import React, {useState} from 'react'
import {Typography, Button, Form, message, Input, Icon, Descriptions} from 'antd'
import Dropzone from 'react-dropzone'
import Axios from 'axios'
import {useSelector} from 'react-redux'

const {TextArea} = Input
const {Title} = Typography

const PrivateOptions = [
  {value: 0, lable: 'Private'},
  {value: 1, lable: 'Public'},
]

const CategoryOptions = [
  {value: 0, lable: "Film & Animation"},
  {value: 1, lable: "Auto & Vehicles"},
  {value: 2, lable: "Music"},
  {value: 3, lable: "Pets & Animals"}
]

function VideoUploadPage(props) {
  const user = useSelector(state => state.user)
  const [VidoeTitle, setVidoeTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Private, setPrivate] = useState(0)
  const [Cateogry, setCateogry] = useState("Film & Animation")
  const [FilePath, setFilePath] = useState("")
  const [Duration, setDuration] = useState("")
  const [ThumbnailPath, setThumbnailPath] = useState("")

  const onTitleChange = (e) => {
    setVidoeTitle(e.currentTarget.value)
  }

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value)
  }

  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value)
  }

  const onCategoryChange = (e) => {
    setCateogry(e.currentTarget.value)
  }

  const onDrop = (files) => {
    let formData = new FormData
    const config = {
      header: {'content-type': 'mltipart/form-data'}
    }
    formData.append('file', files[0])

    Axios.post('/api/video/uploadfiles', formData, config)
    .then(res => {
    if(res.data.success){

      const variable = {
        url: res.data.url,
        fileName: res.data.fileName
      }

      setFilePath(res.data.url)

      Axios.post('/api/video/thumbnail', variable)
      .then(res => {
        if(res.data.success){
          setDuration(res.data.fileDuration)
          setThumbnailPath(res.data.url)
        }else{
          alert('썸네일 생성에 실패 했습니다.')
        }
      })
    }else{
      alert('비디오 업로드를 실패했습니다.??')
    }
    })
  }
  

  const onSubmit = (e) => {
    e.preventDefault()

    const variable = {
      writer: user.userData._id,
      title: VidoeTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Cateogry,
      duration: Duration ,
      thumbnail: ThumbnailPath,
    }

    Axios.post('/api/video/uploadVideo', variable)
      .then(res => {
        if(res.data.success){
          message.success('성공적으로 업로드를 했습니다.')
          setTimeout(() => {
            props.history.push('/')
          }, 3000);
        }else{
          alert('비디오 업로드에 실패 했습니다.')
        }
      })
  }


  return (
    <div style={{maxWidth:'700px', margin:'2rem auto'}}>

      <div style={{textAlign:'center', marginBottom:'2rem'}}>
        <Title level={2}>Upload Vidoe</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{display:'flex', justifyContent:'space-between'}}>

          {/* Drop zone */}
          <Dropzone
          onDrop={onDrop}
          multiple={false}
          maxSize={1000000000}
          >
          {({getRootProps, getInputProps}) => (
            <div style={{width:'300px', height:'240px', border:'1px solid lightgray', display:'flex', alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
              <input {...getInputProps()}/>
              <Icon type="plus" style={{fontSize:'3rem'}}/>
            </div>
          )}
          </Dropzone>

          {/* Thumnail */}
          {ThumbnailPath && 
           <div>
             <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail"/>
           </div>
          }
         
        </div>

        <br/>
        <br/>
        <label>Title</label>
        <Input 
          onChange={onTitleChange}
          value={VidoeTitle}
        />

        <br/>
        <br/>
        <label>Description</label>
        <TextArea 
          onChange={onDescriptionChange}
          value={Description}
        />  

        <br/>
        <br/>
        
        <select onChange={onPrivateChange}>
          { PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>{item.lable}</option>
          )) }            
        </select>

        <br/>
        <br/>

        <select onChange={onCategoryChange}>
          { CategoryOptions.map((item, index) => (
            <option key={index} value={item.lable}>{item.lable}</option>
          )) }   
        </select>

        <br/>
        <br/>

        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage
