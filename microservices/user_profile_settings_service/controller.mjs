import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import * as calorie_tracker from './calorie_tracker_users_model.mjs';

const ERROR_NOT_FOUND = {Error: "Not found"};
const ERROR_INVALID_REQ = {Error: "Invalid request"};
const PORT = process.env.PORT;
const app = express();

const cors_option1 = {                               
    origin: 'http://localhost:5173',
    methods: 'POST',
    credentials: true,
};

const cors_option2 = {                               
    origin: 'http://localhost:5173',
    methods: 'PUT',
    credentials: true,
};

app.use(cors(cors_option1, cors_option2));

app.use(express.json());

app.listen(PORT, async () => {
    await calorie_tracker.connectToDatabase();
    console.log(`Server listening on port ${PORT}...`);
});

// ------------------------- CREATE + GET OPERATIONS ----------------------------

// ENPOINT #1 : Create new data OR Validate user - Calorie Tracker Users -------------------
app.post('/user_profiles', asyncHandler (async (req, res) => {
    console.log("Controller reached.");
    if (req.body.length <= 0 && (req.query.app === undefined || req.query.type === undefined)) {
        res.status(400).json(ERROR_INVALID_REQ);
    }
    if (req.query.app === "calorie_tracker" && req.query.type === "create") {
        const result = await calorie_tracker.createUser(
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.phone,
            req.body.password,
            req.body.photo,
            req.body.appearance,
            req.body.language
        );
        res.status(201).json(result);
    } else if (req.query.app === "calorie_tracker" && req.query.type === "pass_val") {
        const user = await calorie_tracker.getUserByEmailNPassword(req.body.email, req.body.password);
        if (user === null) {
            res.status(404).json(ERROR_NOT_FOUND);
        } else {
            res.status(201).json(user);
        }
    } else {
        res.status(400).json(ERROR_INVALID_REQ);
    }
}));

// ----------------------- UPDATE OPERATIONS ------------------------------

// ENDPOINT #3 : Update by ID - Calorie Tracker Users --------------------
app.put('/user_profiles/:id', asyncHandler (async (req, res) => {
    if (req.query.app === "calorie_tracker"){
        const oldUserData = await calorie_tracker.getUserById(req.params.id);
        let uProperties = Object.keys(oldUserData);
        for (let i=0; i < uProperties.length; i++) {
            if(Object.hasOwnProperty(uProperties[0]) !== Object.hasOwnProperty(req.body)) {
                res.status(400).json(ERROR_INVALID_REQ);
            }
        }
        let updatedUserData = await calorie_tracker.updateUserData(req.params.id, req.body);
        res.status(200).json(updatedUserData);
    } else {
        res.status(400).json(ERROR_INVALID_REQ);
    }
    
}));

// ----------------------- DELETE OPERATIONS ------------------------------

// ENDPOINT #4 : Delete by ID
app.delete('/user_profiles/:id', asyncHandler (async (req, res) => {
    if (req.query.app === "calorie_tracker") {
        let userToRemove = await calorie_tracker.getUserById(req.params.id);
        if (userToRemove === null) {
            res.status(404).json(ERROR_NOT_FOUND);
        } else {
            await calorie_tracker.deleteUserById(req.params.id);
            res.status(204).end();
        }
    } else {
        res.status(400).json(ERROR_INVALID_REQ);
    }
}));