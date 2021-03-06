import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import {
    Text,
    View,
    Image, 
    Alert,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    StyleSheet} from 'react-native';
import {connect} from "react-redux";
import {InputApp, ButtonApp} from '../../components';
import { COLOR } from '../../constant/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { EasingNode } from 'react-native-reanimated';
import Spinner from 'react-native-loading-spinner-overlay';
import userApi from '../../api/user';
import {ValidateRegexEmail, ValidateRegexPassword} from '../../util/method/regex'

const WIDTH = Dimensions.get('window').width

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            userList:[],
            name:'',
            username:'',
            password:'',
            confirm:'',
            statusLogin:false,
            isFocusName:false,
            isFocusUsername:false,
            isFocusPassword:false,
            isFocusConfirm:false,
            validName:true,
            validUsername:true,
            validPassword:true,
            validConfirm:true,
            visible:false,
            animationWidth:new Animated.Value(0),
            animationBorderRadius:new Animated.Value(0),
            successRegister:this.props.loginStatus,
            registerLoading:false,
            errorMessagePassword:''
         }
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
        [inputName]:value
       })
       this.setState({
        validUsername:true,
        validPassword:true,
        validName:true,
        validConfirm:true
        })
    }

    registerHandler = async () => {
        if(!this.state.name || !this.state.username || !this.state.password){
            return Alert.alert('Alert','All Fields Must be Filled')
        }
       
        const regexEmail = ValidateRegexEmail(this.state.username)
        const regexPassword = ValidateRegexPassword(this.state.password)
        if(!regexEmail){ //check regex email format
            return this.setState({
                validUsername:false,
            })
       }
       if(!regexPassword.status){ //check regex password requirement
            return this.setState({
                validPassword:false,
                errorMessagePassword:regexPassword.errorMessage
            })
        }
        if(this.state.password!==this.state.confirm){ //Password is not match
            return this.setState({
                validConfirm:false
            })
        }
      
        this.setState({
            registerLoading:true
        })     
        try{
            let res = await fetch(userApi+'/signUp',{
                method: 'POST',
                mode:'no-cors',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    name:this.state.name,
                    image:'',
                    phone:'',
                    points:0
                })
            })
            let json = await res.json()
            if(json){
                this.setState({
                    loginLoading:false
                })
    
                if(json.errorMessage==='Username Is Already Exist'){
                    return this.setState({
                                validUsername:false
                            })
                }

                //SIGN UP SUCCESS
                    this.setState({
                        registerLoading:false
                    })
                    Alert.alert('Success','Sign Up Is Successful')
                    console.log('success response: ',json)
            }
        }catch(error){
            console.log('error: ',error)
        }
    }

    animatedButton = () => {
        Animated.timing(
            this.state.animationWidth,{
                toValue:1,
                duration:500,
                easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
            }
        ).start()
        Animated.timing(
            this.state.animationBorderRadius,{
                toValue:1,
                duration:500,
                easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
            }
        ).start()
    }

    render(){
        const {navigation} = this.props
        const width = Animated.interpolateNode(this.state.animationWidth,{
            inputRange: [0, 1],
            outputRange: [WIDTH-65, 50]
        })
        const borderRadius = Animated.interpolateNode(this.state.animationBorderRadius,{
            inputRange: [0, 1],
            outputRange: [5, 25]
        })
        return(
            <SafeAreaView style={{flex:1}}>
                <Spinner //REGISTER REGISTER API 
                    visible={this.state.registerLoading}
                    textContent={'Loading...'}
                    textStyle={{color:'#fff'}}
                />
                 <ScrollView  showsVerticalScrollIndicator={false} style={{bottom:20}}>
                <View style={{
                 backgroundColor:"#fff",
                 flex:1,
                 borderWidth:2,
                 borderColor:'transparent',
                 marginHorizontal:15,
                 paddingVertical:5,
                 ...styles.shadow
                }}>
               
                {/* <ImageBackground 
                    source ={require('../../images/image.jpg')}
                    style={{
                        width:"100%",
                        height:Dimensions.get('window').height/2.5,
                        marginTop:-20
                    }}/> */}
                <Text
                style={{
                    fontFamily:"SemiBold",
                    fontSize:15,
                    marginHorizontal:55,
                    textAlign:'center',
                    marginTop:0,
                    fontSize:20,
                    fontWeight:'bold'
                }}
                >
                   SIGN UP
                </Text>

                <Text
                style={{
                    fontFamily:"SemiBold",
                    fontSize:16,
                    marginHorizontal:55,
                    textAlign:'center',
                    marginTop:5,
                    opacity:0.3,
                    fontWeight:'bold'
                }}
                >
                   Create Account
                </Text>
            
                <InputApp 
                    state={this.state}
                    label="Name"
                    name="Name"
                    color={COLOR.main}
                    setFocus={this.setFocus}
                    setValue={this.setValue}
                    valid={this.state.validName}
                    icon="user"/>

                <InputApp 
                    state={this.state}
                    label="Username"
                    name="Username"
                    color={COLOR.main}
                    setFocus={this.setFocus}
                    setValue={this.setValue}
                    valid={this.state.validUsername}
                    errorMessage='Invalid Email Format'
                    icon="envelope"/>

                <InputApp 
                    state={this.state}
                    label="Password"
                    name="Password"
                    color={COLOR.main}
                    setFocus={this.setFocus}
                    setValue={this.setValue}
                    valid={this.state.validPassword}
                    errorMessage={this.state.errorMessagePassword}
                    secureTextEntry={true}
                    visible={this.state.visible}
                    visibleToggle={this.setVisibleToggle}
                    icon="lock"/>
                
                <InputApp 
                    state={this.state}
                    label="Confirm Password"
                    name="Confirm"
                    color={COLOR.main}
                    setFocus={this.setFocus}
                    setValue={this.setValue}
                    valid={this.state.validConfirm}
                    errorMessage='Password Is Not Match'
                    secureTextEntry={true}
                    visible={this.state.visible}
                    visibleToggle={this.setVisibleToggle}
                    icon="lock"/>

                <ButtonApp 
                    label="SIGN UP"
                    handler={this.registerHandler}
                    color={COLOR.secondary}
                    animation={{
                        width,
                        borderRadius
                    }}
                    successStatus={this.state.successRegister}/>
                </View>
                <Text
                 style={{
                    alignSelf:"center",
                    fontFamily:"SemiBold",
                    marginTop:25,
                }}>Already a Member?  
                <Text>  </Text>
                <TouchableOpacity
                onPress={()=>{
                    this.props.changeScreen()
                    this.props.navigation.setParams({
                        authStatus:'auth',
                        screen:'Login'
                    })
                    navigation.replace('Login')
                }}>
                    <Text 
                    style={{
                        color:COLOR.secondary,
                        fontSize:18,
                        fontWeight:'bold',
                        marginBottom:-5
                    }}
                   >Sign In</Text>
                </TouchableOpacity>
                    <Text> </Text>
                    Now
                </Text>
            </ScrollView> 
            </SafeAreaView>
        )
    }
}

// const mapStateToProps = state => ({
//     isLogin: state.auth.statusLogin,
// })

const mapDispatchToProps = dispatch => ({
    // doLogin: data => dispatch(signIn(data))
})

export default connect(null, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
      }
})


