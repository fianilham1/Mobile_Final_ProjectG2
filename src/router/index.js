import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { Component } from 'react';
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
  Find,
  Post,
  Contact,
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
import {signIn} from '../actions/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Header, ForgotPassHeader, ForgotPassPagination, AuthHeader} from '../components';
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
const BottomTab = createBottomTabNavigator()
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
          height:70,
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
              <Icon
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
          name="Find" 
          component={Find} 
          options={{
            tabBarIcon: ({focused}) => {
              return <View
              style={styles.buttonBar}>
              <Icon
                name='search'
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
                >Search</Text>
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
          name="Post" 
          component={Post} 
          options={{
            tabBarIcon: () => {
              return <ImageBackground
              source={require('../assets/images/bottomMidOval.png')}  
              style={styles.buttonMidBox}>
              <View
              style={styles.buttonMid}>
              <Icon
                name='list'
                size={24}
                color='#ffffff'
              />
              </View>
              </ImageBackground>  
            },
            tabBarButton: (props) => {
              return <TouchableOpacity {...props} />
            }
          }}/>
         <BottomTab.Screen 
          name="Contact" 
          component={Contact} 
          options={{
            tabBarIcon: ({focused}) => {
              return <View
              style={styles.buttonBar}>
               <Icon
                name='address-book'
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
                >Contact</Text>
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
              <Icon
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

// Main Component WHATSAPP.......................................................
class HomeSql extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Contacts: [],
      Chats: [],
      Calls: [],
      Status: [],
      ProfileStatus: {
        name:'My Status',
        image: this.props.loggedUserProfile.image
      }
    };
  }

  getUserApi = () => {
    if (this.props.loggedUserProfile.role === 'admin') {
      this.props.sqlite.getAllUsers('SELECT * FROM chats_user1').then((Chats) => {
        this.setState({
          Chats
        })
      }).catch((err) => {
        console.log('error get ALL chat: ',err);
      })

      this.props.sqlite.getAllUsers('SELECT * FROM calls_user1').then((Calls) => {
        this.setState({
          Calls
        })
      }).catch((err) => {
        console.log('error get ALL call: ',err);
      })

      this.props.sqlite.getAllUsers('SELECT * FROM status_user1').then((Status) => {
        this.setState({
          Status
        })
      }).catch((err) => {
        console.log('error get ALL status: ',err);
      })
    
    }else{  //end if for role user1 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      this.props.sqlite.getAllUsers('SELECT * FROM chats_user2').then((Chats) => {
        this.setState({
          Chats
        })
      }).catch((err) => {
        console.log('error get ALL chat: ',err);
      })

    this.props.sqlite.getAllUsers('SELECT * FROM calls_user2').then((Calls) => {
        this.setState({
          Calls
        })
      }).catch((err) => {
        console.log('error get ALL call: ',err);
      })

    this.props.sqlite.getAllUsers('SELECT * FROM status_user2').then((Status) => {
        this.setState({
          Status
        })
      }).catch((err) => {
        console.log('error get ALL status: ',err);
      })

    } 
   
  }

  componentDidMount(){
      this.getUserApi()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <Header {...this.props}/>
      <Tab.Navigator
       screenOptions={{
        tabBarLabelStyle: { 
          fontSize: 16,
           color:'white',
          },
        tabBarStyle: { 
          backgroundColor: '#075e54',
        },
        tabBarIndicatorStyle:{
          borderBottomColor:'white',
          borderBottomWidth: 2.5,
        },
        tabBarPressColor:'#83B0AA',
        tabBarItemStyle:{width:'auto'}
      }}
      style={{backgroundColor:'red'}}
      timingConfig={{duration:200}}
      initialLayout={{width: Dimensions.get('window').width}}
      initialRouteName='Chats'
      >
         <Tab.Screen 
          name="Camera" 
          children={(props) => <Camera {...props}/>}
          options={{
            tabBarShowLabel:false,
            tabBarIcon: () => {
             return <View style={styles.topBar}>
                <Icon
                name="camera"
                color="#fff"
                size={20}
            />
             </View>
            },
            tabBarIconStyle:{
              width:WIDTH*0.06,
            }
          }}/>
        <Tab.Screen 
          name="Chats" 
          children={(props) => <ChatsTab {...props} 
          ChatsData={this.state.Chats}/>}
          options={{
            tabBarShowLabel:false,
            tabBarIcon: () => {
             return <View style={styles.topBar}>
               <Text style={styles.topBarText}>CHATS</Text>
             </View>
            },
            tabBarIconStyle:{
              width:WIDTH*0.225,
            }
          }}/>
        <Tab.Screen 
          name="Status" 
          children={(props) => <StatusTab {...props} 
          StatusData={this.state.Status} 
          ProfileData={this.state.ProfileStatus}
          />}
          options={{
            tabBarShowLabel:false,
            tabBarIcon: () => {
             return <View style={styles.topBar}>
               <Text style={styles.topBarText}>STATUS</Text>
             </View>
            },
            tabBarIconStyle:{
              width:WIDTH*0.225,
            }
          }}/>
        <Tab.Screen 
          name="Calls" 
          children={(props) => <CallsTab {...props}  
          CallsData={this.state.Calls}/>}
          options={{
            tabBarShowLabel:false,
            tabBarIcon: () => {
             return <View style={styles.topBar}>
               <Text style={styles.topBarText}>CALLS</Text>
             </View>
            },
            tabBarIconStyle:{
              width:WIDTH*0.225,
            }
          }}/>
      </Tab.Navigator>
      </View>
    );
  }
}

class HomeTopTab extends Component {
  constructor(props) {
      super(props);
      this.state = {  }
  }
  render() { 
      return ( 
          <SQLiteContext.Consumer>
          {
              sqlite => <HomeSql {...this.props} sqlite={sqlite} />
          }
          </SQLiteContext.Consumer>
       );
  }
}


class RootStackScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          loading:true
         }
    }

    async componentDidMount(){
      await this.getToken()
      setTimeout(() => {
        this.setState({
          loading:false
        })
        },3000)
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
        token = jsonValue != null ? JSON.parse(jsonValue) : null;
        if(token){
          console.log('token UP in router:', token) 
            return this.props.doSignIn(
              {
                loggedUserProfile:'getFromAPBackend',
                token,
                tokenType:'username-password'
              }
          )
        }
      } catch(e) {
        console.log('error reading data async ')
      }
      
     
  }

  //GET user profile BackEnd
  getCurrentProfileApi = () => {
   //from backend
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
    width:50
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