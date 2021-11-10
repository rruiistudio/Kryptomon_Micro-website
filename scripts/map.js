//mapbox API - to change once we have paid mapbox account

import loadJSONFile from './utilities.js'
import geojson from './data.js'

let map
let distance
let target

mapboxgl.accessToken = 'pk.eyJ1IjoicnJ1aWlkZXYiLCJhIjoiY2t2N3FtMjFhMDFmNzJvbzdidnpkaGxweiJ9.R0WQ2KnHg8EQ9wyWPYLQFg';

setupMap([-2.24, 53.48])

export default function approvelocation(counter) {
        if (counter == 0) {
                navigator.geolocation.getCurrentPosition(successLocation, errorLocation,
                        {
                                enableHighAccuracy: true,
                                trackUserLocation: true,
                                showUserHeading: true
                        })
                console.log('user location retrieved successfully')
        }
}

// GET USER LOCATION ON CLICK 

function successLocation(position) {
        console.log(position)
        map = setupMap([position.coords.longitude, position.coords.latitude])
        map.flyTo({
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 20,
                speed: 1.5,
                curve: 1,
        })
}

function errorLocation() {
        map = setupMap([-2.24, 53.48])
        map.flyTo({ center, zoom: 30 });
}

function searchRadius(center, points) {
        // Create circle with radius
        var center = center;
        var radius = 30;
        var options = { steps: 10, units: 'kilometers'};
        var circle = turf.circle(center, radius, options);

        // Find point within circle
        var markerWithin = turf.pointsWithinPolygon(points, circle);
        console.log('hellooooo werld')


}


function setupMap(center) {
        // create new map & pre-specify zoom level 
        var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/rruiidev/ckv7qzrxu0fjk14ujmbfiy2vr',
                center: center,
                zoom: 0

        });

        // ADD ICONS TO MAP 

        console.log(geojson);




        for (const feature of geojson.features) {
                // create a HTML element for each feature
                const el = document.createElement('div');
                el.className = 'mark';
                let distance

                function pointDistance() {

                        var from = turf.point(center);
                        var to = turf.point(feature.geometry.coordinates);
                        var options = { units: 'kilometers' };

                        var distance = turf.distance(from, to, options);
                        console.log(distance)



                        return distance
                }

                distance = Math.round(el.addEventListener('click', pointDistance))
                distance = 'hello'


                new mapboxgl.Marker(el)
                        .setLngLat(feature.geometry.coordinates)
                        .setPopup(
                                new mapboxgl.Popup({ offset: 25 }) // add popups
                                        .setHTML(
                                                `<img id="mysterybox" src = "./images/Box_Closed.png" width="100px">
                                                <h3>Mysterybox</h3><p>${distance}</p>`
                                        )
                        )
                        .addTo(map);




                // make a marker for each feature and add to the map
                new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
                searchRadius(center, feature);
                




        }

        target = document.getElementsByClassName('mark')
        console.log(target)
        






        //CONST FILTERED LOCATION BY PROXIMITY 

        // add localisation button (to customize)
        function geolocate() {
                const el = document.createElement('locate');
                el.className = 'locate';


                map.addControl(new mapboxgl.GeolocateControl({
                        positionOptions: {
                                enableHighAccuracy: true
                        },
                        trackUserLocation: true,
                        showUserHeading: true

                }))
        }


        // add user location marker pin to the map
        function marker() {
                {
                        // create a HTML element for each feature
                        const el = document.createElement('div');
                        el.className = 'marker';

                        new mapboxgl.Marker(el)
                                .setLngLat(center)
                                .addTo(map);
                }

                console.log('User location marker loaded succesfully')

        }




        geolocate();
        marker();
        return map;
}














