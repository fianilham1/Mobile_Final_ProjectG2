import React, { Component } from 'react';
import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import "./auth.css"
import loginLogo from '../../assets/images/log.svg';
import registerLogo from '../../assets/images/register.svg';
import Login from './login';
import Register from './register';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// import { faFacebookF, faGoogle, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons"
// const facebook = <FontAwesomeIcon icon={faFacebookF} />
// const google = <FontAwesomeIcon icon={faGoogle} />
// const twitter = <FontAwesomeIcon icon={faTwitter} />
// const linkedin = <FontAwesomeIcon icon={faLinkedin} />


const COLOR = {
    main : '#2f3640'
}
// const useStyles = theme  =>({
//     input: {
//         width:'100%',
//       // input label when focused
//       "& label.Mui-focused": {
//         color: COLOR.main
//       },
//       "& .MuiOutlinedInput-root": {
//         borderRadius:0,
//         "&.Mui-focused fieldset": {
//           borderColor: COLOR.main,
//         }
//       }
//     }
//   });

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageSignUp:false,
            submitStatus:false,
        }
        // this.baseSate=this.state
    }
    
  //   resetState = () => {
  //     this.setState(this.baseSate)
  // }


    componentDidMount(){
        this.props.changePage("/user/auth")
    }

    changePageAuth = () => {
      this.setState({
        pageSignUp:!this.state.pageSignUp
      })
    }

    render() {
        const { classNamees } = this.props;
        if(this.props.loginStatus) return <Redirect to="/dashboard" />
        
        return (
            <div className={`container ${this.state.pageSignUp?'sign-up-mode':''}`}>     
            <div className="forms-container">
              <div className="signin-signup">
                <Login />
                <Register />
              </div>
            </div>
      
            <div className="panels-container">
              <div className="panel left-panel">
                <div className="content">
                  <h3>New here ?</h3>
                  <p>
                    Join Us Right Now and Get Many Benefits
                  </p>
                  <button onClick={() => this.changePageAuth()} className="btn transparent" id="sign-up-btn">
                    Sign up
                  </button>
                </div>
                <img src={loginLogo} className="image" alt="" />
              </div>
              <div className="panel right-panel">
                <div className="content">
                  <h3>One of us ?</h3>
                  <p>
                    Welcome Back
                  </p>
                  <button onClick={() => this.changePageAuth()} className="btn transparent" id="sign-in-btn">
                    Sign in
                  </button>
                </div>
                <img src={registerLogo} className="image" alt="" />
              </div>
            </div>
          </div>
        
        );
    }
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loginStatus,
})

const mapDispatchToProps = dispatch => ({
    changePage: page => dispatch({ type: page })
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);


