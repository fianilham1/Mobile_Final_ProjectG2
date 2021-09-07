import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import {
    Text,
    View,
    ScrollView, 
    Alert,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    BackHandler} from 'react-native';
import {connect} from "react-redux";
import {storeUserForgotPass} from '../../reducers/actions/auth';
import {InputApp, ButtonApp} from '../../components';
import { COLOR} from '../../constant/color';
import { SQLiteContext } from '../../config/sqlite';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import userApi from '../../api/user';
import {ValidateRegexEmail, ValidateRegexPassword} from '../../util/method/regex'

const WIDTH = Dimensions.get('window').width

class ResetPass extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            password:'',
            confirm:'',
            isFocusPassword:false,
            isFocusConfirm:false,
            validPassword:true,
            validConfirm:true,
            visible:false,
            errorMessagePassword:''
         }
    }

    backAction = async () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => {
                this.props.storeUserForgotPass(
                    {
                    username:null,
                    token:null,
                    tokenType:null
                    }
                )
                this.props.navigation.navigate('Login')
            } }
        ]);
        return true;
      };

    componentDidMount(){
        this.props.goToScreen(3)
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
          );
    }

    componentWillUnmount() {
        this.backHandler.remove();
      }

      setVisibleToggle = () => {
        this.setState({
            visible:!this.state.visible
        })
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
        validPassword:true,
        validConfirm:true,
       })
    }

    submitHandler = async () => {
        const regexPassword = ValidateRegexPassword(this.state.password)
        if(!regexPassword.status){ //check regex password requirement
                return this.setState({
                    validPassword:false,
                    errorMessagePassword:regexPassword.errorMessage
                })
            }
            if(this.state.password!==this.state.confirm){
                return this.setState({
                    validConfirm:false,
                    })
            }
            this.setState({
                forgotPassLoading:true
            })
            try{
                let res = await fetch(userApi+'/forgotPassword/reset',{
                    method: 'POST',
                    mode:'no-cors',
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: this.props.token
                    },
                    body: JSON.stringify({
                        username: this.props.forgotPassUsername,
                        password: this.state.password
                    })
                })
                let json = await res.json()
                if(json){
                    this.setState({
                        forgotPassLoading:false
                    })
        
                    //Reset Password SUCCESS
                    this.props.navigation.navigate('Login')
                    console.log('success response: ',json)
                }
            }catch(error){
                console.log('error: ',error)
            }
    }

    render(){
        const {navigation} = this.props
        return(
            <SafeAreaView style={{flex:1, backgroundColor:COLOR.main}}>
            <Spinner //LOADING FORGOT PASS API 
                visible={this.state.forgotPassLoading}
                textContent={'Loading...'}
                textStyle={{color:'#fff'}}
            />
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{backgroundColor:"#FFF",height:"100%"}}>
                <View>

                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View 
                    style={styles.imageBox}>
                        <View>
                            <Image 
                            style={styles.image}
                            source ={require('../../assets/images/lock-icon.png')}
                            />
                            <View style={styles.icon}>
                            <FontAwesomeIcon 
                                name='check'
                                size={25}
                                color={COLOR.main}
                                style={{color:COLOR.main}}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                    
                <View style={{
                   justifyContent:'center',
                   alignItems:'center'
                }}>
                <Text
                 style={styles.note}
                >Your New Password Must be Different</Text>
                <Text
                 style={styles.note}
                >From Previosuly Used Password</Text>
               </View>

                <InputApp 
                    state={this.state}
                    label="New Password"
                    name="Password"
                    color={COLOR.main}
                    valid={this.state.validPassword}
                    setFocus={this.setFocus}
                    setValue={this.setValue}
                    secureTextEntry={true}
                    errorMessage={this.state.errorMessagePassword}
                    visible={this.state.visible}
                    visibleToggle={this.setVisibleToggle}
                    icon="lock"/>

                <InputApp 
                    state={this.state}
                    label="Confirm Password"
                    name="Confirm"
                    color={COLOR.main}
                    valid={this.state.validConfirm}
                    setFocus={this.setFocus}
                    setValue={this.setValue}
                    secureTextEntry={true}
                    visible={this.state.visible}
                    visibleToggle={this.setVisibleToggle}
                    icon="lock"/>

                <ButtonApp 
                    label="Send"
                    color={COLOR.secondary}
                    handler={this.submitHandler}
                />
               
                </View>               
            </ScrollView>
            </SafeAreaView>
        )
    }
}


const mapStateToProps = state => ({
    forgotPassUsername: state.auth.forgotPassUsername,
    token:state.auth.token
})

const mapDispatchToProps = dispatch => ({
    storeUserForgotPass: data => dispatch(storeUserForgotPass(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPass);


const styles = StyleSheet.create({
    imageBox:{
        justifyContent:'center',
        alignItems:'center',
        height:200,
        width:200,
        borderRadius:100,
        // backgroundColor:'#E8F6FF',
        marginBottom:50
    },
    image:{
        width:90,
        height:107.5,
    },
   icon:{
    position:'absolute',
    bottom:-15,
    right:-15,
    backgroundColor:'white',
    height:40,
    width:40,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
   },
    note:{
        fontSize:17,
        fontFamily:"SemiBold",
        marginHorizontal:35
    } 
})