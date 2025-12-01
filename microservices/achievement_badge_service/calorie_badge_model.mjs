//File: badge_model.mjs for badge database
//Programmers: Wolfie Essink

import mongoose from 'mongoose';
import 'dotenv/config';

const BADGE_DB_NAME = 'badge_db';

let connectionBadge = undefined;

async function connectToDatabase() {
    try {
        connectionBadge = await mongoose.connect(
            process.env.MONGODB_CONNECT_STRING,
            { dbName: BADGE_DB_NAME }
        );
        console.log("Successfully connected to MongoDB - Badge DB - Calorie-Tracker");
    } catch (err) {
        console.error(err);
        throw Error(`Could not connect to MongoDB - Badge DB ${err.message}`);
    }
}

//Badge Schema
const badgeSchemaC = mongoose.Schema({
    badgeId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    unlocked: { type: Boolean, required: true },
    goalInt: { type: Number, required: true }, 
    goalType: { type: String, required: true },
    image: {type: String, required: true}
});

//Compile model
const Badge_Data_C = mongoose.model(BADGE_DB_NAME, badgeSchemaC);

/**
 * Create a new badge entry
 */
const createBadge = async (badgeId, name, unlocked = false, goalInt, goalType, image) => {
    const badge = new Badge_Data_C({ badgeId, name, unlocked, goalInt, goalType, image});
    return badge.save();
};

/**
 * Get all badges
 */
const getAllBadges = async () => {
    return Badge_Data_C.find().exec();
};

/**
 * Get badge by badgeId
 */
const getBadgeByBadgeId = async (badgeId) => {
    return Badge_Data_C.findOne({ badgeId: badgeId }).exec();
};

/**
 * Get badge by MongoDB _id
 */
const getBadgeById = async (id) => {
    return Badge_Data_C.findById(id).exec();
};

/**
 * Update badge
 */
const updateBadge = async (id, update) => {
    await Badge_Data_C.updateOne({ _id: id }, update).exec();
    return getBadgeById(id);
};

/**
 * Delete badge
 */
const deleteBadgeById = async (id) => {
    await Badge_Data_C.deleteOne({ _id: id }).exec();
};

export {
    connectToDatabase,
    createBadge,
    getAllBadges,
    getBadgeByBadgeId,
    getBadgeById,
    updateBadge,
    deleteBadgeById
};