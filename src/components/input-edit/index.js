import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity} from 'react-native';

import {Input} from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLOR } from '../../constant/color';

class inputEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {label, value, setValue, setFocus, clearValue, focus, id, deleteInfo} = this.props
        return ( 
            <Input
                    placeholder={label}
                    onChangeText={text => setValue(label.toLowerCase(),text,id)}
                    value={value}
                    onFocus={() => setFocus(label)}
                    onBlur={() => setFocus(label)}
                   containerStyle={{
                       height:45,
                       paddingHorizontal:10,
                       borderColor:'gray',
                       marginVertical:5
                    }}
                    inputContainerStyle={{
                        borderBottomColor:focus ? COLOR.main : COLOR.gray,
                        borderBottomWidth:2,
                        height:45
                    }} 
                    style={{
                        paddingHorizontal:10
                    }}
                    rightIcon={
                        <TouchableOpacity onPress={() => clearValue(label.toLowerCase(),id)}>
                            <FeatherIcon 
                            name='x-circle'
                            size={20}
                            color='gray'
                            />
                        </TouchableOpacity>
                    }
                    leftIcon={
                        deleteInfo ? 
                        <View style={{
                            flexDirection:'row'
                            }}>
                        <TouchableOpacity style={{justifyContent:'center'}} onPress={() => deleteInfo(label.toLowerCase(),id)}>
                            <FeatherIcon 
                            name='minus-circle'
                            size={20}
                            color='red'
                            />
                        </TouchableOpacity>     
                        <Text style={{marginLeft:10, fontSize:17}}>{label==='Phone' ? 'Mobile' : 'Home'}</Text>
                        </View>
                        
                        : null
                    }
                />
         );
    }
}
 
export default inputEdit;