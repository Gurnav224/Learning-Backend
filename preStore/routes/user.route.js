

const express = require("express");
const router = express.Router();
const {extend} = require('lodash');
const {User} = require("../models/user.model");
const {populateData} = require('../utils/utilis');


router.get('/', async (req, res) => {
    try {
        const { userId } = req.user;
        console.log(userId);

        // Populate cart and wishList directly on the query object
        const user = await User.findById(userId)
            .populate('cart.productId')
            .populate('wishList.productId');

        if (!user) {
            return res.status(400).json({ success: false, errorMessage: 'Unable to find user' });
        }

        // Transform populated data if needed
        const cart = user.cart.map(item => ({ ...item.productId._doc, quantity: item.quantity }));
        const wishList = user.wishList.map(item => item.productId._doc);

        return res.status(200).json({ user: { ...user._doc, cart, wishList }, success: true, message: "Successful" });
    } catch (error) {
        return res.status(500).json({ success: false, errorMessage: "Error while retrieving userDetails", errorMessage: error.message });
    }
});


module.exports = router;