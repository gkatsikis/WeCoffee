import { Coffee } from "../models/beans.js"

function createReview(req, res) {
  req.body.owner = req.user.profile._id
  Coffee.find({})
  .then(coffee => {
    coffee[0].reviews.push(req.body.content)
  })
  
}

export {
  createReview,
}