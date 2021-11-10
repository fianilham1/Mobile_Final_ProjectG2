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
// import {signIn} from '../../actions/auth';
import { ButtonApp} from '../../components';
import {storeUserForgotPass} from '../../reducers/actions/auth';
import { COLOR} from '../../constant/color';
import { SQLiteContext } from '../../config/sqlite';
import CodeInput from 'react-native-confirmation-code-input';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import userApi from '../../api/user';

const WIDTH = Dimensions.get('window').width

class VerifyEmail extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            code:[],
            validCode:true,
            forgotPassLoading:false,
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
              console.log('yes back')
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
        this.props.goToScreen(2)
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
          );
    }

    componentWillUnmount() {
        this.backHandler.remove();
      }

    confirmationCodeHandler = (isValid, code) => {
       if(isValid){
        return  this.props.navigation.replace('ResetPassword')
       }

       this.setState({
           validCode:false
       })
    }

    clearError = () => {
        if(!this.state.validCode){
            this.setState({
                validCode:true
            })
        }
    }

    render(){
        const {navigation} = this.props
        return(
            <View style={{flex:1}}>
            <Spinner //LOADING FORGOT PASS API 
                visible={this.state.forgotPassLoading}
                textContent={'Loading...'}
                textStyle={{color:'#fff'}}
            />
            <ScrollView style={{backgroundColor:"#FFF",height:"100%"}}>
                <View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View 
                    style={styles.imageBox}>
                        <View>
                            <Image 
                            style={styles.image}
                            source ={require('../../assets/images/email-icon.png')}
                            />
                        </View>
                    </View>
                </View>

                <View style={{
                   justifyContent:'center',
                   alignItems:'center'
                }}>
                <Text
                 style={styles.note}
                >Please Enter The 4 Digit Code Sent</Text>
                <Text
                 style={styles.note}
                >To aaa1@gmail.com</Text>
               </View>

                <View>
                <CodeInput
                    ref="codeInputRef2"
                    keyboardType="numeric"
                    codeLength={4}
                    className='border-b'
                    compareWithCode='1234'
                    autoFocus={false}
                    activeColor='rgba(49, 180, 4, 1)'
                    inactiveColor='rgba(49, 180, 4, 1.3)'
                    autoFocus={false}
                    ignoreCase={true}
                    inputPosition='center'
                    size={53}
                    space={12}
                    containerStyle={{ marginTop: 30 }}
                    codeInputStyle={{ 
                        borderBottomWidth: 3, 
                        borderBottomColor:COLOR.main,
                        fontSize:25,
                        color:'#000'
                    }}
                    onChange={() => this.clearError()}
                    onFulfill={(isValid, code) =>this.confirmationCodeHandler(isValid, code)}
                />
                {!this.state.validCode ?
                 <View style={{
                     flexDirection:'row',
                     position:'absolute',
                     left:45,
                     top:90
                     }}>
                <View style={{
                    justifyContent:'center',
                    alignItems:'center',
                    paddingHorizontal:10,
                }}>
                <MaterialIcon
                     name='error'
                     size={22}
                     color='red'
                     style={{}}
                     />
                </View>
               
                 <Text style={{
                     color:'red', 
                     fontSize:18,
                }}>Invalid Code</Text>
                 </View>
                :
                null
                }
               
                </View>
               
                {/* <ButtonApp 
                    label="Verify"
                    handler={this.submitHandler}
                /> */}
               
               <TouchableOpacity
                onPress={()=>{
                }}
                style={{alignItems:'center', marginTop:50}}>
                    <Text 
                    style={{
                        color:COLOR.main,
                        fontSize:18,
                        fontWeight:'bold',
                        marginBottom:0
                    }}
                   >Resend Code</Text>
                </TouchableOpacity>

               
                </View>               
            </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    forgotPassUsername: state.auth.forgotPassUsername,
})

const mapDispatchToProps = dispatch => ({
    storeUserForgotPass: data => dispatch(storeUserForgotPass(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);


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
    bottom:-20,
    right:-20,
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