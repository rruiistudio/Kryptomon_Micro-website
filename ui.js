// 3: INSTRUCTIONS SCREEN 

import approvelocation, { generateRoute } from './map.js'
let routetoggle = false; 




//console.log(userlocation)

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

let k_icon = "Kryptomon_character.png";
let n_button = "next_button.png" ;
let a_popup = "bubbleA.png";



//Screen2: 

let g_button = "go_button.png" ;
let b_popup = "bubbleB.png";

let screen1 = [n_button, k_icon, a_popup]
let screen2 = [g_button, k_icon, b_popup]

let screens = [screen1, screen2]
let counter = -1; 



function changeScreen(){
    //let routetoggle = false; 
    counter++
    approvelocation(counter)
    
  
    if (counter < 2) {
        console.log(counter)
        appendElement(screens[counter]);
        
   
    } 
    
    if (counter == 2) {

        routetoggle = true; 
        ui.remove(); 
        return routetoggle;
    }
    
    if (counter > 2) {
        ui.remove();    
    }
    
    return counter, routetoggle; 
    
}
button.addEventListener('click', changeScreen);
//console.log(routetoggle)


export default routetoggle; 