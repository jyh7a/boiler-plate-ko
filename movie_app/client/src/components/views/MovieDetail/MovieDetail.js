import React, { useEffect, useState } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import { Button, Row } from 'antd';
import MainImage from '../LandingPage/Sections/MainImage'
import Movieinfo from './Sections/Movieinfo'
import GridCards from '../commons/GridCards'
import Favorite from '../MovieDetail/Sections/Favorite'

function MovieDetail(props) {

  const movieId = props.match.params.movieId
  const [Movie, setMovie] = useState([])
  const [Casts, setCasts] = useState([])
  const [ActorToggle, setActorToggle] = useState(false)
  
  useEffect(() => {
     
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

    fetch(endpointInfo)
    .then(res => res.json())
    .then(res => {
      // console.log('resMovie', res)
      setMovie(res)
    })

    fetch(endpointCrew)
    .then(res => res.json())
    .then(res => {
      // console.log('ForCrew', res.cast)
      setCasts(res.cast)
    })
  }, [])


  return (
    <div>
      {/* Header */}
      <MainImage 
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        overview={Movie.overview}
      />

      {/* Body */}
      <div style={{width:'85%', margin:'1rem auto'}}>

        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
        </div>

        {/* Movie Info */}
        <Movieinfo movie={Movie}/>

        <br/>

        {/* Actors Grid */}
        
        <div style={{display:'flex', justifyContent:'center', margin:'2rem'}}>
          <Button onClick={()=>{setActorToggle(!ActorToggle)}} type="primary" shape="round" size='large'>Toggle Actor View</Button>
        </div>


        {
          ActorToggle &&
          <Row gutter={[16,16]}>
            {
              Casts && Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards 
                    image={cast.profile_path ? 
                      `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                    characterName={cast.name}
                  />
                </React.Fragment>
              ))
            }
          </Row>
        }

      </div>

    </div>
  )
}

export default MovieDetail
