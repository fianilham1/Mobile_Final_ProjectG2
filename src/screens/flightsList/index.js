import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Image,
    TouchableNativeFeedback} from 'react-native';
import { COLOR } from '../../constant/color';
import {connect} from "react-redux";
import flightsApi from '../../api/flights';
import { FlightsHeader } from '../../components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ListItem } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { AIRPORT_LITS } from '../../constant/airport';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


class FlightsList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          departureFlightList:[],
          returnFlightList:[],
          flightChosen:[],
          isRoundTrip:false,
          apiLoading:false,
          finishGetApiResponse:false,
          isFlightsAvailable:false
        }
        this.baseState = this.state
    }

    getAirportName = (airport) => {
        const code = this.getAirportCode(airport)
        const index = AIRPORT_LITS.findIndex(item => item.code === code);
        return AIRPORT_LITS[index].name
    }

    getAirportCity = (airport) => {
        return airport.split(' - ')[0]
    }

    getAirportCode = (airport) => {
        return airport.split(' - ')[1]
    }

    getFlightsDateFormatArr = (dataTime) => { //split day date month_shortname year to array
        const dateTimeArr = dataTime.split(' ') //split date and time
        const dateArr = dateTimeArr[0].split('-') //split year month date
        const date = new Date(parseInt(dateArr[0]),parseInt(dateArr[1])-1,parseInt(dateArr[2])) //to display name of day, name of month
        const dateStr = date.toDateString().split(' ')
        return [dateStr[0],dateStr[1]+' '+dateStr[2],dateStr[3]] //[DAYNAME, MONTHNAME, YEAR] 
                                                                 // -> ex : ['Wed','5 Sep','2021]
    }

    getFlightsTimeFormatHHMM = (dataTime) => { //display hour and minutes
        const dateTimeArr = dataTime.split(' ') //split date and time
        const timeArr = dateTimeArr[1].split(':') //split hours minutes second
        return timeArr[0]+':'+timeArr[1] //HOURS:MINUTES -> ex : 08:00
    }

    getDateFormat = (dateInput) => {
        let month = dateInput.getMonth()+1
        let date = dateInput.getDate()
        if (month<10){
            month = '0'+month
        }
        if (date<10){
            date = '0'+date
        }
        return dateInput.getFullYear()+'-'+month+'-'+date
    }

    componentDidMount(){
        const { flightsSearchInfo } = this.props
        if(flightsSearchInfo.returnDate){
            this.setState({
                isRoundTrip:true
            })
        }
        const flightsRequest = {
            fromAirport:flightsSearchInfo.fromAirport,
            toAirport:flightsSearchInfo.toAirport,
            departureDate:this.getDateFormat(flightsSearchInfo.departureDate),
            returnDate:flightsSearchInfo.returnDate ? this.getDateFormat(flightsSearchInfo.returnDate) : '',
            passengers:flightsSearchInfo.passengers,
            seatClass:flightsSearchInfo.seatClass,
            includeFlexibleTicket:flightsSearchInfo.includeFlexibleTicket,
            sortBy:"EarliestDeparture",
        }
        //fetch api of find flights list
        console.log('cek ',flightsRequest)
        this.getFlightsListBasedRequest(flightsRequest)
    }

    getFlightsListBasedRequest = async (flightsRequest) => {
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
                body: JSON.stringify(flightsRequest)
            })
            let json = await res.json()
            if(json){
                this.setState({
                    apiLoading:false,
                    finishGetApiResponse:true,
                })
    
                if(json.errorMessage==='No Flights Available'){
                    return this.setState({
                                isFlightsAvailable:false
                            })
                }
    
                //GET FLIGHTS SUCCESS AS REQUEST SEARCH -------------------------------->>>>>>>>>>>>
                this.setState({
                    isFlightsAvailable:true,
                    departureFlightList:json.departureflight.map((flight, index) => {
                        return {
                            ...flight,
                            departureDate:this.getFlightsDateFormatArr(flight.departureDateTime),
                            arrivalDate:this.getFlightsDateFormatArr(flight.arrivalDateTime),
                            departureTime:this.getFlightsTimeFormatHHMM(flight.departureDateTime),
                            arrivalTime:this.getFlightsTimeFormatHHMM(flight.arrivalDateTime),
                            fromAirportCity:this.getAirportCity(flight.fromAirport),
                            toAirportCity:this.getAirportCity(flight.toAirport),
                            fromAirportCode:this.getAirportCode(flight.fromAirport),
                            toAirportCode:this.getAirportCode(flight.toAirport),
                            fromAirportName:this.getAirportName(flight.fromAirport),
                            toAirportName:this.getAirportName(flight.toAirport),
                            departureDateApi:flight.departureDate //store orginal format
                        }
                    }),
                    returnFlightList:json.returnflight.map((flight, index) => {
                        return {
                            ...flight,
                            departureDate:this.getFlightsDateFormatArr(flight.departureDateTime),
                            arrivalDate:this.getFlightsDateFormatArr(flight.arrivalDateTime),
                            departureTime:this.getFlightsTimeFormatHHMM(flight.departureDateTime),
                            arrivalTime:this.getFlightsTimeFormatHHMM(flight.arrivalDateTime),
                            fromAirportCity:this.getAirportCity(flight.fromAirport),
                            toAirportCity:this.getAirportCity(flight.toAirport),
                            fromAirportCode:this.getAirportCode(flight.fromAirport),
                            toAirportCode:this.getAirportCode(flight.toAirport),
                            fromAirportName:this.getAirportName(flight.fromAirport),
                            toAirportName:this.getAirportName(flight.toAirport),
                            departureDateApi:flight.departureDate //store orginal format
                        }
                    })
                })
                console.log('success response: ',json)
            }
        }catch(error){
            console.log('error: ',error)
        }
    }

    resetState = () => {
        this.setState(this.baseState)
        const { flightsSearchInfo } = this.props
        if(flightsSearchInfo.returnDate){
            this.setState({
                isRoundTrip:true
            })
        }
    }

    chooseFlightHandler = (item) => {
        const { flightChosen, isRoundTrip } = this.state
        console.log('choose',flightChosen)
        if(isRoundTrip){
            if(flightChosen.length===0) { //departure flight
                flightChosen.push(item)
                this.setState({
                    flightChosen
                })
            }else if(flightChosen.length===1){ //return flight
                flightChosen.push(item)
                this.setState({
                    flightChosen
                })
                this.props.navigation.navigate('BookSummary',{flightChosen})
                //navigate to book summary
            }    
        }else{
            flightChosen.push(item)
            this.props.navigation.navigate('BookSummary',{flightChosen})  
        }
     
    }

    renderChosenFlight = () => {
        const { flightChosen } = this.state
        if(flightChosen.length>=1) return flightChosen.map((flight, index) => {
            if(index===0) return (
            <View key={index} style={styles.chosenFlightBox}>
                <View style={styles.chosenFlightColumn}>
                    <MaterialIcon 
                        name='flight-takeoff'
                        size={30}
                        color='gray'
                    />
                </View>
                <View style={styles.chosenFlightColumn}>
                    <View style={styles.chosenFlightRow}>
                        <Text>{flight.fromAirportCode+' - '+flight.toAirportCode+' | '}</Text>
                        <Text style={{fontWeight:'bold'}}>{flight.departureTime+' - '+flight.arrivalTime}</Text>
                    </View>
                    <View style={styles.chosenFlightRow}>
                        <Text>{flight.airlineName+' | Subtotal : '}</Text>
                        <Text style={{fontWeight:'bold'}}>{'Rp '+flight.price}</Text>
                        <Text>/pax</Text>
                    </View>
                </View>
                <TouchableOpacity 
                    onPress={() => {}}
                    style={styles.chosenFlightColumn}>
                   <Text style={{color:COLOR.lightblue}}>Change</Text>
                </TouchableOpacity>
            </View>
            )
        })

        return null
    }


    renderItemFlights = ({item,index}) => {
        return (
        <ListItem
             onPress={() => this.chooseFlightHandler(item)}
             style={{
             flexDirection:'column',
             marginVertical:10, 
             borderRadius:8}}
             containerStyle={styles.flightListBox}>
         <View style={{flexDirection:'column',flex:1}}>
           <View style={{flexDirection:'row', marginTop:30}}>
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
               <Text style={styles.pointsText}>Earn 1100 Points</Text>
             </View>
           </View>

           <View style={{flexDirection:'row',alignItems:'center',top:10}}>
            <MaterialIcon 
                name='flight'
                size={35}
                color={COLOR.lightblue}
                style={{
                    transform: [ {rotate:'45deg'} ]
                }}
                />
            <Text>{item.airlineName}</Text>
                 <Button
                    title="Detail Flight"
                    titleStyle={{fontSize:15}}
                    containerStyle={{
                       width:120,
                       left:90
                    }}
                    buttonStyle={{
                        backgroundColor:COLOR.main,
                        height:40
                    }}
                    icon={
                        <MaterialIcon 
                            name='chevron-right'
                            size={27}
                            color='#fff'
                            style={{marginRight:-10}}
                        />
                    }
                    iconRight
                    onPress={() => this.props.navigation.navigate('FlightsDetail',{
                        airlineDetail:item
                    })} 
                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.3))', false)}
                /> 
           </View>

         </View>
       </ListItem>
        );
      }

    renderMultipleFlights = (screen) => {
        const { flightsSearchInfo } = this.props
        let type = 'departureFlightList'
        if(screen>1){
            type = 'returnFlightList'
        }
        //screen === 1 -> choose departureflight
        //screen === 2 -> choose returnFlight
        return (
            <>
            <FlightsHeader screenChooseFlight={screen} flightsSearchInfo={flightsSearchInfo} header='FlightsList' {...this.props}/>
            {this.renderChosenFlight()}
            <View style={styles.flightListContainer}>
               <FlatList 
               showsVerticalScrollIndicator={false}
               data={this.state[type]}
               keyExtractor = {(item,index) => {
                   return index;
               }}
               renderItem={this.renderItemFlights}
               />
            </View>
           </>
        )
    }

    render() { 
        const { flightsSearchInfo } = this.props
        const { isRoundTrip, flightChosen, isFlightsAvailable, finishGetApiResponse } = this.state

        if(finishGetApiResponse && !isFlightsAvailable) {
            return (
                <>
                <FlightsHeader screenChooseFlight={1} flightsSearchInfo={flightsSearchInfo} header='FlightsList' {...this.props}/>
                <View style={styles.noFoundContainer}>
                    <Image 
                    style={{
                        width:250,
                        height:250
                    }}
                    source={require('../../assets/images/noAvailable_icon.png')}
                    />
                    <Text style={{
                        fontSize:22,
                        fontWeight:'bold'
                    }}>Oops</Text>
                    <Text style={{fontSize:17}}>No Flights Available</Text>
                    <Text style={{color:'gray'}}>Try to change date or airport</Text>
                </View>
                </>
            )
        }

        if(isRoundTrip) {
            return this.renderMultipleFlights(flightChosen.length+1)
        }

        return (
            <>
             <FlightsHeader screenChooseFlight={1} flightsSearchInfo={flightsSearchInfo} header='FlightsList' {...this.props}/>
             <Spinner //LOADING GET/POST API 
                visible={this.state.apiLoading}
                textContent={'Loading...'}
                textStyle={{color:'#fff'}}
            />
             <View style={styles.flightListContainer}>
                <FlatList 
                showsVerticalScrollIndicator={false}
                data={this.state.departureFlightList}
                keyExtractor = {(item,index) => {
                    return index;
                }}
                renderItem={this.renderItemFlights}
                />
             </View>
            </>
        );
    }
}

const mapStateToProps = state => ({
    flightsSearchInfo: state.flightsSearch,
    token:state.auth.token
})
 
export default connect(mapStateToProps, null)(FlightsList);

const styles = StyleSheet.create({
  noFoundContainer:{
      width:'100%',
      flex:1,
      justifyContent:'center',
      alignItems:'center'

  },
  flightListContainer:{
    justifyContent:'center',
    alignItems:'center',
    // top:50
  },
  flightListBox:{
    width:WIDTH*0.9,
    minHeight:170,
    // height:170,
    backgroundColor:'#fff',
    borderRadius:7,
    elevation:5,
    // paddingTop:-30
    // margin:10,
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
    // backgroundColor:'red',
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
  detailText:{
      color:"#fff"
  },

  chosenFlightBox:{
      flexDirection:'row',
      height:60,
      width:WIDTH,
      justifyContent:'space-evenly',
      alignItems:'center',
      paddingVertical:10
  },
  chosenFlightColumn:{
    marginHorizontal:5
  },
  chosenFlightRow:{
      flexDirection:'row'
  }

})


//backup hardcode
// flightsList:{
//     departureFlight:[
//         {
//           airlineName:'Garada',
//           code:'AAA',
//           aircraftType:'Boeing 700',
//           departureDate:['Tue','7 Sept','2021'],
//           arrivalDate:['Wed','8 Sept','2021'],
//           departureTime:'04:00',
//           arrivalTime:'05:30',
//           fromAirportCity:'Surabaya',
//           toAirportCity:'Jakarta',
//           fromAirportCode:'SUB',
//           toAirportCode:'JKTA',
//           fromAirportName:'Juanda',
//           toAirportName:'Soekarno Hatta',
//           duration:'1h 30m',
//           price:565000,
//           numberTransit:0,
//           regularZone : ['A-1','A-2','B-1','C-2'],
//           greenZone : ['B-2','C-1'],
//           sold : ['D-1','D-2']
//         },
//         {
//           airlineName:'Citilank',
//           code:'BBB',
//           aircraftType:'Boeing 700',
//           departureDate:['Tue','7 Sept','2021'],
//           arrivalDate:['Wed','8 Sept','2021'],
//           departureTime:'08:00',
//           arrivalTime:'10:30',
//           fromAirportCity:'Surabaya',
//           toAirportCity:'Jakarta',
//           fromAirportCode:'SUB',
//           toAirportCode:'JKTA',
//           fromAirportName:'Juanda',
//           toAirportName:'Soekarno Hatta',
//           duration:'1h 30m',
//           price:350000,
//           numberTransit:1,
//           regularZone : ['A-1','A-2','B-1','C-2'],
//           greenZone : ['B-2','C-1'],
//           sold : ['D-1','D-2']
//         },
//         {
//           airlineName:'Srijaya',
//           code:'CCC',
//           aircraftType:'Boeing 700',
//           departureDate:['Tue','7 Sept','2021'],
//           arrivalDate:['Wed','8 Sept','2021'],
//           departureTime:'15:20',
//           arrivalTime:'16:50',
//           fromAirportCity:'Surabaya',
//           toAirportCity:'Jakarta',
//           fromAirportCode:'SUB',
//           toAirportCode:'JKTA',
//           fromAirportName:'Juanda',
//           toAirportName:'Soekarno Hatta',
//           duration:'1h 30m',
//           price:400000,
//           numberTransit:1,
//           regularZone : ['A-1','A-2','B-1','C-2'],
//           greenZone : ['B-2','C-1'],
//           sold : ['D-1','D-2']
//         }
//     ],
//     returnFlight:[
//         {
//           airlineName:'Srijaya',
//           code:'AAA',
//           aircraftType:'Boeing 700',
//           departureDate:['Wed','8 Sept','2021'],
//           arrivalDate:['Thu','9 Sept','2021'],
//           departureTime:'04:00',
//           arrivalTime:'05:30',
//           fromAirportCity:'Surabaya',
//           toAirportCity:'Jakarta',
//           fromAirportCode:'SUB',
//           toAirportCode:'JKTA',
//           fromAirportName:'Juanda',
//           toAirportName:'Soekarno Hatta',
//           duration:'1h 30m',
//           price:565000,
//           numberTransit:0,
//           regularZone : ['A-1','A-2','B-1','C-2'],
//           greenZone : ['B-2','C-1'],
//           sold : ['D-1','D-2']
//         },
//         {
//           airlineName:'Garada',
//           code:'BBB',
//           aircraftType:'Boeing 700',
//           departureDate:['Wed','8 Sept','2021'],
//           arrivalDate:['Thu','9 Sept','2021'],
//           departureTime:'08:00',
//           arrivalTime:'10:30',
//           fromAirportCity:'Surabaya',
//           toAirportCity:'Jakarta',
//           fromAirportCode:'SUB',
//           toAirportCode:'JKTA',
//           fromAirportName:'Juanda',
//           toAirportName:'Soekarno Hatta',
//           duration:'1h 30m',
//           price:350000,
//           numberTransit:1,
//           regularZone : ['A-1','A-2','B-1','C-2'],
//           greenZone : ['B-2','C-1'],
//           sold : ['D-1','D-2']
//         },
//     ]
// },