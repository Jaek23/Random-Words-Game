const axios = require('axios');

let generatedWord = ''; 

// Define the resolvers
const resolvers = {
    Query: {
        getRandom: async () => {
            const options = {
                method:'GET',
                url:'https://random-words5.p.rapidapi.com/getRandom',
                headers: {
                    'x-rapidapi-key':'fa91ad8f67mshe72efe72d9ae0a0p1eebddjsn75d46814712c',
                    'x-rapid-host': 'random-words5.p.rapidapi.com'
                }
            };
        
            try{
                const response = await axios.request(options);
                generatedWord = response.data; //returns the random word from the request to the API 
                return generatedWord;
            } catch (error){
                console.error(error);
                throw new Error('Failed to fetch random word');
            }
        },
    },

    Mutation:{
        verifyWord: (parent, {generatedWordInput, typeWord}) => {
            // Compare the generated word with the typed word 
            return generatedWordInput === typeWord;
        },
    },
};

module.exports = resolvers;