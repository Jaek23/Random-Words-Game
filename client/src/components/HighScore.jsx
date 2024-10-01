import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_HIGH_SCORE } from '../utils/queries';

const HighScore = ({isLoggedIn}) => {
    const {loading, error, data, refetch} = useQuery(GET_USER_HIGH_SCORE);

    useEffect(() => {
        if(isLoggedIn) {
            refetch();
        }
    }, [isLoggedIn, refetch])

    // if (!isLoggedIn) return <p>Please log in to see your high scores.</p>;
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error.message}</p>

    // Helper function to safely parse and format dates
    const formatDate = (timestamp) => {
        if (!timestamp) {
          return 'Invalid Date'; // Handle null or undefined
        }
        
        // Create a Date object from the timestamp
        const date = new Date(parseInt(timestamp)); // Ensure it's an integer
    
        // Check if the date is valid
        if (isNaN(date)) {
          console.error(`Invalid date: ${timestamp}`); // Log if invalid
          return 'Invalid Date'; // Fallback for invalid dates
        }
        
        return date.toLocaleDateString(); // Format the date if valid
      };

  return (
    <div>
      <h2>Top 5 High Scores</h2>
      <ul>
        {data.getUserHighScores.map((highScore, index) => (
          <li key={index}>
            {/* {highScore.score} - {new Date(highScore.date).toLocaleDateString()} */}
            {highScore.score} - {formatDate(highScore.date)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HighScore
