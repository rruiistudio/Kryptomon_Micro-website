//GET HTML ELEMENTS

import loadconfirm, { redirect } from './utilities.js'
let text = document.getElementById('verif')
let value = document.getElementById('login').value;
console.log(value)
const fail = document.createElement('p')
let count = 0;

// API CALL TO THE REGISTERED USERS 
const h = ['1', '2', '3'];



// prevent form from refreshing on click 
var form = document.getElementById("form");
function handleForm(event) { event.preventDefault(); }
text.addEventListener('click', handleForm);


// get document elements

var container = document.getElementById('auth');
var body = document.getElementById('cont')


function startgame() {
    console.log('Success! you can start playing');
    window.location.href = './game.html';

}

export default function loginSuccess() {
    value = document.getElementById('login').value;
    console.log(value)
    let t


    if (h.includes(value)) {

        // remove login form
        container.style.animation = "fadeOut 1s";

        // add success form
        var success = document.createElement('p')
        var scontent = document.createTextNode('Success! Welcome to the hunt!');
        success.style.animation = 'fadeIn 1s';
        success.style.color = 'white';
        success.style.fontSize = '40px';

        container.remove();

        success.appendChild(scontent);
        body.appendChild(success);

        setTimeout(startgame, 3000);

    } else {
        // empty field
        clearInput();
        
        if (value.length == 0) {
            console.log('this is not ok')
            verif.style.animation = 'shake 1s'            

        } else {
            count++
            console.log(count);
            if (count < 2) {
                t = document.createTextNode('Authentication failed, try again.')
            }

            if (count > 2) {
                t = document.createTextNode(' Are you sure you have a token?')
            }
        }
        
        fail.appendChild(t);
        fail.style.animation = 'fadeIn 1s'
        fail.style.fontFamily= 'Arial'
        fail.style.fontSize = '30px'
        fail.style.fontStyle = 'italic'
        fail.style.color = 'grey'
        fail.style.opacity = '50%'
        document.getElementById('auth').appendChild(fail)
        console.log('Get a token and come back')
    }
}

function clearInput() {
    document.getElementById('login').value = "";
}

text.addEventListener('click', loginSuccess)

let button = document.getElementById('verif');

redirect();
loadconfirm();
button.addEventListener('click', loginSuccess);