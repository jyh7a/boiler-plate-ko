import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Subscribe(props) {

  const [SubscribeNumber, setSubscribeNumber] = useState(0)
  const [Subscribed, setSubscribed] = useState(false)
  
  useEffect(() => {

    const variable = {userTo: props.userTo}

    Axios.post('/api/subscribe/subscribeNumber', variable)
      .then(res => {
        if(res.data.success){
          setSubscribeNumber(res.data.subscribeNumber)
        }else{
          alert('구독자 수 정보를 받아오지 못했습니다.')
        }
      })

    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem('userId')
    }   
    
    Axios.post('/api/subscribe/subscribed', subscribedVariable)
    .then(res => {
      if(res.data.success){
        setSubscribed(res.data.subscribed)
      }else{
        alert('subscribed 정보를 받아오지 못했습니다')
      }
    })

  })


  const onSubscribe = () => {

    const subscribedVariable = {

      userTo: props.userTo ,
      userFrom: props.userFrom

    }    

    // 이미 구독 중이라면
    if(Subscribed){

      Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
        .then(res => {
          if(res.data.success){

          }else{
            alert('구독 취소 하는데 실패 했습니다.')
          }
        })

    // 구독중이 아니라면
    }else{

      Axios.post('/api/subscribe/Subscribe', subscribedVariable)
      .then(res => {
        if(res.data.success){

        }else{
          alert('구독 하는데 실패 했습니다.')
        }
      })
      
    }
  }


  return (
    <div>
      <button
        style={{backgroundColor:`${Subscribed ? '#aaa' : '#cc0000'}`, borderRadius:'4px', color:'white', padding:'10px 16px', fontWeight:'500', fontSize:'1rem', textTransform:'uppercase', border:'none', cursor:'pointer'}}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  )
}

export default Subscribe
