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
  } from 'react-native';

  import {connect} from "react-redux";
  import Icon from 'react-native-vector-icons/MaterialIcons';
  import { COLOR } from '../../constant/color';
  import { PLACES } from '../../constant/places';


  const {width} = Dimensions.get('screen');

  const categoryIcons = [
    <Icon name="flight" size={25} color={COLOR.main} />,
    <Icon name="beach-access" size={25} color={COLOR.main} />,
    <Icon name="near-me" size={25} color={COLOR.main} />,
    <Icon name="place" size={25} color={COLOR.main} />,
  ]

  class RecommendedCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {place} = this.props
        return ( 
          <ImageBackground style={styles.rmCardImage} source={place.image}>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {place.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="place" size={22} color='white' />
                <Text style={{color: 'white', marginLeft: 5}}>
                  {place.location}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon name="star" size={22} color='white' />
                <Text style={{color: 'white', marginLeft: 5}}>5.0</Text>
              </View>
            </View>
            <Text style={{color: 'white', fontSize: 13}}>
              {place.details}
            </Text>
          </View>
        </ImageBackground>
         );
    }
}


class ListCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View style={styles.categoryContainer}>
            {categoryIcons.map((icon, index) => (
              <View key={index} style={styles.iconContainer}>
                {icon}
              </View>
            ))}
          </View>
         );
    }
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {place, navigation} = this.props
        console.log('image place',place.image)
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
                <View style={{flexDirection: 'row'}}>
                  <Icon name="place" size={20} color='white' />
                  <Text style={{marginLeft: 5, color: 'white'}}>
                    {place.location}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="star" size={20} color='white' />
                  <Text style={{marginLeft: 5, color:'white'}}>5.0</Text>
                </View>
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
        const { navigation, token } = this.props
        console.log('token in home: ',token)
        return (  
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <StatusBar translucent barStyle="dark-content" backgroundColor='#fff' />
            <View
            style={styles.header}>
              <Icon name="sort" size={28} color={COLOR.main} />
              <Icon name="notifications-none" size={28} color={COLOR.main} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ImageBackground
               source={require('../../assets/images/header-image.png')}
                style={styles.headerHome}
                imageStyle={styles.headerImage}>
                <View style={{flex: 1}}>
                  <Text style={styles.headerTitle}>Explore the</Text>
                  <Text style={styles.headerTitle}>beautiful places</Text>
                  <View style={styles.inputContainer}>
                    <Icon name="search" size={28} />
                    <TextInput
                      placeholder="Search place"
                      style={{color: COLOR.gray}}
                    />
                  </View>
                </View>
              </ImageBackground>
              <ListCategories />
              <Text style={styles.sectionTitle}>Places</Text>
              <View>
                <FlatList
                  contentContainerStyle={{paddingLeft: 20}}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={PLACES}
                  renderItem={({item}) => <Card navigation={navigation} place={item} />}
                />
                <Text style={styles.sectionTitle}>Recommended</Text>
                <FlatList
                  snapToInterval={width - 20}
                  contentContainerStyle={{paddingLeft: 20, paddingBottom: 100}}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={PLACES}
                  renderItem={({item}) => <RecommendedCard place={item} />}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        );
    }
}

 
const mapStateToProps = state => ({
  token: state.auth.token,
})

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    header: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white',
    },
    headerHome:{
      height: 140,
      paddingHorizontal: 20,
      paddingTop:20,
    },
    headerImage:{
      resizeMode: 'cover',
      borderTopLeftRadius:15,
      borderTopRightRadius:15,
    },
    headerTitle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 23,
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
      marginTop: 60,
      marginHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    iconContainer: {
      height: 60,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    sectionTitle: {
      marginHorizontal: 20,
      marginVertical: 20,
      fontWeight: 'bold',
      fontSize: 20,
    },
    cardImage: {
      height: 220,
      width: width / 2,
      marginRight: 20,
      padding: 10,
      overflow: 'hidden',
      borderRadius: 10,
    },
    rmCardImage: {
      width: width - 40,
      height: 200,
      marginRight: 20,
      borderRadius: 10,
      overflow: 'hidden',
      padding: 10,
    },
  });