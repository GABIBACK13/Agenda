import validator from 'validator';

export default class Form {
  constructor(classForm) {
    this.form = document.querySelector(classForm),
    this.emailInput = null,
    this.passwordInput = null,
    this.error_element = document.querySelector('.error-messeges'),
    this.error_txt = document.querySelector('.error-messeges__display')
  }

  init() {
    this.error_txt.innerHTML = '';
    this.events();
  }

  events() {
    if(!this.form) return;
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      const element = e.target;
      this.validate(element);
    });
  }

  validate(element) {
    this.emailInput = element.querySelector('input[name="email"]');
    this.passwordInput = element.querySelector('input[name="password"]');

    let errors = false;
    if(!this.emailInput.value || !this.passwordInput.value) {
      this.errorMessege('preencha todos os campos');
      errors = true;
    };
    if(!validator.isEmail(this.emailInput.value)) {
      console.log('e-mail inválido');
      this.errorMessege('e-mail inválido');
      errors = true;
    }
    if(this.passwordInput.value < 3 || this.passwordInput.value > 50) {
      this.errorMessege('senha deve conter entre 3 e 50 caracteres');
      errors = true;
    }
    if(!errors) {
      this.error_txt.innerHTML = '';
      this.error_element.style.display = "none";
      element.submit();
    };
  }

  errorMessege(msg) {
    this.error_txt.innerHTML = msg;
    this.error_element.style.display = "block";
  }
}