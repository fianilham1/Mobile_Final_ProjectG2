import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight,
StatusBar} from 'react-native';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <View>
           <StatusBar translucent  barStyle="dark-content" backgroundColor='#fff' />
        <Text>Contact</Text>
      </View>
     );
  }
}
 
export default Contact;