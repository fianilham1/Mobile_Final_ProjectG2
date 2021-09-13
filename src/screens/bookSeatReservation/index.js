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
import { addBaggageSeatType } from '../../reducers/actions/price';
import { updateTraveler } from '../../reducers/actions/traveler';
import { FlightsHeader } from '../../components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class BookSeatReservation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            travelerDetailList:[],
            flightsChosen:[],
            seatRowGroup:['A','B','MID','C','D'],
            seatColumnGroup:[1,2,3,4,5,6],
            screenFlight:1, //display for round trip -> each flight
            screenPassengers:1, //display for each passengers
            travelerList:[], //store passengers temp
            isRoundTrip:false,
            totalPassengersForFacilities:0,
            finishChoosingStatus:false,
            greenZone:[],
            regularZone:[],
            sold:[]
        }
    }

    componentDidMount(){
        const { flightsChosen, travelerDetailList } = this.props
        console.log('flightsChosen in seat',flightsChosen)
        let totalPassengersForFacilities = 0
        travelerDetailList.map((data,index) => {
            if(data.personClass !== 'infant'){
                totalPassengersForFacilities += 1 //infant passengers IS NOT INCLUDE !!!!!!!!!!!!
            }
        })
        this.setState({
            totalPassengersForFacilities,
            greenZone : flightsChosen[0].seatGreenZone,
            regularZone : flightsChosen[0].seatRegularZone,
            sold : flightsChosen[0].seatSold
        })
        if (flightsChosen.length>1){ //round trip
            this.setState({
                isRoundTrip:true,
            })
        }
    }

    renderChosenSeat = () => {
    const { screenPassengers, screenFlight } = this.state
    const { travelerDetailList, flightsChosen } = this.props
        // console.log(travelerDetailList)
    let typeFlight = ''
    console.log('screenFlight ',screenFlight)
    console.log('screenPassengers ',screenPassengers)
    return flightsChosen.map((flight,indexFlight) => { 
    //index=0 -> departure flight || index=1 -> return flight
        if(indexFlight===0){
            typeFlight='departureFlight'
        }else if(indexFlight===1){
            typeFlight='returnFlight'
        }
        return (
        <View key={indexFlight}  style={styles.chosenSeatContainer}>
            <View style={styles.chosenSeatRowContainer}> 
                <Text style={styles.miniText}>{indexFlight===0 ? 'departure' : 'return'}</Text>
                <MaterialIcon 
                    name='flight'
                    size={18}
                    color={COLOR.main}
                    style={{left:-5}}
                />
                <Text style={styles.headerTitle}>{flight.airlineName+'   '}</Text>
                <Text style={styles.miniText}>{indexFlight===0 ? flight.fromAirportCode : flight.toAirportCode}</Text>
                <MaterialIcon
                    name="arrow-forward"  
                    size={15}
                    style={{left:-5}}
                  />
                <Text style={styles.miniText}>{indexFlight===0 ? flight.toAirportCode : flight.fromAirportCode}</Text>
            </View>
           
            <View style={styles.chosenSeatRowContainer}>
                {
                     travelerDetailList.map((traveler,index) => {
                        if(traveler.personClass !== 'infant') return (
                            <View key={index}>
                                <View style={styles.chosenSeatBox}>
                                    <View style={{
                                        backgroundColor:COLOR.secondary,
                                        flex:1,
                                        width:'100%',
                                        justifyContent:'center',
                                        alignItems:'center'}}>
                                        <Text style={{color:'#fff'}} >{traveler.name}</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text>{traveler[typeFlight].seatNumber}</Text>
                                    </View>
                                </View>
                                {
                                    indexFlight===screenFlight-1 && index===screenPassengers-1 ?
                                    <View style={styles.activeChosenBox}>
                                        <Text style={styles.activeText}>Choose</Text>
                                    </View>
                                   
                                    :
                                    null
                                }
                            </View>
                        )
                        })
                }
            </View>
        </View>
        )
    })
    }

    chooseSeatHandler = (seatNumber,seatNumberType) => {
        const { totalPassengersForFacilities, screenFlight, screenPassengers, isRoundTrip } = this.state
        const { flightsChosen, travelerDetailList } = this.props
        const index = travelerDetailList.findIndex(item => item.id === screenPassengers)
        let pricePerPassengers = 0
        let seatNumberTypePrevious = ''
       
        if(screenFlight===1){ //departure
            pricePerPassengers =  travelerDetailList[index].departureFlight.price
            seatNumberTypePrevious = travelerDetailList[index].departureFlight.seatNumberType

            if(seatNumberTypePrevious!==seatNumberType){
                if( (seatNumberTypePrevious==='' || seatNumberTypePrevious==='regularZone') && seatNumberType==='greenZone' ){
                    pricePerPassengers += 60000
                }else if ( seatNumberTypePrevious==='greenZone' && seatNumberType==='regularZone' ){
                    pricePerPassengers -= 60000
                }
            }
            console.log('pricePerPassengers',pricePerPassengers)
            const newDataTraveler = {
                id:screenPassengers,
                departureFlight:{
                    seatNumber,
                    seatNumberType,
                    baggage:20,
                    price: pricePerPassengers
                }
            }
            this.props.doUpdateTraveler(newDataTraveler) //update seat number and seat types
            this.props.addBaggageSeatType(newDataTraveler) //update price
        
            this.setState({
                screenPassengers: screenPassengers<totalPassengersForFacilities ?  screenPassengers+1 : screenPassengers
            })
            if(!isRoundTrip && screenPassengers===totalPassengersForFacilities){
               //FINISH
               this.setState({
                finishChoosingStatus:true
               })
               setTimeout(() => {
                this.props.navigation.goBack()
                },1000)
            }else if(isRoundTrip && screenPassengers===totalPassengersForFacilities){
                this.setState({
                    // screenPassengers:1,
                    greenZone : flightsChosen[1].seatGreenZone,
                    regularZone : flightsChosen[1].seatRegularZone,
                    sold : flightsChosen[1].seatSold
                })
                setTimeout(() => {
                    this.setState({
                        screenFlight: screenFlight+1, //change for return flight
                        screenPassengers:1,
                    })
                },1000)
                // this.setState({
                //     screenFlight: screenFlight+1, //change for return flight
                // })
            }
        }else if(screenFlight===2){ //roundtrip
            pricePerPassengers =  travelerDetailList[index].returnFlight.price
            seatNumberTypePrevious = travelerDetailList[index].returnFlight.seatNumberType

            if(seatNumberTypePrevious!==seatNumberType){
                if( (seatNumberTypePrevious==='' || seatNumberTypePrevious==='regularZone') && seatNumberType==='greenZone' ){
                    pricePerPassengers += 60000
                }else if ( seatNumberTypePrevious==='greenZone' && seatNumberType==='regularZone' ){
                    pricePerPassengers -= 60000
                }
            }

            const newDataTraveler = {
                id:screenPassengers,
                returnFlight:{
                    seatNumber,
                    seatNumberType,
                    baggage:20,
                    price: pricePerPassengers
                }
            }
            this.props.doUpdateTraveler(newDataTraveler) //update seat number and seat types
            this.props.addBaggageSeatType(newDataTraveler) //update price

            this.setState({
                screenPassengers: screenPassengers<totalPassengersForFacilities ?  screenPassengers+1 : screenPassengers
            })
            
            if(screenPassengers===totalPassengersForFacilities){
             //FINISH
             this.setState({
                finishChoosingStatus:true,
               })
            setTimeout(() => {
                this.props.navigation.goBack()
            },1000)
            }
        }
        
    }

    renderRowItem = ({item,index}) => {
        const { travelerDetailList, flightsChosen } = this.props
        const { seatRowGroup, finishChoosingStatus, screenFlight, greenZone, regularZone, sold } = this.state
      
        return ( //column
        <View style={styles.flightSeatRow}> 
        {
            seatRowGroup.map((data,index)=> {
                const seatNumber = data+'-'+item
                let seatColor = ''
                let seatNumberType = ''
                if(greenZone.includes(seatNumber)){
                    seatColor=COLOR.green
                    seatNumberType='greenZone'
                }else if(regularZone.includes(seatNumber)){
                    seatColor=COLOR.lightblue
                    seatNumberType='regularZone'
                }else{
                    seatColor=COLOR.gray
                    seatNumberType='sold'
                }

                if(screenFlight===1){ //departure
                    travelerDetailList.map((data,index) => {
                        if(data['departureFlight']['seatNumber']===seatNumber){
                            seatColor=COLOR.red
                        }
                    })
                }else if(screenFlight===2){ //return
                    travelerDetailList.map((data,index) => {
                        if(data['returnFlight']['seatNumber']===seatNumber){
                            seatColor=COLOR.red
                        }
                    })
                } 

               
                if (data==='MID') return <View key={index} style={{width:50}}></View>
                return <Button
                    key={index}
                    title={seatNumber}
                    containerStyle={{
                        margin:5,
                        borderRadius:10
                    }}
                    buttonStyle={{
                        backgroundColor:seatColor,
                        width:50,
                        height:50
                    }}
                    onPress={() => {
                        console.log('finishChoosingStatus',finishChoosingStatus)
                        if(seatNumberType!=='sold' && !finishChoosingStatus){
                            // console.log('type',seatNumberType)
                            this.chooseSeatHandler(seatNumber,seatNumberType)
                        }
                    }}
                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.3))', false)}
                /> 
            })
        }
        </View>
        ) 
    }

    render() { 
        const { totalPassengersForFacilities, addSeatDataTravelerList, screenFlight } = this.state
        const { flightsSearchInfo, flightsChosen } = this.props 

        console.log(addSeatDataTravelerList)
        return (
            <SafeAreaView style={{flex: 1}}>
            <FlightsHeader flightsSearchInfo={flightsSearchInfo} header='BookSeatReservation' {...this.props}/>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Seat Layout </Text>
                <View style={styles.seatDescriptionContainer}>
                    <View style={{alignItems:'center'}}>
                        <View style={styles.seatDescription}>
                            <View style={[styles.seatBox,{ backgroundColor:COLOR.green,}]}></View>
                            <Text style={styles.miniText}>Green Zone</Text>
                        </View>
                        <Text style={styles.miniText}>+Rp 60000</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View style={styles.seatDescription}>
                            <View style={[styles.seatBox,{ backgroundColor:COLOR.lightblue,}]}></View>
                            <Text style={styles.miniText}>Regular Zone</Text>
                        </View>
                        <Text style={styles.miniText}>FREE</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                    <View style={styles.seatDescription}>
                        <View style={[styles.seatBox,{ backgroundColor:COLOR.gray,}]}></View>
                        <Text style={styles.miniText}>Sold</Text>
                    </View>
                    <Text style={styles.miniText}>Not Available</Text>
                    </View>
                </View>
                <Text style={styles.mediumText}>{'Total Passengers (exclude infant) : '+totalPassengersForFacilities+' passengers'}</Text>
                {this.renderChosenSeat()}
                <View style={styles.headerAirline}>
                        <Text style={{color:'#fff',fontSize:20}}>{flightsChosen[screenFlight-1].airlineName}</Text>
                        <Text style={{color:'#fff'}}> Seat Layout</Text>
                    </View>
                <FlatList 
                style={{marginTop:10,flex:3}}
                showsVerticalScrollIndicator={false}
                data={this.state.seatColumnGroup}
                keyExtractor = {(item,index) => {
                    return index;
                }}
                renderItem={this.renderRowItem}
                />
                
            </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    flightsSearchInfo: state.flightsSearch,
    loggedUserProfile: state.auth.loggedUserProfile,
    flightsChosen: state.flightsChosen,
    travelerDetailList: state.traveler
})

const mapDispatchToProps = dispatch => ({
    doUpdateTraveler: data => dispatch(updateTraveler(data)),
    addBaggageSeatType:  data => dispatch(addBaggageSeatType(data)),
  })
 
export default connect(mapStateToProps, mapDispatchToProps)(BookSeatReservation);

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:15,
    flex:1
  },
  seatDescriptionContainer:{
    flexDirection:'row',
    margin:5
  },
  seatDescription:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:3
  },
  seatBox:{
    height:30,
    width:30,
    borderRadius:5,
    margin:5
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
  flightSeatContainer:{
    paddingHorizontal:10,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignContent:'flex-start',
    marginTop:25,
  },
  flightSeatRow:{
    flex:1,
    flexDirection:'row',
  },
  chosenSeatContainer:{
    justifyContent:'center',
    alignItems:'flex-start',
    flexDirection:'column',
    // backgroundColor:'red',
    width:'100%',
    paddingHorizontal:40,
    marginTop:10
  },
  chosenSeatRowContainer:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginTop:10
  },
  chosenSeatBox:{
      height:50,
      width:50,
      borderWidth:1,
      borderColor:COLOR.secondary,
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center',
      marginHorizontal:10
  },
  activeChosenBox:{
    height:60,
    width:60,
    borderColor:COLOR.red,
    borderWidth:1.5,
    left:5,
    top:-5,
    position:'absolute',
  },
  activeText:{
    color:COLOR.red,
    fontSize:12,
    fontWeight:'bold',
    transform:[ {rotate:'270deg'} ],
    left:-37,
    top:3
},
  headerAirline:{
    backgroundColor:COLOR.main,
    width:'80%',
    justifyContent:'center',
    alignItems:'flex-end',
    flexDirection:'row',
    marginTop:15
}
  
  
})