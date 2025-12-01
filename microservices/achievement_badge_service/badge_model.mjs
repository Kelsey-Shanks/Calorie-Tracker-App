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
        console.log("Successfully connected to MongoDB - Badge DB");
    } catch (err) {
        console.error(err);
        throw Error(`Could not connect to MongoDB - Badge DB ${err.message}`);
    }
}

//Badge Schema
const badgeSchema = mongoose.Schema({
    badgeId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    unlocked: { type: Boolean, required: true, default: false }
});

//Compile model
const Badge_Data = mongoose.model(BADGE_DB_NAME, badgeSchema);

/**
 * Create a new badge entry
 */
const createBadge = async (badgeId, name, unlocked = false) => {
    const badge = new Badge_Data({ badgeId, name, unlocked });
    return badge.save();
};

/**
 * Get all badges
 */
const getAllBadges = async () => {
    return Badge_Data.find().exec();
};

/**
 * Get badge by badgeId
 */
const getBadgeByBadgeId = async (badgeId) => {
    return Badge_Data.findOne({ badgeId: badgeId }).exec();
};

/**
 * Get badge by MongoDB _id
 */
const getBadgeById = async (id) => {
    return Badge_Data.findById(id).exec();
};

/**
 * Update badge
 */
const updateBadge = async (id, update) => {
    await Badge_Data.updateOne({ _id: id }, update).exec();
    return getBadgeById(id);
};

/**
 * Delete badge
 */
const deleteBadgeById = async (id) => {
    await Badge_Data.deleteOne({ _id: id }).exec();
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