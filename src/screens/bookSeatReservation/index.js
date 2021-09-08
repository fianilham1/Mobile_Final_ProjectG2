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
import { CheckBox, Button } from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class BookSeatReservation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            travelerListForFacilities:[],
            seatRowGroup:['A','B','MID','C','D'],
            seatColumnGroup:[1,2,3,4,5,6,7],
            screenFlight:1, //display for round trip -> each flight
            screenPassengers:1, //display for each passengers
            isRoundTrip:false,
            seatNumberChosen:{
                departureFlight:[],
                returnFlight:[]
            },
            finishChoosingStatus:false
        }
    }

    componentDidMount(){
        const { flightChosen, travelerListForFacilities } = this.props.route.params 
        console.log(this.props.route.params )
        this.setState({
            travelerListForFacilities,
        })
        if (flightChosen.length>1){
            this.setState({
                isRoundTrip:true
            })
        }
    }

    renderChosenSeat = () => {
    const { seatNumberChosen, screenFlight, isRoundTrip } = this.state
    const { travelerListForFacilities, flightChosen } = this.props.route.params

    return Object.keys(seatNumberChosen).map((key,index) => {
        return (
            <>
            <Text style={styles.headerTitle}>
            {flightChosen[screenFlight-1].airlineName} 
            </Text>
            <View key={index} style={styles.chosenSeatRowContainer}>
                {
                     seatNumberChosen[key].map((data,index) => {
                        return (
                            <View key={index} style={styles.chosenSeatBox}>
                                <View style={{
                                    backgroundColor:COLOR.secondary, 
                                    flex:1,
                                    width:'100%',
                                    justifyContent:'center',
                                    alignItems:'center'}}>
                                    <Text style={{color:'#fff'}} >{travelerListForFacilities[index].name}</Text>
                                </View>
                                <View style={{flex:1}}>
                                    <Text>{data}</Text>
                                </View>
                            </View>
                        )
                        })
                }
            </View>
        </>
        )
    })
    }

    chooseSeatHandler = (seatNumber) => {
        const { travelerListForFacilities, screenFlight, seatNumberChosen,screenPassengers, isRoundTrip } = this.state
        const totalTraveler = travelerListForFacilities.length
        const chooseSeat = seatNumberChosen
        if(screenFlight===1){ //departure
            chooseSeat['departureFlight'].push(seatNumber)
            this.setState({
                seatNumberChosen:chooseSeat,
                screenPassengers: screenPassengers+1
            })
            if(!isRoundTrip && screenPassengers===totalTraveler){
               //FINISH
               this.setState({
                finishChoosingStatus:true
               })
            }else if(isRoundTrip && screenPassengers===totalTraveler){
                this.setState({
                    screenFlight: screenFlight+1 //change for return flight
                })
            }
        }else if(screenFlight===2){ //roundtrip
            chooseSeat['returnFlight'].push(seatNumber)
            this.setState({
                seatNumberChosen:chooseSeat
            })
            if(screenPassengers===totalTraveler){
             //FINISH
             this.setState({
                finishChoosingStatus:true
               })
            }
        }
        
    }

    renderRowItem = ({item,index}) => {
        const regularZone = ['A-1','A-2','B-1','C-2']
        const greenZone = ['B-2','C-1']
        const sold = ['D-1','D-2']
        const { seatRowGroup } = this.state
        return ( //column
        <View style={styles.flightSeatRow}> 
        {
            seatRowGroup.map((data,index)=> {
                const seatNumber = data+'-'+item
                let seatColor = ''
                if(greenZone.includes(seatNumber)){
                    seatColor=COLOR.green
                }else if(regularZone.includes(seatNumber)){
                    seatColor=COLOR.lightblue
                }else{
                    seatColor=COLOR.gray
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
                        this.chooseSeatHandler(seatNumber)
                    }}
                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.3))', false)}
                /> 
            })
        }
        </View>
        ) 
    }

    render() { 
        const { screenFlight, finishChoosingStatus, seatNumberChosen, isRoundTrip } = this.state
        const { flightChosen } = this.props.route.params  
        const { flightsSearchInfo, loggedUserProfile } = this.props 


        return (
            <SafeAreaView style={{flex: 1}}>
            <FlightsHeader flightsSearchInfo={flightsSearchInfo} header='BookSeatReservation' {...this.props}/>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Seat Layout </Text>
                <View style={styles.seatDescriptionContainer}>
                    <View style={styles.seatDescription}>
                        <View style={[styles.seatBox,{ backgroundColor:COLOR.green,}]}></View>
                        <Text style={styles.miniText}>Green Zone</Text>
                    </View>
                    <View style={styles.seatDescription}>
                        <View style={[styles.seatBox,{ backgroundColor:COLOR.lightblue,}]}></View>
                        <Text style={styles.miniText}>Regular Zone</Text>
                    </View>
                    <View style={styles.seatDescription}>
                        <View style={[styles.seatBox,{ backgroundColor:COLOR.gray,}]}></View>
                        <Text style={styles.miniText}>Sold</Text>
                    </View>
                </View>
                {this.renderChosenSeat()}
                <FlatList 
                showsVerticalScrollIndicator={false}
                data={this.state.seatColumnGroup}
                keyExtractor = {(item,index) => {
                    return index;
                }}
                renderItem={this.renderRowItem}
                ListFooterComponent={
                    <Button
                    title="Save"
                    containerStyle={{
                        marginHorizontal:50,
                        marginTop:10,
                        borderRadius:10
                    }}
                    buttonStyle={{
                        backgroundColor:COLOR.secondary,
                        height:50,
                        width:200
                    }}
                    onPress={() => {
                        if(!finishChoosingStatus) return Alert.alert('Alert!','Please choose the seat for all fLights and all passengers')

                        this.props.navigation.navigate('Book2FillDetails2',{
                            seatNumberChosen
                        })
                    }}
                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.3))', false)}
                /> 
                }
                />
                
            </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    flightsSearchInfo: state.flights,
    loggedUserProfile: state.auth.loggedUserProfile

})
 
export default connect(mapStateToProps, null)(BookSeatReservation);

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:15
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
    marginBottom:10,
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
    flexDirection:'row'
  },
  chosenSeatRowContainer:{
      flexDirection:'row'
  },
  chosenSeatBox:{
      height:50,
      width:50,
      borderWidth:1,
      borderColor:COLOR.secondary,
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center'
  }
  
  
})