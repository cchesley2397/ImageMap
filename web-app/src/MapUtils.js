import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../../data/';
/*
Required functions:

Load a local data into a dataset compatible with leaflet

Render the leaflet map with the dataset input
 */



export function loadMapData(inputPath, dataFileName) {
    let json = JSON.parse(data);

    // array of LatLong objects
    let imageLatLongs = [];

    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            let c = key.LocationData;
            imageLatLongs.add(dmsToDD(c.NDegree, c.NMin, c.NSec, c.WDegree, c.WMin, c.WSec));
        }
    }

    return imageLatLongs;
}




function dmsToDD(nD, nM, nS, wD, wM, wS) {
    let latDegrees = nD + (((nM * 60) + nS) / (60*60));
    let longDegrees = wD + (((wM * 60) + wS) / (60*60));
    return new L.LatLng(latDegrees, longDegrees);
}





export function renderMap(Map, data) {
    let markers = [];

    let queryMarkerOptions = {
        radius: 7,
        fillColor: "#42e5f4",
        color: 'black',
        weight: 1,
        opacity: .5,
        fillOpacity: 0.5
    };

    for (let latLong in data) {
        if (data.hasOwnProperty(latLong)) {
            markers.add(new L.CircleMarker(latLong, queryMarkerOptions);
        }
    }

    Map.addLayer(markers)
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
