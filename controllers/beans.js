import { Coffee } from '../models/beans.js'

function index(req, res) {
  console.log('BEANNNNSSS')
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
  console.log('Did it woooork?')
  // req.body.owner = req.user.profile._id
  // Coffee.create(req.body)
  // .then(bean => {
  //   res.redirect('/')
  // })
  // .catch(err => {
  //   console.log(err)
  //   res.redirect('/')
  // })
}

export {
  index,
  create,
}