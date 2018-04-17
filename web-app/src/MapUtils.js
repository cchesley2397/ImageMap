import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import data from './data/demo.json';

/*
Required functions:

Load a local data into a dataset compatible with leaflet

Render the leaflet map with the dataset input
 */



export function loadMapData() {
    return data;
}




function dmsToDD(nD, nM, nS, wD, wM, wS) {
    let latDegrees = nD + (((nM * 60) + nS) / (60*60));
    let longDegrees = wD + (((wM * 60) + wS) / (60*60));
    return new L.latLng(latDegrees, longDegrees);
}





export function renderMap() {
    // initialize
    let json = loadMapData();
    let ImgMap = L.map("Map").setView([0, 0], 2,);

    //new ImageMap("Map", {zoomControl: false}).setView([0, 0], 2, {
    //    worldCopyJump: true});


    //new L.Control.Zoom({position: 'topright'}).addTo(Map);

    // initialize the map tile layer
    let mapTiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © ' +
        '<a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 20,
        minZoom: 2,
        id: 'mapbox.light',
        noWrap: false,
        accessToken: 'pk.eyJ1IjoiY2NoZXNsZXkyMzk3IiwiYSI6ImNqYTR4endzNTMxY2sycXFyemduaXIxM3EifQ.gvT6NeQ0Q6ykY8PVzMhTTw'
    });

    // add tile layer to map
    ImgMap.addLayer(mapTiles);

    let markers = [];

    let queryMarkerOptions = {
        radius: 7,
        fillColor: "#42e5f4",
        color: 'black',
        weight: 1,
        opacity: .5,
        fillOpacity: 0.5
    };

    let toolTip;
    let latLong;
    let loc;

    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            loc = json[key]['LocationData'];
            latLong = dmsToDD(loc["NDegree"], loc["NMin"], loc["NSec"], loc["WDegree"], loc["WMin"], loc["WSec"]);
            toolTip = '' +
                "File: " + json[key]["FileName"] + "<br>" +
                "Latitude: " + latLong.lat + "<br>" +
                "Longitude: " + latLong.lng + "<br>" +
                "Timestamp: " + json[key]["DateTime"] + "<br>" ;




                //"<a href='" + json[key]["FileName"] + "' target=\"_blank\">" + "<img src='.\data\watch.jpg'" +
                //"&previewImage=true'</img></a>";


            markers.push(new L.circleMarker(latLong, queryMarkerOptions).bindTooltip(toolTip));

        }
    }

    ImgMap.on('click', function(e) {
        console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    });


    let markerLayer = new L.layerGroup(markers);



    ImgMap.addLayer(markerLayer);
}

