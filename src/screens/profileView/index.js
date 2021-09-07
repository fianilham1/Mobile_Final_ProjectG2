import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Dimensions} from 'react-native';
 import Icon from 'react-native-vector-icons/MaterialIcons';
 import { COLOR } from '../../constant/color';
 import { connect } from 'react-redux';
 import { editUser, signIn } from '../../reducers/actions/auth';
 import {Input} from 'react-native-elements';
 import * as ImagePicker from "react-native-image-picker";
 import Modal from "react-native-modal";

 const WIDTH= Dimensions.get('window').width;
 const HEIGHT= Dimensions.get('window').height;

class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filepath: {
                data: '',
                uri: ''
            },  
            fileData: '',
            fileUri: '',
            profile:this.props.userLogin,
            modalVisible: false,
            editProfile:'', //name or email or phone
            inputEditProfile:'' //input change text
        }
    }
   
    componentDidUpdate(prevState){
        if(JSON.stringify(prevState.userLogin) !== JSON.stringify(this.props.userLogin)){
            this.setState({
                profile:this.props.userLogin
            })
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

            const newData = {
                ...this.state.profile,
                [this.state.editProfile]:'data:image/jpeg;base64,' +  response.assets[0].base64
            }
            this.props.editUser(newData) //update userList 
            this.props.doLogin(newData)  //update userLogin

            this.setState({
              profile:newData,
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
            const newData = {
                ...this.state.profile,
                [this.state.editProfile]:'data:image/jpeg;base64,' +  response.assets[0].base64
            }
            this.props.editUser(newData) //update userList 
            this.props.doLogin(newData)  //update userLogin

            this.setState({
              profile:newData,
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
        this.setState({ 
            modalVisible: visible,
            editProfile: params ? params : this.state.editProfile,
            inputEditProfile: params ?  this.state.profile[params] : this.state.inputEditProfile
         });
        if (save) {
            const newData = {
                ...this.state.profile,
                [this.state.editProfile]:this.state.inputEditProfile
            }
            this.props.editUser(newData) //update userList 
            this.props.doLogin(newData)  //update userLogin
            this.setState({
                profile:newData
            })
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
        const {profile} = this.state
        return ( 
        <View style={{flex:1, backgroundColor:'white'}}>
            <View style={styles.header}>
                <View style={styles.left} >
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Icon
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
                    <Image source={{ uri: profile.image }}  style={styles.picProfile} />
                    <TouchableOpacity 
                    // onPress={() => this.props.navigation.navigate('Camera')}
                    onPress={() => this.clickModalHandler(true,'image')}
                    style={styles.addPhotoButton}>
                        <Icon
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
                    <Icon
                        name='person' 
                        size={22} 
                        color="#0EA391"
                        style={{paddingVertical:10}}
                    />
                    <View style={styles.box}>
                        <View style={styles.textBox}>
                            <Text style={styles.textLabel}>Name</Text>
                            <Text style={styles.text}>{profile.name}</Text>
                        </View>
                        <Icon
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
                    <Icon
                        name='mail' 
                        size={22} 
                        color="#0EA391"
                        style={{paddingVertical:10}}
                    />
                     <View style={styles.box}>
                        <View style={styles.textBox}>
                            <Text style={styles.textLabel}>Email</Text>
                            <Text style={styles.text}>{profile.username}</Text>
                        </View>
                        <Icon
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
                    <Icon
                        name='call' 
                        size={22} 
                        color="#0EA391"
                        style={{paddingVertical:10}}
                    />
                    <View style={{...styles.box,borderBottomWidth:0}}>
                        <View style={styles.textBox}>
                            <Text style={styles.textLabel}>Phone</Text>
                            <Text style={styles.text}>{profile.phone}</Text>
                        </View>
                        <Icon
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
           
        </View>
         );
    }
}

const mapStateToProps = state => ({
    userLogin: state.auth.userLogin,
})

const mapDispatchToProps = dispatch => ({
    editUser: newData => dispatch(editUser(newData)),
    doLogin: data => dispatch(signIn(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);

const styles = StyleSheet.create({
    header: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#075e54',
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
        backgroundColor:'#0D9383',
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