import React from 'react'
import AppNavigator from './router'
import { connect } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';

function App({loadingStatus}) {
  return (
    <>
    <AppNavigator/>
    <Spinner //LOADING API 
        visible={loadingStatus}
        textContent={'Loading...'}
        textStyle={{color:'#fff'}}
    />
    </>
  );
}

const mapStateToProps = state => ({
  loadingStatus: state.loading.status,
})

export default connect(mapStateToProps)(App);
