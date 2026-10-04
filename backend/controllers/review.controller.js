import mongoose from "mongoose";
import Review from "../models/review.model.js";

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json({success: true, data: reviews});
    } catch (error) {
        console.log("Error in fetching reviews.");
    }
};

export const createReviews = async (req,res) => {
    const review = req.body; //user will send this data

    if (!review.title || !review.image || !review.drink || !review.rating || !review.location || !review.price || !review.review) {
        return res.status(400).json({success:false, message: "Please provide all fields."});
    }

    const newReview = new Review(review);

    try {
        await newReview.save();
        res.status(201).json({success: true, data: newReview});
    } catch (error) {
        console.error("Error in creating review:", error.message);
        res.status(500).json({success:false, message: "Server Error."});
    }
};

export const updateReview = async (req, res) => {
    const {id} = req.params;

    const review = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid review ID."});
    }

    try {
        const updatedReview = await Review.findByIdAndUpdate(id, review, {new:true});
        res.status(200).json({success: true, data: updatedReview});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error."});
    }
};

export const deleteReview = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid review ID."});
    }
    
    try {
        await Review.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Review deleted."});
    } catch (error) {
        console.log("Error in deleting review:", error.message);
        res.status(500).json({success: false, message: "Server Error."});
    }
};