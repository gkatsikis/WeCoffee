import { Coffee } from '../models/beans.js'
import { createReview } from './reviews.js'

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
  createReview(req, res)
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
    // .then(beans => {
    // res.redirect(`beans/${req.params.id}`)
    // })
  .then(bean => {
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

export {
  index,
  create,
  show,
}