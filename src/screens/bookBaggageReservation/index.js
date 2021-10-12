import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Dimensions,
    FlatList,
    ScrollView,
    Image,
    Alert} from 'react-native';
import { COLOR } from '../../constant/color';
import {connect} from "react-redux";
import { addBaggageSeatType } from '../../reducers/actions/price';
import { updateTraveler } from '../../reducers/actions/traveler';
import { FlightsHeader } from '../../components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ListItem, Button } from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const BASE_BAGGAGE_PRICE=[
  {
    amount:20,
    price:0
  },
  {
    amount:25,
    price:155000
  },
  {
    amount:30,
    price:290000
  },
  {
    amount:35,
    price:400000
  },
]

class Flight extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  chooseBaggageHandler = (indexFlight, passengerId, baggage) => {
    const { travelerDetailList } = this.props
    const index = travelerDetailList.findIndex(item => item.id === passengerId)
    let pricePerPassengers = 0
    let baggagePrevious = ''
    let seatNumberTypePrevious = ''
    let seatNumberPrevious = ''

  //   if(baggage===25){
  //     totalPrice += 155000  
  // }else if(baggage===30){
  //     totalPrice += 290000  
  // }else if(baggage===35){
  //     totalPrice += 400000  
  // }

    if(indexFlight===0){ 
      pricePerPassengers =  travelerDetailList[index].departureFlight.price
      baggagePrevious = travelerDetailList[index].departureFlight.baggage
      seatNumberPrevious = travelerDetailList[index].departureFlight.seatNumber
      seatNumberTypePrevious = travelerDetailList[index].departureFlight.seatNumberType

      if(baggagePrevious !== baggage){
        BASE_BAGGAGE_PRICE.map((priceData,index) => {
          if(priceData.amount===baggagePrevious){
            pricePerPassengers -= priceData.price
          }
          if(priceData.amount===baggage){
            pricePerPassengers += priceData.price
          }
        })
      }
      const newDataTraveler = {
        id:passengerId,
        departureFlight:{
            baggage,
            price: pricePerPassengers,
            seatNumber: seatNumberPrevious,
            seatNumberType: seatNumberTypePrevious
        }
    }
    this.props.doUpdateTraveler(newDataTraveler) //update baggage
    this.props.addBaggageSeatType(newDataTraveler) //update price

    }else if(indexFlight===1){
      pricePerPassengers =  travelerDetailList[index].returnFlight.price
      baggagePrevious = travelerDetailList[index].returnFlight.baggage
      seatNumberPrevious = travelerDetailList[index].returnFlight.seatNumber
      seatNumberTypePrevious = travelerDetailList[index].returnFlight.seatNumberType

      if(baggagePrevious !== baggage){
        BASE_BAGGAGE_PRICE.map((priceData,index) => {
          if(priceData.amount===baggagePrevious){
            pricePerPassengers -= priceData.price
          }
          if(priceData.amount===baggage){
            pricePerPassengers += priceData.price
          }
        })
      }

      const newDataTraveler = {
        id:passengerId,
        returnFlight:{
            baggage,
            price: pricePerPassengers,
            seatNumber: seatNumberPrevious,
            seatNumberType: seatNumberTypePrevious
        }
    }
    this.props.doUpdateTraveler(newDataTraveler) //update baggage
    this.props.addBaggageSeatType(newDataTraveler) //update price
    }
  }

  render() { 
    const { travelerDetailList, flight, indexFlight } = this.props 
    console.log(travelerDetailList)
    return (
      <View
      style={styles.flightListContainer}>
        <ListItem 
              style={{
              marginVertical:10, 
              borderRadius:8}}
              containerStyle={styles.flightListBox}>
          <View style={styles.flightList}> 
                  <MaterialIcon 
                      name='flight'
                      size={18}
                      color={COLOR.main}
                      style={{left:-5}}
                  />
                  <Text style={styles.headerTitle}>{flight.airlineName+' ('+flight.code+')  '}</Text>
                  <Text style={styles.miniText}>{flight.fromAirportCode} </Text>
                  <MaterialIcon
                      name="arrow-forward"  
                      size={15}
                      style={{top:1.5}}
                    />
                  <Text style={styles.miniText}> {flight.toAirportCode}</Text>
          </View> 
        </ListItem>
        {
          travelerDetailList.map((passenger, indexPassenger) => {
            return (
              <View key={indexPassenger} style={styles.passengerContainer}>
                <View style={styles.passengerName}>
                  <MaterialIcon 
                        name='person'
                        size={18}
                        color={COLOR.lightblue}
                        style={{
                          marginRight:5
                        }}
                    />
                  <Text>
                    {passenger.title+' '+passenger.name}
                  </Text>
                </View>
                <View style={styles.baggageList}>
                  {
                    flight.baggageData.map((baggage,indexBaggage) => {
                      let price = 0
                      BASE_BAGGAGE_PRICE.map((priceData,index) => {
                        if(baggage===priceData.amount){
                          price = priceData.price
                        }
                      })
                      let activeStyle = null
                      if(indexFlight===0){ //departure
                        if(passenger.departureFlight.baggage===baggage){
                          activeStyle = styles.activeBaggage
                        }
                      }else if(indexFlight===1){ //return
                        if(passenger.returnFlight.baggage===baggage){
                          activeStyle = styles.activeBaggage
                        }
                      }
                     
                      return (
                        <TouchableOpacity
                          key={indexFlight+'-'+indexPassenger+'-'+indexBaggage} //x,y,z
                          activeOpacity={0.7} 
                          onPress={() => {
                            this.chooseBaggageHandler(indexFlight, passenger.id,  baggage)
                          }}
                          style={[styles.baggageBox, activeStyle]}>
                          <Text>{baggage+' kg'}</Text>
                          <Text style={styles.miniText}>
                            {
                            price!==0 ? 'Rp'+price : 'Free'
                            }
                          </Text>
                        </TouchableOpacity>
                      )
                    })
                  }

                </View>

              </View>
            )
          })
        } 

      </View>
    );  
  }
}

class BookBaggageReservation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }


    componentDidMount(){
        const { flightsSearchInfo, flightsChosen } = this.props
        const { passengers } = flightsSearchInfo
    }

    render() { 
        const { flightsChosen, travelerDetailList } = this.props
        return (
          <>
          <FlightsHeader header='BookBaggageReservation' {...this.props}/>
          {
            flightsChosen.map((flight, index) => {
              return (
                <Flight 
                  key = {index}
                  indexFlight = {index}
                  flight = {flight}
                  {...this.props}/>
                ) 
            })
          }
          <View style={{
            flex:1,
            flexDirection:'column',
            justifyContent:'flex-end',
            marginBottom:20
          }}>
            <Button
              title="Done"
              containerStyle={{
                  marginHorizontal:50,
                  marginTop:10,
                  borderRadius:10,
              }}
              buttonStyle={{
                  backgroundColor:COLOR.lightblue,
                  height:50
              }}
              onPress={() => {
                  this.props.navigation.goBack()
              }}
              background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.3))', false)}
            /> 
          </View>
          </>
        )  
    }
}

const mapStateToProps = state => ({
    flightsSearchInfo: state.flightsSearch,
    loggedUserProfile: state.auth.loggedUserProfile,
    flightsChosen: state.flightsChosen,
    travelerDetailList: state.traveler,
    tokenType:  state.auth.tokenType,
})

const mapDispatchToProps = dispatch => ({
  doUpdateTraveler: data => dispatch(updateTraveler(data)),
  addBaggageSeatType:  data => dispatch(addBaggageSeatType(data)),
})
 
export default connect(mapStateToProps, mapDispatchToProps)(BookBaggageReservation);

const styles = StyleSheet.create({
  flightListContainer:{
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:10,
  },
  flightListBox:{
    width:'100%',
    backgroundColor:'#fff',
    borderRadius:7,
    elevation:5,
  },
  flightList:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  passengerContainer:{
    width:'100%',
    justifyContent:'center',
    alignItems:'flex-start',
  },
  passengerName:{
    height:35,
    width:'100%',
    backgroundColor:'#fff',
    borderRadius:7,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginBottom:10,
    paddingLeft:12,
  },
  baggageList:{
    flexDirection:'row',
    marginBottom:15
  },
  baggageBox:{
    width:75,
    height:60,
    borderRadius:10,
    backgroundColor:'#fff',
    marginRight:10,
    justifyContent:'center',
    alignItems:'center'
  },
  activeBaggage:{
    borderWidth:2,
    borderColor:COLOR.lightblue
  },
  text:{
    fontSize:16, 
  },
  miniText:{
    fontSize:13, 
    color:'gray',
    marginRight:10
  },
  mediumText:{
    fontSize:14, 
  },
  headerTitle:{
    fontWeight:'bold',
    fontSize:16
  },
  text:{
    fontSize:16, 
  },
  miniText:{
    fontSize:14, 
    color:'gray',
  },
  travelerDetailContainer:{
    paddingHorizontal:10,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignContent:'flex-start',
    marginTop:25,
  },
  travelerDetail:{
    backgroundColor:'#fff',
    height:50,
    width:'100%',
    paddingVertical:5,
    paddingHorizontal:10,
    flexDirection:'row',
    alignItems:'center',
    borderRadius:5,
    marginBottom:10
  }
  
})