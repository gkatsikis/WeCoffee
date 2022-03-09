import mongoose from 'mongoose'

const Schema = mongoose.Schema

const coffeeSchema = new Schema({
  name: String, //required
  roaster: String, //required
  origin: String, //required
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