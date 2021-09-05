import React, { Component } from 'react';
import ReactCodeInput from 'react-verification-code-input';


class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            validCode:true
         }
    }
    render() { 
        const {setValue,valid,value} = this.props
        console.log('code change',value)
        return (  
            <ReactCodeInput 
                fields={4}
                onChange={value => setValue(value)}
            />
        );
    }
}
 
export default VerifyEmail;