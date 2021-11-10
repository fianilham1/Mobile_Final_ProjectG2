import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import {
    Text,
    View,
    ScrollView, 
    Alert,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    Image} from 'react-native';
import { connect } from "react-redux";
import { storeUserForgotPass } from '../../reducers/actions/auth';
import { loadingApi } from '../../reducers/actions/loading';
import { InputApp, ButtonApp } from '../../components';
import { COLOR} from '../../constant/color';
import { SQLiteContext } from '../../config/sqlite';
import userApi from '../../api/user';

const WIDTH = Dimensions.get('window').width

class SendEmail extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            userList:[],
            username:'',
            isFocusUsername:false,
            validUsername:true,
            visible:false,
            foundUsername:false,
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
        validUsername:true,
       })
    }


    ValidateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.username))
    {
        return (true)
    }
    return (false)
    }

    getUserApi = () => {
      
    }

    componentDidMount(){
        this.getUserApi()
    }

    submitHandler = async () => {
        if(!this.state.username){
            return Alert.alert('Alert','Please Enter Username')
        }
        this.props.loadingApi({status:true})
        try{
            let res = await fetch(userApi+'/forgotPassword/send',{
                method: 'POST',
                mode:'no-cors',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username
                })
            })
            let json = await res.json()
          
            if(json){
                this.props.loadingApi({status:false})
    
                if(json.errorMessage==='Username Is Not Found'){
                    return this.setState({
                                validUsername:false
                            })
                }else if(json.message==='Please Try Again, request is under process'){
                    return console.log('Please Try Again, request is under process')
                }
    
                //Request Forgot Pass SUCCESS -> Username Found
                this.props.storeUserForgotPass(
                    {
                      username:json.username,
                      token:json.token,
                      tokenType:'username-password'
                    }
                )
                this.props.navigation.replace('VerifyEmail')
                console.log('success response: ',json)
            }
        }catch(error){
            console.log('error: ',error)
        }
    }

    render(){
        const {navigation} = this.props
        return(
            <>
            <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                backgroundColor:"#fff",
                flex:1,
                borderTopLeftRadius:25,
                borderTopRightRadius:25}}>
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
                            <Text style={{fontSize:30,fontWeight:'bold',color:COLOR.main,bottom:3}}>?</Text>
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
                >Please Enter Your Username To</Text>
                <Text
                 style={styles.note}
                >Receive a Verification Code</Text>
               </View>

                <InputApp 
                    state={this.state}
                    label="Username"
                    name="Username"
                    color={COLOR.main}
                    valid={this.state.validUsername}
                    setFocus={this.setFocus}
                    setValue={this.setValue}
                    icon="envelope"
                    found={this.state.foundUsername}/>

                <ButtonApp 
                    label="Send"
                    color={COLOR.main}
                    handler={this.submitHandler}/>
               
               <TouchableOpacity
                onPress={()=>{
                    this.setState({
                        exit:true
                    })
                    navigation.goBack()
                }}
                style={{alignItems:'center', marginTop:20}}>
                    <Text 
                    style={{
                        color:COLOR.main,
                        fontSize:18,
                        fontWeight:'bold',
                        marginBottom:0
                    }}
                   >Back to Sign In</Text>
                </TouchableOpacity>
                </View>               
            </ScrollView>
            </>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    storeUserForgotPass: data => dispatch(storeUserForgotPass(data)),
    loadingApi: data => dispatch(loadingApi(data)),
})

export default connect(null, mapDispatchToProps)(SendEmail);


const styles = StyleSheet.create({
    imageBox:{
        justifyContent:'center',
        alignItems:'center',
        height:200,
        width:200,
        borderRadius:100,
        // backgroundColor:'#E8F6FF',
        marginBottom:50,
    },
   image:{
       width:94,
       height:112.5,
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
    marginHorizontal:45
    }
})