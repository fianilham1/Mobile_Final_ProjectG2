import React, { Component } from 'react';
import { COLOR } from '../../constant/color';
import { 
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageBackground,
  Image,
  ActivityIndicator,
  TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class OnBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
      const { navigation, loading } = this.props
        return (
          <>
          <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
          <LinearGradient
            colors={[COLOR.lightmain2, COLOR.lightmain ,COLOR.main]}
            locations={[0.1,0.2,0.7]}
            style={styles.onBoardBox}>
          <View style={styles.onBoardTLogoContainer}>
          <Image 
              style={{
                  width:85, 
                  height:95
              }}
              source ={require('../../assets/images/logoWhite.png')} 
              tintColor='#fff'/>
          <Text style={{
            color: 'white',
            fontSize:25,
            marginTop:13,
            fontFamily:'HamsterlyDemoRegular'}}>Travelsay App</Text>
          </View>
          <Image 
              style={{
                  width:'100%', 
                  height:'100%',
                  opacity:0.2,
                  bottom:155,
                  // zIndex:-1
              }}
              source ={require('../../assets/images/paris.jpg')} />
          { loading ?
            <View style={styles.onBoardButtonContainer}>
                <ActivityIndicator
                  size='large' color="#fff"/>
            </View>
          :
          <Animatable.View style={[styles.onBoardButtonContainer,styles.shadow]}
          animation="fadeInDown"
          duration={1000} > 
              <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('Auth',{
                      screen:'Register'
                    })
                  }}
                  style={styles.onBoardButton}>
                  <FontAwesomeIcon
                      style={{color:COLOR.main,marginRight:10}}
                      name='chevron-left'
                      size={20}
                  />
                  <Text style={{fontSize:18,fontWeight: 'bold',color:COLOR.main}}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('Auth',{
                      screen:'Login'
                    })
                  }}
                  style={styles.onBoardButton}>
              <Text style={{fontSize:18,fontWeight: 'bold',color:COLOR.main}}>Sign In</Text>
                  <FontAwesomeIcon
                      style={{color:COLOR.main,marginLeft:10}}
                      name='chevron-right'
                      size={20}
                  />
              </TouchableOpacity>
          </Animatable.View>
          }
        
          </LinearGradient>
        </>
         );
    }
}
 
export default OnBoard;

const styles = StyleSheet.create({
    onBoardBox: {
      flex:1,
      width:WIDTH,
      height:HEIGHT,
      left:'50%',
      marginLeft:-WIDTH/2,
      flexDirection:'column',
      justifyContent:'space-between',
    },
  onBoardTLogoContainer:{
      justifyContent: 'center',
      alignItems:'center',
      top:180
  },
  onBoardTextContainer:{
      justifyContent: 'center',
      alignItems:'center',
  },

    onBoardButtonContainer:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      bottom:400
    },
    onBoardButton: {
      height: 55,
      width: 150,
      marginHorizontal:10,
      backgroundColor: 'white',
      marginTop: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'row',
    },
  text:{
    color:COLOR.main,
    fontSize:30,
    fontWeight:'bold',
  },
  text2:{
      color:COLOR.main,
      fontSize:25,
      left:10
    },
  box1:{
      left:-10,
      width:WIDTH*1.1,
      height:HEIGHT*1.1,
  },
  box2:{
      left: -WIDTH,
      borderBottomWidth:80,
      borderLeftWidth:WIDTH,
      borderRightWidth:WIDTH,
  },
  shadow:{
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 48,
  }
  });