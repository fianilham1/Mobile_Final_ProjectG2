import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { COLOR } from '../../constant/color';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { TriangleDown, Rectangle } from '../shape';
import LinearGradient from 'react-native-linear-gradient';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome5';

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
import Animated, { EasingNode } from 'react-native-reanimated';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


class AuthFrontScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            animationRadius:new Animated.Value(0),
            animationSize:new Animated.Value(0),
            animationFade:new Animated.Value(0),
         }
        this.baseState = this.state
    }

    resetState =() => {
        this.setState(this.baseState)
    }

    animationChange = (value) => {
        Animated.timing(
            this.state.animationRadius,{
                toValue:value,
                duration:500,
                easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
            }
        ).start()
        Animated.timing(
            this.state.animationSize,{
                toValue:value,
                duration:800,
                easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
            }
        ).start()
        Animated.timing(
            this.state.animationFade,{
                toValue:value,
                duration:1200,
                easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
            }
        ).start()
    }

    componentDidMount(){
        this.animationChange(1)
    }

    componentDidUpdate(prevProps){
        const { authScreen, exit } = this.props
        if(prevProps.exit!==exit){
            // console.log('prev exit ',prevProps.exit)
            this.animationChange(0)
            setTimeout(() => {
                this.animationChange(1)
            },1000)
        }
    }

    render() { 
        const firstScreen = this.props.route?.params?.screen
        const { authScreen, exit, navigation, changeScreen, doExit } = this.props
        console.log('firstScreen -> ', firstScreen)
        console.log('authScreen -> ', authScreen)
        console.log('exit -> ', exit)
        if(firstScreen==='Login' || authScreen==='Login'){
            const radius = Animated.interpolateNode(this.state.animationRadius,{
                inputRange: [0, 1],
                outputRange: [0, 35]
            })
            const size = Animated.interpolateNode(this.state.animationSize,{
                inputRange: [0, 1],
                outputRange: [16, 1]
            })
            const opacity = Animated.interpolateNode(this.state.animationFade,{
                inputRange: [0, 1],
                outputRange: [0, 1]
            })
            return (
            <View style={[styles.container,{left:20}]}>
            <Animated.View style={
                [styles.onBoardBox,{
                borderRadius:radius,
                transform:[ {scale:size} ]
                }]
            }>
            </Animated.View>
            <Animated.View style={{
                opacity,
                position:'absolute',
                zIndex:1,
            }}>
            <TouchableOpacity
            onPress={() => {
               doExit('exitLogin')
               navigation.setParams({
                    screen:null
                })
                setTimeout(() => {
                    changeScreen('Register')
                    navigation.replace('Register')
                },1000)
            }}
            >
            <FontawesomeIcon 
                    name='user'
                    size={25}
                    color='#fff'
                    style={{
                        bottom:5,
                        left:-5
                    }}
                />
             <FontawesomeIcon 
                    name='plus'
                    size={20}
                    color='#fff'
                    style={{
                        position:'absolute',
                        right:-10,
                        bottom:-10
                    }}
                />
            </TouchableOpacity>
            </Animated.View>
          
            </View>
        
            )  
        }

        if(firstScreen==='Register' ||  authScreen==='Register'){
            const radius = Animated.interpolateNode(this.state.animationRadius,{
                inputRange: [0, 1],
                outputRange: [0, 35]
            })
            const size = Animated.interpolateNode(this.state.animationSize,{
                inputRange: [0, 1],
                outputRange: [16, 1]
            })
            const opacity = Animated.interpolateNode(this.state.animationFade,{
                inputRange: [0, 1],
                outputRange: [0, 1]
            })
            return (
                <View style={[styles.container,{right:20}]}>
            <Animated.View style={
                [styles.onBoardBox,{
                borderRadius:radius,
                transform:[ {scale:size} ]
                }]
            }>
            </Animated.View>
            <Animated.View style={{
                opacity,
                position:'absolute',
                zIndex:1,
            }}>
            <TouchableOpacity
            onPress={() => {
               doExit('exitRegister')
               navigation.setParams({
                    screen:null
                })
                setTimeout(() => {
                   changeScreen('Login')
                    navigation.replace('Login')
                },1000)
            }}
            >
            <FontawesomeIcon 
                    name='sign-in-alt'
                    size={25}
                    color='#fff'
                />
            </TouchableOpacity>
            </Animated.View>
          
            </View>
        
            )  
        }


        return(
        <View>

        </View>
        )
    }
}
 
export default AuthFrontScreen;


const styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:155,
        justifyContent:'center',
        alignItems:'center',
        width:70,
        height:70,
    },
    onBoardBox: {
        width:70,
        height:70,
        zIndex:1,
        backgroundColor:COLOR.main,
      },
})

