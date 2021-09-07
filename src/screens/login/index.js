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
    ImageBackground,
    Platform,
    TouchableNativeFeedback} from 'react-native';
import {connect} from "react-redux";
import {signIn} from '../../reducers/actions/auth';
import {InputApp, ButtonApp} from '../../components';
import { COLOR} from '../../constant/color';
import { SocialIcon } from 'react-native-elements'
import { SQLiteContext } from '../../config/sqlite';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { 
    AccessToken,
    Profile,
    LoginManager,
    AuthenticationToken} from 'react-native-fbsdk-next';
import Animated, { EasingNode } from 'react-native-reanimated';
import userApi from '../../api/user';
import { color } from 'react-native-elements/dist/helpers';
// import {
//     GoogleSignin,
//     statusCodes,
//   } from '@react-native-google-signin/google-signin';

const userList=[ 
    {
        name:'Fian',
        username:"fian1@gmail.com",
        password:"fian123@",
        role:"admin",
        image:'https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216671.5403_tunyra_n.jpg',
        phone:'+6283695765777'
    },
    {
        name:'John',
        username:"john1@gmail.com",
        password:"john123@",
        role:"staff",
        image:"https://i.pinimg.com/736x/29/a8/0b/29a80b9fdd5ff4cfc3eef5476d6740f1.jpg",
        phone:'+6285615764351'
    }]

const WIDTH = Dimensions.get('window').width

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            userList:[],
            username:'',
            password:'',
            isFocusUsername:false,
            isFocusPassword:false,
            validUsername:true,
            validPassword:true,
            visible:false,
            animationWidth:new Animated.Value(0),
            animationBorderRadius:new Animated.Value(0),
            loginStatus:this.props.loginStatus,
            loginLoading:false,
            //>>> Google Sign In :
            userInfo:{},
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
        [inputName]:value,
       })

       this.setState({
        validUsername:true,
        validPassword:true
        })
    }


    // getUserlistApi = async () => {
    // try{
    //     let res = await fetch(userApi+'/getAll')
    //     let json = await res.json()
    //     console.log(json)
    // }catch(error){
    //     console.log('error: ',error)
    // }
    // }

    componentDidMount(){
        // this.getUserlistApi()
        // GoogleSignin.configure({
        //     // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        //     webClientId: '104201280531-gecrklau2t5upbqav03ainb9a6k3hpqb.apps.googleusercontent.com', 
        //     offlineAccess: true, 
        //   });
    }

    // //Sign In Google
    // signInGoogle = async () => {
    //     try {
    //       await GoogleSignin.hasPlayServices();
    //       const userInfo = await GoogleSignin.signIn();
    //       //this.setState({ userInfo });
        
    //     //   setTimeout(() => {
    //     //     this.props.doSignIn(
    //     //       userInfo
    //     //     )
    //     //   },700)
    //     //   this.animatedLogin()
    //     } catch (error) {
    //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //           console.log('error',error.code)
    //         // user cancelled the login flow
    //       } else if (error.code === statusCodes.IN_PROGRESS) {
    //         console.log('error',error.code)
    //         // operation (e.g. sign in) is in progress already
    //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         console.log('error',error.code)
    //         // play services not available or outdated
    //       } else {
    //         console.log('error',error)
    //         // some other error happened
    //       }
    //     }
    //   };

    //   isSignedIn = async () => {
    //     const isSignedIn = await GoogleSignin.isSignedIn();
    //     this.setState({ isLoginScreenPresented: !isSignedIn });
    //   };

    // signOut = async () => {
    //     try {
    //       await GoogleSignin.revokeAccess();
    //       await GoogleSignin.signOut();
    //       this.setState({ user: null }); // Remember to remove the user from your app's state as well
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    //   //Get User Info Login Google
    //   getCurrentUserInfoGoogle = async () => {
    //     try {
    //       const userInfo = await GoogleSignin.signInSilently();
    //       this.setState({ userInfo });
    //     } catch (error) {
    //       if (error.code === statusCodes.SIGN_IN_REQUIRED) {
    //         // user has not signed in yet
    //       } else {
    //         // some other error
    //       }
    //     }
    //   };

//LOGIN FACEBOOK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    loginFacebook = async () => {
        LoginManager.logInWithPermissions(['public_profile'])
        .then((result) => {
            if (result.isCancelled) {
                console.log("Login cancelled");
              } else {
                let token = null
                let loggedUserProfile = null
                console.log(
                  "Login success with permissions: " +
                    result.grantedPermissions.toString()
                );

                setTimeout(() => {
                    this.getCurrentProfileFacebook().then((userFacebook)=>{
                        loggedUserProfile = userFacebook
                        if (Platform.OS === 'ios') {
                           AuthenticationToken.getAuthenticationTokenIOS()
                          .then((token) => {  
                                return this.props.doSignIn(
                                  {
                                    loggedUserProfile,
                                    token,
                                    tokenType:'facebook'
                                  })
                          })
                          .catch(err => console.log('error token',err))
                       } else {
                           AccessToken.getCurrentAccessToken()
                           .then((token) => {
                            return this.props.doSignIn(
                              {
                                loggedUserProfile,
                                token,
                                tokenType:'facebook'
                              })
                           })
                           .catch(err => console.log('error token',err))
                       }
                      })
                      .catch((error) => console.log('error fb',error))
                },1000)
                this.animatedButton()
                this.setState({
                    loginStatus:true
                })
              }
        }
        ).catch((error) => console.log('login error : ',error))
    }

    getCurrentProfileFacebook = () => {
        return new Promise((resolve)=>{
            Profile.getCurrentProfile()
            .then((currentProfile) => {
                if (currentProfile) {
                    resolve({
                        id:currentProfile.userID,
                        name: currentProfile.name,
                        username: currentProfile.email,
                        password:'',
                        role:'',
                        image:'',
                        phone:''
                    })
                    console.log("The current logged user is: " +
                      currentProfile.name
                      + ". His profile id is: " +
                      currentProfile.userID
                    );
                  }
                }
            )
            .catch((error) => console.log('error profile ',error))
        })
    } 
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//LOGIN USERNAME PASSWORD >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    loginUsernamePassword = async () => {
    if(!this.state.username || !this.state.password){
        return Alert.alert('Alert','Please Input Username And Password')
    }
    this.setState({
        loginLoading:true
    })
    try{
        let res = await fetch(userApi+'/signIn',{
            method: 'POST',
            mode:'no-cors',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        let json = await res.json()
        if(json){
            this.setState({
                loginLoading:false
            })

            if(json.errorMessage==='Username Is Not Found'){
                return this.setState({
                            validUsername:false
                        })
            }else if(json.errorMessage==='Password Is Invalid'){
                return this.setState({
                            validPassword:false
                        })
            }else if(json.message==='Please Try Again, request is under process'){
                return console.log('Please Try Again, request is under process')
            }

            //SIGN IN SUCCESS
                setTimeout(() => {
                    const userLogin = {
                        name:json.name,
                        username:json.username,
                        password:json.password,
                        role:json.role,
                        image:json.image,
                        phone:json.phone,
                        }
                    this.storeData('@token',json.token)
                    this.props.doSignIn(
                        {
                          loggedUserProfile:userLogin,
                          token:json.token,
                          tokenType:'username-password'
                        }
                    )
                },800)
                this.animatedButton()
                this.setState({
                    loginStatus:true
                })
                console.log('success response: ',json)
        }
    }catch(error){
        console.log('error: ',error)
    }
    }

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    getData = async (key) => {
        return new Promise((resolve) => {
            AsyncStorage.getItem(key)
            .then(jsonValue => {
                resolve(jsonValue != null ? JSON.parse(jsonValue) : null)
            })
        })
        .catch(e => console.log('error reading value async storage')) 
      }

    storeData = async (key,value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log('error storing value async storage')
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
        console.log('loadingLOGIN? ',this.state.loginLoading)
        const {navigation} = this.props
        const width = Animated.interpolateNode(this.state.animationWidth,{
            inputRange: [0, 1],
            outputRange: [WIDTH-65, 50]
        })
        const borderRadius = Animated.interpolateNode(this.state.animationBorderRadius,{
            inputRange: [0, 1],
            outputRange: [5, 30]
        })
        return(
            <SafeAreaView style={{flex:1}}>
            <Spinner //LOADING LOGIN API 
                visible={this.state.loginLoading}
                textContent={'Loading...'}
                textStyle={{color:'#fff'}}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={{bottom:20}}>
            <View style={{
                 backgroundColor:"#fff",
                 flex:1,
                 borderWidth:2,
                 borderColor:'transparent',
                 marginHorizontal:15,
                 paddingVertical:10,
                 ...styles.shadow
            }}>
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
                   SIGN IN
                </Text>
               
                <InputApp 
                    state={this.state}
                    label="Username"
                    name="Username"
                    color={COLOR.main}
                    valid={this.state.validUsername}
                    errorMessage='Username Is Not Found'
                    setFocus={this.setFocus}
                    setValue={this.setValue}
                    icon="envelope"/>

                <InputApp 
                    state={this.state}
                    label="Password"
                    name="Password"
                    color={COLOR.main}
                    valid={this.state.validPassword}
                    setFocus={this.setFocus}
                    setValue={this.setValue}
                    icon="lock"
                    visible={this.state.visible}
                    visibleToggle={this.setVisibleToggle}/>

                <ButtonApp 
                    label="SIGN IN"
                    color={COLOR.main}
                    handler={this.loginUsernamePassword}
                    animation={{
                        width,
                        borderRadius
                    }}
                    successStatus={this.state.loginStatus}/>

                <TouchableOpacity style={styles.forgetPass}
                onPress={() => this.props.navigation.navigate('AuthForgetPassStackScreen')}>
                    <Text style={styles.forgetPassText}>Forget Password ?</Text>
                </TouchableOpacity>

                <View style={styles.connect}>
                    <View style={styles.line}></View>
                    <Text style={styles.connectText}>or connect with</Text>
                </View>

                <View style={styles.socialContainer}>

                    <TouchableNativeFeedback
                    // onPress={this.loginFacebook}
                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.5)')}
                    >
                        <SocialIcon
                        title='Facebook'
                        button
                        type='facebook'
                        style={{width:120,height:50,borderRadius:5}}
                        />
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.5)')}
                    // onPress={this.signInGoogle}
                    >
                        <SocialIcon
                        title='Google'
                        button
                        type='google'
                        style={{width:120,height:50,borderRadius:5}}
                        />
                    </TouchableNativeFeedback>
                </View>
            </View>

            <Text
                 style={{
                    alignSelf:"center",
                    fontFamily:"SemiBold",
                    marginTop:25,
                }}>Not a Member?  
                <Text>  </Text>
                <TouchableOpacity
                onPress={()=>{
                    this.props.changeScreen()
                    this.props.navigation.setParams({
                        authStatus:'auth',
                        screen:'Register'
                    })
                    navigation.replace('Register')
                }}>
                    <Text 
                    style={{
                        color:COLOR.main,
                        fontSize:18,
                        fontWeight:'bold',
                        marginBottom:-5
                    }}
                   >Sign Up</Text>
                </TouchableOpacity>
                    <Text> </Text>
                    Now
                </Text>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loginStatus,
})

const mapDispatchToProps = dispatch => ({
    doSignIn: data => dispatch(signIn(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
    connect:{
        marginTop:15,
        marginBottom:5,
        justifyContent:'center',
        alignItems:'center',
    },
    connectText:{
        fontSize:17, 
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        color:'gray',
        paddingHorizontal:10
    },
    line:{
        position:'absolute',
        top:12,
        width:WIDTH-75,
        borderBottomColor:COLOR.gray,
        borderBottomWidth:2,
    },
    socialContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    forgetPass:{
        marginLeft:15,
        marginTop:5
    },
    forgetPassText:{
        color:COLOR.main,
        fontWeight:'bold',
        fontSize:16
    },
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

    //shape
})