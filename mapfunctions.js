// UTILITY FUNCTIONS
export default function addInfo(map, id, data, color) {
        map.addLayer({
                id: id,
                source: {
                  type: 'geojson',
                  data: data
                },
                type: 'fill',
                paint: {
                  'fill-color': color,
                  'fill-opacity': 0.1
                }
              });
}

export function addData(map, layer, data) {
    map.getSource(layer).setData(data);

}

export function initialFly(map){
    navigator.geolocation.getCurrentPosition((position) => {
            map.flyTo({
                    center: [position.coords.longitude, position.coords.latitude],
                    zoom: 20,
                    speed: 1.5,
                    curve: 1,
            })
    })    
}
