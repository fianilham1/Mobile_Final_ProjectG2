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

class FillDetails2 extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            travelerDetailList:[],
            flightChosen:[],
            travelInsurance:false,
            covid19Insurance:false,
            flightDelayInsurance:false,
            baggageLossProtection:false,
            travelerListForFacilities:[], //for temporary only, not include infant
        }
    }


    componentDidMount(){
        const { travelerDetailList, flightChosen } = this.props.route.params
        this.setState({
            travelerDetailList,
            flightChosen
        })
        const travelerListForFacilities = travelerDetailList.map((data, index)=>{
            if (data.personClass!=='infant') return {
                ...data
            }
        })
        this.setState({
            travelerListForFacilities
        })
      console.log('cek tanpa infant',travelerListForFacilities)

    }

    componentDidUpdate(){

    }

    addInsurance = (insurance) => {
        this.setState({
            [insurance]:!this.state[insurance]
        })
    }

    render() { 
        const { travelerListForFacilities, flightChosen  } = this.state
        const { flightsSearchInfo, loggedUserProfile } = this.props       

        return (
            <SafeAreaView style={{flex: 1}}>
            <FlightsHeader flightsSearchInfo={flightsSearchInfo} header='Book2FillDetails2' {...this.props}/>
            
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
                            <MaterialIcon 
                            name='work-outline'
                            size={35}
                            color='gray'
                            style={{marginRight:15}}
                            />
                            <View style={styles.baggageNote}>
                                <Text style={styles.text}>Baggage</Text>
                                <Text style={styles.miniText}>You can bring 20 kg baggage per passengers</Text>
                                <Text style={styles.miniText}>Need more? Tap Here</Text>
                            </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                          activeOpacity={0.7}
                          onPress={() => this.props.navigation.navigate('BookSeatReservation',{
                            travelerListForFacilities,
                            flightChosen
                          })}
                          style={styles.detail}>
                            <MaterialIcon 
                            name='airline-seat-recline-normal'
                            size={35}
                            color='gray'
                            style={{marginRight:15}}
                            />
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
                            title='Travel Insurance'
                            checked={this.state.travelInsurance}
                            onPress={() => this.addInsurance('travelInsurance')}
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
                    </View>
                    <View style={styles.detailCheckbox}>
                        <CheckBox
                            title='Covid19 Insurance'
                            checked={this.state.covid19Insurance}
                            onPress={() => this.addInsurance('covid19Insurance')}
                            containerStyle={styles.checkbox}
                        />
                        <View style={styles.insuranceNote}>
                            <Text style={styles.mediumText}>Coverage For Covid19</Text>
                            <Text style={styles.miniText}>Covers Up To Rp1.000.000</Text>
                        </View>
                    </View>
                    <View style={styles.detailCheckbox}>
                        <CheckBox
                            title='Flight Delay Insurance'
                            checked={this.state.flightDelayInsurance}
                            onPress={() => this.addInsurance('flightDelayInsurance')}
                            containerStyle={styles.checkbox}
                        />
                        <View style={styles.insuranceNote}>
                            <Text style={styles.mediumText}>Coverage For F;ight Delay</Text>
                            <Text style={styles.miniText}>Covers Up To 100% flight ordered price</Text>
                        </View>
                    </View>
                    <View style={styles.detailCheckbox}>
                        <CheckBox
                            title='Baggage Loss Protection'
                            checked={this.state.baggageLossProtection}
                            onPress={() => this.addInsurance('baggageLossProtection')}
                            containerStyle={styles.checkbox}
                        />
                        <View style={styles.insuranceNote}>
                            <Text style={styles.mediumText}>Coverage For Baggage Loss</Text>
                            <Text style={styles.miniText}>Covers Up To Rp5.000.000</Text>
                        </View>
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
 
export default connect(mapStateToProps, null)(FillDetails2);

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
    minHeight:100,
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
    marginVertical:3
    }
  
})