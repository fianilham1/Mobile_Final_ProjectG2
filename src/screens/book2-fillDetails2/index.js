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
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLOR } from '../../constant/color';
import {connect} from "react-redux";
import flightsApi from '../../api/flights';
import { paymentMethodList } from '../../reducers/actions/payment';
import { priceBooking, addInsurances } from '../../reducers/actions/price';
import { FlightsHeader } from '../../components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox, Button } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const INSURANCE_PRICE = {
    travelInsurance:47000,
    covid19Insurance:30000,
    flightDelayInsurance:25000,
    baggageLossProtection:15000
}

const INSURANCE_LABEL = {
    travelInsurance:'Travel Insurance',
    covid19Insurance:'Covid19 Insurance',
    flightDelayInsurance:'Flight Delay Insurance',
    baggageLossProtection:'Baggage Loss Protection'
}

class FillDetails2 extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            travelInsurance:false,
            covid19Insurance:false,
            flightDelayInsurance:false,
            baggageLossProtection:false,
            expand:false,
            isRoundTrip:false,
            apiLoading:false,
            finishGetApiResponse:false
        }
    }

    confirmBooking = () => {
    const { flightsSearchInfo, loggedUserProfile, travelerDetailList, flightsChosen, price } = this.props 
    let priceAdult = 0
    let priceChild = 0
    let priceInfant = 0

    //reformat traveler list
    const reqTravelerDetailList = travelerDetailList.map((passengers,index) => {
        //calculate price each class
        if(passengers.personClass==='adult'){
            priceAdult += passengers.departureFlight.price
            priceAdult += passengers.returnFlight.price
        }
        if(passengers.personClass==='child'){
            priceChild += passengers.departureFlight.price
            priceChild += passengers.returnFlight.price
        }
        if(passengers.personClass==='infant'){
            priceInfant += passengers.departureFlight.price
            priceInfant += passengers.returnFlight.price
        }
        return {
                name: passengers.title+' '+passengers.name,
                birthDate: passengers.birthDate,
                nationality: passengers.nationality,
                personClass: passengers.personClass,
                departureDetails: {
                    baggage: passengers.departureFlight?.baggage,
                    seatNumber: passengers.departureFlight?.seatNumber,
                    seatNumberType: passengers.departureFlight?.seatNumberType,
                    code: flightsChosen[0].code
                },
                returnDetails: {
                    baggage: passengers.returnFlight?.baggage,
                    seatNumber: passengers.returnFlight?.seatNumber,
                    seatNumberType: passengers.returnFlight?.seatNumberType,
                    code: flightsChosen.length > 1 ?  flightsChosen[1].code : ''
                }
            }
    })

    //reformat flights list
    const tempFlightsChosen = flightsChosen.map((flight,index) => {
        const baggageData = []
        const seatRegularZone = []
        const seatGreenZone = []
        const seatSold = []
        travelerDetailList.map((passengers,index) => {
            if(index===0) { //departure
                baggageData.push(passengers.departureFlight?.baggage)
                if(passengers.departureFlight?.seatNumberType==='regularZone'){
                    seatRegularZone.push(passengers.departureFlight?.seatNumber)
                }else if(passengers.departureFlight?.seatNumberType==='greenZone'){
                    seatGreenZone.push(passengers.departureFlight?.seatNumber)
                }
            } 
            if(index===1) {  //return
                baggageData.push(passengers.returnFlight?.baggage)
                if(passengers.returnFlight?.seatNumberType==='regularZone'){
                    seatRegularZone.push(passengers.returnFlight?.seatNumber)
                }else if(passengers.returnFlight?.seatNumberType==='greenZone'){
                    seatGreenZone.push(passengers.returnFlight?.seatNumber)
                }
            }  
        })

        return {
            ...flight,
            departureDate:flight.departureDateApi,
            baggageData,
            seatRegularZone,
            seatGreenZone,
            seatSold
        }
    })
    const reqFlightsChosen = tempFlightsChosen.map((data,index) => {
        const {arrivalDate,departureTime,arrivalTime,fromAirportCity,toAirportCity,fromAirportCode,toAirportCode,fromAirportName,toAirportName,departureDateApi,...originalData} = data

        return originalData
    })
    

    const purchaseDetail = { //DATA FORMAT TO API >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        username: loggedUserProfile.username,
        contactDetails: {
            contactDetailsName: loggedUserProfile.name,
            contactDetailsEmail: loggedUserProfile.username,
            contactDetailsMobile: loggedUserProfile.phone
        },
        flightList: reqFlightsChosen,
        totalPassengers: flightsSearchInfo.totalPassengers,
        flightPassengersList: reqTravelerDetailList,
        flightInsurances: {
            travelInsurance: price.insurances?.travelInsurance,
            covid19Insurance: price.insurances?.covid19Insurance,
            flightDelayInsurance: price.insurances?.flightDelayInsurance,
            baggageLossProtection: price.insurances?.baggageLossProtection
        },
        totalPrice: price.totalPrice,
        priceDetails: {
            passengersNumber: {
                adult: flightsSearchInfo.passengers?.adult,
                child: flightsSearchInfo.passengers?.child,
                infant: flightsSearchInfo.passengers?.infant
            },
            passengersPrice: {
                adult: priceAdult,
                child: priceChild,
                infant: priceInfant
            }
        },
        statusPayment: "Waiting Payment",
        virtualAccountOfPayment: ""
    }
    console.log('CHECK PRUCHASE ???? ',purchaseDetail)
    this.sendFlightsDetails(purchaseDetail)
        // this.props.navigation.navigate('Book3Pay')
    }

    sendFlightsDetails = async (purchaseDetail) => {
        const { price } = this.props  
        this.setState({
            apiLoading:true
        })
        try{
            let res = await fetch(flightsApi+'/details',{
                method: 'POST',
                mode:'no-cors',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: this.props.token
                },
                body: JSON.stringify(purchaseDetail)
            })
            let json = await res.json()
            if(json){
                this.setState({
                    apiLoading:false,
                    finishGetApiResponse:true,
                })
    
                //SEND FLIGHTS DETAILS SUCCESS  -------------------------------->>>>>>>>>>>>
                //NEXT is Proceed to payment >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                this.props.storePaymentMethodList({
                    purchaseId:json.purchaseId,
                    thirdPartyPaymentList:json.thirdPartyPaymentList,
                    totalPrice:price.totalPrice
                })
                console.log('success response: ',json)
                this.props.navigation.navigate('Book3Pay')
                
            }
        }catch(error){
            console.log('error: ',error)
        }
    }

    getPriceBasedPersonClass = (indexFlight, travelerDetailList, personClass, amount) => {
        let price = 0
        //for adult and child only -> get addition price because of seat type
        travelerDetailList.map((data,index) => {
            if(indexFlight===0){ //departure
                if(personClass===data.personClass){
                    price += data.departureFlight.price
                }
            }else if(indexFlight===1){  //return
                if(personClass===data.personClass){
                    price += data.returnFlight.price
                }
            }
        })

        return price
      }
    
    componentDidMount(){
        const { travelerDetailList, flightsChosen } = this.props
        this.props.storePriceBooking({
            travelerDetailList
        })
        if(flightsChosen.length>1){
            this.setState({
                isRoundTrip:true
            })
        }
    }

    addInsurances = (insurance) => {
        this.setState({
            [insurance]:!this.state[insurance]
        })
        this.props.addInsurances({
            [insurance]:!this.state[insurance]
        })
    }

    expandHandler = () => {
        this.setState({
            expand:!this.state.expand
        })
    }

    setFirstLetterToUppercase = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() { 
        const { flightsSearchInfo, loggedUserProfile, travelerDetailList, flightsChosen, price } = this.props     
        const { passengers } = flightsSearchInfo
        const { isRoundTrip } = this.state

        return (
            <SafeAreaView style={{flex: 1}}>
            <FlightsHeader header='Book2FillDetails2' {...this.props}/>
            <Spinner //LOADING GET/POST API 
                visible={this.state.apiLoading}
                textContent={'Please Wait... We Are Processing Your Booking'}
                textStyle={{color:'#fff',fontSize:15}}
            />
            
            <ScrollView 
                style={{
                    flex:1}}
                showsVerticalScrollIndicator={false}>

                <View style={styles.flightDetailContainer}>
                    <Text style={styles.headerDetailTitle}>Flight Facilities </Text>
                    <TouchableOpacity 
                          activeOpacity={0.7}
                          onPress={() => {}}
                          style={styles.detail}>
                            <View>
                                <MaterialIcon 
                                name='work-outline'
                                size={35}
                                color='gray'
                                style={{marginRight:15}}
                                />
                                <View style={styles.iconCircleBox}>
                                    <MaterialIcon 
                                    name='add'
                                    size={22}
                                    color={COLOR.lightblue}
                                    style={{fontWeight:'bold'}}
                                    />
                                </View>
                            </View>
                            <View style={styles.baggageNote}>
                                <Text style={styles.text}>Baggage</Text>
                                <Text style={styles.miniText}>You can bring 20 kg baggage per passengers</Text>
                                <Text style={styles.miniText}>Need more? Tap Here</Text>
                            </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                          activeOpacity={0.7}
                          onPress={() => this.props.navigation.navigate('BookSeatReservation')}
                          style={styles.detail}>
                            <View>
                                <MaterialIcon 
                                name='airline-seat-recline-normal'
                                size={35}
                                color='gray'
                                style={{marginRight:15}}
                                />
                                <View style={styles.iconCircleBox}>
                                    <MaterialIcon 
                                    name='add'
                                    size={22}
                                    color={COLOR.lightblue}
                                    style={{fontWeight:'bold'}}
                                    />
                                </View>
                            </View>
                              <View style={styles.seatNote}>
                                <Text style={styles.text}>Seat Number</Text>
                                <Text style={styles.miniText}>Tap Here to choose your best seat</Text>
                                <Text style={styles.miniText}></Text>
                            </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.flightDetailContainer}>
                    <Text style={styles.headerDetailTitle}>Flight Insurances </Text>
                    <View style={styles.detailCheckbox}>
                        <CheckBox
                            activeOpacity={0.7}
                            title='Travel Insurance'
                            checked={this.state.travelInsurance}
                            onPress={() => this.addInsurances('travelInsurance')}
                            containerStyle={styles.checkbox}
                        />
                        <View style={styles.insuranceNote}>
                            <Text style={styles.mediumText}>Coverage For Accidents</Text>
                            <Text style={styles.miniText}>Covers Up To Rp500.000.000</Text>
                        </View>
                        <View style={styles.insuranceNote}>
                            <Text style={styles.mediumText}>Coverage For Trip Cancellation by Passengers (due to specific reason)</Text>
                            <Text style={styles.miniText}>Covers Up To Rp30.000.000</Text>
                        </View>
                        <View style={styles.insurancePriceContainer}>
                            <Text style={[styles.text,{color:COLOR.secondary, fontWeight:'bold'}]}>{'Rp'+INSURANCE_PRICE.travelInsurance+'/pax'}</Text>
                        </View>
                    </View>
                    <View style={styles.detailCheckbox}>
                        <CheckBox
                            activeOpacity={0.7}
                            title='Covid19 Insurance'
                            checked={this.state.covid19Insurance}
                            onPress={() => this.addInsurances('covid19Insurance')}
                            containerStyle={styles.checkbox}
                        />
                        <View style={styles.insuranceNote}>
                            <Text style={styles.mediumText}>Coverage For Covid19</Text>
                            <Text style={styles.miniText}>Covers Up To Rp1.000.000</Text>
                        </View>
                        <View style={styles.insurancePriceContainer}>
                            <Text style={[styles.text,{color:COLOR.secondary, fontWeight:'bold'}]}>{'Rp'+INSURANCE_PRICE.covid19Insurance+'/pax'}</Text>
                        </View>
                    </View>
                    <View style={styles.detailCheckbox}>
                        <CheckBox
                            activeOpacity={0.7}
                            title='Flight Delay Insurance'
                            checked={this.state.flightDelayInsurance}
                            onPress={() => this.addInsurances('flightDelayInsurance')}
                            containerStyle={styles.checkbox}
                        />
                        <View style={styles.insuranceNote}>
                            <Text style={styles.mediumText}>Coverage For Flight Delay</Text>
                            <Text style={styles.miniText}>Covers Up To 100% flight ordered price</Text>
                        </View>
                        <View style={styles.insurancePriceContainer}>
                            <Text style={[styles.text,{color:COLOR.secondary, fontWeight:'bold'}]}>{'Rp'+INSURANCE_PRICE.flightDelayInsurance+'/pax'}</Text>
                        </View>
                    </View>
                    <View style={styles.detailCheckbox}>
                        <CheckBox
                            activeOpacity={0.7}
                            title='Baggage Loss Protection'
                            checked={this.state.baggageLossProtection}
                            onPress={() => this.addInsurances('baggageLossProtection')}
                            containerStyle={styles.checkbox}
                        />
                        <View style={styles.insuranceNote}>
                            <Text style={styles.mediumText}>Coverage For Baggage Loss</Text>
                            <Text style={styles.miniText}>Covers Up To Rp5.000.000</Text>
                        </View>
                        <View style={styles.insurancePriceContainer}>
                            <Text style={[styles.text,{color:COLOR.secondary, fontWeight:'bold'}]}>{'Rp'+INSURANCE_PRICE.baggageLossProtection+'/pax'}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.flightDetailContainer}>
                    <Text style={styles.headerDetailTitle}>Price Details </Text>
                    <View style={styles.priceDetailBox}>
                    <TouchableOpacity 
                        onPress={() => this.expandHandler()}
                        style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <MaterialIcon 
                            name='expand-more'
                            size={35}
                            color='gray'
                            style={{marginRight:15,left:-8}}
                            />
                    <Text style={{fontSize:19, fontWeight:'bold', right:10}}>Price Your Pay</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:19, fontWeight:'bold'}}>{'Rp '+price.totalPrice}</Text>
                    </View>
                    <View style={styles.priceSubDetailContainer}>
                            {
                                flightsChosen.map((flight,indexFlight) => {
                                    return (
                                        Object.keys(passengers).map((key,index)=> {
                                            if (passengers[key]!==0) return (
                                                <View key={indexFlight+'-'+index} 
                                                style={styles.priceSubDetail}>
                                                     <Text>{flight.airlineName+' ('+this.setFirstLetterToUppercase(key)+') x'+passengers[key]}</Text>
                                                     <Text>{'Rp '+this.getPriceBasedPersonClass(
                                                         indexFlight,
                                                         travelerDetailList, //list all passengers
                                                         key, //person class
                                                         passengers[key] //amount of person class
                                                     )}</Text>
                                                </View>
                                            )
                                        })
                                    )
                                })
                            }
                            {
                                Object.keys(price.insurances).map((key,index) => {
                                    if(price.insurances[key]) return (
                                        <View key={index} 
                                        style={styles.priceSubDetail}>
                                             <Text>{INSURANCE_LABEL[key]}</Text>
                                             <Text>{'Rp '+INSURANCE_PRICE[key]}</Text>
                                        </View>
                                    )
                                })
                            }
                            <Text></Text>
                        </View>
                </View>
                <Button
                    title="Continue"
                    containerStyle={{
                        marginHorizontal:50,
                        marginTop:10,
                        borderRadius:10
                    }}
                    buttonStyle={{
                        backgroundColor:COLOR.lightblue,
                        height:50
                    }}
                    onPress={() => {
                        let checkEmptyData = 0
                        travelerDetailList.map((data, index) => {
                            if(!data.departureFlight.seatNumber) {
                                checkEmptyData += 1
                            }
                            if(isRoundTrip && !data.returnFlight.seatNumber) {
                                checkEmptyData += 1
                            }
                        })
                        if(checkEmptyData>0) return Alert.alert('Alert!','Fill Choose Seat Number')

                        Alert.alert(
                            "Alert",
                            "Are You Sure The Booking Detail is Correct?",
                            [
                              {
                                text: "Check Again",
                                style: "cancel"
                              },
                              { text: "Yes, Continue", onPress: () => this.confirmBooking() }
                            ]
                          );
                        
                    }}
                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.3))', false)}
                /> 
            </ScrollView>   
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    flightsSearchInfo: state.flightsSearch,
    loggedUserProfile: state.auth.loggedUserProfile,
    flightsChosen: state.flightsChosen,
    travelerDetailList: state.traveler,
    price: state.price,
    token:state.auth.token
})

const mapDispatchToProps = dispatch => ({
    storePriceBooking: data => dispatch(priceBooking(data)),
    addInsurances: data => dispatch(addInsurances(data)),
    storePaymentMethodList : data => dispatch(paymentMethodList(data))
  })
 
export default connect(mapStateToProps, mapDispatchToProps)(FillDetails2);

const styles = StyleSheet.create({
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
  headerDetailTitle:{
    marginBottom:10,
    fontWeight:'bold',
    fontSize:16
  },
  iconCircleBox:{
    borderWidth:2,
    borderColor:COLOR.gray,
    justifyContent:"center",
    alignItems:'center',
    width:25,
    height:25,
    borderRadius:12.5,
    backgroundColor:"#fff",
    position:'absolute',
    top:15,
    right:5
  },
  flightDetailContainer:{
    paddingHorizontal:10,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignContent:'flex-start',
    marginTop:25,
  },
  detail:{
    backgroundColor:'#fff',
    height:60,
    width:'100%',
    paddingVertical:5,
    paddingHorizontal:10,
    flexDirection:'row',
    alignItems:'center',
    borderRadius:5,
    marginBottom:10
  },
  baggageNote:{
    justifyContent:'center',
  },
  seatNote:{
      top:6
  },
  detailCheckbox:{
    backgroundColor:'#fff',
    minHeight:115,
    width:'100%',
    paddingVertical:5,
    paddingHorizontal:20,
    marginVertical:5
  },
  checkbox:{
    backgroundColor:'#fff',
    right:20,
    borderWidth:0,
    marginVertical:-5
    },
  insuranceNote:{
    justifyContent:'center',
    marginVertical:3,
    },
  insurancePriceContainer:{
        justifyContent:'center',
        alignItems:'flex-end',
        marginVertical:5
    },
    priceDetailBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#fff',
        minHeight:55,
        width:'100%',
        paddingVertical:5,
        paddingHorizontal:20,
        borderBottomColor:COLOR.gray,
        borderBottomWidth:1
    },
    priceSubDetailContainer:{
        backgroundColor:'#fff',
        justifyContent:'center',
        // alignItems:'center',
        minHeight:10,
        width:'100%',
        paddingVertical:5,
        paddingHorizontal:20,
    },
    priceSubDetail:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#fff',
        paddingTop:5
    }
  
})


// username: loggedUserProfile.username,
//     contactDetails: {
//         contactDetailsName: loggedUserProfile.name,
//         contactDetailsEmail: loggedUserProfile.username,
//         contactDetailsMobile: loggedUserProfile.phone
//     },
//     flightList: [
//         {
//             "airlineName": "Garada",
//             "code": "GA305",
//             "fromAirport": "Surabaya - SUB",
//             "toAirport": "Balikpapan - BPN",
//             "departureDate": "2021-09-12",
//             "departureDateTime": "2021-09-12 06:00:00",
//             "arrivalDateTime": "2021-09-12 08:40:00",
//             "durationFlight": "2h 40m",
//             "seatClass": "Economy",
//             "price": 2000000.0,
//             "entertainment": true,
//             "wifi": true,
//             "powerOrUSBPort": false,
//             "meals": false,
//             "aircraftType": "Boeing 737-800",
//             "seatLayout": "3-3",
//             "seatPitch": "31-inch",
//             "numberTransit": 1,
//             "transitLocation": "Jakarta(CKG)",
//             "transitDuration": "03:40",
//             "baggageData": [
//                 40,
//                 20
//             ],
//             "seatRegularZone": [
//                 "A-1",
//                 "A-2"
//             ],
//             "seatGreenZone": [],
//             "seatSold": []
//         },
//         {
//             "airlineName": "Srijaya",
//             "code": "SJ555",
//             "fromAirport": "Balikpapan - BPN",
//             "toAirport": "Surabaya - SUB",
//             "departureDate": "2021-09-14",
//             "departureDateTime": "2021-09-14 15:15:00",
//             "arrivalDateTime": "2021-09-14 16:35:00",
//             "durationFlight": "1h 20m",
//             "seatClass": "Economy",
//             "price": 1500000.0,
//             "entertainment": true,
//             "wifi": false,
//             "powerOrUSBPort": false,
//             "meals": false,
//             "aircraftType": "Boeing 751-250",
//             "seatLayout": "3-3",
//             "seatPitch": "30-inch",
//             "numberTransit": 0,
//             "transitLocation": "",
//             "transitDuration": "",
//             "baggageData": [
//                 40,
//                 20
//             ],
//             "seatRegularZone": [],
//             "seatGreenZone": [
//                 "B-2",
//                 "C-1"
//             ],
//             "seatSold": []
//         }
//     ],
//     "totalPassengers": 2,
//     "flightPassengersList": [
//         {
//             "name": "Mr. Fian Ilham",
//             "birthDate": "",
//             "nationality": "Indonesia",
//             "personClass": "adult",
//             "departureDetails": {
//                 "baggage": 40,
//                 "seatNumber": "A-1",
//                 "seatNumberType": "regularZone",
//                 "code": "GA305"
//             },
//             "returnDetails": {
//                 "baggage": 40,
//                 "seatNumber": "B-2",
//                 "seatNumberType": "greenZone",
//                 "code": "SJ555"
//             }
//         },
//         {
//             "name": "Mrs. Nadya",
//             "birthDate": "2010-05-15",
//             "nationality": "Indonesia",
//             "personClass": "child",
//             "departureDetails": {
//                 "baggage": 20,
//                 "seatNumber": "A-2",
//                 "seatNumberType": "regularZone",
//                 "code": "GA305"
//             },
//             "returnDetails": {
//                 "baggage": 20,
//                 "seatNumber": "C-1",
//                 "seatNumberType": "greenZone",
//                 "code": "SJ555"
//             }
//         }
//     ],
//     "flightInsurances": {
//         "travelInsurance": true,
//         "covid19Insurance": true,
//         "flightDelayInsurance": true,
//         "baggageLossProtection": true
//     },
//     "totalPrice": 6820000.0,
//     "priceDetails": {
//         "passengersNumber": {
//             "adult": 1,
//             "child": 1,
//             "infant": 0
//         },
//         "passengersPrice": {
//             "adult": 3500000.0,
//             "child": 2800000.0,
//             "infant": 0.0
//         }
//     },
//     "statusPayment": "Waiting Payment",
//     "virtualAccountOfPayment": ""
// }