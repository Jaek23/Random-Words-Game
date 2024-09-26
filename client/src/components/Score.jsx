import React,{useEffect} from 'react'
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';

const Score = ({onScoreUpdate, isLoggedIn}) => {
    const {loading, error, data, refetch} = useQuery(GET_USER);

    // Use the `useEffect` hook to pass `refetch` to the parent component
    useEffect(() => {
      if  (refetch && onScoreUpdate) {
        onScoreUpdate(refetch);  // Pass the `refetch` function to the parent component
      }
    }, [onScoreUpdate, refetch]);

     // If not authenticated, return null to avoid rendering the score
    if (error && error.message === 'Not Authenticated') {
      return null;
  }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>

    const {username, correctWordCount} = data.getUser;

  return (
    <div>
      <p>{username}</p>
      <p>Score: {correctWordCount}</p>
    </div>
  )
}

export default Score
