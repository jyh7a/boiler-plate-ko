import React, { useEffect, useState } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from "../../Config"
import MainImage from './Sections/MainImage'
import { Button, Row } from 'antd';
import GridCards from '../commons/GridCards'

function LandingPage() {

  const [Movies, setMovies] = useState([])
  const [MainMovieImage, setMainMovieImage] = useState(null)
  const [CurrentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    fetchMovies(endpoint)
  }, [])

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
    .then(res => res.json())
    .then(res => {
      // console.log('res', res)
      setMovies([...Movies, ...res.results])
      setMainMovieImage(res.results[0])
      setCurrentPage(res.page)
    })
  }

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`
    fetchMovies(endpoint)
  }

  useEffect(() => {
    // console.log('Movies', Movies)
    // console.log('CurrentPage', CurrentPage)
  }, [Movies])

    return (
      <div style={{width:'100%', margin:'0'}}>

        {/* Main Image */}

        {MainMovieImage &&
        <MainImage
         image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
         title={MainMovieImage.original_title}
         overview={MainMovieImage.overview}
        />}

        <div style={{width:'85%', margin:'1rem auto'}}>
          <h2>Movies by latest</h2>
          <hr/>

          {/* Movie Grid Cards */}
          <Row gutter={[16,16]}>
            {
              Movies && Movies.map((movie, index) => (
                <React.Fragment key={index}>
                  <GridCards 
                    landingPage
                    image={movie.poster_path ? 
                      `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                    movieId={movie.id}
                    moiveName={movie.original_title}
                  />
                </React.Fragment>
              ))
            }
          </Row>

        </div>

        <div style={{display:'flex', justifyContent:'center'}}>
          <Button onClick={loadMoreItems} type="primary" shape="round" size='large'>
            Load More
          </Button>
        </div>
      </div>
    )
}

export default LandingPage
