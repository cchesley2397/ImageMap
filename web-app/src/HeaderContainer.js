import React, { Component } from 'react';
import './HeaderContainer.css';


class HeaderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }


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