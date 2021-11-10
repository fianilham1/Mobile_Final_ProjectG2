import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet} from 'react-native';
import { COLOR } from '../../constant/color';

class ForgotPassPagination extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentScreen:this.props.currentScreen
         }
    }

    componentDidUpdate(prevProps){
      if(prevProps.currentScreen!==this.props.currentScreen){
        this.setState({
          currentScreen:this.props.currentScreen
        })
      }
    }

    render() { 
        return ( 
        <View style={styles.paginationHeader}>
            <View style={[styles.paginationTitleBox,styles[`${this.state.currentScreen===1?'active':'non'}`]]}>
                <Text style={styles.screenSubtitle}>1</Text>
            </View>
            <View style={styles.line}></View>
            <View style={[styles.paginationTitleBox,styles[`${this.state.currentScreen===2?'active':'non'}`]]}>
                <Text style={styles.screenSubtitle}>2</Text>
            </View>
            <View style={styles.line}></View>
            <View style={[styles.paginationTitleBox,styles[`${this.state.currentScreen===3?'active':'non'}`]]}>
                <Text style={styles.screenSubtitle}>3</Text>
            </View>
        </View> 
         );
    }
}
 
export default ForgotPassPagination;

const styles = StyleSheet.create({
    paginationHeader:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:20,
        backgroundColor:COLOR.main
        // marginTop:20,
      },
      paginationTitleBox:{
        width:40,
        height:40,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
      },
      non:{
        backgroundColor:COLOR.gray,
      },
      active:{
        backgroundColor:COLOR.secondary
      },
      screenTitle: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 20,
      },
      screenSubtitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
      },
      line:{
        borderBottomColor:COLOR.gray,
        borderBottomWidth:2,
        width:35,
        marginHorizontal:7
      },
})