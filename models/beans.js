import mongoose from 'mongoose'

const Schema = mongoose.Schema

const coffeeSchema = new Schema({
  name: String,
  roaster: String,
  origin: String,
  region: String,
  varietal: [String],
  tasting: [String],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
 
})

const Coffee = mongoose.model('Coffee', coffeeSchema)

export {
  Coffee,
}