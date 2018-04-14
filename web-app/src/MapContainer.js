import React, { Component } from 'react';
import './MapContainer.css';

class MapContainer extends Component {
    render() {
        return (
            <div className="MapContainer">
                <div id="Map" className="leafletMap"/>
            </div>
        );
    }
}

export default MapContainer;
