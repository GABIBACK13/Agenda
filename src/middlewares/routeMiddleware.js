exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', 'Você precisa fazer login primeiro!');
    req.session.save(() => res.redirect('/'));
    return;
  }
  next();
}
