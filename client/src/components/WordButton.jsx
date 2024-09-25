import React, {useRef, useState, useEffect} from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_RANDOM_WORD } from '../utils/queries';
import Score from './Score';
import { VERIFY_WORD } from '../utils/mutations';

const WordButton = () => {

const [word, setWord] = useState('');
const [inputs, setInputs] = useState([]);
const inputRefs = useRef([]);
const [isTyping, setIsTyping] = useState(false);
const [firstWordLoaded, setFirstWordLoaded] = useState(false);
const [firstWordTyping, setFirstWordTyping] = useState(false);
const [refetchScore, setRefetchScore] = useState(null);

const [verifyWord] = useMutation(VERIFY_WORD);

const {loading, data, error, refetch} = useQuery(GET_RANDOM_WORD, {
    onCompleted: (data) => {
        console.log("onCompleted called:", data.getRandom);
        setWord(data.getRandom);
        setInputs(new Array(data.getRandom.length).fill(''));
        inputRefs.current = new Array(data.getRandom.length).fill(null);
        setIsTyping(false);
        setFirstWordLoaded(true);
        setFirstWordTyping(false);
     
        // Set the cursor on the first input box after initial load of first word 
        setTimeout(() => {
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        }, 0);
    }
});

useEffect(() => {
  console.log("useEffect - inputs:", inputs);
  console.log("useEffect - isTyping:", isTyping);
  console.log("useEffect - firstWordTyping:", firstWordTyping);
  console.log("useEffect - word length:", word.length);
  // Generate new word when all input boxes are filled
  if(firstWordLoaded && (firstWordTyping || isTyping) && inputs.every((input) => input !== '') && inputs.length === word.length) {
    console.log("All inputs filled, triggering new word generation");
    if (refetchScore) {
      refetchScore();  // Trigger refetch of user score
    }
    setTimeout(() => {
      handleClick(); // Generate a new word after typing all letters
    }, 500) // Small delay to prevent refetching
  }
}, [inputs, isTyping, firstWordLoaded, firstWordTyping, word.length, refetchScore]);

const handleClick = async () => {
  console.log("handleClick called - refetching word");
  try{
    const {data} = await refetch(); // refetching the query for a new word 
    if(data) {
      console.log("New word fetched:", data.getRandom);
      setWord(data.getRandom); // setting the new word 
      setInputs(new Array(data.getRandom.length).fill(''));
      inputRefs.current = new Array(data.getRandom.length).fill(null);
      setIsTyping(false);
      setFirstWordTyping(false);
     
      setTimeout(() => {
        if(inputRefs.current[0]) {
          inputRefs.current[0].focus()
        }
      }, 0)
    }
  } catch (err) {
    console.error('Error refetching word:', err);
  }
};

const handleScoreUpdate = (refetchFn) => {
  setRefetchScore(() => refetchFn);  // Store the refetch function for score update
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
  console.log(`Input change at index ${index}, value: ${e.target.value}`);
  const newInputs = [...inputs];
  newInputs[index] = e.target.value;
  setInputs(newInputs);

  if (e.target.value && index < word.length - 1){
    inputRefs.current[index + 1].focus();
  }

  // Set typing status to true once user starts typing
  if(!isTyping && e.target.value !== ''){
    if (firstWordLoaded && !firstWordTyping) {
      console.log("First word typing started");
      setFirstWordTyping(true);
    } else {
      setIsTyping(true);
    }
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
      <button onClick={handleClick} disabled={loading} >
        {loading ? 'Generating' : 'Generate Random Word'}
      </button>
      <Score onScoreUpdate={handleScoreUpdate}/>
   </div>
  )
}

export default WordButton
