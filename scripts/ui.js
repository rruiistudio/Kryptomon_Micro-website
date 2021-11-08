// 3: INSTRUCTIONS SCREEN 

import approvelocation from './map.js'

//asset sources:
let container = document.getElementById('artwork_container');
let button = document.getElementById('button_container');
let ui = document.getElementById('midsection')

function appendElement(elements) {

    // create new elements
    const prompt = document.createElement("img");
    const art = document.createElement("img");
    const button = document.createElement("img");

    // get old elements
    const old = document.getElementById('art');
    const oldb = document.getElementById('game_button')

    let p = document.getElementById('p');
    const pdiv = old.parentNode;
    const bdiv = oldb.parentNode;


    
    button.id = "game_button";
    button.className = "button";
   
    button.src =  elements[0];

    art.id = "art"; 
    art.src = elements[1];
    art.style.width = "30vw";


    prompt.id = "p";
    prompt.style.width = "90vw";
    prompt.style.padding = "5%";
    prompt.src = elements[2]; 

    pdiv.replaceChild(prompt, old);
    pdiv.replaceChild(art, p);
    bdiv.replaceChild(button, oldb);

}


//Screen1: 

let k_icon = "./images/Kryptomon_character.png";
let n_button = "./images/next_button.png" ;
let a_popup = "./images/bubbleA.png";



//Screen2: 

let g_button = "./images/go_button.png" ;
let b_popup = "./images/bubbleB.png";

let screen1 = [n_button, k_icon, a_popup]
let screen2 = [g_button, k_icon, b_popup]

let screens = [screen1, screen2]
let counter = -1; 



function changeScreen(){
    counter++
    approvelocation(counter)
  
    if (counter < 2) {
        console.log(counter)
        appendElement(screens[counter]);
        console.log('element removed');
    } else {
        //counter = 0;
        console.log('element number too high'); 
        ui.remove();
        
    }
    
    return counter; 
    
}


button.addEventListener('click', changeScreen);