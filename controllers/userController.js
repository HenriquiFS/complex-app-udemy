const User = require('../models/User');

exports.home = function(req, res) {
  if(req.session.user) {
    res.render('home-dashboard', {username: req.session.user.username, avatar: req.session.user.avatar})
  } else {
    res.render('home-guest', {errors: req.flash('errors'), regErrors: req.flash('regErrors')})
  }
}

exports.login = function(req, res) {
  let user = new User(req.body);
  user.login().then(function(result) {
    req.session.user = {avatar: user.avatar, username: user.data.username}
    req.session.save( () => {
      res.redirect('/')
    })
  }).catch(function(e) {
    req.flash('errors', e)
    req.session.save(() => {
      res.redirect('/')
    })
  });
}

exports.logout = function(req, res) {
  req.session.destroy( () => {
    res.redirect('/')
  })
}

exports.register = function(req, res) {
  let user = new User(req.body);
  user.register()
  .then(() => {
    req.session.user = {username: user.data.username, avatar: user.avatar}
    req.session.save( () => {
      res.redirect('/')
    })
  }).catch((regErrors) => {
    regErrors.forEach(function(error) {
      req.flash('regErrors', error)
    })
    req.session.save( () => {
      res.redirect('/')
    })
  })
}