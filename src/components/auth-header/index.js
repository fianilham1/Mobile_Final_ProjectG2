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
    ActivityIndicator,
    TouchableOpacity} from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


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
                        duration:500,
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
                        duration:500,
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
        style={styles.onBoardBox}>
        <View style={styles.onBoardTLogoContainer}>
        <Image 
            style={{
                width:130, 
                height:145
            }}
            source ={require('../../assets/images/logoWhite.png')} />
        <Text style={{color: 'white', fontSize:22,marginTop:20}}>Your Trusted Travel App</Text>
        </View>
       {!OnBoard ?
       //Loading ----------------------------------------- 
        <View style={styles.onBoardButtonContainer}>
            <ActivityIndicator size='large' color="#fff"/>
        </View>
       : 
       //OnBoard ----------------------------------------
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
                <Text style={{fontSize:18,fontWeight: 'bold',color:COLOR.main}}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Auth',{authStatus:'start',screen:'Login',firstScreen:'Login'})}
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
        </View>
    }

    render() { 
        const {title, subtitle, onBoard, splash, navigation} = this.props
        const {params} = this.props.route

        const topAnimation = Animated.interpolateNode(this.state.animationAuthHeaderTop,{
            inputRange: [0, 1],
            outputRange: [0, -720]
        })

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

        let positionWelcome = ['10%','50%']
        let titleWelcome = ['New Member','Back']
        if( params?.firstScreen==='Register'){
            positionWelcome=['50%','10%']
            titleWelcome = ['Back','New Member']
        }
       
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
                        locations={[0.1,0.35,0.7]}
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
            </Animated.View>

            {this.props.splash ? //if splash ? -> render Component Below* >>>>>>>>>>>>>>>>>>>>>
                this.renderScreen(this.props.navigation,null)
            :
                this.props.onBoard ?  //if onBoard ? -> render Component Below* >>>>>>>>>>>>>>>
                // Render Text of OnBoard -> Logo and button sign in&sign up
                    this.renderScreen(this.props.navigation, this.props.onBoard)
                    :
                // if auth ? >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                // Render Header Sign In & Sign Up with rotate animation button and triangle
                    <>  
                    <Animated.View style={[styles.logobox,{left:leftIcon}]}>
                    <Image 
                        resizeMode='cover'
                        style={{
                            width:55, 
                            height:63,
                        }}
                        source ={require('../../assets/images/logoWhite.png')} />
                    </Animated.View>
                    
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
                    style={[styles.textContainer,{left:this.state.eventScreen ? positionWelcome[0] : positionWelcome[1]}]}
                    >
                        <Text style={styles.text}> Welcome</Text>
                        <Text style={styles.text2}>{this.state.eventScreen ? titleWelcome[0] : titleWelcome[1]}</Text>
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
    onBoardBox: {
        flex:1,
        width:WIDTH,
        height:HEIGHT,
        position:'absolute',
        top:30,
        // top:HEIGHT*0.35,
        left:'50%',
        marginLeft:-WIDTH/2,
        zIndex:3,
        flexDirection:'column',
        justifyContent:'space-between'
      },
    onBoardTLogoContainer:{
        justifyContent: 'center',
        alignItems:'center',
        top:100
    },
    onBoardTextContainer:{
        justifyContent: 'center',
        alignItems:'center',
    },
  
      onBoardButtonContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        bottom:150
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
    logobox:{
        flex:1,
        position:'absolute',
        top:40,
        width:WIDTH,
        height:60,
        zIndex:5,
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
    textContainer:{
        flex:1,
        position:'absolute',
        top:100,
        marginLeft:0,
        justifyContent:'center',
        alignItems:'flex-start',
        height:100,
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

