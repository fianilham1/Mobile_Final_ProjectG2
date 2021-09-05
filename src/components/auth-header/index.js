import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { COLOR } from '../../constant/color';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { TriangleDown, Rectangle } from '../../components/shape';
import LinearGradient from 'react-native-linear-gradient';

import { 
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    ImageBackground,
    Image,
    TouchableOpacity} from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';

const WIDTH= Dimensions.get('window').width;
const HEIGHT =  Dimensions.get('window').height;


class AuthHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            animationAuthHeaderTop:new Animated.Value(0),
            animationAuthHeaderLeft:new Animated.Value(0),
            animationIconColor:new Animated.Value(0),
            animationIconRotate:new Animated.Value(0),
            animationIconLeft:new Animated.Value(0),
            eventScreen:false
         }
    }

    componentDidMount(){
        //from onBoard to Login
        if(this.props.route.params?.authStatus==='start'){
            Animated.timing(
                this.state.animationAuthHeaderTop,{
                    toValue:1,
                    duration:800,
                    easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
                }
            ).start()   
        }
    }

    componentDidUpdate(PrevProps){
        if(PrevProps.eventScreen!==this.props.eventScreen){
            this.setState({
                eventScreen:this.props.eventScreen
            })
             //from login to register OR register to Login
            const {params} = this.props.route
            if( params?.screen==='Register'){
                Animated.timing(
                    this.state.animationAuthHeaderLeft,{
                        toValue:params?.firstScreen==='Login' ? 1 : 0,
                        duration:800,
                        easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
                    }
                ).start()
                Animated.timing(
                    this.state.animationIconColor,{
                        toValue:params?.firstScreen==='Login' ? 1 : 0,
                        duration:800,
                        easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
                    }
                ).start()
                Animated.timing(
                    this.state.animationIconRotate,{
                        toValue:params?.firstScreen==='Login' ? 1 : 0,
                        duration:800,
                        easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
                    }
                ).start()
                Animated.timing(
                    this.state.animationIconLeft,{
                        toValue:params?.firstScreen==='Login' ? 1 : 0,
                        duration:800,
                        easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
                    }
                ).start()
            }else if(params?.screen==='Login'){
                Animated.timing(
                    this.state.animationAuthHeaderLeft,{
                        toValue:params?.firstScreen==='Login' ? 0 : 1,
                        duration:800,
                        easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
                    }
                ).start()
                Animated.timing(
                    this.state.animationIconColor,{
                        toValue:params?.firstScreen==='Login' ? 0 : 1,
                        duration:800,
                        easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
                    }
                ).start()
                Animated.timing(
                    this.state.animationIconRotate,{
                        toValue:params?.firstScreen==='Login' ? 0 : 1,
                        duration:800,
                        easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
                    }
                ).start()
                Animated.timing(
                    this.state.animationIconLeft,{
                        toValue:params?.firstScreen==='Login' ? 0 : 1,
                        duration:800,
                        easing: EasingNode.bezier(0.23, 0.67, 0.75, 0.94)
                    }
                ).start()
            }
        }
    }

    renderScreen = (navigation,OnBoard) => {
        return <View
        style={styles.box}>
        <View style={styles.onBoardTextContainer}>
            <Text style={{color: 'white', fontSize: 35, fontWeight: 'bold'}}>
            YOUR LOGO
            </Text>
            <Text style={{color: 'white', lineHeight: 25, top:HEIGHT-330}}>
            From Facebook
            </Text>
            <Image 
            style={{
                width:WIDTH+30, 
                height:WIDTH+45,
                bottom:250,
                opacity:0.4,
                transform:[ {scale:0.7} ] }}
            source ={require('../../assets/images/geo.png')}
            />
        </View>
       {!OnBoard ? //Splash
        null
       : //OnBoard
        <Animatable.View style={[styles.onBoardButtonContainer,styles.shadow]}
        animation="fadeInDown"
        duration={1000} > 
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Auth',{authStatus:'start',screen:'Register',firstScreen:'Register'})}
                style={styles.onBoardButton}>
                <FontAwesomeIcon
                    style={{color:COLOR.main,marginRight:10}}
                    name='chevron-left'
                    size={20}
                />
                <Text style={{fontSize:17,fontWeight: 'bold',color:COLOR.main}}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Auth',{authStatus:'start',screen:'Login',firstScreen:'Login'})}
                style={styles.onBoardButton}>
            <Text style={{fontSize:17,fontWeight: 'bold',color:COLOR.secondary}}>Sign In</Text>
                <FontAwesomeIcon
                    style={{color:COLOR.secondary,marginLeft:10}}
                    name='chevron-right'
                    size={20}
                />
            </TouchableOpacity>
        </Animatable.View>
       }
        </View>
    }

    render() { 
        const {title, subtitle, onBoard, splash, navigation} = this.props
        const {params} = this.props.route

        const topAnimation = Animated.interpolateNode(this.state.animationAuthHeaderTop,{
            inputRange: [0, 1],
            outputRange: [0, -720]
        })
        // const top =  onBoard ? params?.authStatus==='start' ? topAnimation : -720 : 0
        const top = splash || onBoard  ? 0 : params?.authStatus==='start' ? topAnimation : -720
           

        const left = Animated.interpolateNode(this.state.animationAuthHeaderLeft,{
            inputRange: [0, 1],
            outputRange: params?.firstScreen==='Login' ? [0, WIDTH] : [WIDTH,0]
        })

        const colorIcon = Animated.interpolateColors(this.state.animationIconColor,{
            inputRange: [0, 1],
            outputColorRange:
            params?.firstScreen==='Login' ? [COLOR.secondary, COLOR.main] : [COLOR.main,COLOR.secondary]
        })

        const rotateIcon = Animated.interpolateNode(this.state.animationIconRotate,{
            inputRange: [0, 1],
            outputRange: params?.firstScreen==='Login' ? ['0deg', '180deg'] : ['180deg', '0deg']
        })

        const leftIcon = Animated.interpolateNode(this.state.animationIconLeft,{
            inputRange: [0, 1],
            outputRange: params?.firstScreen==='Login' ? [30, WIDTH-90] : [WIDTH-90,30]
        })
       
        return ( 
            <View style={styles.container} >
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <Animated.View 
            style={{
               top,zIndex:2
            }}>       
                {/* BackGround Rectangle  */}
                <LinearGradient 
                        colors={[COLOR.lightmain2, COLOR.lightmain ,COLOR.main]}
                        locations={[0.2,0.35,0.7]}
                        style={styles.box1}>
                </LinearGradient>
                {/* BackGround Triangle below Rectangle  */}
                <Animated.View 
                    style={{
                        left,
                    }}>
                        <TriangleDown style={{...styles.box2,
                            color:COLOR.main}}/>
                </Animated.View>
                {/* <Image 
                style={styles.box1}
                source={require('../../assets/images/splash-project.png')}
                /> */}
            </Animated.View>

            {this.props.splash ? //if splash -> render Component Below*
                this.renderScreen(this.props.navigation, this.props.onBoard)
            :
                this.props.onBoard ?  //if onBoard -> render Component Below*
                    // Render Text of OnBoard -> Logo and button sign in&sign up
                    this.renderScreen(this.props.navigation, this.props.onBoard)
                    :
                    // Render Header Sign In & Sign Up with rotate animation button and triangle
                    <>
                    <Animated.View
                    style={[
                        styles.iconbox,
                        {transform: [ {rotate:rotateIcon} ],
                        left:leftIcon,
                        backgroundColor:colorIcon
                     }]}>
                    <TouchableOpacity
                    onPress={() => params?.screen==='Login' ? (
                        this.props.changeScreen(),
                        navigation.setParams({
                            authStatus:'auth',
                            screen:'Register'
                        }),
                        navigation.replace('Register')
                    )
                    : 
                    (
                        this.props.changeScreen(),
                        navigation.setParams({
                            authStatus:'auth',
                            screen:'Login'
                        }),
                        navigation.replace('Login')
                    ) 
                    }
                    >
                    <FontAwesomeIcon
                        style={{color:'#fff'}}
                        name='arrow-left'
                        size={26}
                        /> 
                    </TouchableOpacity>
                    </Animated.View>
                              
                    <Animatable.View
                    animation={this.state.eventScreen ? "fadeInLeft" : 'fadeInRight'}
                    duration={1000}
                    style={styles.textContainer}
                    >
                        {/* <Text style={styles.text}>{title}</Text> */}
                        {/* <Text style={styles.text2}>{subtitle}</Text> */}
                    </Animatable.View>
                    </>
            }

            </View>
         );
    }
}
 
export default AuthHeader;


const styles = StyleSheet.create({
    container:{
        flex:0.37,
        marginBottom:10,
        // position:'absolute'
    },
    box: {
        flex:1,
        width:WIDTH,
        position:'absolute',
        top:HEIGHT*0.35,
        left:'50%',
        marginLeft:-WIDTH/2,
        zIndex:3,
      },
    onBoardTextContainer:{
        justifyContent: 'center',
        alignItems:'center',
    },
  
      onBoardButtonContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        bottom:HEIGHT*0.3
      },
      onBoardButton: {
        height: 50,
        width: 130,
        marginHorizontal:10,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
      },

    textContainer:{
        flex:1,
        position:'absolute',
        top:165,
        left:'50%',
        marginLeft:-100,
        justifyContent:'center',
        alignItems:'center',
        width:200,
        height:60,
        backgroundColor:COLOR.main2,
    },
    iconbox:{
        flex:1,
        position:'absolute',
        top:140,
        width:60,
        height:60,
        borderRadius:30,
        color:'red',
        justifyContent:'center',
        alignItems:'center',
        zIndex:1,
    },
    text:{
      color:"#ffffff",
      fontSize:30,
      fontWeight:'bold',
    },
    text2:{
        color:"#ffffff",
        fontSize:25,
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
    image:{
        resizeMode: 'cover',
        // borderRadius:WIDTH*1.6,
    },
    topContainer:{
        flex:1.6,
        height:250,
        flexDirection:'column',
        // alignItems:'center',
        justifyContent:'flex-end',
        paddingHorizontal:28.8,
        paddingBottom:80
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
})

{/* <View style={{
    //darken image
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius:WIDTH*1.6,
}}></View> */}