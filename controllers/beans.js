import req from 'express/lib/request.js'
import res from 'express/lib/response.js'
import { Coffee } from '../models/beans.js'
import { Profile } from '../models/profile.js'
import { Review } from '../models/reviews.js'

function index(req, res) {
  Coffee.find({})
  .then(beans => {
    res.render('beans/index', {
      beans,
      title: 'All Beans'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/beans')
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Coffee.create(req.body)
  .then(bean => {
    res.redirect('/')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Coffee.findById(req.params.id)
  .populate({path: 'reviews', populate: {path: 'owner'}})
  .then(bean => {
    console.log(bean)
    res.render(`beans/show`, {
      bean,
      title: "Reviews"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/beans')
  })
}

  function createReview(req, res) {
    req.body.owner = req.user.profile._id
    Review.create(req.body)
    .then(review => {
      Profile.findById(req.user.profile._id)
      .then(profile => {
        profile.reviews.push(review._id)
        profile.save()
      })
      Coffee.findById(req.params.id, function(err, coffee) {
        coffee.reviews.push(review._id)
        coffee.save(function (err) {
          res.redirect(`/beans/${coffee._id}`)
        })
      })
    })
  }

export {
  index,
  create,
  show,
  createReview,
}