import React, {useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import { GET_RANDOM_WORD } from '../utils/queries';

const WordButton = () => {

const [word, setWord] = useState('');
const {loading, data, error} = useQuery(GET_RANDOM_WORD, {
    onCompleted: (data) => {
        setWord(data.getRandom)
    }
});
// const {loading, data, error} = useQuery(GET_RANDOM_WORD);

useEffect(() => {
    if(data && !loading && !error) {
        setWord(data.getRandom)
    }
}, [data, loading, error]);

const handleClick = () => {
  if(data) {
    setWord(data.getRandom);
  }
}

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Generating' : 'Generate Random Word'}
      </button>
      {word && <p>Generated Word: {word}</p>}
      {/* {error && <p>Error: {error.message}</p>} */}
   </div>
  )
}

export default WordButton
