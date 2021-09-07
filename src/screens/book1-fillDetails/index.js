import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    FlatList} from 'react-native';
import { COLOR } from '../../constant/color';
import { ButtonApp } from '../../components';
import {connect} from "react-redux";
import { FlightsHeader } from '../../components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ListItem } from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


class FillDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
        }
    }

    componentDidMount(){
        //fetch
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

                <View style={{flexDirection:'row',top:5}}>
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
        const { flightsSearchInfo } = this.props
        const { flightChosen } = this.props.route.params
        let totalPrice = 0
        flightChosen.map((flight,index) => {
          totalPrice += flight.price
        })
        return (
            <>
            <FlightsHeader flightsSearchInfo={flightsSearchInfo} header='Book1-FillDetails' {...this.props}/>
            <View style={styles.flightListContainer}>
                <FlatList 
                showsVerticalScrollIndicator={false}
                horizontal
                data={flightChosen}
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
 
export default connect(mapStateToProps, null)(FillDetails);

const styles = StyleSheet.create({
  flightListContainer:{
    justifyContent:'center',
    alignItems:'center',
    flex:1
    // top:50
  },
  flightListBox:{
    width:WIDTH*0.9,
    minHeight:170,
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
  
})