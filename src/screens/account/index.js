import React, { Component } from 'react';
import { connect } from "react-redux";
import { signOut } from '../../reducers/actions/auth';
import { Input } from 'react-native-elements';
import { COLOR } from '../../constant/color';
import * as ImagePicker from "react-native-image-picker";
import Modal from "react-native-modal";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {
    Text,
    View,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    StatusBar,
    TouchableNativeFeedback} from 'react-native';

import { 
    Profile,
    LoginManager} from 'react-native-fbsdk-next';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
// import {
//     GoogleSignin,
//     statusCodes,
//   } from '@react-native-google-signin/google-signin';

const WIDTH = Dimensions.get('window').width

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            filepath: {
                data: '',
                uri: ''
            },  
            fileData: '',
            fileUri: '',
            modalVisible: false,
            editProfile:'', //name or email or phone
            inputEditProfile:'' //input change text
         }
    }

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
    
      launchCamera = () => {
        const options = { 
            mediaType: 'photo',
            quality:1,
            includeBase64: true,
            maxWidth: 300,
            maxHeight: 550,
        };
        ImagePicker.launchCamera(options, (response) => {
        //   console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            // console.log('response success', JSON.stringify(response));

            const newImage = 'data:image/jpeg;base64,' +  response.assets[0].base64
        
            this.setState({
              modalVisible:!this.state.modalVisible,
            });
          }
        });
    
      }
    
      launchImageLibrary = () => {
        const options = { 
            mediaType: 'photo',
            quality:1,
            includeBase64: true,
            maxWidth: 300,
            maxHeight: 550,
        };
        ImagePicker.launchImageLibrary(options, (response) => {
        //   console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            // console.log('response success', JSON.stringify(response));
            const newImage = 'data:image/jpeg;base64,' +  response.assets[0].base64

            this.setState({
              modalVisible:!this.state.modalVisible,
            });
          }
        });
    
      }

    setValue = newData => {
        this.setState({
            inputEditProfile:newData
        })
    }

    clickModalHandler = (visible, params, save) => {
        const { loggedUserProfile } = this.props
        this.setState({ 
            modalVisible: visible,
            editProfile: params ? params : this.state.editProfile,
            inputEditProfile: params ? loggedUserProfile[params] : this.state.inputEditProfile
         });
        if (save) {
            const newImage = this.state.inputEditProfile
            // this.props.editUser(newData) //update userList 
            // this.setState({
            //     profile:newData
            // })
        }
      }

    renderEditBox = () => {
        const { modalVisible, editProfile, inputEditProfile } = this.state;
        return (
        <View>
          <Modal
            isVisible={modalVisible}
            animationIn="slideInUp"
            backdropOpacity={0.6}
            onBackdropPress={() => this.clickModalHandler(!modalVisible)}
            backdropTransitionOutTiming={0}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {editProfile==='image' ? 
                <View style={styles.btnParentSection}>
                    <TouchableOpacity onPress={this.launchCamera} style={styles.btnSection}  >
                    <Image 
                    style={{
                        height:50,
                        width:50,
                        margin:10
                    }}
                    source={require('../../assets/images/cameraAndroid.png')}/>
                    <Text>Camera</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
                    <Image 
                    style={{
                        height:60,
                        width:60,
                        margin:5
                    }}
                    source={require('../../assets/images/galleryAndroid.png')}/>
                     <Text>Gallery</Text>
                    </TouchableOpacity>
               </View>
                :
                <>
                <View>
                    <Input
                        placeholder={editProfile}
                        onChangeText={text => this.setValue(text)}
                        label={'Enter your '+editProfile}
                        value={inputEditProfile}
                        containerStyle={{
                        height:45,
                        borderColor:COLOR.gray
                        }}
                        labelStyle={{
                            position:"absolute",
                            bottom:60,
                            left:10,
                            fontSize:18,
                            backgroundColor:"#ffffff",
                            color:'#000'
                        }}
                        inputContainerStyle={{
                            borderBottomWidth:2,
                            borderBottomColor:'#0D9383',
                            height:30
                        }} 
                        style={{
                            paddingHorizontal:0
                        }}
                    />
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableHighlight
                    underlayColor={COLOR.gray}
                    style={styles.button}
                    onPress={() => this.clickModalHandler(!modalVisible,editProfile,true)}
                    >
                    <Text style={styles.textStyle}>Save</Text>              
                    </TouchableHighlight>
                    <TouchableHighlight
                    underlayColor={COLOR.gray}
                    style={styles.button}
                    onPress={() => this.clickModalHandler(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableHighlight>
                </View>

                </>
                }
                               
              </View>
            </View >
          </Modal>
        </View>
        )
      }

      render() { 
        const { loggedUserProfile } = this.props
        return ( 
        <View style={{flex:1, backgroundColor:'white'}}>
           <StatusBar translucent barStyle="light-content" backgroundColor={COLOR.main} />
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
                    <Text style={styles.screenTitle}>Profile</Text>
                </View>
            </View>
            <View style={styles.picContainer}>
                <View style={styles.pic}>
                    <Image source={{ uri: loggedUserProfile.image }}  style={styles.picProfile} />
                    <TouchableOpacity 
                    // onPress={() => this.props.navigation.navigate('Camera')}
                    onPress={() => this.clickModalHandler(true,'image')}
                    style={styles.addPhotoButton}>
                        <MaterialIcon
                        name='photo-camera' 
                        size={25} 
                        color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.profileContainer}>
                <TouchableHighlight 
                underlayColor={COLOR.gray}
                onPress={() => this.clickModalHandler(true,'name')}>
                    <View style={styles.profile}>
                    <MaterialIcon
                        name='person' 
                        size={22} 
                        color={COLOR.main}
                        style={{paddingVertical:10}}
                    />
                    <View style={styles.box}>
                        <View style={styles.textBox}>
                            <Text style={styles.textLabel}>Name</Text>
                            <Text style={styles.text}>{loggedUserProfile.name}</Text>
                        </View>
                        <MaterialIcon
                            name='edit' 
                            size={22} 
                            color={COLOR.gray}
                            style={{marginVertical:10}}
                        />
                    </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight 
                underlayColor={COLOR.gray}
                onPress={() => this.clickModalHandler(true,'username')}>
                    <View style={styles.profile}>
                    <MaterialIcon
                        name='mail' 
                        size={22} 
                        color={COLOR.main}
                        style={{paddingVertical:10}}
                    />
                     <View style={styles.box}>
                        <View style={styles.textBox}>
                            <Text style={styles.textLabel}>Email</Text>
                            <Text style={styles.text}>{loggedUserProfile.username}</Text>
                        </View>
                        <MaterialIcon
                            name='edit' 
                            size={22} 
                            color={COLOR.gray}
                            style={{marginVertical:10}}
                        />
                    </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight 
                underlayColor={COLOR.gray}
                onPress={() => this.clickModalHandler(true,'phone')}>
                    <View style={styles.profile}>
                    <MaterialIcon
                        name='call' 
                        size={22} 
                        color={COLOR.main}
                        style={{paddingVertical:10}}
                    />
                    <View style={{...styles.box,borderBottomWidth:0}}>
                        <View style={styles.textBox}>
                            <Text style={styles.textLabel}>Phone</Text>
                            <Text style={styles.text}>{loggedUserProfile.phone}</Text>
                        </View>
                        <MaterialIcon
                            name='edit' 
                            size={22} 
                            color={COLOR.gray}
                            style={{marginVertical:10}}
                        />
                    </View>
                    </View> 
                </TouchableHighlight>
            </View>
            {this.renderEditBox()}
            <Button
                icon={
                  <MaterialIcon 
                    name='logout'
                    size={20}
                    color='#fff'
                    style={{marginRight:15}}
                  />
                }
                title="Sign Out"
                containerStyle={{
                    marginHorizontal:50,
                    marginTop:10,
                    borderRadius:10
                }}
                buttonStyle={{
                    backgroundColor:COLOR.main,
                    height:50
                }}
                onPress={() => {
                  console.log('SIGN OUT >>>')
                    this.logoutApp
                }}
                background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.3))', false)}
                /> 
        </View>
         );
    }
}

const mapStateToProps = state => ({
    loggedUserProfile: state.auth.loggedUserProfile,
})

const mapDispatchToProps = dispatch => ({
    doLogout: () => dispatch(signOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Account);

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
      picContainer:{
        height:200,
        justifyContent:'center',
        alignItems:'center'
      },
      picProfile: {
        borderRadius: 85,
        width: 170,
        height: 170,
      },
      addPhotoButton:{
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        bottom:0,
        right:0,
        height:50,
        width:50,
        borderRadius:25,
        backgroundColor:COLOR.secondary,
      },
      profileContainer:{
        marginVertical:15,
      },
      profile:{
        flexDirection:'row',
        marginVertical:10,
        paddingLeft:30
      },
      text:{
          fontSize:17
      },
      box:{
        flexDirection:'row',
        height:60,
        width:WIDTH*0.7,
        borderBottomWidth:0.5,
        borderBottomColor:COLOR.gray,
        marginLeft:20,
        justifyContent:'space-between'
      },
      textBox:{
        flexDirection:'column', 
      },
      textLabel:{
          opacity:0.4,
          fontSize:15
      },
    centeredView: {
        flex:1,
        justifyContent: "flex-end",
        alignItems: "center",
        bottom:-40
    },
    modalView: {
        backgroundColor: "white",
        width:WIDTH,
        padding: 30,
        paddingTop:50,
        borderRadius: 20,
        // shadowColor: "#000",
        // shadowOffset: {
        // width: 0,
        // height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5
    },
    button: {
        padding: 10,
        elevation: 2,
        alignItems:'flex-start',
        justifyContent:'flex-start',
    },
    textStyle: {
        fontSize:17,
        fontWeight:'800',
        color:'#0D9383'
    },
    modalText: {
        marginBottom: 15,

    },
    btnParentSection: {
        alignItems: 'center',
        flexDirection:'row'
    },
    btnSection: {
       alignItems: 'center',
       justifyContent:'center',
       marginLeft:20,
       marginBottom:20
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight:'bold'
    }
  });
