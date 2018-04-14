import React, { Component } from 'react';

//import './App.css';

class MapContainer extends Component {
    render() {
        return (
            <div className="MapContainer">
                <div id="Map" class="leafletMap"></div>
            </div>
        );
    }
}

export default MapContainer;
