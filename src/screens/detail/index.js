import React, { Component } from 'react';

import {
    ImageBackground,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
    StyleSheet,
    View,
    Text,
  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLOR } from '../../constant/color';
import * as Animatable from 'react-native-animatable';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { navigation } = this.props
        const { place } = this.props.route.params
        return ( 
        // <ScrollView> 
        <View
        style={{flex:1,backgroundColor:'white'}}>
         <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
        <ImageBackground style={{flex: 0.7}} source={place.image}>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
                name="arrow-back-ios"
                size={28}
                color='white'
            />
            </TouchableOpacity>
            <TouchableOpacity>
            <Icon 
                name="more-vert" 
                size={28} 
                color='white' 
            />
              </TouchableOpacity>
            </View>
            <View style={styles.imageDetails}>
            <Text
                style={{
                width: '70%',
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 20,
                }}>
                {place.name}
            </Text>
            <View style={{flexDirection: 'row'}}>
                <Icon name="star" size={30} color={COLOR.orange} />
                <Text
                style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                5.0
                </Text>
            </View>
            </View>
        </ImageBackground>
        <View style={styles.detailsContainer}>
            <View style={styles.iconContainer}>
            <Icon name="favorite" color={COLOR.red} size={30} />
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
            <Icon name="place" size={28} color={COLOR.main} />
            <Text
                style={{
                marginLeft: 5,
                fontSize: 20,
                fontWeight: 'bold',
                color: COLOR.main,
                }}>
                {place.location}
            </Text>
            </View>
            <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20}}>
            About the trip
            </Text>
            <Text style={{marginTop: 20, lineHeight: 22}}>{place.details}</Text>
        </View>
        <View style={styles.footer}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text
                style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
                }}>
                $100
            </Text>
            <Text
                style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLOR.gray,
                marginLeft: 2,
                }}>
                /PER DAY
            </Text>
            </View>
           
            <TouchableHighlight 
            underlayColor="#000"
            style={styles.bookNowBtn}>
            <Text
                style={{color: COLOR.main, fontSize: 16, fontWeight: 'bold'}}>
                Book Now
            </Text>
            </TouchableHighlight>
            
        </View>
        </View>
        // </ScrollView> 
         );
    }
}
 
export default Detail;

const styles = StyleSheet.create({
    bookNowBtn: {
      height: 50,
      width: 150,
      backgroundColor: 'white',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    iconContainer: {
      height: 60,
      width: 60,
      position: 'absolute',
      top: -30,
      backgroundColor: 'white',
      borderRadius: 30,
      right: 20,
      elevation: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    detailsContainer: {
      top: -30,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 40,
      paddingHorizontal: 20,
      backgroundColor: 'white',
      flex: 0.3,
    },
    header: {
      marginTop: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    imageDetails: {
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      position: 'absolute',
      bottom: 30,
    },
    footer: {
      flexDirection: 'row',
      backgroundColor: COLOR.main,
      height: 70,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
  });
