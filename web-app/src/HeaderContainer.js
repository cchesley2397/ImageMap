import React, { Component } from 'react';
import './HeaderContainer.css';


class HeaderContainer extends Component {
    render() {
        return (
            <div id="Header">
                <div className="titleContainer">
                    <ul className="headerList">
                        <li id="title">
                            Image Map
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default HeaderContainer;