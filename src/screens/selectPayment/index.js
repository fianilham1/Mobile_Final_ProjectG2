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
import { selectPaymentMethod } from '../../reducers/actions/price';
import { FlightsHeader } from '../../components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { ListItem, Button } from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const BANK = [
    {
        name:'BNI',
        image:require('../../assets/images/BNI_logo.png'),
        style:{
            width:56,
            height:18
        }
    },
    {
        name:'BRI',
        image:require('../../assets/images/BRI_logo.png'),
        style:{
            width:72,
            height:17
        }
    },
    {
        name:'BCA',
        image:require('../../assets/images/BCA_logo.png'),
        style:{
            width:56,
            height:18
        }
    },
    {
        name:'Mandiri',
        image:require('../../assets/images/Mandiri_logo.png'),
        style:{
            width:56,
            height:18
        }
    },
]

const TRAVELSAT_PAY = {
    name:'Travelsay-Pay',
    image:require('../../assets/images/travelsaypay_logo.png'),
    style:{
        height:30,
        width:30,
        marginRight:20
    }
}

class SelectPayment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }


    render() { 
        const { loggedUserProfile } = this.props
        return (
            <SafeAreaView style={{flex: 1}}>
            <FlightsHeader header='SelectPayment' {...this.props}/>
            <ScrollView 
                style={{
                    flex:1}}
                showsVerticalScrollIndicator={false}>
                <View style={styles.paymentContainer}>
                    <Text style={styles.headerTitle}>Virtual Account</Text>
                    {
                        BANK.map((data, index) => {
                            return <TouchableOpacity 
                            key={index}
                            activeOpacity={0.5}
                            style={[styles.payment,{
                                paddingLeft:20,
                            }]}
                            onPress={() => {
                                this.props.selectPaymentMethod(data) 
                                this.props.navigation.goBack()
                            }}>
                            <Image 
                                style={data.style}
                                source={data.image}
                            />
                            <Text style={[styles.text,{
                                position:'absolute',
                                left:125
                            }]}>{data.name+' Virtual Account'}</Text>
                        </TouchableOpacity>
                        })
                    }
                </View>
                <View style={styles.paymentContainer}>
                    <Text style={styles.headerTitle}>Travelsay Pay</Text>
                    <TouchableOpacity 
                        activeOpacity={0.7} 
                        style={styles.payment}
                        onPress={() => {
                            this.props.selectPaymentMethod(TRAVELSAT_PAY) 
                            this.props.navigation.goBack()
                            }}>
                        <Image 
                            style={TRAVELSAT_PAY.style}
                            source={TRAVELSAT_PAY.image}
                        />
                        <Text style={styles.text}>{TRAVELSAT_PAY.name}</Text>
                        <Text style={styles.text}>{'Rp'+loggedUserProfile.travelsayPay}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>   
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    loggedUserProfile: state.auth.loggedUserProfile,
})

const mapDispatchToProps = dispatch => ({
    selectPaymentMethod: data => dispatch(selectPaymentMethod(data)),
})
 
export default connect(mapStateToProps, mapDispatchToProps)(SelectPayment);

const styles = StyleSheet.create({
  headerTitle:{
    marginBottom:10
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
      justifyContent:'flex-start',
      height:60,
      width:'100%',
      paddingVertical:10,
      paddingHorizontal:15,
      borderRadius:5,
      marginVertical:2
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
  
})