import React, { Component } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    TextInput,
    ImageBackground,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image
  } from 'react-native';

  import {connect} from "react-redux";
  import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
  import { COLOR } from '../../constant/color';
  import { FLIGHTNOTE } from '../../constant/flightsNote';


  const WIDTH = Dimensions.get('window').width;

  const categoryIcons = [
    {
      label: 'Book Flights',
      handlerScreen: 'FlightsStackScreen',
      color: COLOR.lightblue,
      icon: <MaterialIcon 
      name="flight" 
      size={40} 
      color={COLOR.lightblue}
      style={{
        transform:[ {rotate:'45deg'} ]
      }} />
    }
    ,
    {
      label: 'Pay Booking',
      handlerScreen: 'MobileBankingDummy',
      color: COLOR.orange,
      icon: <MaterialIcon 
      name='payments'
      size={40}
      color={COLOR.orange} />
    }
  ]


  
class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {place, navigation} = this.props
        return ( 
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Detail', {place})}>
            <ImageBackground style={styles.cardImage} source={place.image}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                {place.name}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
              
              </View>
            </ImageBackground>
          </TouchableOpacity>
         );
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        const { navigation, token, loggedUserProfile } = this.props
        console.log('token in home: ',token)
        return (  
            <View style={{flex: 1}}>
            <View
            style={styles.header}>
                <Image 
                    source={{uri:loggedUserProfile?.image }}
                    style={styles.userImage}
                />
              <MaterialIcon name="notifications-none" size={28} color='#fff' />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
              //  source={require('../../assets/images/header-image.png')}
                style={styles.headerHome}
                imageStyle={styles.headerImage}>
                <View style={{flex: 1}}>
                  <Text style={styles.headerTitle}>Travelsay Pay</Text>
                  <Text style={styles.payText}>{'Rp '+loggedUserProfile.travelsayPay}</Text>
                </View>
              </View>
              {/* <ListCategories {...this.props}/> */}
              <View style={styles.categoryContainer}>
                {
                  categoryIcons.map((category, index) => {
                    return(
                      <TouchableOpacity 
                      key={index}
                      onPress={() => this.props.navigation.navigate(category.handlerScreen)}
                      style={styles.iconContainer}>
                      {category.icon}
                      <Text  style={[styles.iconText,{color:category.color}]}>{category.label}</Text>
                    </TouchableOpacity>
                    )
                  })
                }
              </View>
              <Text style={styles.sectionTitle}>Ongoing Promos</Text>
              <View>
                <FlatList
                  contentContainerStyle={{paddingLeft: 20}}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={FLIGHTNOTE}
                  renderItem={({item}) => <Card navigation={navigation} place={item} />}
                />
               
              </View>
            </ScrollView>
          </View>
        );
    }
}

 
const mapStateToProps = state => ({
  token: state.auth.token,
  loggedUserProfile: state.auth.loggedUserProfile,
})

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    header: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: COLOR.main,
    },
    headerHome:{
      height: 140,
      paddingHorizontal: 20,
      paddingTop:20,
      backgroundColor:COLOR.main,
      borderBottomLeftRadius:15,
      borderBottomRightRadius:15,
    },
    headerImage:{
      resizeMode: 'cover',
      borderTopLeftRadius:15,
      borderTopRightRadius:15,
    },
    headerTitle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
    },
    payText:{
      color: 'white',
      fontSize: 18,
    },
    inputContainer: {
      height: 60,
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 10,
      position: 'absolute',
      top: 90,
      flexDirection: 'row',
      paddingHorizontal: 20,
      alignItems: 'center',
      elevation: 12,
    },
    categoryContainer: {
      marginTop: 20,
      marginHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    iconContainer: {
      height: 60,
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    iconText:{
      fontSize:14,
    },
    sectionTitle: {
      marginHorizontal: 20,
      marginVertical: 20,
      fontWeight: 'bold',
      fontSize: 20,
    },
    cardImage: {
      height: 250,
      width: WIDTH / 2,
      marginRight: 20,
      padding: 10,
      overflow: 'hidden',
      borderRadius: 10,
    },
    rmCardImage: {
      width: WIDTH - 40,
      height: 200,
      marginRight: 20,
      borderRadius: 10,
      overflow: 'hidden',
      padding: 10,
    },
    userImage:{
      width:40,
      height:40,
      borderRadius:20,
      backgroundColor:COLOR.gray,
      marginRight:15
  },
  });