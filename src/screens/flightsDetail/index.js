import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView} from 'react-native';
import { COLOR } from '../../constant/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {ListItem} from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class FlightsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          searchInput:''
        }
    }

   
  
    render() { 
        const airlineDetail = this.props.route.params?.airlineDetail
        const { departureDate,
                arrivalDate,
                departureTime,
                arrivalTime,
                fromAirportCity,
                toAirportCity,
                fromAirportCode,
                toAirportCode,
                fromAirportName,
                toAirportName,
                airlineName,
                code,
                aircraftType,
                duration,
                numberTransit} = airlineDetail
        const transitType = numberTransit===0 ? 'Direct' : `${numberTransit} Stop`
        return (
          <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
             <View style={styles.header}>
                <View style={styles.left} >
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <MaterialIcon
                        name="close" color="#fff" size={27}
                        style={{ paddingLeft: 10 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.screenHeader}>
                    <View style={styles.headerContainer}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.screenTitle}>{airlineName}</Text>
                        </View>
                        <View  style={{flexDirection:'row'}}>
                            <Text style={styles.screenSubtitle}>{fromAirportCode+' - '+
                            toAirportCode+' - '+duration+' - '+
                            transitType}</Text>
                        </View>
                    </View>
                </View>
            </View>    
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.cityDurationContainer}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.cityTitle}>{fromAirportCity}</Text>
                    <MaterialIcon
                        name="arrow-forward" size={20}
                        style={{ paddingHorizontal: 10, paddingTop:5 }}
                    />
                    <Text style={styles.cityTitle}>{toAirportCity}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <MaterialIcon
                        name="schedule" size={20}
                        style={{ paddingHorizontal: 10}}
                    />
                    <Text style={styles.durationTitle}>{duration}</Text>
                </View>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detailColumnLeft}>
                    <View style={styles.detailUpper}>
                        <Text>{departureTime}</Text>
                        <Text>{departureDate[1]}</Text>
                    </View>
                    <View style={styles.detailMid}>
                        <Text>{duration}</Text>
                    </View>
                    <View style={styles.detailLower}>
                        <Text>{arrivalTime}</Text>
                        <Text>{arrivalDate[1]}</Text>
                    </View>

                </View>
                <View style={styles.detailColumnArrow}>

                </View>
                <View style={styles.detailColumnRight}>
                    <View style={styles.detailUpper}>
                        <Text>{fromAirportCity+' ('+fromAirportCode+')'}</Text>
                        <Text>{fromAirportName}</Text>
                    </View>
                    <View style={styles.detailMid}>
                        <View style={styles.flightDetail}>
                            <Text style={styles.detailText}>{airlineName}</Text>
                            <Text style={styles.detailText}>{code}</Text>
                            <View style={styles.detailBox}>
                                <MaterialIcon
                                    name="work-outline" size={20}
                                    style={{ paddingHorizontal: 10}}
                                />
                                <View>
                                    <Text>Baggage</Text>
                                    <Text>20 kg</Text>
                                    <Text>40 kg</Text>
                                </View>
                            </View>
                            <View style={styles.detailBox}>
                                <MaterialIcon
                                    name="tv" size={20}
                                    style={{ paddingHorizontal: 10}}
                                />
                                <View>
                                    <Text>In-flight Entertainment</Text>
                                    <Text>Avalaible</Text>
                                </View>
                            </View>
                            <View style={styles.detailBox}>
                                <MaterialIcon
                                    name="wifi" size={20}
                                    style={{ paddingHorizontal: 10}}
                                />
                                <View>
                                    <Text>Wifi</Text>
                                    <Text>Avalaible</Text>
                                </View>
                            </View>
                            <View style={styles.detailBox}>
                                <MaterialIcon
                                    name="power" size={20}
                                    style={{ paddingHorizontal: 10}}
                                />
                                 <View>
                                    <Text>Power/Usb Port</Text>
                                    <Text>Avalaible</Text>
                                 </View>
                            </View>
                            <View style={styles.detailBox}>
                                <MaterialIcon
                                    name="info-outline" size={20}
                                    style={{ paddingHorizontal: 10}}
                                />
                                <View>
                                    <Text>{aircraftType}</Text>
                                    <Text>seat-layout</Text>
                                    <Text>seat-pitch</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.detailLower}>
                        <Text>{toAirportCity+' ('+toAirportCode+')'}</Text>
                        <Text>{toAirportName}</Text>
                    </View>


                </View>
            </View>
            </ScrollView>
            </SafeAreaView>
        );
    }
}
 
export default FlightsDetail;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: COLOR.main,
    borderColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    paddingTop: 15,
    paddingBottom: 2
    },
    left: {
        flexDirection: 'row',
      },
      right: {
        flexDirection: 'row',

      },
      screenHeader:{
        flexDirection:'row',
        marginLeft:20,
      },
      screenTitle: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 19,
      },
      headerContainer:{
        flexDirection:'column',
        bottom:10
      },
      screenSubtitle: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
        flexDirection:'row'
      },
      cityDurationContainer:{
          flexDirection:'row',
          paddingHorizontal:10,
          paddingVertical:15,
          justifyContent:'space-evenly',
          alignItems:'center',
          backgroundColor:COLOR.lightgray
      },
      cityTitle:{
        fontWeight: '600',
        fontSize: 19,
      },
      durationTitle:{
        fontSize: 16,
      },
      detailContainer:{
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center'
      },
      detailColumnLeft:{
          flex:1,
          height:500,
          marginHorizontal:10,
          alignItems:'flex-end',
          paddingVertical:15
      },
      detailColumnArrow:{
        backgroundColor:COLOR.lightblue,
        marginHorizontal:5,
        flex:.042,
        height:410,
        bottom:15
      },
      detailColumnRight:{
          marginHorizontal:10,
          flex:3.5,
          height:500,
          paddingVertical:15
      },
      detailUpper:{
          flex:1
      },
      detailMid:{
        flex:5,
        justifyContent:'center',
      },
      detailLower:{
        flex:1
      },
      flightDetail:{
          backgroundColor:COLOR.lightgray,
          height:'105%',
          paddingHorizontal:15,
          paddingVertical:10,
          borderRadius:10,
          bottom:15
        //   width:'95%',
      },
      detailText:{
          marginBottom:5,
      },
      detailBox:{
          flexDirection:'row',
          marginVertical:5
      }
});