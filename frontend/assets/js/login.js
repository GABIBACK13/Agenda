import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Form from './modules/formVerify';
console.log('resurce load');


const registerForm = new Form('.registerForm');
const loginForm = new Form('.loginForm');

registerForm.init();
loginForm.init();