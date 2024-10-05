import React, {useEffect} from 'react';
import HighScore from '../components/HighScore';
import { useNavigate } from 'react-router-dom';

const HighScorePage = ({isLoggedIn}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
          navigate('/');  // Navigate to homepage when user is logged out
        }
      }, [isLoggedIn, navigate]);  // Depend on isLoggedIn state
    
      if (!isLoggedIn) {
        return null;
      }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center', marginTop:'25px', fontFamily:'Anton, sans-serif'}}>
      <HighScore/>
    </div>
  )
}

export default HighScorePage
