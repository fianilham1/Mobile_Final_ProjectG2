import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { serviceLoading } from '../../reducers/actions/serviceApp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { SocialIcon } from 'react-social-icons';
import userApi from '../../api/user';
import {InputApp, ButtonApp} from '../../component';
import {ValidateRegexEmail, ValidateRegexPassword} from '../../util/method/regex'
const user = <FontAwesomeIcon icon={faUser} />
const lock = <FontAwesomeIcon icon={faLock} />
const email = <FontAwesomeIcon icon={faEnvelope} />

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:'',
            username:'',
            password:'',
            confirm:'',
            validName:true,
            validUsername:true,
            validPassword:true,
            validConfirm:true,
            serviceLoading:false,
            errorMessagePassword:''
         }
    }

    setValue = e => {
        this.setState({ 
        [e.target.name]: e.target.value,
        validUsername:true,
        validPassword:true
     })
    }

    registerHandler = async () => {
        if(!this.state.name || !this.state.username || !this.state.password){
            return Swal.fire({
                icon: 'error',
                title: 'Fill All Fields',
                showConfirmButton: false,
                timer: 1500
              })
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
      
        this.props.changeServiceLoading(true)  
        try{
            let res = await fetch(userApi+'/signUp',{
                method: 'POST',
                // mode:'no-cors',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    name:this.state.name,
                    role:'',
                    image:'',
                    phone:''
                })
            })
            let json = await res.json()
            if(res.ok){ //response Http 200/201
              this.props.changeServiceLoading(false)
              //SIGN UP SUCCESS
              Swal.fire({
                  icon:'success',
                  title: 'Register Is Success',
                  showConfirmButton: false,
                  timer: 1500
                })
              console.log('success response: ',json)    
          }else{ //response Http error
              this.props.changeServiceLoading(false)
              //Request Error
              if(json.errorMessage==='Username Is Already Exist'){
                  return this.setState({
                              validUsername:false
                          })
              }
          }
        }catch(error){
            console.log('error: ',error)
        }
    }

    render() { 
        return ( 
            <div class="form sign-up-form">
                  <h2 class="title">Sign up</h2>
                  <InputApp 
                    name='Name'
                    label='Name'
                    icon={user}
                    setValue={this.setValue}
                    value={this.state.name}
                    valid={this.state.validName}
                  />
                  <InputApp 
                    name='Username'
                    label='Username'
                    icon={email}
                    setValue={this.setValue}
                    value={this.state.username}
                    valid={this.state.validUsername}
                    errorMessage='Invalid Email Format'
                  />
                   <InputApp 
                    name='Password'
                    label='Password'
                    icon={lock}
                    setValue={this.setValue}
                    value={this.state.password}
                    valid={this.state.validPassword}
                    errorMessage={this.state.errorMessagePassword}
                    secureText
                  />
                    <InputApp 
                    name='Confirm'
                    label='Confirm Password'
                    icon={lock}
                    setValue={this.setValue}
                    value={this.state.confirm}
                    valid={this.state.validConfirm}
                    errorMessage='Password Is Not Match'
                    secureText
                  />
                  <ButtonApp 
                    click={this.registerHandler}
                    label='SIGN UP'
                  />
                  <p class="social-text">Or Sign up with social platforms</p>
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
  changeServiceLoading: data => dispatch(serviceLoading(data))
})

export default connect(null, mapDispatchToProps)(Register);