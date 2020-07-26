import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom'
import {PoweroffOutlined} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
const { Header, Content, Footer } = Layout;

const LoginPage = (props) => {
  const centerDiv = {display:'flex', justifyContent:'center', alignItems: 'center', width:'100%', height:'100vh'}

  const dispatch = useDispatch()

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    let body={
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess){
          props.history.push('/')
        }else{
          alert('Error')
        }
      })
  }

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" onClick={()=>{props.history.push("/")}}>Home</Menu.Item>
          <Menu.Item key="2" onClick={()=>{props.history.push("/login")}}>Login</Menu.Item>
          <Menu.Item key="3" onClick={()=>{props.history.push("/register")}}>Register</Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380, height: 'calc(100vh - 64px)', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column' }}>

        <form style={{display:'flex', flexDirection:'column'}}
          onSubmit={onSubmitHandler}
        >
          <label style={{color:'#001529'}}>Email
            <br/>
            <input type="email" value={Email} onChange={onEmailHandler} style={{border:'1px solid #cfcfcfee'}}/>
          </label>
          <label style={{color:'#001529'}}>Password
            <br/>
            <input type="password" value={Password} onChange={onPasswordHandler} style={{border:'1px solid #cfcfcfee'}}/>
          </label>
          <br/>
          <Button
            htmlType="submit"
            type="primary"
            icon={<PoweroffOutlined />}
            // onClick={onClickHandler}
            style={{marginTop:'0rem'}}
          >
            로그인
          </Button>
        </form>
     
        </div>
      </Content>
    </Layout>
    // <div style={centerDiv}>
    //   <form style={{display:'flex', flexDirection:'column'}}
    //     onSubmit={onSubmitHandler}
    //   >
    //     <label>Email</label>
    //     <input type="email" value={Email} onChange={onEmailHandler} />
    //     <label>Password</label>
    //     <input type="password" value={Password} onChange={onPasswordHandler} />
    //     <br/>
    //     <button type="submit">
    //       Login
    //     </button>
    //   </form>
    // </div>
  );
};

export default withRouter(LoginPage);