import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    FlatList} from 'react-native';
import { COLOR } from '../../constant/color';
import {connect} from "react-redux";
import { FlightsHeader } from '../../components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ListItem } from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


class FlightsList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          flightsList:[
              {
                airlineName:'Garada',
                code:'AAA',
                aircraftType:'Boeing 700',
                departureDate:['Tue','7 Sept','2021'],
                arrivalDate:['Wed','8 Sept','2021'],
                departureTime:'04:00',
                arrivalTime:'05:30',
                fromAirportCity:'Surabaya',
                toAirportCity:'Jakarta',
                fromAirportCode:'SUB',
                toAirportCode:'JKTA',
                fromAirportName:'Juanda',
                toAirportName:'Soekarno Hatta',
                duration:'1h 30m',
                price:565000,
                numberTransit:0
              },
              {
                airlineName:'Citilank',
                code:'BBB',
                aircraftType:'Boeing 700',
                departureDate:['Tue','7 Sept','2021'],
                arrivalDate:['Wed','8 Sept','2021'],
                departureTime:'08:00',
                arrivalTime:'10:30',
                fromAirportCity:'Surabaya',
                toAirportCity:'Jakarta',
                fromAirportCode:'SUB',
                toAirportCode:'JKTA',
                fromAirportName:'Juanda',
                toAirportName:'Soekarno Hatta',
                duration:'1h 30m',
                price:350000,
                numberTransit:1 
              },
              {
                airlineName:'Srijaya',
                code:'CCC',
                aircraftType:'Boeing 700',
                departureDate:['Tue','7 Sept','2021'],
                arrivalDate:['Wed','8 Sept','2021'],
                departureTime:'15:20',
                arrivalTime:'16:50',
                fromAirportCity:'Surabaya',
                toAirportCity:'Jakarta',
                fromAirportCode:'SUB',
                toAirportCode:'JKTA',
                fromAirportName:'Juanda',
                toAirportName:'Soekarno Hatta',
                duration:'1h 30m',
                price:400000,
                numberTransit:1 
              }
          ],
          flightChosen:[],
          isRoundTrip:false
        }
        this.baseState = this.state
    }

    componentDidMount(){
        const { flightsSearchInfo } = this.props
        if(flightsSearchInfo.returnDate){
            this.setState({
                isRoundTrip:true
            })
        }
        //fetch
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
        if(flightChosen.length===1) return flightChosen.map((flight, index) => {
            return (
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
                   <Text style={styles.arrowTextUpper}>{item.duration}</Text>
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

           <View style={{flexDirection:'row',top:10}}>
            <MaterialIcon 
                name='flight'
                size={35}
                color={COLOR.lightblue}
                style={{
                    transform: [ {rotate:'45deg'} ]
                }}
                />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('FlightsDetail',{
                        airlineDetail:item
                    })} 
                    activeOpacity={0.8}
                    style={styles.buttonBox}>
                    <Text style={styles.detailText}>Detail Flight</Text>
                    <MaterialIcon 
                            name='chevron-right'
                            size={27}
                            color='#fff'
                            style={{marginRight:-10}}
                        />
                </TouchableOpacity>
           </View>

         </View>
       </ListItem>
        );
      }

    renderMultipleFlights = (screen) => {
        const { flightsSearchInfo } = this.props
        //screen === 1 -> choose departureflight
        //screen === 2 -> choose returnFlight
        return (
            <>
            <FlightsHeader screenChooseFlight={screen} flightsSearchInfo={flightsSearchInfo} header='FlightsList' {...this.props}/>
            {this.renderChosenFlight()}
            <View style={styles.flightListContainer}>
               <FlatList 
               showsVerticalScrollIndicator={false}
               data={this.state.flightsList}
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
        const { isRoundTrip, flightChosen } = this.state

        if(isRoundTrip) {
            return this.renderMultipleFlights(flightChosen.length+1)
        }

        return (
            <>
             <FlightsHeader screenChooseFlight={1} flightsSearchInfo={flightsSearchInfo} header='FlightsList' {...this.props}/>
             <View style={styles.flightListContainer}>
                <FlatList 
                showsVerticalScrollIndicator={false}
                data={this.state.flightsList}
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
    flightsSearchInfo: state.flights
})
 
export default connect(mapStateToProps, null)(FlightsList);

const styles = StyleSheet.create({
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