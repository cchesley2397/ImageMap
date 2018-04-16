import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/*
Required functions:

Load a local data into a dataset compatible with leaflet

Render the leaflet map with the dataset input
 */



export function loadMapData(inputPath, dataFileName) {
    let json = JSON.parse(fs.readFileSync(inputPath + dataFileName, 'utf8'));

    // array of LatLong objects
    let imageCoords = [];

    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            let c = key.LocationData;
            imageCoords.add(dmsToDD(c.NDegree, c.NMin, c.NSec, c.WDegree, c.WMin, c.WSec));

        }
    }
}




function dmsToDD(nD, nM, nS, wD, wM, wS) {
    let degrees;
}





export function renderMap(Map, data) {

}

export function createMap() {
    // initialize
    let Map = L.map("Map").setView([0, 0], 2,);

    //new ImageMap("Map", {zoomControl: false}).setView([0, 0], 2, {
    //    worldCopyJump: true});


    //new L.Control.Zoom({position: 'topright'}).addTo(Map);

    // initialize the map tile layer
    let mapTiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © ' +
        '<a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 10,
        minZoom: 2,
        id: 'mapbox.light',
        noWrap: false,
        accessToken: 'pk.eyJ1IjoiY2NoZXNsZXkyMzk3IiwiYSI6ImNqYTR4endzNTMxY2sycXFyemduaXIxM3EifQ.gvT6NeQ0Q6ykY8PVzMhTTw'
    });

    // add tile layer to map
    Map.addLayer(mapTiles);
    return Map;
}
