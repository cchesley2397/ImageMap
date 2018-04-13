import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/*
Required functions:

Load a local json into a dataset compatible with leaflet

Render the leaflet map with the dataset input
 */



//function loadMapData() {}


var ImageMap = L.Map.extend({

    displayTitle : function(titleText) {
        let title = L.control({position: 'topleft'});
        title.onAdd = function(self,) {
            var div = L.DomUtil.create('div', 'map title');
            div.innerHTML +=
                ('<i style="background:' + '#9d9d9d' + '"></i> ' + titleText);
            return div;
        };
        title.addTo(self);
    }
});


function createMap() {
    // initialize
    let Map = new ImageMap("Map", {zoomControl: false}).setView([0, 0], 2, {
        worldCopyJump: true});


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

}


createMap();