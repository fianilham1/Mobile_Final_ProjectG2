import React, { Component } from 'react';
import './input.css'

class InputApp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {name, label, secureText, icon,  setValue, value, valid, errorMessage} = this.props
        return ( 
        <div class="input-field" >
            <i>{icon}</i>
            <input 
                name={name.toLowerCase()}
                value={value}
                onChange={setValue} 
                type={secureText ? 'password' : 'text'} 
                placeholder={label} 
            />
            {valid ? 
            null
            :
            <div className='errorMessage'>
                {errorMessage? errorMessage : `Invalid ${name}`}
            </div>
            }
          
        </div>
         );
    }
}
 
export default InputApp;