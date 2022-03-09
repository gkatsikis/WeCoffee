import mongoose from 'mongoose'

const Schema = mongoose.Schema

const coffeeSchema = new Schema({
  name: { type: String, required: true},
  roaster: { type: String, required: true},
  origin: { type: String, required: true},
  region: String,
  varietal: [String],
  tasting: [String],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
  beansOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}
})

const Coffee = mongoose.model('Coffee', coffeeSchema)

export {
  Coffee,
}