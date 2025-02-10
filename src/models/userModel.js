const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required:true},
  password: { type: String, required: true}
});

const UserModel = mongoose.model('User', userSchema);

class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.validate();
    if(this.errors.length > 0 ) return ;
    this.user = await this.userExists();
    if(!this.user) {
      this.errors.push('Usuário não existe');
      return;
    }
    if(!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }
  }

  async userExists() { 
    const user = await UserModel.findOne({ email: this.body.email });
    return user;
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password
    };
  }

  validate() {
    this.cleanUp();
    if(!validator.isEmail(this.body.email)) this.errors.push(' E-mail inválido')
    if(this.body.password < 4 || this.body.password > 51) {
      this.errors.push('A senha deve ter entre 4 e 50 caracteres');
    }
  }

  async register() {
    this.validate();
    const user = await this.userExists();
    if(user) this.errors.push('Usuário já existe');
    if(this.errors.length > 0 ) return ;
    const salt = bcrypt.genSaltSync();
    this.body.password = bcrypt.hashSync(this.body.password, salt);

    this.user = await UserModel.create(this.body);
  }

}
module.exports = User;
