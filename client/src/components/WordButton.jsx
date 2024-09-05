import React, {useRef, useState} from 'react';
import { useQuery } from '@apollo/client';
import { GET_RANDOM_WORD } from '../utils/queries';

const WordButton = () => {

const [word, setWord] = useState('');
const [inputs, setInputs] = useState([]);
const inputRefs = useRef([]);

const {loading, data, error, refetch} = useQuery(GET_RANDOM_WORD, {
    onCompleted: (data) => {
        setWord(data.getRandom);
        setInputs(new Array(data.getRandom.length).fill([]));
        inputRefs.current = new Array(data.getRandom.length).fill(null);
    }
});

const handleClick = async () => {
  try{
    const {data} = await refetch(); // refetching the query for a new word 
    if(data) {
      setWord(data.getRandom); // setting the new word 
      setInputs(new Array(data.getRandom.length).fill(''));
      inputRefs.current = new Array(data.getRandom.length).fill(null);
    }
  } catch (err) {
    console.error('Error refetching word:', err);
  }
};

const renderInputBoxes = () => {
  return word.split('').map((char, index) => (
    <input
      key={index}
      type='text'
      maxLength='1'
      value={inputs[index]}
      style={{width:'2rem', margin:'0.5rem'}}
      onChange={(e) => handleInputChange(e, index)}
      onKeyDown={(e) => handlekeyDown(e, index)}
      ref={(el) => inputRefs.current[index] = el}
    />
  ));
};

const handleInputChange = (e, index) => {
  const newInputs = [...inputs];
  newInputs[index] = e.target.value;
  setInputs(newInputs);

  if (e.target.value && index < word.length - 1){
    inputRefs.current[index + 1].focus();
  }
};

const handlekeyDown = (e, index) => {
  if(e.key === 'Backspace' && !inputs[index] && index > 0) {
    inputRefs.current[index - 1].focus();
  }
};

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {word && <p>Generated Word: {word}</p>}
      {error && <p>Error: {error.message}</p>}
      <div>{renderInputBoxes()}</div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Generating' : 'Generate Random Word'}
      </button>
   </div>
  )
}

export default WordButton
