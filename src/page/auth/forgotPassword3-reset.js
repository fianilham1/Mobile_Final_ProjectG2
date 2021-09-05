import React, { Component } from 'react';
import { InputApp } from '../../component';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {icon,setValue,value,valid,errorMessage} = this.props
        return (
            <>
            <InputApp 
              name='PasswordFg'
              label='Password'
              icon={icon}
              setValue={setValue}
              value={value[0]}
              valid={valid[0]}
              errorMessage={errorMessage}
              secureText
            />
            <InputApp 
                name='ConfirmFg'
                label='Confirm Password'
                icon={icon}
                setValue={setValue}
                value={value[1]}
                valid={valid[1]}
                errorMessage='Password Is Not Match'
                secureText
          />
          </>
          );
    }
}
 
export default ResetPassword;