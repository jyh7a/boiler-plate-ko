import React from 'react'
import { Col } from 'antd'

function GridCards(props) {
  // console.log('Gridprops', props)

  if(props.landingPage){
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{position: 'relative', height:420}}>
          <a href={`/movie/${props.movieId}`}>
            <img src={props.image} alt={props.movieName} style={{width:'100%', height:'100%'}}/>
          </a>
        </div>
      </Col>
    )
  }else{
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{position: 'relative', height:420}}>
          <img src={props.image} alt={props.characterName} style={{width:'100%', height:'100%'}}/>
        </div>
      </Col>
    )
  }

  
}

export default GridCards
