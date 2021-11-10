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
import { Button } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const Tab = createMaterialTopTabNavigator();

const BASE_SEAT_PRICE=[
    {
      seatNumberType:'regularZone',
      price:0
    },
    {
        seatNumberType:'greenZone',
      price:100000
    }
  ]

class Flight extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    renderChosenSeat = () => {
        const { 
            travelerDetailList,  
            screenPassengers, 
            screenFlight, 
            flight, 
            typeFlight, 
            title, 
            indexFlight, 
            changeScreen } = this.props
        return (
        <View style={styles.chosenSeatContainer}>
            <View style={styles.chosenSeatRowContainer}> 
                <Text style={styles.miniText}>{title}</Text>
                <MaterialIcon 
                    name='flight'
                    size={18}
                    color={COLOR.main}
                    style={{left:-5}}
                />
                <Text style={styles.headerTitle}>{flight.airlineName+' ('+flight.code+')  '}</Text>
                <Text style={styles.miniText}>{flight.fromAirportCode}</Text>
                <MaterialIcon
                    name="arrow-forward"  
                    size={15}
                    style={{left:-5}}
                  />
                <Text style={styles.miniText}>{flight.toAirportCode}</Text>
            </View>
           
            <View style={styles.chosenSeatRowContainer}>
                {
                     travelerDetailList.map((traveler,indexPassenger) => {
                        const seatBoxIndex = [indexFlight+1,indexPassenger+1] //column,row
                        if(traveler.personClass !== 'infant') return (
                            <View key={indexFlight+'-'+indexPassenger}>
                                <TouchableOpacity 
                                activeOpacity={0.7}
                                onPress={() => {
                                    changeScreen(seatBoxIndex[0],seatBoxIndex[1])
                                }}
                                style={styles.chosenSeatBox}>
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
                                </TouchableOpacity>
                                {
                                    seatBoxIndex[0]===screenFlight && seatBoxIndex[1]===screenPassengers ?
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
    }

    renderRowItem = ({item,index}) => {
        const { 
            finishChoosingStatus, 
            totalFlights,
            screenFlight,
            indexFlight,
            screenPassengers, 
            seatList, 
            chooseSeatHandler,
            totalPassengersForFacilities,
            navigation } = this.props
        let seatListPerRow = []
        try{
            seatListPerRow = seatList[index]
        }catch(e){}
    
        return ( //column
        <View style={styles.flightSeatRow}> 
        {
           seatListPerRow.map((seatData,rowIndex) => {
            if (seatData.seatNumber==='MID') return <View key={rowIndex} style={{width:50}}></View>
            return <Button
                key={rowIndex}
                title={seatData.seatNumber}
                containerStyle={{
                    margin:5,
                    borderRadius:10
                }}
                buttonStyle={{
                    backgroundColor:seatData.seatColor,
                    width:50,
                    height:50
                }}
                onPress={() => {
                    console.log('finishChoosingStatus',finishChoosingStatus)
                    if(seatData.seatNumberType !== 'sold' && 
                    (indexFlight+1) === screenFlight &&
                    !finishChoosingStatus){
                        chooseSeatHandler(seatData.seatNumber,seatData.seatNumberType)
                        if(screenPassengers===totalPassengersForFacilities && screenFlight < totalFlights){
                            console.log('total',totalFlights)
                            const flightIdxNext = screenFlight+1
                            setTimeout(() => {
                                //go to next screen FLIGHT
                                navigation.navigate('Flight'+flightIdxNext) 
                            },1000)
                        }
                    }else if(seatData.seatNumberType !== 'sold'){
                        Alert.alert('Alert','Please Select/Tap the Name of Passengers first in current flight seat layout before choose seat (mark by red border)')
                    }else{
                        Alert.alert('Alert','Seat is already Sold')
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
        const { seatRowGroup, flight } = this.props
        try{

            return ( 
                <View style={styles.flightsScreen}>
                  {this.renderChosenSeat()}
                    <View style={styles.flightsSeatContainer}>
                        <View style={styles.headerAirline}>
                                <Text style={{
                                    color:'#fff',
                                    fontSize:20,
                                    fontWeight:'bold'}}>{flight.airlineName}</Text>
                                <Text style={{color:'#fff'}}> Seat Layout</Text>
                        </View>
                        <FlatList 
                            style={{
                                marginTop:10,
                                flex:1}}
                            data={seatRowGroup}
                            keyExtractor = {(item,index) => {
                                return index;
                            }}
                            renderItem={this.renderRowItem}
                        />
                    </View>
                </View>
             );
                      
        }catch(e){
            console.log('error seat',e)
            return null
        }
    
    }
}


class BookSeatReservation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            travelerDetailList:[],
            flightsChosen:[],
            seatColumnGroup:['A','B','MID','C','D'],
            seatRowGroup:[1,2,3,4,5,6],
            screenFlight:1, //display for round trip -> each flight
            screenPassengers:1, //display for each passengers
            travelerList:[], //store passengers temp
            isRoundTrip:false,
            totalPassengersForFacilities:0,
            finishChoosingStatus:false,
            flightsListSeatDetail:[]
        }
    }

    create2DArraySeat = () => {
        const { flightsChosen, travelerDetailList } = this.props
        const { seatColumnGroup, seatRowGroup } = this.state
        let flightsListSeatDetail = []

        flightsChosen.map((flight,index) => {
            let arraySeat = new Array(seatRowGroup.length).fill().map(() => Array(seatColumnGroup.length))
            for(let i=0; i<seatRowGroup.length; i++){
                for(let j=0; j<seatColumnGroup.length; j++){
                    let seatNumber = seatColumnGroup[j]==='MID' ? seatColumnGroup[j] : seatColumnGroup[j]+'-'+seatRowGroup[i]
                
                    if(flight.seatGreenZone.includes(seatNumber)){
                        seatColor=COLOR.green
                        seatNumberType='greenZone'
                    }else if(flight.seatRegularZone.includes(seatNumber)){
                        seatColor=COLOR.lightblue
                        seatNumberType='regularZone'
                    }else{
                        seatColor=COLOR.gray
                        seatNumberType='sold'
                    }

                    travelerDetailList.map((passengerData,passengerIndex) => {
                        if(index===0 && passengerData['departureFlight'].seatNumber===seatNumber){
                            seatColor='red'
                        }else if(index===1 && passengerData['returnFlight'].seatNumber===seatNumber){
                            seatColor='red'
                        }
                    })

                    arraySeat[i][j]={
                        seatNumber,
                        seatColor,
                        seatNumberType
                    }
                }   
            }
            flightsListSeatDetail.push(arraySeat)
        })

        this.setState({
            flightsListSeatDetail
        })
    }



    componentDidMount(){
        this.create2DArraySeat()
        const { flightsChosen, travelerDetailList } = this.props
        let totalPassengersForFacilities = 0
        travelerDetailList.map((data,index) => {
            if(data.personClass !== 'infant'){
                totalPassengersForFacilities += 1 //infant passengers IS NOT INCLUDE
            }
        })
        this.setState({
            totalPassengersForFacilities,
        })
        if (flightsChosen.length>1){ //round trip
            this.setState({
                isRoundTrip:true,
            })
        }
        console.log('COMPONENT DID MOUNT')
    }

    changeScreen = (screenFlight,screenPassengers) => {
        this.setState({
            screenFlight,
            screenPassengers
        })
    }

    chooseSeatHandler = (seatNumber,seatNumberType) => {
        console.log('CEK')
        const { totalPassengersForFacilities, screenFlight, screenPassengers, isRoundTrip, flightsListSeatDetail } = this.state
        const { travelerDetailList } = this.props
        const index = travelerDetailList.findIndex(item => item.id === screenPassengers)
        let pricePerPassengers = 0
        let baggagePrevious = ''
        let seatNumberTypePrevious = ''
        let seatNumberPrevious = ''
        let seatNumberPrev = ''
        let seatNumberTypePrev = ''
       
        if(screenFlight===1){ //departure
            pricePerPassengers =  travelerDetailList[index].departureFlight.price
            baggagePrevious = travelerDetailList[index].departureFlight.baggage
            seatNumberTypePrevious = travelerDetailList[index].departureFlight.seatNumberType
            seatNumberPrevious = travelerDetailList[index].departureFlight.seatNumber

            if(seatNumberPrevious !== seatNumber){
                BASE_SEAT_PRICE.map((priceData,index) => {
                    if(priceData.seatNumberType===seatNumberTypePrevious){
                      pricePerPassengers -= priceData.price
                    }
                    if(priceData.seatNumberType===seatNumberType){
                      pricePerPassengers += priceData.price
                    }
                  })
                // if( (seatNumberTypePrevious==='' || seatNumberTypePrevious==='regularZone') && seatNumberType==='greenZone' ){
                //     pricePerPassengers += 60000
                // }else if ( seatNumberTypePrevious==='greenZone' && seatNumberType==='regularZone' ){
                //     pricePerPassengers -= 60000
                // }
            }
            const newDataTraveler = {
                id:screenPassengers,
                departureFlight:{
                    baggage: baggagePrevious,
                    seatNumber,
                    seatNumberType,
                    price: pricePerPassengers
                }
            }
            this.props.doUpdateTraveler(newDataTraveler) //update seat number and seat types
            this.props.addBaggageSeatType(newDataTraveler) //update price
            const newSeat = {
                seatNumber,
                seatColor:'red',
                seatNumberType
            }

            const flightsListSeatDetailCopy = flightsListSeatDetail
            //loop column
            for (let i = 0; i < flightsListSeatDetailCopy[screenFlight-1].length; i++){
                //search index in loop row -> find previous red color before
                seatNumberPrev = travelerDetailList[screenPassengers-1].departureFlight.seatNumber
                seatNumberTypePrev = travelerDetailList[screenPassengers-1].departureFlight.seatNumberType

                if(seatNumberPrev===seatNumber){
                    break
                }
                const previousSeatIndex = flightsListSeatDetailCopy[screenFlight-1][i].findIndex(item => item.seatNumber === seatNumberPrev);
                if(previousSeatIndex!==-1 ){
                    //change the previous chosen to default color 
                    flightsListSeatDetailCopy[screenFlight-1][i].splice(previousSeatIndex, 1, {
                       seatNumber : seatNumberPrev,
                       seatColor : seatNumberTypePrev==='greenZone'? COLOR.green : COLOR.
                                  lightblue,
                       seatNumberType : seatNumberTypePrev
                    });
                    break
                }
            }
            for (let i = 0; i < flightsListSeatDetailCopy[screenFlight-1].length; i++){
                if(seatNumberPrev===seatNumber){
                    break
                }
                //search index in loop row
                const seatIndex =  flightsListSeatDetailCopy[screenFlight-1][i].findIndex(item => item.seatNumber === seatNumber);
                if(seatIndex!==-1){
                    flightsListSeatDetailCopy[screenFlight-1][i].splice(seatIndex, 1, newSeat);
                    break
                }
            }
           
            this.setState({
                screenPassengers: screenPassengers < totalPassengersForFacilities ?         
                    screenPassengers+1 : screenPassengers,
                flightsListSeatDetail: flightsListSeatDetailCopy
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
                setTimeout(() => {
                    this.setState({
                        screenFlight: screenFlight+1, //change for return flight
                        screenPassengers:1,
                    })
                },1000)
            }
        }else if(screenFlight===2){ //roundtrip
            pricePerPassengers =  travelerDetailList[index].returnFlight.price
            baggagePrevious = travelerDetailList[index].returnFlight.baggage
            seatNumberTypePrevious = travelerDetailList[index].returnFlight.seatNumberType
            seatNumberPrevious = travelerDetailList[index].returnFlight.seatNumber

            if(seatNumberPrevious!==seatNumber){
                BASE_SEAT_PRICE.map((priceData,index) => {
                    if(priceData.seatNumberType===seatNumberTypePrevious){
                      pricePerPassengers -= priceData.price
                    }
                    if(priceData.seatNumberType===seatNumberType){
                      pricePerPassengers += priceData.price
                    }
                  })
            }

            const newDataTraveler = {
                id:screenPassengers,
                returnFlight:{
                    baggage: baggagePrevious,
                    seatNumber,
                    seatNumberType,
                    price: pricePerPassengers
                }
            }
            this.props.doUpdateTraveler(newDataTraveler) //update seat number and seat types
            this.props.addBaggageSeatType(newDataTraveler) //update price
            const newSeat = {
                seatNumber,
                seatColor:'red',
                seatNumberType
            }
            const flightsListSeatDetailCopy = flightsListSeatDetail
            //loop column        
            for (let i = 0; i < flightsListSeatDetailCopy[screenFlight-1].length; i++){
                //search index in loop row -> find previous red color before
                seatNumberPrev = travelerDetailList[screenPassengers-1]['returnFlight'].seatNumber
                seatNumberTypePrev = travelerDetailList[screenPassengers-1]['returnFlight'].seatNumberType

                if(seatNumberPrev===seatNumber){
                    break
                }
                const previousSeatIndex = flightsListSeatDetailCopy[screenFlight-1][i].findIndex(item => item.seatNumber === seatNumberPrev);
                if(previousSeatIndex!==-1 ){
                    //change the previous chosen to default color 
                    flightsListSeatDetailCopy[screenFlight-1][i].splice(previousSeatIndex, 1, {
                       seatNumber : seatNumberPrev,
                       seatColor : seatNumberTypePrev==='greenZone'? COLOR.green : COLOR.
                                  lightblue,
                       seatNumberType : seatNumberTypePrev
                    });
                    break
                }
            }
            for (let i = 0; i < flightsListSeatDetailCopy[screenFlight-1].length; i++){
                if(seatNumberPrev===seatNumber){
                    break
                }
                //search index in loop row
                const seatIndex =  flightsListSeatDetailCopy[screenFlight-1][i].findIndex(item => item.seatNumber === seatNumber);
                if(seatIndex!==-1){
                    //update
                    flightsListSeatDetailCopy[screenFlight-1][i].splice(seatIndex, 1, newSeat);
                    break
                }
            }

            this.setState({
                screenPassengers: screenPassengers < totalPassengersForFacilities ?  screenPassengers+1 : screenPassengers,
                flightsListSeatDetail: flightsListSeatDetailCopy
            })
            
            if(screenPassengers===totalPassengersForFacilities){
             //FINISH
             this.setState({
                finishChoosingStatus:true,
               })
            setTimeout(() => {
                this.props.navigation.goBack()
            },1300)
            }
        }
        
    }

    render() { 
        const { totalPassengersForFacilities, screenFlight, screenPassengers, finishChoosingStatus, flightsListSeatDetail, seatRowGroup } = this.state
        const { flightsSearchInfo, flightsChosen, travelerDetailList } = this.props 

        console.log('travelerDetailList ',travelerDetailList)
        console.log('screen flight ',screenFlight)
        console.log('screen passenger ',screenPassengers)
        return (
            <>
            <FlightsHeader flightsSearchInfo={flightsSearchInfo} header='BookSeatReservation' {...this.props}/>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Seat Layout </Text>
                <View style={styles.seatDescriptionContainer}>
                    <View style={{alignItems:'center'}}>
                        <View style={styles.seatDescription}>
                            <View style={[styles.seatBox,{ backgroundColor:COLOR.green,}]}></View>
                            <Text style={styles.miniText}>Green Zone</Text>
                        </View>
                        <Text style={styles.miniText}>+Rp 100000</Text>
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
                <Tab.Navigator
                initialRouteName="Coba"
                screenOptions={{
                    tabBarLabelStyle: { 
                        fontSize: 15,
                        color:'white',
                        bottom:5
                    },
                    tabBarStyle: { 
                        backgroundColor: COLOR.main,
                        height:40,
                    },
                    tabBarIndicatorStyle:{
                        borderBottomColor:'white',
                        borderBottomWidth: 2.5,
                    },
                    tabBarPressColor:'rgba(255,255,255,0.2)',
                    headerShown: false,
                }}
                style={{
                    height:'100%',
                    width:'90%',
                    marginTop:20,
                }}
                initialLayout={{width: Dimensions.get('window').width}} 
                >
                {
                 flightsChosen.map((flight, index) => {
                    const flightIdx = index + 1
                    return (
                    <Tab.Screen 
                        key={index} 
                        name={"Flight"+flightIdx} 
                        options={{
                            title:flight.fromAirportCode+' -> '+flight.toAirportCode
                            }}
                        children={(props) => 
                            <Flight 
                                screenPassengers = {screenPassengers} 
                                screenFlight = {screenFlight}
                                indexFlight = {index}
                                flight = {flight} 
                                typeFlight = {index===0 ? 'departureFlight' : 'returnFlight'} 
                                title = {index===0 ? 'departure' : 'return'}
                                finishChoosingStatus = {finishChoosingStatus}
                                totalFlights = {flightsChosen.length}
                                flightsListSeatDetail = {flightsListSeatDetail}
                                travelerDetailList = {travelerDetailList}
                                seatRowGroup = {seatRowGroup}
                                seatList = {flightsListSeatDetail[index]}
                                chooseSeatHandler = {(seatNumber,seatNumberType) => this.chooseSeatHandler(seatNumber,seatNumberType)}
                                changeScreen = {(row, column) => this.changeScreen(row, column)}
                                totalPassengersForFacilities = {totalPassengersForFacilities} 
                                {...props}
                            />
                    }/>
                    )
                })   
                }
                </Tab.Navigator>
            </View>
            </>
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
  flightsScreen:{
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  headerAirline:{
    width:200,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    top:-15,
    position:'absolute',
    zIndex:1,
    backgroundColor:COLOR.main
 },
  flightsSeatContainer:{
    paddingHorizontal:10,
    paddingTop:10,
    marginTop:20,
    flex:1,
    borderWidth:3,
    borderColor:COLOR.main,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
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
    paddingHorizontal:10,
    marginBottom:7
  },
  chosenSeatRowContainer:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'flex-start',
      marginTop:10,
  },
  chosenSeatBox:{
      height:50,
      width:50,
      borderWidth:1,
      borderColor:COLOR.secondary,
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center',
      marginHorizontal:10,
      zIndex:1
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
  
  
})


// seatColumnGroup.map((data,index)=> {
//     const seatNumber = data+'-'+item
//     let seatColor = ''
//     let seatNumberType = ''
//     if(greenZone.includes(seatNumber)){
//         seatColor=COLOR.green
//         seatNumberType='greenZone'
//     }else if(regularZone.includes(seatNumber)){
//         seatColor=COLOR.lightblue
//         seatNumberType='regularZone'
//     }else{
//         seatColor=COLOR.gray
//         seatNumberType='sold'
//     }

//     if(screenFlight===1){ //departure
//         travelerDetailList.map((data,index) => {
//             if(data['departureFlight']['seatNumber']===seatNumber){
//                 seatColor=COLOR.red
//             }
//         })
//     }else if(screenFlight===2){ //return
//         travelerDetailList.map((data,index) => {
//             if(data['returnFlight']['seatNumber']===seatNumber){
//                 seatColor=COLOR.red
//             }
//         })
//     } 

    // if (data==='MID') return <View key={index} style={{width:50}}></View>
    // return <Button
    //     key={index}
    //     title={seatNumber}
    //     containerStyle={{
    //         margin:5,
    //         borderRadius:10
    //     }}
    //     buttonStyle={{
    //         backgroundColor:seatColor,
    //         width:50,
    //         height:50
    //     }}
    //     onPress={() => {
    //         console.log('finishChoosingStatus',finishChoosingStatus)
    //         if(seatNumberType!=='sold' && !finishChoosingStatus){
    //             // console.log('type',seatNumberType)
    //             this.chooseSeatHandler(seatNumber,seatNumberType)
    //         }
    //     }}
    //     background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.3))', false)}
    // /> 
// })