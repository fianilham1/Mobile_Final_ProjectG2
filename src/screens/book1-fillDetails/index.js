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
import { ListItem, Button } from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const BASE_TRAVELERDETAIL = {
  id:0,
  title:'',
  name:'',
  nationality:'Indonesia',
  personClass:'',
  birthDate:'',
  departureflight:{
    baggage:0,
    seatNumber:'',
    seatNumberType:''
  },
  returnflight:{
    baggage:0,
    seatNumber:'',
    seatNumberType:''
  }
}


class FillDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            travelerDetailList:[],
            adult:0,
            child:0,
            infant:0,
            flightChosen:[]
        }
    }

    componentDidMount(){
        const { flightsSearchInfo } = this.props
        const { passengers } = flightsSearchInfo
        const { flightChosen } = this.props.route.params
        this.setState({
          flightChosen
        })
        // let adult = passengers.adult
        // let child = passengers.child
        // let infant = passengers.infant
         let adult = 1
        let child = 0
        let infant = 1
        const travelerDetailList = []

        adult!==0 && new Array(adult).fill().map((data,index) => {
          travelerDetailList.push({
                ...BASE_TRAVELERDETAIL,
                id:index+1,
                personClass:'adult'
            })
        })

        child!==0 && new Array(child).fill().map((data,index) => {
          travelerDetailList.push({
                ...BASE_TRAVELERDETAIL,
                id:index+1+adult,
                personClass:'child'
            })
        })

        infant!==0 && new Array(infant).fill().map((data,index) => {
          travelerDetailList.push({
                ...BASE_TRAVELERDETAIL,
                id:index+1+adult+child,
                personClass:'infant'
            })
        })

        setTimeout(() => {
            this.setState({
              travelerDetailList
            })
        },100)

    }

    componentDidUpdate(){
      const travelerDetailList = this.state.travelerDetailList
      const travelerDetailEdit = this.props.route.params?.travelerDetailEdit
      console.log('update EDIT',travelerDetailEdit)

      if(travelerDetailEdit){
        const idTravelerEdit = travelerDetailEdit?.id
        
        const index = travelerDetailList.findIndex(item => item.id === idTravelerEdit);
        travelerDetailList.splice(index, 1, travelerDetailEdit);
      
        this.setState({
          travelerDetailList
        })
        this.props.navigation.setParams({
          travelerDetailEdit:null
        })
      }

      // console.log('idx',idx)

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

    render() { 
        const { travelerDetailList, flightChosen} = this.state
        const { flightsSearchInfo, loggedUserProfile } = this.props
       

        return (
            <SafeAreaView style={{flex: 1}}>
            <FlightsHeader flightsSearchInfo={flightsSearchInfo} header='Book1FillDetails' {...this.props}/>
            <View style={styles.background}></View>
            <View style={styles.flightListContainer}>
                <Text style={{color:'#fff'}}>Tab to See The Product's Detail</Text>
                <FlatList 
                showsHorizontalScrollIndicator={false}
                horizontal
                data={flightChosen}
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
                <View style={styles.loggedUserContainer}>
                    <Image 
                        source={{uri:loggedUserProfile?.image }}
                        style={styles.userImage}
                    />
                    <View>
                        <Text style={styles.text}>{'Logged In As '+loggedUserProfile?.name} </Text>
                        <Text style={styles.miniText}>{'via '+loggedUserProfile?.tokenType}</Text>
                    </View>
                    
                </View>
                <View style={styles.contactDetailContainer}>
                    <Text style={styles.headerDetailTitle}>Contact Detail (For E-ticket/Voucher)</Text>
                    <View style={styles.contactDetail}>
                        <Text style={styles.text}>{loggedUserProfile?.name.toUpperCase()}</Text>
                        <View style={styles.contactDetailEmailPhone}>
                            <Text style={styles.miniText}>{loggedUserProfile?.username}</Text>
                            <Text style={styles.miniText}>{loggedUserProfile?.phone}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.travelerDetailContainer}>
                    <Text style={styles.headerDetailTitle}>Traveler Detail </Text>
                    { travelerDetailList.map((data,index) => {
                        return (
                        <TouchableOpacity 
                          activeOpacity={0.7}
                          onPress={() => this.props.navigation.navigate('TravelerDetail',{
                            travelerDetail:data
                          })}
                          key={index} style={styles.travelerDetail}>
                            <MaterialIcon 
                            name='person'
                            size={35}
                            color='gray'
                            style={{marginRight:15}}
                            />
                            <Text>{data?.name? data?.name : '1 '+data?.personClass+'*'}</Text>
                        </TouchableOpacity>
                        )
                    })
                    }
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
                        if(!data.name) {
                          checkEmptyData += 1
                        }
                      })
                      if(checkEmptyData>0) return Alert.alert('Alert!','Fill All Travelers Data')

                        this.props.navigation.navigate('Book2FillDetails2',{
                          travelerDetailList,
                          flightChosen
                        })
                    }}
                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.3))', false)}
                /> 
            </ScrollView>   
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    flightsSearchInfo: state.flights,
    loggedUserProfile: state.auth.loggedUserProfile

})
 
export default connect(mapStateToProps, null)(FillDetails);

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
    marginHorizontal:5
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

  loggedUserContainer:{
    height:60,
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:15
  },
  userImage:{
      width:40,
      height:40,
      borderRadius:20,
      backgroundColor:COLOR.gray,
      marginRight:15
  },
  headerDetailTitle:{
    marginBottom:10
  },
  contactDetailContainer:{
    paddingHorizontal:10,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignContent:'flex-start',
    marginTop:25
  },
  contactDetail:{
      backgroundColor:'#fff',
      height:60,
      width:'100%',
      paddingVertical:10,
      paddingHorizontal:15,
      borderRadius:5
  },
  contactDetailEmailPhone:{
    flexDirection:'row',
  },
  text:{
    fontSize:16, 
  },
  miniText:{
    fontSize:14, 
    color:'gray',
    marginRight:10
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