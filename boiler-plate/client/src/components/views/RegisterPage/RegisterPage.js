import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom'

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
    <div style={centerDiv}>
      <form style={{display:'flex', flexDirection:'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNamedHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        <br/>
        <button type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default withRouter(RegisterPage);

