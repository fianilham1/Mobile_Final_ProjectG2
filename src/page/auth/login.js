import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { signIn } from '../../reducers/actions/auth';
import { serviceLoading } from '../../reducers/actions/serviceApp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { SocialIcon } from 'react-social-icons';
import userApi from '../../api/user';
import { InputApp, ButtonApp, DialogApp } from '../../component';
import SendEmail from './forgotPassword1-send';
import VerifyEmail from './forgotPassword2-verify';
import ResetPassword from './forgotPassword3-reset';
import TextField from '@material-ui/core/TextField';
import { ValidateRegexPassword } from '../../util/method/regex'
import lockQuestion from '../../assets/images/lock-question-icon.svg';
import emailVerify from '../../assets/images/email-icon.svg';
import lockDone from '../../assets/images/lock-done-icon.svg';


const lock = <FontAwesomeIcon icon={faLock} />
const email = <FontAwesomeIcon icon={faEnvelope} />

   /* <IconButton
               aria-label="toggle password visibility"
               onClick={this.handleClickShowPassword}
               edge="end">
               {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
           </IconButton> */

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            //Sign In
            name:'',
            username:'',
            password:'',
            confirm:'',
            validName:true,
            validUsername:true,
            validPassword:true,
            validConfirm:true,
            openDialog:false,
            screenForgotPassword:'send',
            errorMessagePassword:'',
            //Forgot Password
            usernamefg:'',
            passwordfg:'',
            confirmfg:'',
            code:'',
            validUsernameFg:true,
            validPasswordFg:true,
            validConfirmFg:true,
            validCode:true,
            token:'',
            tokenType:'',
            serviceLoading:false
         }
    }

    setValue = e => {
      if(this.state.screenForgotPassword==='verify'){
        this.setState({
          code:e,
          validCode:true,
        })
      }else{
        this.setState({ 
          [e.target.name]: e.target.value,
          validName:true,
          validUsername:true,
          validPassword:true,
          validConfirm:true,
          validUsernameFg:true,
          validPasswordFg:true,
          validConfirmFg:true,
       })
      } 
    }

    showHideForgotPassDialog = (status) => {
      this.setState({
        openDialog:status
      })
    }

    changeScreenForgotPass = (screenForgotPassword) => {
      this.setState({
        screenForgotPassword
      })
    }

    renderDialogContent = () => {
      const {screenForgotPassword} = this.state
      if(screenForgotPassword==='send') return (
        <div className='forgot-password-input-field'>
          <img src={lockQuestion} alt="" />
          <div className='text'>
            <div>Please Enter Your Username To</div>
            <div>Receive a Verification Code</div>
          </div>
            <SendEmail 
              setValue={this.setValue}
              value={this.state.usernamefg}
              valid={this.state.validUsernameFg}
              icon={email} />
        </div> 
      )
      if(screenForgotPassword==='verify') return (
        <div className='forgot-password-input-field'>
          <img src={emailVerify} className='email' alt="" />
          <div className='text'>
            <div>Please Enter The 4 Digit Code Sent</div>
            <div>To aaa@gmail.com</div>
          </div>
          <VerifyEmail 
            setValue={this.setValue}
            value={this.state.code}
            valid={this.state.validCode}/>
        </div> 
      )
      if(screenForgotPassword==='reset') return (
        <div className='forgot-password-input-field'>
          <img src={lockDone} alt="" />
          <div className='text'>
            <div>Your New Password Must be Different</div>
            <div>From Previosuly Used Password</div>
          </div>
          <ResetPassword 
            setValue={this.setValue}
            value={[this.state.passwordfg,this.state.confirmfg]}
            valid={[this.state.validPasswordFg,this.state.validConfirmFg]}
            icon={email}
            errorMessage={this.state.errorMessagePassword}/>
        </div> 
       )
   }

   //FORGOT PASSWORD >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
   forgotPasswordHandler = async () => {
    console.log('clikc')
    const {screenForgotPassword} = this.state
    let body = {}
    let nextScreen = ''
    const regexPassword = ValidateRegexPassword(this.state.passwordfg)

    //*--------- 1. Request Forgot Password -> Send Email --------------*
    if(screenForgotPassword==='send'){
      if(!this.state.usernamefg) return this.setState({validUsernameFg:false}) 
      body = { //body json for api send email 
        username: this.state.usernamefg 
      }
      nextScreen='verify'

    //*--------- 2. Request Forgot Password -> Verify Email --------------*  
    }else if(screenForgotPassword==='verify'){
      nextScreen='reset' 
      return this.changeScreenForgotPass(nextScreen)//temporary -> no api for verify

    //*--------- 3. Request Forgot Password -> Reset Password --------------*
    }else if(screenForgotPassword==='reset'){
      if(!this.state.passwordfg) return this.setState({
        validPasswordFg:false,
        errorMessagePassword:'Please Fill New Password'
      })

      if(!regexPassword.status){ //check regex password requirement
           return this.setState({
               validPasswordFg:false,
               errorMessagePassword:regexPassword.errorMessage
           })
       }
       if(this.state.passwordfg!==this.state.confirmfg){
           return this.setState({
               validConfirm:false,
               })
       } 
      body = { //body json for api reset password 
        username: this.state.usernamefg,
        password: this.state.passwordfg
      }
    } 
    this.setState({
      serviceLoading:true
    })
    try{
        let res = await fetch(userApi+'/forgotPassword/'+screenForgotPassword,{
            method: 'POST',
            // mode:'no-cors',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.state.token ? this.state.token : ''
            },
            body: JSON.stringify(body)
        })
        let json = await res.json()
        
        if(res.ok){ //response Http 200/201
              this.setState({
                serviceLoading:false
              })
            //Request Forgot Pass SUCCESS
            if(screenForgotPassword==='send' || screenForgotPassword==='verify'){
              this.setState({
                token:json.token? json.token : 'AAAXXX',
                tokenType:'username-password'
              })
              this.changeScreenForgotPass(nextScreen)
            }else if(screenForgotPassword==='reset'){
              this.setState({ //request last of forgot password -> should close dialog box
                openDialog:false
              })
            }
            console.log('success response: ',json)
        }else{ //response Http error
            this.setState({
              serviceLoading:true
            })
            if(json.errorMessage==='Username Is Not Found'){
              return this.setState({
                        validUsername:false
                    })
            }
        }
    }catch(error){
        console.log('error: ',error)
    }
   }

   //---------------------------------------------------------------

    //LOGIN USERNAME PASSWORD >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    loginUsernamePasswordHandler = async () => {
        if(!this.state.username || !this.state.password){
            return Swal.fire({
            icon: 'error',
            title: 'Fill All Fields',
            showConfirmButton: false,
            timer: 1500
          })
        }
        this.props.changeServiceLoading(true)
        try{
            let res = await fetch(userApi+'/signIn',{
                method: 'POST',
                // mode:'no-cors',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
            let json=await res.json()
            if(res.ok){ //response Http 200/201
                this.props.changeServiceLoading(false)
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
                  // this.storeData('@token',json.token)
                  this.props.doSignIn(
                      {
                        loggedUserProfile:userLogin,
                        token:json.token,
                        tokenType:'username-password'
                      }
                )},800)
                console.log('success response: ',json)       
            }else{ //response Http error
                this.props.changeServiceLoading(false)
                //Request Error
                if(json.errorMessage==='Username Is Not Found'){
                    return this.setState({
                                validUsername:false
                            })
                }else if(json.errorMessage==='Password Is Invalid'){
                    return this.setState({
                                validPassword:false
                            })
                }
            }
        }catch(error){
            console.log('error: ',error)
        }
      }
    
    //---------------------------------------------------------------
    

    render() { 
        return ( 
            <div class="form sign-in-form">
                <DialogApp 
                  openDialog={this.state.openDialog} 
                  showHideForgotPassDialog={this.showHideForgotPassDialog} 
                  dialogTitle='Forgot Password' 
                  renderDialogContent={this.renderDialogContent()}
                  buttonYesDialogText='Send'
                  buttonYesDialogHandler={
                    this.forgotPasswordHandler
                  } 
                  serviceLoading={this.state.serviceLoading}
                  />
                  <h2 class="title">Sign in</h2>
               
                  <InputApp 
                    name='Username'
                    label='Username'
                    icon={email}
                    setValue={this.setValue}
                    value={this.state.username}
                    valid={this.state.validUsername}
                    errorMessage='Username Not Found'
                  />
                   <InputApp 
                    name='Password'
                    label='Password'
                    icon={lock}
                    setValue={this.setValue}
                    value={this.state.password}
                    valid={this.state.validPassword}
                    errorMessage='Invalid Password'
                    secureText
                  />
                  <ButtonApp 
                    click={this.loginUsernamePasswordHandler}
                    label='SIGN IN'
                  />
                  <p onClick={() => this.showHideForgotPassDialog(true)} class="forgot-password-text">Forgot Password?</p>
                  <p class="social-text">Or Sign in with social platforms</p>
                  <div class="social-media">
                    <a href="#" class="social-icon">
                      <SocialIcon network="facebook" />   
                    </a>
                    <a href="#" class="social-icon">
                      <SocialIcon network="google" />  
                    </a>
                    <a href="#" class="social-icon">
                      <SocialIcon network="twitter" />  
                    </a>
                    <a href="#" class="social-icon">
                      <SocialIcon network="linkedin" />  
                    </a>
                  </div>
                </div>
         );
    }
}
 
const mapDispatchToProps = dispatch => ({
  doSignIn: data => dispatch(signIn(data)),
  changeServiceLoading: data => dispatch(serviceLoading(data))
})

export default connect(null, mapDispatchToProps)(Login);