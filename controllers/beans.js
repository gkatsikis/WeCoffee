import { Coffee } from '../models/beans.js'

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
  Coffee.findById(req.params.id, function (err, beans) {
    res.render('beans/show', {
      title: 'Coffee Review',
      beans,
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