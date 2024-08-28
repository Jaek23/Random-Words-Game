import React, {useEffect, useState} from "react";
import { useQuery} from "@apollo/client";
import { GET_RANDOM_WORD } from "./utils/queries";

function App() {

  const [word, setWord] = useState('');

  const {loading, data, error, refetch } = useQuery(GET_RANDOM_WORD, {
    // onCompleted: (data) => {
    //   setWord(data.getRandomWord)
    // },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && !loading && !error) {
      setWord(data.getRandomWord);
    }
  }, [data, loading, error]);

  const handleClick = () => {
    // setWord(data.getRandomWord);
    refetch();
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
   <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Generating' : 'Generate Random Word'}
      </button>
      {word && <p>Generated Word: {word}</p>}
      {error && <p>Error: {error.message}</p>}
   </div>
  )
}

export default App
