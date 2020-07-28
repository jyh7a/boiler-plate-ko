import React, {useEffect, useState} from 'react'
import { Button, Row } from 'antd';
import Axios from 'axios';

function Favorite(props) {

  // console.log('props', props)

  const movieId = props.movieId
  const userFrom = props.userFrom
  const movieTitle = props.movieInfo.title
  const moviePost = props.movieInfo.backdrop_path
  const movieRunTime = props.movieInfo.runtime

  const [FavoriteNumber, setFavoriteNumber] = useState(0)
  const [Favorited, setFavorited] = useState(false)

  const variables = {
    userFrom: userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime
  }

  useEffect(() => {

    Axios.post('/api/favorite/favoriteNumber', variables)
      .then(res => {
        setFavoriteNumber(res.data.favoriteNumber)
        if(res.data.success){

        }else{
          alert('favoriteNumber 정보를 가져오는데 실패 했습니다.')
        }
      })

    
    Axios.post('/api/favorite/favorited', variables)
      .then(res => {
        setFavorited(res.data.favorited)
        if(res.data.success){

        }else{
          alert('favorited 정보를 가져오는데 실패 했습니다.')
        }
      })  

  }, [])

  const onClickFavorite = () => {
    if(Favorited){
      Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(res => {
          if(res.data.success){ 
            setFavoriteNumber(FavoriteNumber - 1)
            setFavorited(!Favorited)
          }else{
            alert('Favoirte 리스트에서 지우는 걸 실패했습니다.')
          }
        })
    }else{
      Axios.post('/api/favorite/addToFavorite', variables)
        .then(res => {
          if(res.data.success){
            setFavoriteNumber(FavoriteNumber + 1)
            setFavorited(!Favorited)
          }else{
            alert('Favoirte 리스트에서 추가하는걸 실패했습니다.')
          }
        })
    }
  }

  return (
    <div>
      <Button onClick={onClickFavorite} type="primary" shape="round" size="large">
        {Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber} 
      </Button>
    </div>
  )
}

export default Favorite
