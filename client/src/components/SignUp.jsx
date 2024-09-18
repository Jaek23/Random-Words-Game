import React, { useState} from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  
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
        localStorage.setItem('token', response.data.signUp.token);
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={hanldeSubmit}>
      <input 
        type="text" 
        name='username'
        placeholder='Username'
        value={formData.username}
        onChange={handleInputChange}
        required
      />
      <input 
        type="email"
        name='email'
        placeholder='Email' 
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <input 
        type="password"
        name='password'
        placeholder='Password' 
        value={formData.password}
        onChange={handleInputChange}
      />
      <button type='submit' disabled={loading}>
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
        {error && <p>Error: {error.message}</p>}
    </form>
  )
}

export default SignUp
