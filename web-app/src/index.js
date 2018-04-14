import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MapContainer from './MapContainer';
import HeaderContainer from './HeaderContainer';
import registerServiceWorker from './registerServiceWorker';
import {createMap} from "./MapUtils";


ReactDOM.render(<HeaderContainer />, document.getElementById('headerRoot'));
ReactDOM.render(<MapContainer />, document.getElementById('mapRoot'));
createMap();

registerServiceWorker();
