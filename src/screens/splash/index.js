import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    StatusBar,
    ImageBackground
  } from 'react-native';
import {Logo} from '../../components';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '../../constant/color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AuthHeader} from '../../components';

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           isPress:false
         }
    }

    // componentDidMount(){
    //     setTimeout(() => {
    //     this.props.navigation.replace('Auth')
    //     },1000)
    // }


    render() { 
        return ( 
            <AuthHeader 
            splash
            {...this.props}/>
         );
    }
}
 
  
  export default (Splash);

