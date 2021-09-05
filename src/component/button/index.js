import React, { Component } from 'react';
import './button.css'

class ButtonApp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {click, label} = this.props
        return ( 
            <button onClick={click} class="btn-field solid" >
                <div className='text'>{label}</div>
            </button>
         );
    }
}
 
export default ButtonApp;