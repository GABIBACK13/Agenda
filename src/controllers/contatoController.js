const { async } = require('regenerator-runtime');
const Contato = require('../models/contatoModel');

exports.index = (req, res) => {
  return res.render('contato', {
    contato: {}
  });
}

exports.registerContato = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();
    if(contato.errors.length > 0 ) {
      req.flash('errors', contato.errors);
      req.session.save(function() {
        return res.redirect('/contato');
      });
      return;
    }

    req.flash('success', 'Contato registrado com sucesso');
    req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
    return;
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
}

exports.edit = async (req, res) => {
  if(!req.params.id) return res.render('404');
  
  const contato = await Contato.findUserById(req.params.id);
  if(!contato) return res.render('404');
  
  return res.render('contato', { contato });
}

exports.editContato = async (req, res) => {
  if(!req.params.id) return res.render('404');

  try {
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if(contato.errors.length > 0 ) {
      req.flash('errors', contato.errors);
      req.session.save(function() {
        return res.redirect('/contato');
      });
      return;
    }

    req.flash('success', 'Contato editado com sucesso');
    req.session.save(() => res.redirect("/contato"));
    return;
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
}

exports.delete = async (req, res) => {
  if(!req.params.id) return res.render('404');
  const contato = await Contato.delete(req.params.id);
  if(!contato) return res.render('404');

  req.flash('success', 'Contato deletado com sucesso');
  req.session.save(() => res.redirect('/'));
  return;
}