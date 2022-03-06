import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  rating: {type: Number, min: 1, max: 4},
  review: String,
})

export {
  reviewSchema,
}