import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight,
StatusBar} from 'react-native';
import { COLOR } from '../../constant/color';

class BookingList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <View>
           <StatusBar translucent  barStyle="light-content" backgroundColor={COLOR.main} />
        <Text>Contact</Text>
      </View>
     );
  }
}
 
export default BookingList;