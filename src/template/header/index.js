import React, { Component } from 'react'
import "./header.css"

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <>
            <div className="header-width">
            <h1 className="headerName">Aplikasi Parking System Mall of WIBU</h1>
            </div>
            </>
        );
    }
}

export default Header;