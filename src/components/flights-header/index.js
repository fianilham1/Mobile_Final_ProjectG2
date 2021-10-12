import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    } from 'react-native';
import { COLOR } from '../../constant/color';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { CommonActions } from '@react-navigation/native';

const DAY_NAME = ["Sun", "Mon","Tue","Wed","Thu","Fri","Sat"]
const MONTH_NAME = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

class FlightsHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }

    reset = () => {
      this.props.navigation.dispatch(
          CommonActions.reset(
              {
                  index:0,
                  routes:[
                      {name:'BottomTabScreen'}
                  ]
              }
          )
      )
  }

    getMonthName = (date) => {
      return MONTH_NAME[date.getMonth()]
    }

    getDayName = (date) => {
      return DAY_NAME[date.getDay()]
    }

    renderHeader = () => {
      const {header} = this.props
      //screen 1 -> departure
      //screen 2 -> return
     
        if(header==='FlightsList') {
          const { flightsSearchInfo, screenChooseFlight } = this.props
          const {departureDate,returnDate,airportCityFlight,airportCodeFlight} = flightsSearchInfo
          let displayCityFrom = ''
          let displayCityTo = ''
          let displayDepartureDate = ''
          if(screenChooseFlight===1){
            displayCityFrom = airportCityFlight.from
            displayCityTo = airportCityFlight.to
            displayDepartureDate = departureDate
          }

          if(screenChooseFlight>=2){
            displayCityFrom = airportCityFlight.to
            displayCityTo = airportCityFlight.from
            displayDepartureDate = returnDate
          }
          return (
            <View style={styles.headerContainer}>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.screenTitle}>{displayCityFrom}</Text>
                <MaterialIcon
                    name="arrow-forward" color="#fff" size={20}
                     style={{ paddingHorizontal: 10, paddingTop:5 }}
                  />
                 <Text style={styles.screenTitle}>{displayCityTo}</Text>
              </View>
              <View  style={{flexDirection:'row'}}>
                <Text style={styles.screenSubtitle}>{this.getDayName(displayDepartureDate)+', '}</Text>
                <Text style={styles.screenSubtitle}>{displayDepartureDate.getDate()+' '+this.getMonthName(displayDepartureDate)}</Text>
                <Text style={styles.screenSubtitle}>{' - '+flightsSearchInfo.totalPassengers+' pax '}</Text>
                <Text style={styles.screenSubtitle}>{' - '+flightsSearchInfo.seatClass}</Text>
              </View>
            </View>
          )

        } 

        if(header==='BookSummary') {
          return <Text style={[styles.screenTitle,{marginLeft:-60}]}>Book Summary</Text>
        }

        if(header==='Book1FillDetails' || header==='Book2FillDetails2'){
          return <Text style={[styles.screenTitle,{marginLeft:-60}]}>Fills In Details</Text>
        }

        if(header==='Book3Pay'){
          return <Text style={[styles.screenTitle,{marginLeft:-20}]}>Payment Confirmation</Text>
        }

        if(header==='TravelerDetail'){
          return <Text style={[styles.screenTitle,{marginLeft:-60}]}>Traveler Detail</Text>
        }
      
        if(header==='BookSeatReservation'){
          return <Text style={[styles.screenTitle,{marginLeft:-60}]}>Seat Reservation</Text>
        }

        if(header==='BookBaggageReservation'){
          return <Text style={[styles.screenTitle,{marginLeft:-90}]}>Baggage</Text>
        }

        if(header==='SelectPayment'){
          return <Text style={[styles.screenTitle,{marginLeft:20}]}>Choose Payment Method</Text>
        }

        return  <Text style={[styles.screenTitle,{marginLeft:-90}]}>Flights</Text>
    }

    render() { 
      const {leftIcon, rightIcon, rightIconHandler, navigation, header} = this.props
        return ( 
            <View style={styles.header}>
                <View style={styles.left} >
                <TouchableOpacity onPress={() => {
                  if(header==='Book3Pay'){
                    this.reset()
                  }else{
                    navigation.goBack()
                  }
                }}>
                  {
                    leftIcon?
                      leftIcon==='empty'?
                      null
                      :
                      <MaterialIcon
                        name={leftIcon} color="#fff" size={27}
                        style={{ paddingLeft: 10 }}
                      />
                    :
                    <MaterialIcon
                      name="arrow-back" color="#fff" size={27}
                      style={{ paddingLeft: 10 }}
                    />
                  }
                </TouchableOpacity>
                </View>
                <View style={styles.screenHeader}>
                    {this.renderHeader()}
                </View>
          
                <View style={styles.right} >
                <TouchableOpacity onPress={rightIconHandler}>
                {
                    rightIcon?         
                      <MaterialIcon 
                        name={rightIcon}
                        color="#fff" 
                        size={23} 
                        style={{ paddingVertical: 5, paddingHorizontal: 13 }} 
                      />
                    :
                      <MaterialIcon 
                        name="more-vert" 
                        color="#fff" 
                        size={23} 
                        style={{ paddingVertical: 5, paddingHorizontal: 13 }} 
                      />
                  }
                  </TouchableOpacity>
                </View>
            </View>           
         );
    }
}
 
export default FlightsHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: COLOR.main,
        borderColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 5,
        paddingTop: 15,
        paddingBottom: 2,
        minHeight:62
      },
      left: {
        flexDirection: 'row',
      },
      right: {
        flexDirection: 'row',

      },
      screenHeader:{
        flexDirection:'row',
        marginLeft:-30,
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
  });