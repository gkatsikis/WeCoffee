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
      review: beans.reviews,
      title: 'All Beans'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/beans')
  })
}

function create(req, res) {
  req.body.beansOwner = req.user.profile._id
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
      review: bean.reviews,
      title: "Reviews",
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

  function edit(req, res) {
    Review.findById(req.params.id)
    .then(review => {
      res.render('beans/edit', {
        review,
        title: "edit"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/beans')
  })
}

function update(req, res) {
  Review.findByIdAndUpdate(req.params.id)
  .then(review => {
    if (review.owner.equals(req.user.profile._id)) {
      review.updateOne(req.body, {new: true})
      .then (() => {
        res.redirect(`/beans`)
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/beans')
  })
}

function deleteBeans(req, res) {
  Coffee.findByIdAndDelete(req.params.id)
  .then(bean => {
    // if (bean.beansOwner.equals(req.user.profile._id)) {
    //   bean.delete()
    //   .then(() => {
        res.redirect('/beans')
      })
    // } else {
    //   throw new Error ('Not authorized to delete')
    // }
  .catch(err => {
    console.log(err)
    res.redirect('/beans')
  })
}

function profileIndex(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    res.render('profile/index', {
      profile,
      review: profile.reviews,
      title: 'Your Reviews'
  })
})
}

export {
  profileIndex,
  deleteBeans as delete,
  update,
  edit,
  index,
  create,
  show,
  createReview,
}