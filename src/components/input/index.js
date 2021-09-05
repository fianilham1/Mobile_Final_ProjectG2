import React, { Component } from 'react';
import {
    TouchableOpacity,
    View} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLOR } from '../../constant/color';

class InputApp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const {state, label, name, setFocus, setValue, icon, valid, regex, visible, visibleToggle, color, errorMessage} = this.props

        return (
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                marginHorizontal:13,
                borderBottomWidth:2,
                marginTop:30,
                paddingHorizontal:10,
                borderBottomColor:state[`isFocus${name}`] ? color : COLOR.gray,
                borderRadius:5,
                paddingVertical:1
            }}>
            
              <Input
                    placeholder={label}
                    label={label}
                    errorMessage={valid ? '': errorMessage? errorMessage : `Invalid ${label}`}
                    secureTextEntry={name==='Password' || name==='Confirm' ? visible ? false : true : false}
                    onChangeText={text => setValue(name.toLowerCase(),text)}
                    onFocus={() => setFocus(name)}
                    onBlur={() => setFocus(name)}
                    labelStyle={{
                        position:"absolute",
                        bottom:37,
                        left:2,
                        fontSize:16,
                        color:color,
                        paddingHorizontal:3
                    }}
                    leftIconContainerStyle={{
                        justifyContent:'center',
                        alignItems:'center',
                        paddingHorizontal:5,
                        right:10,
                        width:30,
                    }}
                    leftIcon={
                        <Icon
                        name={icon}
                        size={icon==='lock' ? 24 : 20}
                        color={color}
                        />
                    }
                    rightIcon={name==='Password' || name==='Confirm' ?
                        visible ? 
                        <TouchableOpacity onPress={visibleToggle}>
                            <FeatherIcon 
                            name='eye'
                            size={20}
                            color='gray'
                            />
                        </TouchableOpacity>
                         :
                         <TouchableOpacity onPress={visibleToggle}>
                            <FeatherIcon 
                            name='eye-off'
                            size={20}
                            color={color}
                            />
                        </TouchableOpacity>
                        :
                        regex ? 
                        <FeatherIcon 
                        name='check-circle'
                        size={20}
                        color='green'
                        /> : null
                        
                    }
                   containerStyle={{
                       height:43,
                       paddingHorizontal:10,
                       borderBottomColor:COLOR.gray
                    }}
                    errorStyle={{
                        bottom:5,
                        left:-10
                    }}
                    inputContainerStyle={{
                        borderBottomWidth:0,
                        height:45,
                        
                    }} 
                    style={{
                        paddingHorizontal:2
                    }}
                />
        
            </View>
         );
    }
}
 
export default InputApp;