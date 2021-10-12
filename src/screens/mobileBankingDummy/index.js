import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Dimensions,
    ScrollView,
    Image,
    Alert} from 'react-native';

import { connect } from "react-redux";
import { InputApp, ButtonApp } from '../../components';
import { Button } from 'react-native-elements';
import { loadingApi } from '../../reducers/actions/loading';
import { COLOR } from '../../constant/color';
import flightsApi from '../../api/flights';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

class MobileBankingDummy extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            va:'',
            price:'',
            isFocusVa:false,
            isFocusPrice:false,
         }
    }

    setFocus = name => {
        const nameFocus = `isFocus${name}`
        this.setState({
            [nameFocus]:!this.state[nameFocus]
        })
    }

    setValue = (inputName, value) => {
       this.setState({
        [inputName]:value,
       })

       this.setState({
        validUsername:true,
        validPassword:true
        })
    }

    getIdFromVA = (va) => {
        return purchaseId = va.substring(3,va.length).split('0')[0] //exclude code bank
    }

    pay = async () => {  
        const { va, price } = this.state
        this.props.loadingApi({
            status:true, 
        })
        try{
            let res = await fetch(flightsApi+'/pay',{
                method: 'POST',
                mode:'no-cors',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: this.props.token
                },
                body: JSON.stringify({
                    purchaseId:this.getIdFromVA(va),
                    va,
                    price,
                })
            })
            let json = await res.json()
            if(json){
                this.props.loadingApi({status:false})

                if(json.errorMessage==='Payment Is Invalid'){
                    return Alert.alert('ALert!!','Invalid Virtual Account Number/Price')
                }

                //PAY SUCCESS  -------------------------------->>>>>>>>>>>>
                console.log('success response: ',json)
                Alert.alert('ALert!!','Payment is Successful')
                
            }
        }catch(error){
            console.log('error: ',error)
        }
    }

    render() { 
        return ( 
            <View style={{flex:1}}>
                <View style={styles.header}>
                    <View style={styles.left} >
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <MaterialIcon
                        name="arrow-back" color="#fff" size={23}
                        style={{ paddingLeft: 10 }}
                        />
                    </TouchableOpacity>
                    </View>
                    <View style={styles.screenHeader}>
                        <Text style={styles.screenTitle}>Mobile Banking</Text>
                    </View>
                </View>
                <InputApp 
                    state={this.state}
                    label="Virtual Account Number"
                    name="Va"
                    color={COLOR.main}
                    valid={true}
                    setFocus={this.setFocus}
                    setValue={this.setValue}
                    icon="credit-card"
                    keyboardType='numeric'/>
                
                <InputApp 
                    state={this.state}
                    label="Price"
                    name="Price"
                    color={COLOR.main}
                    valid={true}
                    setFocus={this.setFocus}
                    setValue={this.setValue}
                    icon="dollar"
                    keyboardType='numeric'/>

                <Button
                    title="Pay"
                    containerStyle={{
                        marginHorizontal:50,
                        marginTop:30,
                        borderRadius:10
                    }}
                    buttonStyle={{
                        backgroundColor:COLOR.lightblue,
                        height:50
                    }}
                    onPress={() => {
                        this.pay()
                    }}
                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.3))', false)}
                /> 
            </View>
         );
    }
}
 
const mapStateToProps = state => ({
    loggedUserProfile: state.auth.loggedUserProfile,
    token:state.auth.token
})

const mapDispatchToProps = dispatch => ({
    loadingApi: data => dispatch(loadingApi(data)),
  })

 
export default connect(mapStateToProps, mapDispatchToProps)(MobileBankingDummy);

const styles = StyleSheet.create({
    header: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLOR.main,
      },
      left: {
        flexDirection: 'row',
        alignItems: 'center',
      },

      screenHeader:{
        flexDirection:'column',
        marginLeft:40
      },
      screenTitle: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 20,
      },
  });
