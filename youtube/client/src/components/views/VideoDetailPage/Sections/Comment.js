import React , {useState} from 'react'
import Axios from 'axios'
import {useSelector} from 'react-redux'

function Comment(props) {

  const videoId = props.postId
  const user = useSelector(state => state.user)
  const [CommentValue, setCommentValue] = useState('')

  const handleClick = (e) => {
    setCommentValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: videoId,
    }

    Axios.post('/api/comment/saveComment', variables)
      .then(res => {
        if(res.data.success){
          console.log(res.data.result)
        }else{
          alert('saveComment 실패 하였습니다.')
        }
      }) 
  }

  return (
    <div>
      <br/>
      <p>Replies</p>
      <hr/>

      {/* Comment Lists */}


      {/* Root Comment Form */}


      <form style={{display:'flex'}} onSubmit={onSubmit}>
        <textarea
          style={{width: '100%', borderRadius:'5px'}}
          onChange={handleClick}
          value={CommentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br/>
        <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>
      </form>

    </div>
  )
}

export default Comment
