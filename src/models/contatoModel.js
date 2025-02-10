const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  userEmail: {type: String, required: true, default: 'all-access'},
  name: {type: String, required: true },
  lastName: {type: String, required: false, default: ''},
  phone: {type: String, required: false, default: ''},
  email: {type: String, required: false, default: ''},
  date: {type: Date, default: Date.now()}
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body,
    this.errors = [],
    this.contato = null
  }

  
  async contatoExists() { 
    let user = {};
    try {
      user = {
        name: await ContatoModel.findOne({ name: this.body.name }),
        email: await ContatoModel.findOne({ email: this.body.email })
      };
    } catch (error) {
      console.log(error);
      return;
    }
    return user;
  }
  
  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
    this.body = {
      userEmail: this.body.userEmail,
      name: this.body.name,
      lastName: this.body.lastName,
      phone: this.body.phone,
      email: this.body.email
    };
  }
  
  validate() {
    this.cleanUp();
    
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push(' E-mail inválido');
    if(!this.body.name) this.errors.push('Campo de nome necessário');
    if(!this.body.phone  && !this.body.email) this.errors.push('Preencha pelo menos um campo de contato!');
  }
  
  async register() {
    this.validate();
    const contato = await this.contatoExists();

    if(contato.name && contato.email) this.errors.push('contato já existe');
    if(this.errors.length > 0 ) return ;
    
    this.contato = await ContatoModel.create(this.body);
  }
  
  async edit(id) {
    if(typeof id !== 'string') return;
    this.validate();
    if(this.errors.length > 0) return;
    
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
  }
  
  static async findUserById(id) {
    if(typeof id !== 'string') return;
    const user = await ContatoModel.findById(id);
    return user;
  }

  static async findContatos(email) {
    const contatos = await ContatoModel.find({userEmail: email}).sort({ date : -1});
    return contatos;
  }

  static async delete(id) {
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({_id: id});
    return contato;
  }
}


module.exports = Contato;