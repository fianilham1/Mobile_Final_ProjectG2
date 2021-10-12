import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity} from 'react-native';
import { COLOR } from '../../constant/color';
import { connect } from "react-redux";
import { loadingApi } from '../../reducers/actions/loading';
import CountDown from 'react-native-countdown-component';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import { getData, storeData } from '../../util/method/asyncStorage';
import flightsApi from '../../api/flights';
import { ListItem } from 'react-native-elements'

class BookingList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      timeInSecondLeft:0,
      elapseTime:0,
      timeInSecond:0,
      bookingList:[],
      isBookingsAvailable:false,
      finishApiLoading:false,
      reRenderBookingList:false
     }
  }

componentDidMount(){
    const { paymentDurationLimit } = this.props.price
    const { loggedUserProfile, purchaseDetail } = this.props
    getData('@timer-'+loggedUserProfile.username).then((datePrev) => {
      if(datePrev!==null){
        const elapseTime = differenceInSeconds(new Date(),new Date(datePrev))
        console.log(elapseTime)
        if(elapseTime > paymentDurationLimit){
          console.log('CANCEL PAYMENT')
          storeData('@timer',null)
          this.setState({
            finishApiLoading:true
          })
        }else{
          this.setState({
            timeInSecondLeft:paymentDurationLimit-elapseTime
          })
          this.getBookingList(loggedUserProfile.username)
        }
      }
    }).catch((e) => console.log('err ',e))
  }

  // componentDidUpdate(prevState){
  //   if(prevState.reRenderBookingList!==this.state.reRenderBookingList){
  //     this.getBookingList(loggedUserProfile.username)
  //   }
  // }

  getBookingList = async (username) => {
    this.props.loadingApi({status:true})
    try{
        let res = await fetch(flightsApi+'/getBookingList/'+username,{
            method: 'GET',
            mode:'no-cors',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.props.token
            },
        })
        let json = await res.json()
        if(json){
            this.props.loadingApi({status:false})
            this.setState({
              finishApiLoading:true
            })

            if(json.errorMessage==='No Booking Available'){
                return null
            }

            //GET BOOKING LIST -------------------------------->>>>>>>>>>>>
            this.setState({
               bookingList:json,
               isBookingsAvailable:true
            })
            console.log('success response booking list: ',json)
        }
    }catch(error){
        console.log('error: ',error)
    }
}

checkPayment = async (id) => { 
  try{
      let res = await fetch(flightsApi+'/checkPayment/'+id,{
          method: 'GET',
          mode:'no-cors',
          headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: this.props.token
          },
      })
      let json = await res.json()
      if(json){
          
          //STATUS PAYMENT -------------------------------->>>>>>>>>>>>
          if(json.errorMessage==='No Payment'){
              return console.log('No Payment >>>')
          }

          this.setState({
            reRenderBookingList: !this.state.reRenderBookingList
          })

          console.log('success response: ',json)
      }
  }catch(error){
      console.log('error: ',error)
  }
}

  renderRowItem = ({item,index}) => {
    const { timeInSecondLeft, bookingList } = this.state
    const { paymentDurationLimit } = this.props.price
    const { loggedUserProfile } = this.props
    const currentDate = new Date()
    console.log('item',item)
    if(bookingList.length > 0) return (
      timeInSecondLeft === 0 ?
      null
      :
    <ListItem 
      key={index}
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => {}}>
      <View style={styles.bookingList}>
        <View 
              style={styles.booking}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <MaterialIcon 
                    name='flight'
                    size={35}
                    color={COLOR.lightblue}
                    style={{marginRight:15}}
                    />
                    <View>
                    {
                        item.flightList.map((flight, index) => {
                          const fromAirportCode = flight.fromAirport.split(' - ')[1]
                          const toAirportCode = flight. toAirport.split(' - ')[1]
                          return(
                            <View key={index} style={styles.bookingAirport}>
                              <Text>{fromAirportCode}</Text>
                              <MaterialIcon
                                  name="arrow-forward"  
                                  size={15}
                                  style={{
                                    marginHorizontal:5
                                  }}
                                />
                              <Text>{toAirportCode}</Text>
                            </View>
                          )
                        })
                    }
                    </View>
                </View>
                <Text 
                style={{
                    color:COLOR.lightblue,
                    }}>
                {
                  currentDate.toDateString()
                }
                </Text>
        </View>
        <View style={styles.countDown}>
          {
            console.log('status',item.statusPayment)
          }
          {
            item.statusPayment==='Successful' ?
            <View style={{
              backgroundColor:COLOR.green,
              padding:5
            }}>
              <Text style={{
                fontSize:18,
                color:'#fff'
              }}>E-Ticket Released</Text>
            </View>
            :
            <CountDown 
              until={timeInSecondLeft}
              onFinish={() => {}}
              size={13}
              digitStyle={{
                backgroundColor:COLOR.lightblue
              }}
              digitTxtStyle={{
                color:"#fff"
              }}
              style={{
                  // marginTop:15
              }}
              
              onChange={(timeInSecond) => {
                if (timeInSecond!==paymentDurationLimit && (timeInSecond % 60===0 || timeInSecond===0)){
                  console.log('CHECK STATUS PAYMENT =========== ',timeInSecond)
                  this.getBookingList(loggedUserProfile.username)
                  // this.checkPayment(item.purchaseId)
                }
              // console.log(timeInSecond)
              }}
            />
          }
        </View>
      </View>
    </ListItem>
    )
  }

  render() { 
    const {  isBookingsAvailable, finishApiLoading, bookingList, reRenderBookingList } = this.state
    console.log('finishApiLoading',finishApiLoading)
    console.log('isBookingsAvailable',isBookingsAvailable)
    console.log('reRenderBookingList -> ',reRenderBookingList)
    return ( 
      <View style={{flex:1}}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Booking List</Text>
          </View>
          {
            finishApiLoading ?
            isBookingsAvailable ? 
            <>
            <FlatList
              data={bookingList}
              keyExtractor = {(item,index) => {
                  return index;
              }}
              renderItem={this.renderRowItem}
            />
            </>
            :
            <View style={{
              justifyContent:'center',
              alignItems:'center',
              top:'45%'}}>
              <Text style={{
                fontSize:20
              }}>No Boooking Available</Text>
            </View>
            :
            null
          }
        
      </View>
    )
  }
}
 
const mapStateToProps = state => ({
  loggedUserProfile: state.auth.loggedUserProfile,
  price: state.price,
  purchaseDetail : state.purchaseDetail,
  token:state.auth.token
})

const mapDispatchToProps = dispatch => ({
  loadingApi: data => dispatch(loadingApi(data)),
})



export default connect(mapStateToProps,mapDispatchToProps)(BookingList);

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLOR.main,
  },
  headerTitle:{
    color:'#fff',
    fontSize:20
  },
  container:{
    marginTop:15,
    backgroundColor:'#fff',
    minHeight:100,
    elevation:5
  },
  bookingList:{
    justifyContent:'flex-start',
    alignItems:'flex-start',
    flex:1
  },
  booking:{
    justifyContent:'space-between',
    width:'100%',
    // paddingVertical:5,
    // paddingHorizontal:10,
    flexDirection:'row',
    alignItems:'center',
    borderRadius:5,
    marginBottom:10,
  },
  countDown:{
    // paddingHorizontal:10,
  },
  bookingAirport:{
    flexDirection:'row'
  },
})