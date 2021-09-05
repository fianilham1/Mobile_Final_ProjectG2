import React, { Component } from 'react';
import {InputApp } from '../../component';

class SendEmail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         }
    }

    render() { 
      const {value,icon,setValue,valid} = this.props
        return (
            <InputApp 
              name='UsernameFg'
              label='Username'
              icon={icon}
              value={value}
              setValue={setValue}
              valid={valid}
              errorMessage='Username Not Found'
            />
          );
    }
}
 
export default SendEmail;