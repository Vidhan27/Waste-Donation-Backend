const express = require('express');
const router = express.Router();
const middleware = require('../middleware/index');
const User = require('../models/user');
const Ewaste = require('../models/ewaste');
const Foodwaste = require('../models/foodwaste');
const Clothwaste = require('../models/clothwaste');

router.get("/donor/dashboard", middleware.ensureDonorLoggedIn, async (req, res) => {
    try {
        const donorId = req.user._id;
        const numPendingDonations = await Donation.countDocuments({ donor: donorId, status: "pending" });
        const numAcceptedDonations = await Donation.countDocuments({ donor: donorId, status: "accepted" });
        const numCollectedDonations = await Donation.countDocuments({ donor: donorId, status: "collected" });

        res.json({
            title: "Dashboard",
            numPendingDonations,
            numAcceptedDonations,
            numAssignedDonations,
            numCollectedDonations
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post("/donor/donate", middleware.ensureDonorLoggedIn, async (req, res) => {
    try {
        const donation = req.body.donation;
        if (!donation) {
            res.status(400).json({ message: "Invalid request body: missing donation object" });
            return;
         }
        donation.status = 'pending';
        donation.donor = req.user._id;
        const newDonation = new Donation(donation);
        await newDonation.save();
        res.json({ message: "Donation request sent successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Some error occurred on the server.' });
    }
});

router.get("/donor/donations/pending", middleware.ensureDonorLoggedIn, async (req, res) => {
    try {
        const pendingDonations = await Donation.find({ donor: req.user._id, status: ["pending", "rejected", "accepted", "assigned"] }).populate("agent");
        res.json({ title: "Pending Donations", pendingDonations });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Some error occurred on the server.' });
    }
});

router.get("/donor/donations/previous", middleware.ensureDonorLoggedIn, async (req, res) => {
    try {
        const previousDonations = await Donation.find({ donor: req.user._id, status: "collected" }).populate("agent");
        res.json({ title: "Previous Donations", previousDonations });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Some error occurred on the server.' });
    }
});

router.delete("/donor/donation/deleteRejected/:donationId", async (req, res) => {
    try {
        const donationId = req.params.donationId;
        await Donation.findByIdAndDelete(donationId);
        res.json({ message: "Donation deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Some error occurred on the server.' });
    }
});

router.put("/donor/profile", middleware.ensureDonorLoggedIn, async (req, res) => {
    try {
        const id = req.user._id;
        const updateObj = req.body.donor; // updateObj: {firstName, lastName, gender, address, phone}
        await User.findByIdAndUpdate(id, updateObj);
        res.json({ message: "Profile updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Some error occurred on the server.' });
    }
});

module.exports = router;
