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

    button.src = elements[0];

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

let k_icon = "./Kryptomon_character.png";
let n_button = "./next_button.png";
let a_popup = "./bubbleA.png";



//Screen2: 

let g_button = "../images/go_button.png";
let b_popup = "../images/bubbleB.png";

let screen1 = [n_button, k_icon, a_popup]
let screen2 = [g_button, k_icon, b_popup]

let screens = [screen1, screen2]
let counter = -1;

let navig
let count = 0;
let x
let t
let c
let d
let locate

function appendLocation() {
    d = document.getElementById('util');
    var locate = document.createElement("img");
    navig = document.createElement("img");

    locate.src = "../images/locate.png";
    locate.id = "locate";
    locate.style.zIndex = "10";
    locate.style.width = "10%";
    locate.classList.add("toggle");

    navig.src = "../images/navigate.png";
    navig.id = "navig";
    navig.style.zIndex = "10";
    navig.style.width = "10%";
    navig.classList.add("toggle");

    d.appendChild(locate);
    d.appendChild(navig);
    console.log('child appended')

    function toggleNav() {
        count++

        if (count == 1) {
            let b = document.getElementById('navbox');
            let dir = document.createElement('div');
            let box = document.createElement('div');

            //parent box
            dir.style.width = "80vw";
            dir.style.height = "60vh";
            dir.style.backgroundColor = "white";
            dir.style.opacity = "50%"
            dir.style.position = "relative";
            dir.classList.add("nav");
            dir.style.animation = "fadeIn 1s"

            // container box
            box.classList.add("nav");
            box.style.width = "80vw";
            box.style.height = "60vh";
            box.style.position = "absolute";
            box.style.opacity = "80%";
            box.style.backgroundColor = "grey"; 
            box.style.fontSize = "40px"; 
            box.style.textAlign = "center";
            box.style.color = "black";
            box.style.fontFamily = "Arial";
            dir.appendChild(box);

            // text & nav container

            t = document.createElement('p')
            t.style.padding = "2%"; 
            let content = document.createTextNode('DIRECTIONS')

            t.appendChild(content); 
            box.appendChild(t); 

            // TO FIX 

            c = document.createElement('div')
            c.style.position = "absolute"; 
            c.style.width = "80%"
            c.style.height = "80%"
            c.style.bottom = "0"; 
            c.style.color = "red"; 
            c.style.zIndex = "4"; 

            box.appendChild(c);

            let x = document.createElement('img');
            x.src = "../images/x.png";
            x.style.width = "8%";
            x.style.padding = "5%";
            x.style.position = "absolute";
            x.style.top = "0";
            x.style.right = "0";
            x.style.zIndex = "2";
            x.style.opacity = "100%";
            dir.appendChild(x);


            function closeNav() {
                b.removeChild(dir);
                count = 0;
            }

            b.appendChild(dir);

            x.addEventListener('click', closeNav)
          
            return x;
        }

        return count, x;


    }

    navig.addEventListener('click', toggleNav);
    return navig, locate
}

 

function changeScreen() {
    //let routetoggle = false; 
    counter++
    approvelocation(counter)


    if (counter < 2) {
        console.log(counter)
        appendElement(screens[counter]);
    }

    if (counter == 2) {
        appendLocation();
        routetoggle = true;
        ui.remove();
        return routetoggle;
    }

    if (counter > 2) {
        appendLocation();
        ui.remove();
    }

    return counter, routetoggle;

}
button.addEventListener('click', changeScreen);
console.log(locate);
export default routetoggle; locate;
