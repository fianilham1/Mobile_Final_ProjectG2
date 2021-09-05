import React, { Component } from "react";
import "./nav.css";
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import logoWhite from '../../assets/images/logoWhite.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome, faBars, faTimes, faSignInAlt, faSignOutAlt, faCar, faList} from '@fortawesome/free-solid-svg-icons';

// const person = <FontAwesomeIcon className="person" icon={faUser} />
const signout = <FontAwesomeIcon className="signout" icon={faSignOutAlt} />
const signin = <FontAwesomeIcon className="signin" icon={faSignInAlt} />
const home = <FontAwesomeIcon className="home" icon={faHome} />
const car = <FontAwesomeIcon className="car" icon={faCar} />
const list = <FontAwesomeIcon className="list" icon={faList} />
const bar = <FontAwesomeIcon icon={faBars} />
const times = <FontAwesomeIcon icon={faTimes} />

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu:false
    };
  }

  componentDidMount(){
   
  }

  logoutHandler = e => {
    this.props.changePage("/auth")
  }

  renderWelcome = () => {
    
    if(this.props.loginStatus) return <div className="welcome"> Welcome, <span className="nameWelcome">nama?</span><div className="nameWelcome">nama?</div> </div>
  
    return ''
  }


  renderLoggedNav = () => {
    const {currentPage} = this.props

    if(this.props.loginStatus) return (
      <Link to="/user/auth">
      <div onClick={this.logoutHandler} className={`menu-item ${currentPage === "/logout" ? "active" : ""}`}>
        <span className="header-i"> {signout}</span>Logout
      </div>
      </Link>
    )

    return (
      <>
      <Link to="/user/auth">
        <div className={`menu-item ${currentPage === "/user/auth" ? "active" : ""}`}>
          <span className="header-i"> {signin}</span>Login
        </div>
      </Link>
      </>
    )
  }

  renderNav = () => {
    const {currentPage} = this.props
    if(this.props.loginStatus) return (
        <>
                  <Link to="/dashboard">
                    <div className={`menu-item ${currentPage === "/dashboard" ? "active" : ""}`}>
                      <span className="header-i"> {home}</span> Home
                    </div>
                  </Link>
                  <Link to="/listParking">
                    <div className={`menu-item ${currentPage === "/list-parking" ? "active" : ""}`}>
                      <span className="header-i"> {list}</span>List Booking Park
                    </div>
                  </Link>
        </>
      )

    return ''
  }

  menu = () => {
    this.setState({
      openMenu:!this.state.openMenu
    })
  }

    render() {
      console.log(this.props.loginStatus)
        return (
          <>
          <div className="header">
          <div className="inner-width">
                <div className="logo">
                  <img className="logoImage" src={logoWhite} alt=""/>
                  <span>Travelsay</span>
                </div>
                <span className="menu-toggle-btn" onClick={this.menu}> {this.state.openMenu ? times : bar}</span>
                <div className={`navigation-menu ${this.state.openMenu ? 'open': ''}`}>
                {this.renderLoggedNav()}
                {this.renderNav()}
                </div>
              </div>
          </div>
          
          </>
        );
    }
}


const mapStateToProps = state => ({
  currentPage: state.pageConfig.currentPage,
  loginStatus: state.auth.loginStatus,
})

const mapDispatchToProps = dispatch => ({
  changePage: page => dispatch({ type: page })
})

// export default Detail;
export default connect(mapStateToProps,mapDispatchToProps)(Nav);
