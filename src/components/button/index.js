import React, { Component } from 'react';
import { COLOR } from '../../constant/color';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, { EasingNode } from 'react-native-reanimated';

const WIDTH = Dimensions.get('window').width

class ButtonApp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         }
    }
    render() { 
        const {label, handler, successStatus, animation, color, style } = this.props
        const width = animation ? 
        animation.width : style?.width ? 
            style?.width : WIDTH-65
        const borderRadius = animation ? animation.borderRadius :  20
        const marginTop = style?.marginTop ? style?.marginTop : 30
        return ( 
            <TouchableOpacity
                 onPress={handler}
                 activeOpacity={0.8}
                 style={[styles.buttonBox,{marginTop}]}>
                {animation ? 
                <Animated.View style={[styles.button,{
                    width, borderRadius, backgroundColor:color,
                }]}>

                {successStatus ?
                 <Animatable.View
                 animation="bounceIn"
                 delay={50}>
                   <Icon 
                     name="check"
                     color="white"
                     size={20}
                   />
                 </Animatable.View>
                :
                <Text 
                style={{
                    color:"white",
                    fontFamily:"SemiBold"
                }}>{label}</Text>     
                }

                </Animated.View>
                :
                <View style={[
                    styles.button,{
                    width, borderRadius, backgroundColor:color,
                }]}>
                <Text 
                style={{
                    color:"white",
                    fontFamily:"SemiBold"
                }}>{label}</Text>   
                </View>
                }
            </TouchableOpacity>
         );
    }
}
 
export default ButtonApp;

const styles = StyleSheet.create({
    buttonBox:{
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:10,
        height:45,
    },
    button:{
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,
        height:50,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.30,
        // shadowRadius: 4.65,
        // elevation: 8,
    },
})