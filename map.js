//mapbox API - to change once we have paid mapbox account

mapboxgl.accessToken = 'pk.eyJ1IjoicnJ1aWlkZXYiLCJhIjoiY2t2N3FtMjFhMDFmNzJvbzdidnpkaGxweiJ9.R0WQ2KnHg8EQ9wyWPYLQFg';




navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true})

function successLocation(position){
        console.log(position)
        setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation(){
        setupMap([-2.24, 53.48])
}

function setupMap(center) {
        // create new map & pre-specify zoom level 
        var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/rruiidev/ckv7qzrxu0fjk14ujmbfiy2vr',
                center: center, 
                zoom: 15
        });

        // add localisation button (to customize)

        map.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true
                }));

        // add custom marker display (images, animations etc)

 

        // add location marker pin to the map
        const marker = new mapboxgl.Marker() 
       .setLngLat(center)
       .addTo(map);
        

}






