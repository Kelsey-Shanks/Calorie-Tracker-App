// Description: Calorie Tracker App model.mjs for User objects
// Programmer: Kelsey Shanks

import mongoose from 'mongoose';
import 'dotenv/config';

const USER_DB_NAME = 'user_profiles_db';

let connection = undefined;

async function connectToDatabase() {
    try{
        connection = await mongoose.connect 
            (process.env.MONGODB_CONNECT_STRING, {dbName: USER_DB_NAME});
        console.log("Successfully connected to MongoDB - Users using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB - Users ${err.message}`);
    }
}

// Calorie-Counting App - User Profile Schema and Model:
const calorieTrackerUserSchema = mongoose.Schema({
    first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	email: {type: String, required: true},
	phone: {type: String, required: true},
	password: {type: String, required: true},
	photo: {type: String, required: true},
	appearance: {type: String, required: true},
	language: {type: String, required: true},
}, {collection: 'calorie_tracker_users'});

const Calorie_Tracker_User = mongoose.model(USER_DB_NAME, calorieTrackerUserSchema);

/**
 * Creates a new Calorie_Tracker_User object in database
 * @param {string} first_name
 * @param {string} last_name
 * @param {string} email
 * @param {string} phone
 * @param {string} password
 * @param {string} photo
 * @param {string} appearance
 * @param {string} language
 */
const createUser = async(
    first_name,
    last_name,
    email,
    phone,
    password,
    photo,
    appearance,
    language
) => {
    const newUser = new Calorie_Tracker_User({
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: password,
        photo: photo,
        appearance: appearance,
        language: language
    });
    return newUser.save();
};

/**
 * Pulls Calorie_Tracker_User object with matching login data from database
 * @param {string} id
 * @returns {object}
 */
const getUserByEmailNPassword = async(email, password) => {
    const user = Calorie_Tracker_User.findOne({ email: email, password: password }).exec();
    return user;
};

/**
 * Pulls Calorie_Tracker_User object with matching id from database
 * @param {string} id
 * @returns {object}
 */
const getUserById = async(id) => {
    const user = Calorie_Tracker_User.findById(id).exec();
    return user;
};


/**
 * Updates Calorie_Tracker_User object in database with new data
 * @param {string} id
 * @param {object} update
 * @returns {object} updatedUserData
 */
const updateUserData = async(id, update) => {
    await Calorie_Tracker_User.updateOne({_id: id}, update).exec();
    const updatedUserData = getUserById(id);
    return updatedUserData;
};

/**
 * Deletes Calorie_Tracker_User object from database
 * @param {string} id
 */
const deleteUserById = async(id) => {
    await Calorie_Tracker_User.deleteOne({_id: id});
    return
};

export { connectToDatabase, createUser, getUserByEmailNPassword,
    getUserById, updateUserData, deleteUserById};