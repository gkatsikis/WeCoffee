import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  rating: {type: Number, min: 1, max: 4},
  content: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
})

const Review = mongoose.model('Review', reviewSchema)

export {
  Review,
}