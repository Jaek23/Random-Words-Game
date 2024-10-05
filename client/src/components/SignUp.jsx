import React, { useState} from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignUp = ({onLogIn}) => {
  
  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:'',
  });

  const [signUp, {data, loading, error}] = useMutation(SIGNUP_USER);
  const navigate = useNavigate(); // Initialize useNavigate 

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signUp({
        variables: {
          username: formData.username,
          email:formData.email,
          password:formData.password,
        },
      });

      if (response.data) {
        // localStorage.setItem('token', response.data.signUp.token);
        const token = response.data.signUp.token;
        localStorage.setItem('token', token);
        onLogIn();
        navigate('/game');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SignUpForm onSubmit={hanldeSubmit}>
      <SignUpHeader>Sign Up</SignUpHeader>
      <SignUpContent>
        <StyledInput 
          type="text" 
          name='username'
          placeholder='Username'
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <StyledInput 
          type="email"
          name='email'
          placeholder='Email' 
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <StyledInput 
          type="password"
          name='password'
          placeholder='Password' 
          value={formData.password}
          onChange={handleInputChange}
        />
        <StyledButton type='submit' disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </StyledButton>
          {error && <p>Error: {error.message}</p>}
      </SignUpContent>
    </SignUpForm>
  )
}

export default SignUp

const SignUpForm = styled.form`
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

const SignUpContent = styled.div`
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
const SignUpHeader = styled.h2`
  font-family:"Anton", sans-serif;
`