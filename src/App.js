import React, { useEffect } from 'react'
import AppNavigator from './router'
import { connect } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Text,
  View,
  ActivityIndicator} from 'react-native';
import { COLOR } from './constant/color';


function App({loadingStatus, text, textStyle}) {

  useEffect(() => {
    console.log('MOUNT')
    return () => {
      //unmount
      console.log('EXIT')
    }
  }, [])

  return (
    <>
    <AppNavigator/>
    <Spinner //LOADING API 
        visible={loadingStatus}
        // textContent={text}
        // textStyle={textStyle}
        // size='large'
        customIndicator={
          <View style={{
            width:'80%',
            height:100,
            backgroundColor:'rgba(255,255,255,0.8)',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:10,
          }}>
            <ActivityIndicator 
            color={COLOR.main}
            size={45}
            />
            <Text style={textStyle}>{text}</Text>
          </View>
        }
    />
    </>
  );
}

const mapStateToProps = state => ({
  loadingStatus: state.loading.status,
  text: state.loading.text,
  textStyle: state.loading.textStyle
})

export default connect(mapStateToProps)(App);
