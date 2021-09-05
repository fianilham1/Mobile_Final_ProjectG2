import React, { Component } from 'react';
import "./dashboard.css";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         }
    }

    componentDidMount(){
        this.props.changePage("/dashboard")
      
    }


    render() { 
        if (!this.props.loginStatus)
            return <Redirect to="/user/auth" />

        return ( 
            <>
            <div className="home-container">
                <div></div>
                <h1 className="welcome-home">WELCOME</h1>
            </div>
            </>
         );
    }
}

const mapStateToProps = state => ({
    loginStatus: state.auth.loginStatus,
})


const mapDispatchToProps = dispatch => ({
    changePage: page => dispatch({ type: page })
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);