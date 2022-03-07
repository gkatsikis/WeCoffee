import { Coffee } from '../models/beans.js'
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
  .populate('reviews')
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

// function createReview(req, res) {
//   // show(req, res)
//   // Coffee.findById(req.params.id)
//   // .populate('review')
//   // .exec(function(err, review) {
//   //   res.render('beans/show', { title: 'Reviews', review})
//   // })

//   console.log(req.body)
//   }

  function createReview(req, res) {
    Review.create(req.body)
    .then(review => {
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