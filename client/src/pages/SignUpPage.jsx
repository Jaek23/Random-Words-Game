import React from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

const SignUpPage = ({onLogIn}) => {
  return (
    <div style={{display:'flex', justifyContent:'center', height:'80vh', alignItems:'center', gap:'50px'}}>
      <SignUp/>
      <Login onLogIn={onLogIn}/>
    </div>
  )
}

export default SignUpPage
