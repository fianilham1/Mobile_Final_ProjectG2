import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar
    } from 'react-native';
import { COLOR } from '../../constant/color';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ForgotPassHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }

    renderHeader = () => {
        if(this.props.currentScreen===1) return 'Forgot Password'

        if(this.props.currentScreen===2) return 'Verify Email'

        if(this.props.currentScreen===3) return 'Reset Password'
        
        return ''
    }

    render() { 
        return ( 
            <View style={styles.header}>
                <View style={styles.left} >
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Icon
                    name="arrow-back" color="#fff" size={23}
                    style={{ paddingLeft: 10 }}
                    />
                </TouchableOpacity>
                </View>
                <View style={styles.screenHeader}>
                    <Text style={styles.screenTitle}>{this.renderHeader()}</Text>
                </View>
          
                {/* <View style={styles.right} >
                    <Icon name="search" color="#fff" size={23} style={{ padding: 5 }} />
                    <Icon name="more-vert" color="#fff" size={23} style={{ paddingVertical: 5, paddingHorizontal: 13 }} />
                </View> */}
            </View>           
         );
    }
}
 
export default ForgotPassHeader;

const styles = StyleSheet.create({
    header: {
        paddingBottom:20,
        paddingTop:10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: COLOR.main,
      },
      left: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      right: {
        flexDirection: 'row',
      },
      screenHeader:{
        flexDirection:'row',
        marginLeft:30,
      },
      paginationHeader:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
      },
      paginationTitleBox:{
        width:40,
        height:40,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
      },
      non:{
        backgroundColor:'gray',
      },
      active:{
        backgroundColor:COLOR.main
      },
      screenTitle: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 20,
      },
      screenSubtitle: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
      },
      line:{
        borderBottomColor:COLOR.gray,
        borderBottomWidth:2,
        width:35,
        marginHorizontal:7
      },
      pic: {
        borderRadius: 25,
        width: 50,
        height: 50,
      },
  });