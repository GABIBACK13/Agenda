const User = require('../models/userModel');

exports.index = (req, res) => {
  if (req.session.user) {
    res.render('login-logado');
    return;
  }
  return res.render('login');
}

exports.registerUser = async (req, res) => {
  try {
    const login = new User(req.body);
    await login.register();
    if(login.errors.length > 0 ) {
      req.flash('errors', login.errors);
      req.session.save(function() {
        return res.redirect('/login');
      });
      return;
    }

    req.flash('success', 'Usuário cadastrado com sucesso');
    req.session.save(function() {
      return res.redirect('/login');
    });

  } catch (error) {
    console.log(error);
    return res.render('404');
  }
}

exports.entry = async (req, res) => {
  try {
    const login = new User(req.body);
    await login.login();
    if(login.errors.length > 0 ) {
      req.flash('errors', login.errors);
      req.session.save(function() {
        return res.redirect('/login');
      });
    return;
    }

    req.flash('success', 'Você entrou no sistema');
    req.session.user = login.user;
    req.session.save(function() {
    return res.redirect('/login');
    });

  } catch (error) {
    console.log(error);
    return res.render('404');
  }
}

exports.logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/login');
}
