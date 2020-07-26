import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom'
import {PoweroffOutlined} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';

const { Header, Content, Footer } = Layout;

const RegisterPage = (props) => {
  const centerDiv = {display:'flex', justifyContent:'center', alignItems: 'center', width:'100%', height:'100vh'}

  const dispatch = useDispatch()

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }

  const onNamedHandler = (e) => {
    setName(e.currentTarget.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if(Password !== ConfirmPassword)
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')

    let body={
      email: Email,
      password: Password,
      name: Name
    }

    // axios.post('/api/users/register', body)

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.sucess){
          props.history.push('/login')
        }else{
          alert('Failed to sign up')
        }
      })
  }

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']}>
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

          <label style={{color:'#001529'}}>Name
            <br/>
            <input type="text" value={Name} onChange={onNamedHandler} style={{border:'1px solid #cfcfcfee'}}/>
          </label>

          <label style={{color:'#001529'}}>Password
            <br/>
            <input type="password" value={Password} onChange={onPasswordHandler} style={{border:'1px solid #cfcfcfee'}}/>
          </label>

          <label style={{color:'#001529'}}>Confirm Password
            <br/>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} style={{border:'1px solid #cfcfcfee'}}/>
          </label>

          <br/>
          <Button
            htmlType="submit"
            type="primary"
            icon={<PoweroffOutlined />}
            style={{marginTop:'0rem'}}
          >
            회원가입
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

    //     <label>Name</label>
    //     <input type="text" value={Name} onChange={onNamedHandler} />

    //     <label>Password</label>
    //     <input type="password" value={Password} onChange={onPasswordHandler} />

    //     <label>Confirm Password</label>
    //     <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

    //     <br/>
    //     <button type="submit">
    //       회원가입
    //     </button>
    //   </form>
    // </div>
  );
};

export default withRouter(RegisterPage);

