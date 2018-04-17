import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MapContainer from './MapContainer';
import HeaderContainer from './HeaderContainer';
import registerServiceWorker from './registerServiceWorker';
import {createMap, loadMapData, renderMap} from "./MapUtils";


ReactDOM.render(<HeaderContainer />, document.getElementById('headerRoot'));
ReactDOM.render(<MapContainer />, document.getElementById('mapRoot'));


//temp config
let inputPath = '../../data';
let dataJSON = 'metadata.json';
//


renderMap(function(callback) {createMap()}, function() {loadMapData(inputPath, dataJSON)} );

registerServiceWorker();
