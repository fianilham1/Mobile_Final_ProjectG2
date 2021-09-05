import React, { Component } from 'react';
import "./footer.css"

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div id="FooterContent" class="bgfooter">
               <div>Mall of Wibu</div>
            </div>
         );
    }
}
 
export default Footer;