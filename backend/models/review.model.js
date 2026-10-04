import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    drink: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;