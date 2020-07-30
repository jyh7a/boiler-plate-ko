import React, {useState} from 'react'
import {Typography, Button, Form, message, Input, Icon} from 'antd'
import Dropzone from 'react-dropzone'

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

function VideoUploadPage() {

  const [VidoeTitle, setVidoeTitle] = useState("")
  const [DescriptionTitle, setDescriptionTitle] = useState("")
  const [Private, setPrivate] = useState(0)
  const [Cateogry, setCateogry] = useState("Film & Animation")

  const onTitleChange = (e) => {
    setVidoeTitle(e.currentTarget.value)
  }

  const onDescriptionChange = (e) => {
    setDescriptionTitle(e.currentTarget.value)
  }

  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value)
  }

  const onCategoryChange = (e) => {
    setCateogry(e.currentTarget.value)
  }
  

  return (
    <div style={{maxWidth:'700px', margin:'2rem auto'}}>
      <div style={{textAlign:'center', marginBottom:'2rem'}}>
        <Title level={2}>Upload Vidoe</Title>
      </div>

      <Form onSubmit>
        <div style={{display:'flex', justifyContent:'space-between'}}>

          {/* Drop zone */}
          <Dropzone
          onDrop
          multiple
          maxSize
          >
          {({getRootProps, getInputProps}) => (
            <div style={{width:'300px', height:'240px', border:'1px solid lightgray', display:'flex', alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
              <input {...getInputProps()}/>
              <Icon type="plus" style={{fontSize:'3rem'}}/>
            </div>
          )}
          </Dropzone>

          {/* Thumnail */}
          <div>
            <img/>
          </div>
        </div>

        <br/>
        <br/>
        <lable>Title</lable>
        <Input 
          onChange={onTitleChange}
          value={VidoeTitle}
        />

        <br/>
        <br/>
        <lable>Description</lable>
        <TextArea 
          onChange={onDescriptionChange}
          value={DescriptionTitle}
        />  

        <br/>
        <br/>
        
        <select onChange={onPrivateChange}>
          { PrivateOptions.map((item, index) => (
            <option key={index} value={item.lable}>{item.lable}</option>
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

        <Button type="primary" size="large" onClick>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage
