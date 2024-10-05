import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = ({onLogIn}) => {

  const [formData, setFormData] = useState({
    email:'',
    password:'',
  });

  const navigate = useNavigate(); // Initialize useNavigate
  const [loginUser, {data, loading, error}] = useMutation(LOGIN_USER);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { ...formData },
      });

      const token = data.login.token;
      localStorage.setItem('token', token);  // Save token to localStorage

      navigate('/game');
      onLogIn();  // Call the onLogIn function to update isLoggedIn state
    } catch (e) {
      console.error(e);
    }
  };  

  return (
    <LoginForm onSubmit={handleSubmit}>
      <LoginHeader>Login</LoginHeader>
      <LoginContent style={{display:'flex', flexDirection:'column', gap:'20px'}}>
        <StyledInput 
          type="email" 
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <StyledInput 
          type="password"
          name='password'
          placeholder='Password' 
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <StyledButton type='submit' disabled={loading}>
          {loading ? 'Logging In...' : 'Log In'}
        </StyledButton>
          {error && <p>Error: {error.message}</p>}
      </LoginContent>
    </LoginForm>
  )
}

export default Login

const LoginForm = styled.form`
  border:2px solid black;
  border-radius:20px;
  height:350px;
  width:300px;
  padding:20px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`
const LoginContent = styled.div`
  display:flex;
  flex-direction:column;
  gap:20px;
`
const StyledInput = styled.input`
  height:10px;
  width:250px;
  font-size:1.2rem;
  border:2px solid black;
  padding:10px;
  font-family:"Anton", sans-serif;
`
const StyledButton = styled.button`
  height:15px;
  width:100%;
  font-size:1.2rem;
  padding:15px;
  display:flex;
  justify-content:center;
  align-items:center;
  // background-color: #4CAF50;
  cursor:pointer;
  // border:2px solid black;
  font-family:"Anton", sans-serif;
`
const LoginHeader = styled.h2`
  font-family:"Anton", sans-serif;
`