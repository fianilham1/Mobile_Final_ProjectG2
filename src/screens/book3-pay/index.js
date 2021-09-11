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
import { FlightsHeader } from '../../components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { ListItem, Button } from 'react-native-elements';
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

class Book3Pay extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            expand:false,
            apiLoading:false,
            finishGetApiResponse:false
        }
    }

    componentDidMount(){
     
    }

    expandHandler = () => {
        this.setState({
            expand:!this.state.expand
        })
    }

    renderItemFlights = ({item,index}) => {
        return (
            <ListItem 
                  onPress={() => this.props.navigation.navigate('FlightsDetail',{
                        airlineDetail:item
                  })} 
                  style={{
                  flexDirection:'column',
                  marginVertical:10, 
                  marginHorizontal:5,
                  borderRadius:8}}
                  containerStyle={styles.flightListBox}>
              <View style={{flexDirection:'column',flex:1}}>
                <View style={{flexDirection:'row', marginBottom:30}}>
                  <Text style={styles.dateText}>{item.departureDate[0]+', '+item.departureDate[1]+' '+item.departureDate[2]}</Text>
                </View>
                 
                <View style={{flexDirection:'row'}}>
                  <View style={styles.flightInfoLeft}>
                    <View style={styles.infoTimeColumn}> 
                        <Text style={styles.timeText}>{item.departureTime}</Text>
                        <View style={styles.codeBox}>
                            <Text style={styles.codeText}>{item.fromAirportCode}</Text>
                        </View> 
                    </View>
                    <View style={styles.infoTimeColumn}>
                        <Text style={styles.arrowTextUpper}>{item.durationFlight}</Text>
                        <View>
                            <View style={styles.arrowLine}>
                                <MaterialIcon 
                                    name='chevron-right'
                                    size={17}
                                    color={COLOR.gray}
                                    style={{position:'absolute' ,left:46, bottom:-7.7}}
                                />
                                <MaterialIcon 
                                    name='circle'
                                    size={8}
                                    color={COLOR.gray}
                                    style={{position:'absolute' ,left:-5, top:-3.8}}
                                />
                            </View>
                        </View>
                        <Text style={styles.arrowTextLower}>{item.numberTransit===0? 'Direct' : `${item.numberTransit} Stop`}</Text>
                    </View>
                    <View style={styles.infoTimeColumn}>
                        <Text style={styles.timeText}>{item.arrivalTime}</Text>
                        <View style={styles.codeBox}>
                            <Text style={styles.codeText}>{item.toAirportCode}</Text>
                        </View> 
                    </View>
                  </View>
                  
                  <View style={styles.flightInfoRight}>
                    <View style={styles.priceBox}>
                      <Text style={styles.priceText}>{'Rp '+item.price}</Text>   
                      <Text style={styles.paxText}>/pax</Text>      
                    </View>
                  </View>
                </View>

                <View style={{flexDirection:'row',marginBottom:-25, bottom:20}}>
                  <MaterialIcon 
                      name='flight'
                      size={35}
                      color={COLOR.lightblue}
                      style={{
                          transform: [ {rotate:'45deg'} ]
                      }}
                      />
                  </View>
              
              </View>
            </ListItem>
        );
      }

    clickPayHandler = () => {
    const { flightsSearchInfo, loggedUserProfile, travelerDetailList, flightsChosen, price } = this.props    
   
    // this.sendFlightsDetail(detailSent)

    }

    sendFlightsDetail = async (detailSent) => {
        this.setState({
            apiLoading:true
        })
        try{
            let res = await fetch(flightsApi+'/find',{
                method: 'POST',
                mode:'no-cors',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: this.props.token
                },
                body: JSON.stringify(detailSent)
            })
            let json = await res.json()
            if(json){
                this.setState({
                    apiLoading:false,
                    finishGetApiResponse:true,
                })
    
                // if(json.errorMessage==='No Flights Available'){
                //     return this.setState({
                //                 isFlightsAvailable:false
                //             })
                // }
    
                //GET SUCCESS RESPONSE -------------------------------->>>>>>>>>>>>
                // this.setState({
                //     isFlightsAvailable:true
                // })
                console.log('success response: ',json)
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

    setFirstLetterToUppercase = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        const { flightsSearchInfo, loggedUserProfile, travelerDetailList, flightsChosen, price } = this.props     
        const { passengers } = flightsSearchInfo

        return (
            <SafeAreaView style={{flex: 1}}>
            <FlightsHeader header='Book3Pay' {...this.props}/>
            <Spinner //LOADING GET/POST API 
                visible={this.state.apiLoading}
                textContent={'Please Wait... We Are Processing Your Booking'}
                textStyle={{color:'#fff'}}
            />
            <View style={styles.background}></View>
            <View style={styles.flightListContainer}>
                <Text style={{color:'#fff'}}>Tab to See The Product's Detail</Text>
                <FlatList 
                showsHorizontalScrollIndicator={false}
                horizontal
                data={flightsChosen}
                keyExtractor = {(item,index) => {
                    return index;
                }}
                renderItem={this.renderItemFlights}
                />

            </View>  
            <ScrollView 
                style={{
                    flex:1}}
                showsVerticalScrollIndicator={false}>
                <View style={styles.paymentContainer}>
                    <Text style={styles.headerTitle}>Payment Method</Text>
                    <View style={styles.payment}>
                        {
                            price.paymentMethod ?
                            <>
                             <Image 
                                style={price.paymentMethod.style}
                                source={price.paymentMethod.image}
                            />
                            <Text style={[styles.text,{
                                position:'absolute',
                                left:125
                            }]}>{price.paymentMethod.name+' Virtual Account'}</Text>
                            </>
                            :
                            <Text style={{
                                color:'gray',
                                fontWeight:'bold',
                                fontSize:17
                            }}>No Method Payment Selected</Text>
                        }
                        <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => this.props.navigation.navigate('SelectPayment')}>
                            <Text style={{
                                color:COLOR.lightblue,
                                }}>Choose</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.addtionalContainer}>
                    <Text style={styles.headerTitle}>Additional Options </Text>
                    <TouchableOpacity 
                          activeOpacity={0.7}
                          onPress={() => {}}
                          style={styles.addition}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <MaterialIcon 
                                name='local-offer'
                                size={35}
                                color='gray'
                                style={{marginRight:15}}
                                />
                                <FontAwesomeIcon 
                                name='percent'
                                size={10}
                                color='#fff'
                                style={{position:'absolute',left:13}}
                                />
                                <Text>Coupon</Text>
                            </View>
                            <Text style={{
                                color:COLOR.lightblue,
                                }}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          activeOpacity={0.7}
                          onPress={() => {}}
                          style={styles.addition}>
                             <View style={{flexDirection:'row',alignItems:'center'}}>
                                <FontAwesomeIcon 
                                name='product-hunt'
                                size={35}
                                color='gray'
                                style={{marginRight:15}}
                                />
                                <Text>Points</Text>
                            </View>
                            <Text style={{
                                color:COLOR.lightblue,
                                }}>Redeem</Text>
                        </TouchableOpacity>
                </View>
                <View style={styles.flightDetailContainer}>
                    <Text style={styles.headerTitle}>Price Details </Text>
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
                                             <Text>{INSURANCE_LAVEL[key]}</Text>
                                             <Text>{'Rp '+INSURANCE_PRICE[key]}</Text>
                                        </View>
                                    )
                                })
                            }
                            <Text></Text>
                        </View>
                </View>
                <Button
                    title="Confirm To Pay"
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
                        this.clickPayHandler()
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
    price: state.price
})

 
export default connect(mapStateToProps)(Book3Pay);

const styles = StyleSheet.create({
    background:{
        flex:0.45,
        width:'100%',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        backgroundColor:COLOR.main
      },
  flightListContainer:{
    justifyContent:'center',
    position:'absolute',
    top:90,
    left:15
    // top:50
  },
  flightListBox:{
    width:WIDTH*0.9,
    minHeight:150,
    backgroundColor:'#fff',
    borderRadius:7,
    elevation:5,
  },
  flightInfoLeft:{
    marginRight:20,
    marginLeft:-5,
    marginTop:-20,
    marginBottom:25,
    flexDirection:'row',
  },
  infoTimeColumn:{
    marginHorizontal:0,
    paddingHorizontal:5,
    justifyContent:'space-evenly',
    alignItems:'center',
    flexDirection:'column',
    minHeight:50
  },
  codeBox:{
      width:40,
      height:20,
      borderRadius:20,
      backgroundColor:COLOR.lightgray,
      justifyContent:'center',
      alignItems:'center'
  },
  dateText:{
    fontWeight:'bold',
    fontSize:14.5
  },
  codeText:{
    color:'gray',
    fontSize:13
  },
  timeText:{
    fontWeight:'900',
    fontSize:16
  },
  arrowLine:{
      width:55,
      height:1.5,
      backgroundColor:COLOR.gray
  },
  arrowTextUpper:{
    color:'gray',
    fontSize:12,
  },
  arrowTextLower:{
    color:'gray',
    fontSize:12,
  },

  flightInfoRight:{
    marginRight:15,
    marginTop:-20,
    marginBottom:25,
  },
  priceBox:{
    flexDirection:'row'
  },
  priceText:{
      color:COLOR.secondary,
      fontSize:17,
      fontWeight:'bold',
  },
  paxText:{
      color:'gray'
  },
  pointsText:{
    color:'gray',
    marginTop:10
  },
  buttonBox:{
    width:110,
    height:40,
    backgroundColor:COLOR.main,
    justifyContent:'center',
    alignItems:'center',
    elevation:5,
    flexDirection:'row',
    left:140
  },
  detailBox:{
    width:110,
    height:40,
    backgroundColor:COLOR.main,
    justifyContent:'center',
    alignItems:'center',
    elevation:5,
    top:55,
    flexDirection:'row',
  },
  detailText:{
      color:"#fff"
  },

  headerTitle:{
    marginBottom:10,
    fontWeight:'bold',
    fontSize:16
  },
  paymentContainer:{
    paddingHorizontal:10,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignContent:'flex-start',
    marginTop:25
  },
  payment:{
      backgroundColor:'#fff',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      height:60,
      width:'100%',
      paddingVertical:10,
      paddingHorizontal:15,
      borderRadius:5
  },

  text:{
    fontSize:16, 
  },
  miniText:{
    fontSize:14, 
    color:'gray',
    marginRight:10
  },


  addtionalContainer:{
    paddingHorizontal:10,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignContent:'flex-start',
    marginTop:25,
  },
  addition:{
    backgroundColor:'#fff',
    minHeight:60,
    justifyContent:'space-between',
    width:'100%',
    paddingVertical:5,
    paddingHorizontal:10,
    flexDirection:'row',
    alignItems:'center',
    borderRadius:5,
    marginBottom:10
  },

  flightDetailContainer:{
    paddingHorizontal:10,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignContent:'flex-start',
    marginTop:25,
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


