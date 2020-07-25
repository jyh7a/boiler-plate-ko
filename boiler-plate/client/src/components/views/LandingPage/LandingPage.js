import React, {useEffect} from 'react';
import axios from 'axios'

const LandingPage = () => {
  const centerDiv = {display:'flex', justifyContent:'center', alignItems: 'center', width:'100%', height:'100vh'}

  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response))
  }, [])

  return (
    <div style={centerDiv}>
      <h1>시작페이지</h1>
    </div>
  );
};

export default LandingPage;