//File: badge_controller.mjs for Badge REST API
//Programmers: Wolfie Essink

import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import * as side_scroller_badges from './calorie_badge_model.mjs';
import * as calorie_badges from './calorie_badge_model.mjs';

const ERROR_NOT_FOUND = { Error: "Not found" };
const ERROR_INVALID_REQ = { Error: "Invalid request" };
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

//Server start + DB init
app.listen(PORT, async () => {
    try {
        await calorie_badges.connectToDatabase();
        await side_scroller_badges.connectToDatabase();
        console.log(`Badge API listening on port ${PORT}...`);

        /*
        // initialize database if empty
        const existingBadges = await side_scroller_badges.getAllBadges();
        if (existingBadges.length === 0) {
            await side_scroller_badges.createBadge(1, "Level 1 Complete", false);
            await side_scroller_badges.createBadge(2, "Level 1 Complete Under 0:15", false);
            await side_scroller_badges.createBadge(3, "Level 1 Complete With 3/3 Health", false);
            await side_scroller_badges.createBadge(4, "Level 2 Complete", false);
            await side_scroller_badges.createBadge(5, "Level 2 Complete Under 1:30", false);
            await side_scroller_badges.createBadge(6, "Level 2 Complete With 3/3 Health", false);
            await side_scroller_badges.createBadge(7, "Level 3 Complete", false);
            await side_scroller_badges.createBadge(8, "Level 3 Complete Under 3:00", false);
            await side_scroller_badges.createBadge(9, "Level 3 Complete With 3/3 Health", false);
            await side_scroller_badges.createBadge(10, "Complete All Levels", false);
            await side_scroller_badges.createBadge(11, "Complete All Level Time Challenges", false);
            await side_scroller_badges.createBadge(12, "Complete All Level Health Challenges", false);
            console.log("Initialized badge database with default badges");
        }
        */

    } catch (err) {
        console.error("Failed to start Badge API:", err);
    }
});

//GET all badges - side_scroller
app.get('/badge_service', asyncHandler(async (req, res) => {
    const badges = await side_scroller_badges.getAllBadges();
    res.status(200).json(badges);
}));

//GET all badges - calorie_tracker
app.get('/badge_service_cal', asyncHandler(async (req, res) => {
    const badges = await calorie_badges.getAllBadges();
    if (badges.length <= 0) {
        res.status(404).json(ERROR_NOT_FOUND);
    }
    res.status(200).json(badges);
}));

// ---------------------------------

//GET badge by badgeId - side_scroller
app.get('/badge_service/:badgeId', asyncHandler(async (req, res) => {
    const badge = await side_scroller_badges.getBadgeByBadgeId(parseInt(req.params.badgeId));
    if (badge === null) {
        res.status(404).json(ERROR_NOT_FOUND);
    } else {
        res.status(200).json(badge);
    }
}));

// GET badge by badgeId - calorie_tracker
app.get('/badge_service_cal/:badgeId', asyncHandler(async (req, res) => {
    const badge = await calorie_badges.getBadgeByBadgeId(parseInt(req.params.badgeId));
    if (badge === null) {
        res.status(404).json(ERROR_NOT_FOUND);
    } else {
        res.status(200).json(badge);
    }
}));

// ---------------------------------

//POST new badge - side_scroller
app.post('/badge_service', asyncHandler(async (req, res) => {
    const { badgeId, name, unlocked } = req.body;
    if (typeof badgeId !== 'number' || typeof name !== 'string' || typeof unlocked !== 'boolean') {
        res.status(400).json(ERROR_INVALID_REQ);
        return;
    }
    const result = await side_scroller_badges.createBadge(badgeId, name, unlocked);
    res.status(201).json(result);
}));

// POST new badge - calorie_tracker
app.post('/badge_service_cal', asyncHandler(async (req, res) => {
    const { name, unlocked, badgeId, goalInt, goalType, image } = req.body;
    if (typeof badgeId !== 'number' || typeof name !== 'string' || typeof unlocked !== 'boolean') {
        res.status(400).json(ERROR_INVALID_REQ);
    } else if (typeof goalInt !== 'number' || typeof goalType !== 'string' || typeof image !== 'string') {
        res.status(400).json(ERROR_INVALID_REQ);
    }
    const result = await calorie_badges.createBadge(name, unlocked, badgeId, goalInt, goalType, image);
    res.status(201).json(result);
}));

// ----------------------------------------------

//PUT update badge unlocked status - side-scroller
app.put('/badge_service/:badgeId', asyncHandler(async (req, res) => {
    const badgeId = parseInt(req.params.badgeId);
    const badge = await side_scroller_badges.getBadgeByBadgeId(badgeId);
    if (badge === null) {
        res.status(404).json(ERROR_NOT_FOUND);
        return;
    }
    const { unlocked } = req.body;
    if (typeof unlocked !== 'boolean') {
        res.status(400).json(ERROR_INVALID_REQ);
        return;
    }
    const updatedBadge = await side_scroller_badges.updateBadge(badge._id, { unlocked });
    res.status(200).json(updatedBadge);
}));

//PUT update badge unlocked status - calorie-tracker
app.put('/badge_service_cal/:badgeId', asyncHandler(async (req, res) => {
    const badgeId = parseInt(req.params.badgeId);
    const badge = await calorie_badges.getBadgeByBadgeId(badgeId);
    if (badge === null) {
        res.status(404).json(ERROR_NOT_FOUND);
        return;
    }
    const update = req.body;
    if (typeof update.unlocked !== 'boolean') {
        res.status(400).json(ERROR_INVALID_REQ);
        return;
    }
    const updatedBadge = await calorie_badges.updateBadge(badge._id, update);
    res.status(200).json(updatedBadge);
}));

// ------------------------------------------

//DELETE badge - side-scroller
app.delete('/badge_service/:badgeId', asyncHandler(async (req, res) => {
    const badgeId = parseInt(req.params.badgeId);
    const badge = await side_scroller_badges.getBadgeByBadgeId(badgeId);
    if (badge === null) {
        res.status(404).json(ERROR_NOT_FOUND);
        return;
    }
    await side_scroller_badges.deleteBadgeById(badge._id);
    res.status(204).end();
}));

//DELETE badge - calorie-tracker
app.delete('/badge_service_cal/:badgeId', asyncHandler(async (req, res) => {
    const badgeId = parseInt(req.params.badgeId);
    const badge = await calorie_badges.getBadgeByBadgeId(badgeId);
    if (badge === null) {
        res.status(404).json(ERROR_NOT_FOUND);
        return;
    }
    await calorie_badges.deleteBadgeById(badge._id);
    res.status(204).end();
}));