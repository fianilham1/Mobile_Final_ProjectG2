import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { Component } from 'react';
import userApi from '../api/user';
import {
  Splash, 
  OnBoard,
  Login,
  Register, 
  ProfileView,
  SendEmail,
  VerifyEmail,
  ResetPassword,
  Home,
  Detail,
  FlightsSearch,
  AirportsSearch,
  FlightsList,
  FlightsDetail,
  BookSummary,
  Book1FillDetails,
  Book2FillDetails2,
  TravelerDetail,
  BookSeatReservation,
  Book3Pay,
  SelectPayment,
  BookingList,
  Account} from '../screens';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  ImageBackground,
  StatusBar} from 'react-native';
import {connect} from "react-redux";
import {signIn} from '../reducers/actions/auth';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {ForgotPassHeader, ForgotPassPagination, AuthHeader} from '../components';
import { SQLiteContext } from '../config/sqlite';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    Profile,
    AccessToken,
    AuthenticationToken} from 'react-native-fbsdk-next';
import { COLOR } from '../constant/color';

const WIDTH= Dimensions.get('window').width;

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AuthForgetPassStack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const FlightsStack = createNativeStackNavigator();
// const Tab = createMaterialTopTabNavigator();

class AuthForgetPassStackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen:1,
      }
  }

  goToScreen = screen => {
    this.setState({
      currentScreen:screen
    })
  }

  render() { 
    return ( 
      <View style={{flex:1}}>
      <StatusBar translucent backgroundColor={COLOR.main} />
      <ForgotPassHeader 
      currentScreen={this.state.currentScreen} 
      {...this.props}/>
      <ForgotPassPagination 
      currentScreen={this.state.currentScreen} 
      />
      <AuthForgetPassStack.Navigator 
      initialRouteName="SendEmail"
      screenOptions={{
        headerShown: false,
        animation:'fade_from_bottom'
      }}>

        <AuthForgetPassStack.Screen 
          name="SendEmail" 
          children={(props) => <SendEmail goToScreen={this.goToScreen} {...props} {...this.props} />}
        />
        <AuthForgetPassStack.Screen 
          name="VerifyEmail" 
          children={(props) => <VerifyEmail goToScreen={this.goToScreen} {...props} {...this.props} />}
        />
        <AuthForgetPassStack.Screen 
          name="ResetPassword" 
          children={(props) => <ResetPassword goToScreen={this.goToScreen} {...props} {...this.props} />} 
        />

      </AuthForgetPassStack.Navigator>
      </View>
     );
  }
}

class AuthStackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        eventScreen:false,
        title:[false,'Sign In'],
      }
  }

  changeScreen = () => {
    this.setState({
      eventScreen:!this.state.eventScreen,
      title:!this.state.title[0] ? [!this.state.title[0],'Sign Up'] : [!this.state.title[0],'Sign In']
    })
  }

  render() { 
    return ( 
      <View style={{flex:1 }}>
      <AuthHeader 
          title={this.state.title} 
          eventScreen={this.state.eventScreen}
          changeScreen={this.changeScreen}
          {...this.props}/>
      <AuthStack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
        <AuthStack.Screen 
          name="Login" 
          options={{
            animation:'slide_from_left'
          }}
          children={(props) => <Login 
            {...props} 
            {...this.props}  
            changeScreen={this.changeScreen}
          />} />
        <AuthStack.Screen 
          name="Register" 
          options={{
            animation:'slide_from_right'
          }}
          children={(props) => <Register 
            {...props} 
            {...this.props} 
            changeScreen={this.changeScreen}
          />} />
      </AuthStack.Navigator>
      </View>
     );
  }
}

class FlightsStackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <SafeAreaView style={{flex:1}}>
      <StatusBar translucent barStyle="light-content" backgroundColor={COLOR.main} />
      <FlightsStack.Navigator 
      initialRouteName="FlightsSearch"
      screenOptions={{
        headerShown: false,
      }}>
        <FlightsStack.Screen 
          name="FlightsSearch" 
          children={(props) => <FlightsSearch {...props} />}
        />
        <FlightsStack.Screen 
          name="FlightsList" 
          children={(props) => <FlightsList {...props} />}
          options={{
            animation:'slide_from_right'
          }}
        />
        <FlightsStack.Screen 
          name="BookSummary" 
          children={(props) => <BookSummary {...props} />}
          options={{
            animation:'slide_from_right'
          }}
        />

      </FlightsStack.Navigator>
      </SafeAreaView>
     );
  }
}


class BottomTabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      }
  }
  render() { 
    return ( 
      <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <BottomTab.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel:false,
        tabBarStyle:{
          backgroundColor:'#fff',
          borderTopLeftRadius:25,
          borderTopRightRadius:25,
          height:55,
        }
      }}>

        <BottomTab.Screen 
          name="Home" 
          component={Home} 
          options={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            tabBarIcon: ({focused}) => {
              return <View
              style={styles.buttonBar}>
              <FontawesomeIcon
                name='home'
                size={focused ? 27 : 23}
                color={focused ? '#e32f45' : '#748c94'}
              />
              {focused ? 
                <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 12,
                  position:'absolute',
                  bottom:-15
                }}
                >Home</Text>
              :
                null
              }
              </View>
            },
            tabBarButton: (props) => {
              return <TouchableOpacity 
              underlayColor="#0EA5A2"
              {...props} 
              />
            }
          }}/>
         <BottomTab.Screen 
          name="BookingList" 
          component={BookingList} 
          options={{
            tabBarIcon: ({focused}) => {
              return <View
              style={styles.buttonBar}>
               <FontawesomeIcon
                name='clipboard-list'
                size={focused ? 27 : 23}
                color={focused ? '#e32f45' : '#748c94'}
              />
              {focused ? 
                <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 12,
                  position:'absolute',
                  bottom:-15
                }}
                >My Booking</Text>
              :
                null
              }
              </View>
            },
            tabBarButton: (props) => {
              return <TouchableOpacity 
              underlayColor="#0EA5A2"
              {...props} 
              />
            }
          }}/>
         <BottomTab.Screen 
          name="Account" 
          component={Account} 
          options={{
            tabBarIcon: ({focused}) => {
              return <View
              style={styles.buttonBar}>
              <FontawesomeIcon
                name='user'
                size={focused ? 27 : 23}
                color={focused ? '#e32f45' : '#748c94'}
              />
              {focused ? 
                <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 12,
                  position:'absolute',
                  bottom:-15
                }}
                >Me</Text>
              :
                null
              }
              </View>
            },
            tabBarButton: (props) => {
              return <TouchableOpacity 
              underlayColor="#0EA5A2"
              {...props} 
              />
            }
          }}/>

      </BottomTab.Navigator>
      </SafeAreaView>
     );
  }
}


class RootStackScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          loading:true,
          userLoginTemp:{}
         }
    }

    async componentDidMount(){
      await this.getToken()
    }

    getToken = async () => {
      let token = null
      let loggedUserProfile = null
      const {loginStatus} = this.props

      console.log('loginstatus redux: ',loginStatus)
       //check Facebook sign in STATUS

        this.getCurrentProfileFacebook().then((userFacebook)=>{
          loggedUserProfile = userFacebook
          if (Platform.OS === 'ios') {
             AuthenticationToken.getAuthenticationTokenIOS()
            .then((token) => {
              console.log('token FB in router:', token)  
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
              console.log('token FB in router:', token)  
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

      //check Username, Password sign in STATUS
      try {
        const jsonValue = await AsyncStorage.getItem('@token')
        userToken = jsonValue != null ? JSON.parse(jsonValue) : null;
        if(userToken){ //if token exist
          console.log('token UP in router:', userToken.token) 
            this.getCurrentProfile(userToken)
        }else{ //if token doesnt exist -> redirect to sign in/sign up
          setTimeout(() => {
            this.setState({
              loading:false
            })
          },3000)
        }
      } catch(e) {
        console.log('error reading data async ')
      }
      
  }

  //GET user profile BackEnd
  getCurrentProfile = async (userToken) => {
    try{
        let res = await fetch(userApi+'/get/'+userToken.username,{
            method: 'GET',
            mode:'no-cors',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: userToken.token
            },
        })
        if(res.status===403){ //token exp -> forbidden : redirect to sign in/sign up
          this.storeData('@token',null)
          return this.setState({
            loading:false 
          })
        }
        let json = await res.json()
        if(json){
          this.setState({
            loading:false
          })
          const userLogin = {
            name:json.name,
            username:json.username,
            password:json.password,
            role:json.role,
            image:json.image,
            phone:json.phone,
            travelsayPay:json.travelsayPay
            }
            this.props.doSignIn(
              {
                loggedUserProfile:userLogin,
                token:userToken.token,
                tokenType:'username-password'
              }
            )
        }
    }catch(error){
        console.log('error: ',error)
    }
  }

  storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.log('error storing value async storage')
    }
  }

  //GET user profile Facebook
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


    render() { 
        return ( 
        <NavigationContainer>
          <RootStack.Navigator 
          initialRouteName="OnBoard"
          screenOptions={{
            headerShown: false,
            animation:'none'
          }}>
  
          { this.state.loading ?
              <RootStack.Screen 
              name="Splash" 
              component={Splash} />
              :
          
            !this.props.loginStatus ? 
            <>
            <RootStack.Screen 
            name="OnBoard" 
            component={OnBoard} />
            <RootStack.Screen 
              name="Auth" 
              component={AuthStackScreen} />
            <RootStack.Screen 
              name="AuthForgetPassStackScreen" 
              component={AuthForgetPassStackScreen} 
              options={{
                animation:'slide_from_bottom'
              }}/>
            </>
          :
            <>
           <RootStack.Screen 
              name="BottomTabScreen" 
              children={(props) => <BottomTabScreen {...props} loggedUserProfile={this.props.loggedUserProfile}/>}/>
            <RootStack.Screen 
              name="Detail" 
              options={{
                animation:'slide_from_right'
              }}
              children={(props) => <Detail {...props} loggedUserProfile={this.props.loggedUserProfile}/>}/>
            <RootStack.Screen 
              name="FlightsStackScreen"
              options={{
                animation:'flip'
              }} 
              children={(props) => <FlightsStackScreen {...props} loggedUserProfile={this.props.loggedUserProfile}/>}/>
            <RootStack.Screen 
              name="AirportsSearch"
              options={{
                animation:'slide_from_bottom'
              }} 
              children={(props) => <AirportsSearch {...props} />}/>
            <RootStack.Screen 
              name="FlightsDetail"
              options={{
                animation:'fade_from_bottom'
              }} 
              children={(props) => <FlightsDetail {...props} />}/>
            <RootStack.Screen 
              name="Book1FillDetails"
              options={{
                animation:'slide_from_bottom'
              }} 
              children={(props) => <Book1FillDetails {...props} />}/>
            <RootStack.Screen 
              name="Book2FillDetails2"
              options={{
                animation:'slide_from_bottom'
              }} 
              children={(props) => <Book2FillDetails2 {...props} />}/>
               <RootStack.Screen 
              name="Book3Pay"
              options={{
                animation:'slide_from_bottom'
              }} 
              children={(props) => <Book3Pay {...props} />}/>
            <RootStack.Screen 
              name="TravelerDetail"
              options={{
                animation:'fade_from_bottom'
              }} 
              children={(props) => <TravelerDetail {...props} />}/>
             
              <RootStack.Screen 
              name="BookSeatReservation"
              options={{
                animation:'slide_from_bottom'
              }} 
              children={(props) => <BookSeatReservation {...props} />}/>

              <RootStack.Screen 
              name="SelectPayment"
              options={{
                animation:'slide_from_bottom'
              }} 
              children={(props) => <SelectPayment {...props} />}/>
          
            </>
          }       
        
          </RootStack.Navigator>
        </NavigationContainer>
         );
    }
}
 
const mapStateToProps = state => ({
  loginStatus: state.auth.loginStatus,
  loggedUserProfile: state.auth.loggedUserProfile
})

const mapDispatchToProps = dispatch => ({
  doSignIn: data => dispatch(signIn(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(RootStackScreen);

const styles = StyleSheet.create({
  topBar:{
    justifyContent:'center',
    alignItems:'center'
  },
  topBarText:{
    color:'white',
    fontSize:16
  },
  buttonBar:{
    alignItems:'center',
    justifyContent:'center',
    top:-5,
    height:30,
    width:70
  },
  shadow:{
    shadowColor: '#000000',
    shadowOffset:{
      width:0,
      height:10
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5
  },
  buttonMidBox:{
    height:80,
    width:100,
    justifyContent:'center',
    alignItems:'center',
    bottom:24
  },
  buttonMid:{
    alignItems:'center',
    justifyContent:'center',
    top:-7,
    height:55,
    width:55,
    borderRadius:27.5,
    backgroundColor:'#F02A48'
  },
  menu:{
    backgroundColor:'#F02A48'
  },
})
