const Contato = require('../models/contatoModel');

exports.index = async (req, res) => {
  try {
    const email = req.session?.user?.email || 'all-access';
    const contatos = await Contato.findContatos(email);
    res.render('index', {contatos});
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
}