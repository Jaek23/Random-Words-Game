const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

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
        verifyWord: (parent, {typeWord}) => {
            // Compare the generated word with the typed word 
            return generatedWord === typeWord;
        },
        signUp: async (_, {username, email, password}) => {
            // Hash the password 
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user 
            const user = new User({
                username, 
                email,
                password: hashedPassword,
            });

            // Save the user into Mongo Database 
            await user.save();

            // Create a JWT token 
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
                expiresIn:'7d',
            });
            
            return {token, user};
        },
        login: async (_, {email, password}) => {
            // Find the user by email 
            const user = await User.findOne({email});
            if(!user) {
                throw new Error('User not found');
            }

            // Compare the password 
            const valid = await bcrypt.compare(password, user.password);
            if(!valid) {
                throw new Error('Invalid Password');
            }

            // Create a JWT token
            const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {
                expiresIn:'7d',
            });

            return {token, user};
        }
    },
};

module.exports = resolvers;