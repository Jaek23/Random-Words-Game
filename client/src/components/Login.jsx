import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [formData, setFormData] = useState({
    email:'',
    password:'',
  });

  const [login, {data, loading, error}] = useMutation(LOGIN_USER);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await login({
        variables: {
          email:formData.email,
          password:formData.password,
        },
      });

      if (response.data) {
        localStorage.setItem('token', response.data.login.token);
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };  

  return (
    <form onSubmit={handleSubmit}>
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
        required
      />
      <button type='submit' disabled={loading}>
        {loading ? 'Logging In...' : 'Log In'}
      </button>
        {error && <p>Error: {error.message}</p>}
    </form>
  )
}

export default Login
