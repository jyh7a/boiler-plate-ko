import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function SideVideo() {

  const [SideVideos, setSideVideos] = useState([])

  useEffect(() => {
    Axios.get('/api/video/getVideos')
    .then(res => {
      if(res.data.success){
        console.log(res.data)
        setSideVideos(res.data.videos)
      }else{
        alert('사이드 비디오들을 가져오기를 실패 했습니다.')
      }
    })
  }, [])


  const renderSideVidoe = SideVideos.map((video, index) => {

    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - minutes * 60);

    return (
    <div style={{display:'flex', marginBottom:'1rem', padding:'0 2rem'}} key={index}>

      <div style={{width:'40%', marginRight:'1rem'}}>
        <a href>
          <img style={{width:'100%', height:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail"/>
        </a>
      </div>

      <div style={{width:'50%'}}>
        <a href style={{color:'grey'}}>
          <span style={{fontSize:'1rem', color:'black'}}>{video.title}</span><br/>
          <span>{video.writer.name}</span><br/>
          <span>{video.views} views</span><br/>
          <span>{minutes} : {seconds}</span>
        </a>
      </div>

    </div>
    )
  })


  return (

    <React.Fragment>

      <div style={{marginTop:'3rem'}}/>
      {renderSideVidoe}

    </React.Fragment>

    
  )
}

export default SideVideo
