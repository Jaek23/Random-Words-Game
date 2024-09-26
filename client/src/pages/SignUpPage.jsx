import React from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

const SignUpPage = ({onLogIn}) => {
  return (
    <>
      <SignUp/>
      <Login onLogIn={onLogIn}/>
    </>
  )
}

export default SignUpPage
