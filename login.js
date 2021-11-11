//GET HTML ELEMENTS

import loadconfirm, {redirect} from './utilities.js'

let button = document.getElementById('verif');
let login = document.getElementById('login').value;


// 1: AUTH SCREEN 

function loginSuccess() { 
    console.log(login);
    window.location.href = 'game.html'; 
}

redirect(); 
loadconfirm();
button.addEventListener('click', loginSuccess);