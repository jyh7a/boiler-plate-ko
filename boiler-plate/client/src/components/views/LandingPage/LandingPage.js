import React, {useEffect} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'

const LandingPage = (props) => {
  const centerDiv = {display:'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', width:'100%', height:'100vh'}

  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response))
  }, [])

  const onClickHandler = () => {
    axios.get(`/api/users/logout`)
    .then(res => {
      if(res.data.success)
        props.history.push("/login")
      else
        alert('로그아웃 실패!')
    })
  }

  return (
    <div style={centerDiv}>
      <h1>시작페이지</h1>

      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
};

export default withRouter(LandingPage);