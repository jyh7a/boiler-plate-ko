import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import Icon, {PoweroffOutlined} from '@ant-design/icons';
import {
  HomeTwoTone,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
const { Header, Content, Footer } = Layout;


const PandaSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path
      d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
      fill="#6B676E"
      p-id="1143"
    />
    <path
      d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
      fill="#FFEBD2"
      p-id="1144"
    />
    <path
      d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z"
      fill="#E9D7C3"
      p-id="1145"
    />
    <path
      d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z"
      fill="#FFFFFF"
      p-id="1146"
    />
    <path
      d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z"
      fill="#6B676E"
      p-id="1147"
    />
    <path
      d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z"
      fill="#464655"
      p-id="1148"
    />
    <path
      d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
      fill="#464655"
      p-id="1149"
    />
    <path
      d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
      fill="#464655"
      p-id="1150"
    />
  </svg>
);

const PandaIcon = props => <Icon component={PandaSvg} {...props} />;

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
      else{
        alert('로그인먼저 하세요~!')
        props.history.push("/login")
      }
    })
  }

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" onClick={()=>{props.history.push("/")}}>Home</Menu.Item>
          <Menu.Item key="2" onClick={()=>{props.history.push("/login")}}>Login</Menu.Item>
          <Menu.Item key="3" onClick={()=>{props.history.push("/register")}}>Register</Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380, height: 'calc(100vh - 64px)', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column' }}>
         {/* <HomeTwoTone style={{transform:'scale(2)'}}/> */}
         <PandaIcon style={{ fontSize: '100px', marginBottom:'2rem' }} />
         <h1>안녕하세요 NodeJs 와 MongoDB, React 를 이용하여 로그인 시스템을 구현해보았습니다.</h1>
         <p>상단 네비의 Register를 클릭하여 아이디 생성후 로그인 테스트를 해보세요~!</p>
         <Button
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={onClickHandler}
          style={{marginTop:'3rem'}}
        >
          로그아웃
        </Button>
        </div>
      </Content>
    </Layout>
    // <div style={centerDiv}>
    //   <h1>시작페이지</h1>

    //   <button onClick={onClickHandler}>로그아웃</button>
    // </div>
  );
};

export default withRouter(LandingPage);