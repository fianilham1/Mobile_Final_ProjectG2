import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { CheckBox } from 'react-native-elements'

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Switch,
    FlatList} from 'react-native';
import { COLOR } from '../../constant/color';
import { ButtonApp, FlightsHeader } from '../../components';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Animated, { EasingNode } from 'react-native-reanimated';
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';
import InputSpinner from "react-native-input-spinner";
import { ListItem } from 'react-native-elements';
import {connect} from "react-redux";
import {flightSearchInfo} from '../../reducers/actions/flight';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const DAY_NAME = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const MONTH_NAME = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const TODAY = new Date();
const PASSENGERS_BASE = [
  { label: 'Adult', value: 'adult', amount: 1 },
  { label: 'Child', value: 'child', amount: 0 },
  { label: 'Infant', value: 'infant', amount: 0 }
]
const SEATCLASS_BASE = [
  { label: 'Economy', value: 'economy', checked: true },
  { label: 'Business', value: 'business', checked: false },
]

class FlightsSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          screen:1,
          isRoundTrip:false,
          isFlexibleTicket:false,
          translateYDetail:new Animated.Value(0),
          //Airport Search
          departureAirport:`Surabaya - SUB`,
          arrivalAirport:'Jakarta - JKTA',
          //Date Search
          departureDateVisible:false,
          returnDateVisible:false,
          departureDate:TODAY,
          returnDate:new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate()+1),
          //detail Flight -> passengers & seat class
          modalVisible:false,
          detail:'',
          passengers: PASSENGERS_BASE,
          seatClass : SEATCLASS_BASE,
          passengersPrev: PASSENGERS_BASE,
          seatClassPrev: SEATCLASS_BASE
        }
    }

    componentDidUpdate(){
      const airport = this.props.route.params?.airport
      const airportStr = airport? `${airport.city} - ${airport.code}` : null
      if(airport && this.state[airport.type]!==airportStr){
        this.setState({
          [airport.type]:airportStr
        })
      }
    }

    roundTripToggle = () => {
      this.setState({
        isRoundTrip:!this.state.isRoundTrip
      })
      Animated.timing(
        this.state.translateYDetail,{
            toValue:!this.state.isRoundTrip ? 1 : 0,
            duration:200,
            easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
        }
      ).start()
    }

    flexibleTicketToggle = () => {
      this.setState({
        isFlexibleTicket:!this.state.isFlexibleTicket
      })
    }

    //Date >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    setValueDate = (event, selectedDate, typeFlight) => {
      console.log('event',event)
      console.log('datepick',selectedDate)
      if(event.type==='set'){
        this.setState({
          [typeFlight]:selectedDate,
          [`${typeFlight}Visible`]:false
        })
      }
    }

    showDate = (visible, typeFlight) => {
      this.setState({
        [`${typeFlight}Visible`]: visible
      })
    }

    renderDatePicker = () => {
      const { departureDateVisible, departureDate, returnDateVisible, returnDate } = this.state
      if (departureDateVisible) {
        return (
          <DateTimePicker
            testID="dateTimePicker"
            value={departureDate}
            mode='date'
            is24Hour={true}
            display="default"
            onChange={(event, selectedData) => this.setValueDate(event, selectedData, 'departureDate')}
          />
        )
      }else if(returnDateVisible){
        return (
          <DateTimePicker
            testID="dateTimePicker"
            value={returnDate}
            mode='date'
            is24Hour={true}
            display="default"
            onChange={(event, selectedData) => this.setValueDate(event, selectedData, 'returnDate')}
          />
        )  
      }
        return null
    }

    renderDateFormat = (date) => {
      return (
        DAY_NAME[date.getDay()]+', '+date.getDate()+' '+MONTH_NAME[date.getMonth()]+' '+date.getFullYear()
      )
    }
  


    //Modal -> passengers & seat >>>>>>>>>>>>>>>>>>>>>>>>>>

    showModal = (visible, detail, save) => {
      this.setState({ 
          modalVisible: visible,
          detail
       })
    }
 
    
    spinnerHandler = (value, index) => {
      const { passengers } = this.state
      const newValue = passengers.map((data, i) => {
       if (i === index) {
         const item = {
           ...data,
           amount: value,
         }
         return item
       }
      return data
    })
    this.setState({
      passengers:newValue
    })
    }

    renderItemPassengers = ({item,index}) => {
        return (
          <ListItem >
            <View style={styles.passengersRow}>
              <Text>{item.label}</Text>
              <InputSpinner
                max={10}
                min={item.label==='Adult' ? 1 : 0}
                step={1}
                colorMax={"#f04048"}
                colorMin={"#40c5f4"}
                value={this.state.passengers[index].amount}
                onChange={(num) => {
                  this.spinnerHandler(num,index)
                }}
                skin='round'
                style={styles.inputSpinner}
              />
            </View>
          </ListItem>
        );
      }

      checkboxHandler = (value, index) => {
        const { seatClass } = this.state
        const newValue = seatClass.map((checkbox, i) => {
         if (i !== index)
           return {
             ...checkbox,
             checked: false,
           }
         if (i === index) {
           const item = {
             ...checkbox,
             checked: !checkbox.checked,
           }
           return item
         }
        return checkbox
      })
      this.setState({
        seatClass:newValue
      })
      } 

    renderModalBox = () => {
      const { modalVisible, detail, passengers, passengersPrev, seatClass, seatClassPrev } = this.state;
      return (
        <Modal
          isVisible={modalVisible}
          animationIn="slideInUp"
          backdropOpacity={0.6}
          onBackdropPress={() => {
            this.setState({
              seatClass:seatClassPrev,
              passengers:passengersPrev
            })
            this.showModal(false)
            console.log('backclick')
           
          }}
          backdropTransitionOutTiming={0}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            { detail === 'passengers' ?
            <>
            <FlatList 
              data={passengers}
              keyExtractor = {(item,index) => {
                  return index;
              }}
              renderItem={this.renderItemPassengers}
            />
            <ButtonApp 
                  label="Done"
                  color={COLOR.lightblue}
                  handler={() => this.setState({
                    passengersPrev:passengers,
                    modalVisible:false
                  })}
                  style={{
                    marginTop:10
                  }}
              />
            </>
            :
            <>
            {seatClass.map((checkbox, i) => (
             <CheckBox
              key={i}
              title={checkbox.label}
              checked={checkbox.checked}
              onPress={(value) => this.checkboxHandler(value, i)}
            />
            ))}
            <ButtonApp 
                  label="Done"
                  color={COLOR.lightblue}
                  handler={() => this.setState({
                    seatClassPrev:seatClass,
                    modalVisible:false
                  })}
                  style={{
                    marginTop:10
                  }}
              />
            </>
            }                 
            </View>
          </View >
        </Modal>
      )
    }

    render() { 
      const translateY = Animated.interpolateNode(this.state.translateYDetail,{
        inputRange: [0, 1],
        outputRange: [0, 92]
      })

      let totalPassengers = 0
      this.state.passengers.map((data,index) => {
        totalPassengers += data.amount
      })

      let seatClassPicked = ''
      this.state.seatClass.map((data,index) => {
        if(data.checked===true){
          seatClassPicked = data.label
        }
      })
        return (
        <>
        <FlightsHeader header='FlightsSearch' {...this.props}/>
          <View style={{flex:1}} >  
            <View style={styles.background}></View>
            <View style={styles.container}> 
              <View style={styles.tripTypeButtonContainer}>
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                  <Text>One-Way / Round-Trip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                  <Text>MultiTrip</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.flightsContainer}>
              <View style={styles.flightRow}>
                      <Text style={styles.flightRowTitle}>From</Text>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>this.props.navigation.navigate('AirportsSearch',{type:'departureAirport'})}
                        style={styles.flightSubRow}>
                        <View style={{height:17,marginRight:-10}}>
                            <FontawesomeIcon
                              name='plane-departure'
                              size={20}
                              color={COLOR.gray}
                            />
                            <View style={{
                              borderBottomColor:COLOR.lightblue,
                              borderBottomWidth:2.5, 
                              marginTop:5}}></View>
                          </View>
                          <Text style={styles.flightRowText}>{this.state.departureAirport}</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.flightRow}>
                      <Text  style={styles.flightRowTitle}>To</Text>
                      <TouchableOpacity  
                       activeOpacity={0.8}
                       onPress={() => this.props.navigation.navigate('AirportsSearch',{type:'arrivalAirport'})} 
                        style={styles.flightSubRow}>
                        <View style={{height:17,marginRight:-10}}>
                          <FontawesomeIcon
                            name='plane-arrival'
                            size={20}
                            color={COLOR.gray}
                          />
                          <View style={{
                            borderBottomColor:COLOR.lightblue,
                            borderBottomWidth:2.5, 
                            marginTop:5}}></View>
                        </View>
                        <Text style={styles.flightRowText}>{this.state.arrivalAirport} </Text>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.flightRow}>
                      <Text style={styles.flightRowTitle}>Departure Date</Text>
                      <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={() => this.showDate(true,'departureDate')}
                        style={styles.flightSubRow}>
                        <FontawesomeIcon
                          name='calendar-day'
                          size={20}
                          color={COLOR.gray}
                        />
                          <FontawesomeIcon
                          name='arrow-right'
                          size={17}
                          color={COLOR.lightblue}
                          style={{position:'absolute',top:3,left:13}}
                        />
                        <Text style={styles.flightRowText}>{this.renderDateFormat(this.state.departureDate)}</Text> 
                      </TouchableOpacity>
                      <View style={styles.switchBox}>
                          <Text>Round Trip?</Text>
                          <Switch
                            trackColor={{ false: "#767577", true: COLOR.lightblue }}
                            thumbColor={this.state.isRoundTrip ? "#fff" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.roundTripToggle}
                            value={this.state.isRoundTrip}
                          />
                        </View>
                  </View>
                  <View style={styles.flightRow}>
                      <Text style={styles.flightRowTitle}>Return Date</Text>
                      <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={() => this.showDate(true,'returnDate')}
                        style={styles.flightSubRow}>
                        <FontawesomeIcon
                          name='calendar-day'
                          size={20}
                          color={COLOR.gray}
                        />
                          <FontawesomeIcon
                          name='arrow-right'
                          size={17}
                          color={COLOR.lightblue}
                          style={{position:'absolute',top:3,left:13}}
                        />
                        <Text style={styles.flightRowText}>{this.renderDateFormat(this.state.returnDate)}</Text>
                      </TouchableOpacity>
                  </View>
              </View>
            <Animated.View style={[
                styles.flightDetailContainer,
                {transform: [ {translateY} ]}]}>
                <View style={{flexDirection:'row'}}>
                  <View style={styles.flightColumn}>
                      <Text  style={styles.flightRowTitle}>Passengers</Text>
                      <TouchableOpacity
                        activeOpacity={0.8} 
                        onPress={() => this.showModal(true,'passengers')}
                        style={styles.flightSubRow}>
                        <FontawesomeIcon
                              name='user'
                              size={20}
                              color={COLOR.lightblue}
                              style={{position:'absolute',top:-3,left:5}}
                          />
                        <FontawesomeIcon
                              name='user'
                              size={20}
                              color={COLOR.gray}
                            />
                        <Text style={styles.flightRowText}>{`${totalPassengers} Passengers`}</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.flightColumn}>
                      <Text  style={styles.flightRowTitle}>Seat Class</Text>
                      <TouchableOpacity 
                        activeOpacity={0.8} 
                        onPress={() => this.showModal(true,'seatClass')}
                        style={styles.flightSubRow}>
                          <View style={{bottom:5,marginBottom:-10, marginRight:-10}}>
                            <MaterialIcon
                              name='airline-seat-recline-normal'
                              size={28}
                              color={COLOR.lightblue}
                              style={{position:'absolute',top:3,left:-3}}
                            />
                            <View style={{
                              backgroundColor:'#fff',
                              height:20,width:15,
                              position:'absolute',
                              left:5.5,top:4}}>
                            </View>
                            <MaterialIcon
                              name='airline-seat-recline-normal'
                              size={28}
                              color={COLOR.gray}
                            />
                          </View>
                        
                        <Text style={styles.flightRowText}>{seatClassPicked}</Text>
                      </TouchableOpacity>
                  </View>
              </View>
              
              <CheckBox
                  title='Include Flexible Ticket'
                  checked={this.state.isFlexibleTicket}
                  onPress={this.flexibleTicketToggle}
                  containerStyle={{backgroundColor:'#fff',borderWidth:0, left:5}}
                />
              <ButtonApp  //BUTTON SUBMIT ALL ------------------------------>>>>>>>>>>>>>>>
                  label="Search"
                  color={COLOR.secondary}
                  handler={() => {
                    const {departureAirport, arrivalAirport, departureDate, returnDate, passengers, seatClass, isFlexibleTicket} = this.state
                    let passengersObj = {
                      adult:passengers[0].amount,
                      child:passengers[1].amount,
                      infant:passengers[2].amount
                    }
                    let seatClassObj = ''
                    seatClass.map((data) => {
                      if(data.checked===true) {
                        seatClassObj=data.label
                      }
                    })
                    let airportCityFlight = {
                      from: departureAirport.split(' - ')[0],
                      to: arrivalAirport.split(' - ')[0]
                    }
                    let airportCodeFlight = {
                      from: departureAirport.split(' - ')[1],
                      to: arrivalAirport.split(' - ')[1]
                    }

                    const flightInfo = {
                      departureAirport,
                      arrivalAirport,
                      airportCityFlight,
                      airportCodeFlight,
                      passengers:passengersObj,
                      totalPassengers,
                      seatClass:seatClassObj,
                      departureDate,
                      returnDate: this.state.isRoundTrip ? returnDate : '',
                      includeFlexibleTicket:isFlexibleTicket
                    }
                    this.props.storeFlightSearchInfo(flightInfo)
                    this.props.navigation.navigate('FlightsList')
                    //send req to api flights
                  }}
                  style={{
                    marginTop:-5
                  }}
              />
            </Animated.View>
            {this.renderDatePicker()}
            {this.renderModalBox()}
            </View> 
          </View>
        </>
        );
    }
}


const mapDispatchToProps = dispatch => ({
  storeFlightSearchInfo: data => dispatch(flightSearchInfo(data))
})

export default connect(null, mapDispatchToProps)(FlightsSearch);

const styles = StyleSheet.create({
  background:{
    height:120,
    width:'100%',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    backgroundColor:COLOR.main
  },
  container:{
    height:500, 
    width:WIDTH,
    position:'absolute',
    // backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    top:-30,
  },
  tripTypeButtonContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginRight:110
  },
  flightsContainer:{
    width:WIDTH*0.95,
    height:353,
    backgroundColor:'#fff',
    margin:10,
    flexDirection:'column',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    elevation:10
  },

  flightRow:{
    borderBottomColor:COLOR.gray,
    borderBottomWidth:1.5,
    marginHorizontal:15,
    marginVertical:15,
    // backgroundColor:'red'
  },
  flightRowTitle:{
    fontWeight:'bold'
  },
  flightSubRow:{
    flexDirection:'row',
    marginVertical:10,
  },
  flightRowText:{
    marginHorizontal:20,
    fontSize:16
  },
  button:{
    height:45,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    elevation:10,
    padding:10,
    marginHorizontal:10,
    marginRight:0
  },
  switchBox:{
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:5,
    right:15,
    position:'absolute',
  },
  flightDetailContainer:{
    width:WIDTH*0.95,
    height:210,
    backgroundColor:'#fff',
    marginHorizontal:10,
    top:357,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    elevation:10,
    paddingTop:15,
    position:'absolute'
  },
  flightColumn:{
    borderBottomColor:COLOR.gray,
    borderBottomWidth:1.5,
    marginHorizontal:15,
    marginVertical:15,
  },
  //modal
  centeredView: {
    flex:1,
    justifyContent: "flex-end",
    alignItems: "center",
    bottom:-40,
},
modalView: {
    backgroundColor: "white",
    width:WIDTH,
    padding: 30,
    paddingTop:50,
    borderRadius: 20,
    minHeight:300
},
textStyle: {
    fontSize:17,
    fontWeight:'800',
    color:'#0D9383'
},
modalText: {
    marginBottom: 15,

},
passengersRow:{
  flexDirection:'row',
  marginVertical:10,
  justifyContent:'center',
  alignItems:'center'
},
inputSpinner:{
  width:170,
  marginHorizontal:20,
  marginVertical:-10
}
})