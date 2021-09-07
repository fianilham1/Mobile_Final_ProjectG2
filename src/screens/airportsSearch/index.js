import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput} from 'react-native';
import { COLOR } from '../../constant/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {ListItem} from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const airportList = [
  {
    id:1,
    city:'Jakarta',
    country:'Indonesia',
    name:'Juanda',
    code:'JKTA'
  },
  {
    id:2,
    city:'Balikpapan',
    country:'Indonesia',
    name:'Sepinggan',
    code:'BPN'
  },
  {
    id:3,
    city:'Bali',
    country:'Indonesia',
    name:'Ngurah Rai International Airport',
    code:'DPS'
  },
  {
    id:4,
    city:'Surabaya',
    country:'Indonesia',
    name:'Juanda',
    code:'SUB'
  }
]

class AirportsSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          searchInput:''
        }
    }

    setValue = searchInput => {
      this.setState({
        searchInput
      })
    }
   
    renderItem = ({item}) => {
      console.log('in search', this.props.route.params?.type)
        return (
          <ListItem 
          bottomDivider={true}
          key={item.id} 
          onPress={() => this.props.navigation.navigate('FlightsSearch',{
            airport:{...item,type:this.props.route.params?.type}
            })}
          >
            <ListItem.Content>
                <ListItem.Title>{`${item.city}, ${item.country}`}</ListItem.Title>
                <ListItem.Subtitle>{`${item.code} - ${item.name}`}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      }
  
    render() { 
        return (
          <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
             <View style={styles.header}>
                <View style={styles.screenHeader}>
                <SearchBar
                  placeholder="Search Cities or Airports"
                  onChangeText={this.setValue}
                  value={this.state.searchInput}
                  searchIcon={{
                    iconStyle:{
                      fontSize:25
                    }
                  }}
                  containerStyle={{
                    width:'100%',
                    top:-15,
                    marginHorizontal:10,
                    marginBottom:-20,
                    padding:0,
                    backgroundColor:'#fff',
                    elevation:15
                  }}
                  inputContainerStyle={{
                    backgroundColor:'#fff'
                  }}
                  inputStyle={{
                    color:'#000'
                  }}

                />
                </View>
          
                <TouchableOpacity 
                  onPress={() => this.props.navigation.goBack()}
                  style={styles.right} >
                   <Text style={{color:'#fff'}}>Cancel</Text>
                </TouchableOpacity>
            </View>     
            <FlatList 
            data={airportList}
            keyExtractor = {(item) => {
                return item.id;
            }}
            renderItem={this.renderItem}
            />
            </SafeAreaView>
        );
    }
}
 
export default AirportsSearch;

const styles = StyleSheet.create({
  header: {
      flexDirection: 'row',
      backgroundColor: COLOR.main,
      borderColor: '#fff',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: 5,
      paddingVertical: 30,
    },
    left: {
      flexDirection: 'row',
    },
    right: {
      flexDirection: 'row',
      right:15
    },
    screenHeader:{
      flexDirection:'row',
      width:'75%'
      // marginLeft:-150,
    },
    screenTitle: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 20,
    },
    screenSubtitle: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 15,
    },
});