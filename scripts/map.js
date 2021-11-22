//import mobileAndTabletCheck from './utilities.js';
import geojson from './data.js';
import routetoggle from './ui.js';
import addInfo, {addData} from './mapfunctions.js'
import locate from './ui.js'
import appendLocation from './ui.js'
//DECLARE VARIABLES
let map
let lat, long

let userlocation = [-2.24, 53.48] // initial user location
let len

let usermarker
let filter
let radiusLayer = 'radius'
let searchradius = 2; 

let start, end
//--------------------------------------------------------------------------------------------------------------------//

// MAPBOX ACCESS TOKENS
mapboxgl.accessToken = 'pk.eyJ1IjoicnJ1aWlkZXYiLCJhIjoiY2t2N3FtMjFhMDFmNzJvbzdidnpkaGxweiJ9.R0WQ2KnHg8EQ9wyWPYLQFg';

//--------------------------------------------------------------------------------------------------------------------//
// initialize map & location marker to userlocation
map = setupMap(userlocation)
let user = marker(userlocation);

// UTILITY FUNCTIONS


function initialFly(){
        navigator.geolocation.getCurrentPosition((position) => {
                map.flyTo({
                        center: [position.coords.longitude, position.coords.latitude],
                        zoom: 20,
                        speed: 1.5,
                        curve: 1,
                })

               // getDirection(position, [-2.24, 53.48]);
        })    
}

export function updateFly(){
        
        navigator.geolocation.getCurrentPosition((position) => {
                map.flyTo({
                        center: [position.coords.longitude, position.coords.latitude],
                        zoom: 25,
                        speed: 1.5,
                        curve: 1,
                })
        }) 

}




//-------------------------------------------------------------------------------------------------------------------//

function successLocation(position) {

        long = position.coords.longitude;
        lat = position.coords.latitude;
        
        userlocation = [long, lat]
        console.log(userlocation)

        updateMarker(user, userlocation);

        //this can stay here actuallieh 
        

        let search = makeRadius(userlocation, 15000);
        let availableBoxes= inRadius(geojson, search);
        console.log(availableBoxes)
 
        let filter = makeRadius(userlocation, searchradius); 
        addData(map, radiusLayer, filter);
        
        let allboxes = mysterybox();
        console.log('this is from the success location function')

        return userlocation
        
}


function errorLocation() {
        map = setupMap([-2.24, 53.48]);
        map.flyTo({ center, zoom: 30 });
}


// 1: CREATE A NEW MAP CONTAINER & PRE-SPECIFY ZOOM LEVEL 
function setupMap(center) { 
        map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/rruiidev/ckv7qzrxu0fjk14ujmbfiy2vr',
                center: center,
                zoom: 0

        }); 

       return map;
}


// 2: ADD USER LOCATION DOT: 
function marker(center) {
        {
                // create a HTML element for each feature
                const el = document.createElement('div');
                el.id = 'user';
                el.className = 'marker';

                usermarker= new mapboxgl.Marker(el)
                        .setLngLat(center)
                        .addTo(map);
        }

        console.log('User location marker loaded succesfully')
        return usermarker; 

}

// update user location dot

function updateMarker(marker, center){
        marker.setLngLat(center)
        return marker;
}

// 3: ADD MYSTERY BOXES: 

function mysterybox() {
        for (const feature of geojson.features) {

                // a: create containers for each feature
                const el = document.createElement('div');
                el.className = 'mark';


                // b: give each div a unique ID
                //randomID();
                

                function pointDistance() {

                        var from = turf.point(userlocation);
                        var to = turf.point(feature.geometry.coordinates);
                        
                        var options = { units: 'meters' };
                        var distance = Math.round(turf.distance(from, to, options));
                        //let e = [distance]; 
                        //console.log(e)


                        new mapboxgl.Marker(el)
                        .setLngLat(feature.geometry.coordinates)
                        .setPopup(
                                new mapboxgl.Popup({ offset: 25 }) // add popups
                                        .setHTML(
                                                `<img id="mysterybox" src = "../images/Box_Closed.png" width="100px">
                                                <h3>Mysterybox</h3><p>${distance} m away</p>`
                                        )
                        )
                        .addTo(map);

                        return distance
                }

                pointDistance();

                getRoute(userlocation, [
                        114.14438724517821,
                        22.288897874622883
                      ])

                new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
                

        }
}

// add box functions 

function makeRadius(lngLatArray, radiusInMeters) {
        var point = turf.point(lngLatArray);
        var buffered = turf.buffer(point, radiusInMeters, { units: 'kilometers' });

        return buffered;
      }

function inRadius(data, filter){
        var joined = data.features.filter(function (feature) {
                return turf.booleanPointInPolygon(feature, filter) ;
              });
            
        len = joined.length;
        console.log(joined);

        return joined, len;
}

function loadboxes(){
        //loads all boxes
}

function filterbox(){
        // checks which boxes are in radius & display those 

}


function boxdistance(){

}



function boxID(){

}

// 4: GENERATE DIRECTIONS BETWEEN USER LOCATION & CLICKED BOX

// A: create a function to make a directions request
async function getRoute(start, end) {
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
          { method: 'GET' }
        );


        const json = await query.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;


        const geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        };


        // if the route already exists on the map, we'll reset it using setData

        async function toggleView(){
                //console.log(routetoggle)
                if (routetoggle == false) {
                        if (map.getSource('route')) {
                                map.getSource('route').setData(geojson);
                              }
                              // otherwise, we'll make a new request
                              else {
                                map.addLayer({
                                  id: 'route',
                                  type: 'line',
                                  source: {
                                    type: 'geojson',
                                    data: geojson
                                  },
                                  layout: {
                                    'line-join': 'round',
                                    'line-cap': 'round'
                                  },
                                  paint: {
                                    'line-color': '#3887be',
                                    'line-width': 10,
                                    'line-opacity': 0.75
                                  }
                                });
                              }                  
                }
        }

        toggleView();
      }
      
     


// NATIVE UTILITY FUNCTIONS 

function randomID(location) {
        var id = location
        console.log(id)

}



// GET USER LOCATION ON CLICK 

export default function approvelocation(counter) {
        if (counter == 0) {   
                updateLocation();   
                addInfo(map, 'radius', filter, 'white');
                const watchID = navigator.geolocation.watchPosition(successLocation, errorLocation,
                        {
                                enableHighAccuracy: true,
                                trackUserLocation: true,
                                showUserHeading: true
                        })
                        return watchID;                           
        } 
   
}

export function updateLocation() {
        userlocation = initialFly(); 
     
}

export function generateRoute(){
        getRoute(userlocation, end)
        console.log('hooray')
}

/*
async function update(){
        await appendLocation();
        console.log('triggerreeedddd')
        //updateFly();
} 
locate.addEventListener('click', update); 
*/









