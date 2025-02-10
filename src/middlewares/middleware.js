exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
//&& 'EBADCSRFTOKEN' === err.code

exports.globalMesseges = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
}
