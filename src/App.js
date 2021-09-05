import React, { Component } from 'react';
import {Body, Header, Nav, Footer} from "./template";
import {BrowserRouter as Router} from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

  
    render() {
        console.log('redux: ',this.props.serviceLoading)
        return (
            <LoadingOverlay
            active={this.props.serviceLoading}
            spinner
            text='Loading ...'
            >
            <Router>
                <Nav/>
                <Body/>
                {/* <Footer/> */}
            </Router>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => ({
    serviceLoading: state.serviceApp.serviceLoading,
})
  
  export default connect(mapStateToProps)(App);
