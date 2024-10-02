import React, {useRef, useState, useEffect} from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_RANDOM_WORD } from '../utils/queries';
import Score from './Score';
import { VERIFY_WORD } from '../utils/mutations';
import HighScore from './HighScore';
import styled from 'styled-components';

const WordButton = ({isLoggedIn}) => {

const [word, setWord] = useState('');
const [inputs, setInputs] = useState([]);
const inputRefs = useRef([]);
const [isTyping, setIsTyping] = useState(false);
const [firstWordLoaded, setFirstWordLoaded] = useState(false);
const [firstWordTyping, setFirstWordTyping] = useState(false);
const [refetchScore, setRefetchScore] = useState(null);


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

// Mutation hook for verifying the word
const [verifyWord] = useMutation(VERIFY_WORD, {
  onCompleted: (data) => {
    if (data.verifyWord) {
      console.log("Word verified successfully!");
      // Refetch user data to update the score when word is correct
      if (refetchScore) {
        refetchScore(); // Trigger the refetch of user score
      }
    } else {
      console.log("Incorrect word.");
    }
  },
  onError: (error) => {
    console.error("Error verifying word:", error);
  }
});

// Set the refetch function passed from the Score component
const handleScoreUpdate = (refetchFunction) => {
  setRefetchScore(() => refetchFunction);
};

useEffect(() => {
  console.log("useEffect - inputs:", inputs);
  console.log("useEffect - isTyping:", isTyping);
  console.log("useEffect - firstWordTyping:", firstWordTyping);
  console.log("useEffect - word length:", word.length);
  // Generate new word when all input boxes are filled
  if(firstWordLoaded && (firstWordTyping || isTyping) && inputs.every((input) => input !== '') && inputs.length === word.length) {
    console.log("All inputs filled, triggering new word generation");
    verifyWord({
      variables: {
        generatedWord: word,
        typeWord: inputs.join('') // Combine inputs into a single string
      }
    });
    setTimeout(() => {
      handleClick(); // Generate a new word after typing all letters
    }, 500) // Small delay to prevent refetching
  }
}, [inputs, isTyping, firstWordLoaded, firstWordTyping, word.length]);

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

const renderInputBoxes = () => {
  return word.split('').map((char, index) => (
    <StyledInput
      key={index}
      type='text'
      maxLength='1'
      value={inputs[index]}
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

if (loading) return <p style={{textAlign:'center'}}>Loading...</p>;
if (error) return <p style={{textAlign:'center'}}>Error: {error.message}</p>;

  return (
    <StyledDiv>
      {word && <StyledP>Generated Word: {word}</StyledP>}
      {error && <p>Error: {error.message}</p>}
      <InputContainer>{renderInputBoxes()}</InputContainer>
      <StyledButton onClick={handleClick} disabled={loading} >
        {loading ? 'Skipping' : 'Skip Word'}
      </StyledButton>
       {isLoggedIn && <Score onScoreUpdate={handleScoreUpdate}/>}
       {isLoggedIn ? (
        <HighScore/>
       ) : <p>*Please sign up or log in to see your scores </p>}
   </StyledDiv>
  )
}

export default WordButton

const StyledDiv = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  height:80vh;
  font-family: "Anton", sans-serif;
`
const StyledP = styled.p`
  margin-bottom: 20px; /* Adjust this value to increase/decrease gap */
  font-size:35px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px; /* Increase gap between input boxes and other elements */
  display: flex;
`;

const StyledButton = styled.button`
  margin-bottom: 20px; /* Increase gap below the button */
  padding: 0.5rem 2rem; /* Increase padding for a bigger button */
  font-size: 1.2rem; /* Adjust font size */
  font-family: "Anton", sans-serif;
  color: white; /* Text color */
  background-color: #007bff; /* Button background color */
  border: 2px solid #0056b3; /* Border color */
  border-radius: 8px; /* Round the corners */
  cursor: pointer; /* Change cursor on hover */
  transition: background-color 0.3s, border-color 0.3s; /* Smooth transition for hover effects */

  &:hover {
    background-color: #0056b3; /* Change background color on hover */
    border-color: #004494; /* Change border color on hover */
  }
`;

const StyledInput = styled.input`
  width: 2rem;
  height:2rem;
  margin:0.5rem;
  border:5px solid black;
  text-align: center;
  font-size: 1.5rem; 
  font-family: 'Arial', sans-serif;
  

  //  &:focus {
  //   border-color: blue; /* Change border color on focus */
  //   background-color: rgba(173, 216, 230, 0.5); /* Light blue background on focus */
  // }
`