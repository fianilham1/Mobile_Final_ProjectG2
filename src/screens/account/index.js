import React, { Component } from 'react';
import {connect} from "react-redux";
import {signOut} from '../../reducers/actions/auth';
import {
    Text,
    View,
    TouchableHighlight,
    StatusBar} from 'react-native';

import { 
    Profile,
    LoginManager} from 'react-native-fbsdk-next';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//     GoogleSignin,
//     statusCodes,
//   } from '@react-native-google-signin/google-signin';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    // //Sign Out Google
    // signOutGoogle = async () => {
    //     try {
    //       await GoogleSignin.revokeAccess();
    //       await GoogleSignin.signOut();
    //       this.setState({ user: null }); // Remember to remove the user from your app's state as well
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    // //Check Signed In User Google
    // isSignedInGoogle = async () => {
    //     const isSignedIn = await GoogleSignin.isSignedIn();
    //     // this.setState({ isLoginScreenPresented: !isSignedIn });
    //   };

    logoutFacebook = () => {
        LoginManager.logOut()
        console.log('logout')
    }

    isSignedInFacebook = () => {
        return new Promise((resolve)=>{
            Profile.getCurrentProfile()
            .then((currentProfile) => {
                if (currentProfile) {
                    resolve(true)
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

    logoutApp = () => {
        if(this.isSignedInFacebook){
            this.logoutFacebook()
        }
        this.props.doLogout()
        this.storeData('@token',null)
        // if(this.isSignedInGoogle){
        //     this.signOutGoogle
        // }
    }

    storeData = async (key,value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log('error storing value async storage')
        }
      }

    render() { 
        return (  
            <View>
            <StatusBar translucent  barStyle="dark-content" backgroundColor='#fff' />
            <TouchableHighlight
             onPress={this.logoutApp}
             underlayColor="#0EA5A2"
             style={{
                marginHorizontal:55,
                alignItems:"center",
                justifyContent:"center",
                marginTop:40,
                backgroundColor:"#00716F",
                paddingVertical:10,
                borderRadius:23,
                height:45
            }}>
            <View >
            <Text 
                style={{
                    color:"white",
                    fontFamily:"SemiBold"
                }}>Sign out</Text>       
            </View>
            </TouchableHighlight>

            </View>
        );
    }
}
 
const mapDispatchToProps = dispatch => ({
    doLogout: () => dispatch(signOut())
})

export default connect(null, mapDispatchToProps)(Account);