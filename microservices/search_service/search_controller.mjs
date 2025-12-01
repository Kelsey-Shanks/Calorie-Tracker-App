// File: controller.mjs for search microservice REST API
/**
* Programmers: Kelsey Shanks, Nicole
*/

import express from 'express';
import asyncHandler from 'express-async-handler';
import cors from 'cors';

const ERROR_NOT_FOUND = {Error: "Not found"};
const ERROR_INVALID_REQ = {Error: "Invalid request"};
const PORT = 3001;                              // set random port number
const app = express();

const cors_option = {                               // will have to add everyone's local hosts...
    origin: 'http://localhost:5173',
    methods: 'POST',
    credentials: true,
};

app.use(cors(cors_option));

app.use(express.json());

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}...`);
});

//-------------------------------------------- GET OPERATIONS - FULL ARRAY ------------------------------------------------

app.post('/search_service', asyncHandler (async (req, res) => {        // --------ENDPOINT #1: Search Array --------
    if (req.body.length <= 0 || req.query.type === undefined){                                      // call does not detect a valid search
        res.status(400).json(ERROR_INVALID_REQ);
    } else {
        const array_to_search = req.body;                                                                 // pull array from request body
        if (req.query.type === "meal" || req.query.type === "exercise") {  // search for Calorie Tracker:
            let matches = array_to_search.filter((option) => {
                if(req.query.search === undefined || req.query.search.length === 0){                                                 // return all if input is blank
                    return option;
                } else {
                    return option.name.toLowerCase().includes(req.query.search);
                }
            });
            res.status(200).json(matches);
        } 
        else if (req.query.type === "music") {             // SEARCHES FOR PLAYLIST APP:
            let matches = array_to_search.filter((option) => {             
                // if song titles match
                if (option.songs !== undefined && option.songs.some(song => song.songTitle !== undefined && song.songTitle.toLowerCase().includes((req.query.search).toLowerCase()))) {
                    // return matches regardless of case
                    return option.songs.some(song => song.songTitle.toLowerCase().includes(req.query.search.toLowerCase()));
                }
                // if artist match
                if (option.songs !== undefined && option.songs.some(song => song.artist !== undefined && song.artist.toLowerCase().includes((req.query.search).toLowerCase()))) {
                    // return matches regardless of case
                    return option.songs.some(song => song.artist.toLowerCase().includes(req.query.search.toLowerCase()));
                }
                // if playlist titles match
                if (option.playlistTitle !== undefined && option.playlistTitle.toLowerCase().includes((req.query.search).toLowerCase())) {
                    // return matches regardless of case
                    return option.playlistTitle.toLowerCase().includes(req.query.search.toLowerCase());
                }
                // if hashtags match
                if (option.hashtags !== undefined && option.hashtags.some(hashtag => hashtag !== undefined && hashtag.toLowerCase().includes(req.query.search.toLowerCase()))) {
                    // return matches regardless of case
                    return option.hashtags.some(hashtag =>
                        hashtag.toLowerCase().includes(req.query.search.toLowerCase()));
                }
                // if single hashtag match
                if (option.hashtag !== undefined && option.hashtag.toLowerCase().includes(req.query.search.toLowerCase())) {
                    // return matches regardless of case
                    return option.hashtag.toLowerCase().includes(req.query.search.toLowerCase());
                }
                // if search is empty
                if (req.query.search === undefined || req.query.search === "") {
                    return option;
                }
            });
            res.status(200).json(matches);  
        }
    }      
})); 