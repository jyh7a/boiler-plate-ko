import React, { useEffect, useState } from 'react'
import{Tooltip, Icon} from 'antd'
import Axios from 'axios'

function LikeDislikes(props) {

  const [Likes, setLikes] = useState(0)
  const [DisLikes, setDisLikes] = useState(0)
  const [LikeAction, setLikeAction] = useState(null)
  const [DisLikeAction, setDisLikeAction] = useState(null)

  let variable = { }

  if(props.video){
    variable = {videoId: props.videoId, userId: props.userId}
  }else{
    variable = {commentId: props.commentId, userId: props.userId}
  }

  useEffect(() => {
    
    Axios.post('/api/like/getLikes', variable)
    .then((res) => {
      if(res.data.success){

        // 얼마나 많은 좋아요를 받았는지

        setLikes(res.data.likes.length)

        // 내가 이미 그 좋아요를 눌렀는지

        res.data.likes.map(like => {
          if(like.userId === props.userId){
            setLikeAction('liked')
          }
        })

      }else{
        alert('Likes에 정보를 가져오지 못했습니다.')
      }
    })


    Axios.post('/api/like/getDisLikes', variable)
    .then((res) => {
      if(res.data.success){

        // 얼마나 많은 싫어요 받았는지

        setDisLikes(res.data.dislikes.length)

        // 내가 이미 그 싫어요 눌렀는지

        res.data.dislikes.map(dislike => {
          if(dislike.userId === props.userId){
            setDisLikeAction('disliked')
          }
        })

      }else{
        alert('DisLiked에 대한 정보를 가져오지 못했습니다.')
      }
    })

  }, [])

  return (
    <div>

      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon type="like"
            theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
            onClick
          />
        </Tooltip>
        <span style={{paddingLeft:'8px', cursor:'auto'}}>{Likes}</span>
      </span>

      <span key="comment-basic-like">
        <Tooltip title="Dike">
          <Icon type="dislike"
            theme={DisLikeAction === 'disliked' ? 'filled' : 'outlined'}
            onClick
          />
        </Tooltip>
        <span style={{paddingLeft:'8px', cursor:'auto'}}>{DisLikes}</span>
      </span>

    </div>
  )
}

export default LikeDislikes
