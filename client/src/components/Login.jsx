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

      navigate('/');
      onLogIn();  // Call the onLogIn function to update isLoggedIn state
    } catch (e) {
      console.error(e);
    }
  };  

  return (
    <LoginForm onSubmit={handleSubmit}>
      <h2>Login</h2>
      <LoginContent style={{display:'flex', flexDirection:'column', gap:'20px'}}>
        <input 
          type="email" 
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input 
          type="password"
          name='password'
          placeholder='Password' 
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Logging In...' : 'Log In'}
        </button>
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