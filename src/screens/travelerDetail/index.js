import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity,
    Dimensions,
    ScrollView} from 'react-native';
import { COLOR } from '../../constant/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Input, Button } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import { FlightsHeader } from '../../components';
import { COUNTRY } from '../../constant/country';
import DateTimePicker from '@react-native-community/datetimepicker';

const DAY_NAME = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const MONTH_NAME = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const TODAY = new Date();

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class TravelerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          id:0,
          title:'',
          name:'',
          nationality:'',
          birthDate:'',
          personClass:'',

          allCountryName:[],
          errorMessage:'',
          dateVisible:false
        }
    }

    componentDidMount(){
        const { travelerDetail } = this.props.route.params
        this.setState({
            id:travelerDetail.id,
            title:travelerDetail.title,
            name:travelerDetail.name,
            nationality:travelerDetail.nationality,
            birthDate:travelerDetail.birthDate,
            personClass:travelerDetail.personClass
        })
    }

   setValue = (nameParams, val) => {
       this.setState({
           [nameParams]:val,
           errorMessage:''
       })
   }

   setValueDate = (event, selectedDate) => {
        if(event.type==='set'){
           this.setState({
               birthDate:selectedDate,
               dateVisible:false
           })
        }
   }
   getDateFormat = (date) => {
    if(Object.prototype.toString.call(date) !== '[object Date]') return date

    return (
        date.getDate()+' '+MONTH_NAME[date.getMonth()]+' '+date.getFullYear()
    )
  }

   renderDatePicker = () => {
    const { personClass, dateVisible } = this.state
    if (dateVisible && personClass==='child') {
      return (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(TODAY.getFullYear()-2,TODAY.getMonth(),TODAY.getDay())}
          maximumDate={TODAY}
          mode='date'
          is24Hour={true}
          display="default"
          onChange={(event, selectedData) => this.setValueDate(event, selectedData)}
        />
      )
    }
    if (dateVisible && personClass==='infant') {
        return (
          <DateTimePicker
            testID="dateTimePicker"
            value={TODAY}
            maximumDate={TODAY}
            mode='date'
            is24Hour={true}
            display="default"
            onChange={(event, selectedData) => this.setValueDate(event, selectedData, 'departureDate')}
          />
        )
      }
   }


    render() { 
        const {
            allCountryName, errorMessage, 
            id, 
            title, 
            name, 
            nationality, 
            birthDate,
            personClass} = this.state
        return (
          <SafeAreaView style={{flex:1}}>
            <FlightsHeader 
                rightIcon='close' 
                rightIconHandler={() => this.props.navigation.goBack()} 
                leftIcon='empty' 
                header='TravelerDetail' {...this.props}/>
            <View style={styles.TravelerDetailContainer}>
                <View style={styles.container}>
                    <Text style={styles.containerLabel}>Title</Text>
                    <Picker
                        selectedValue={this.state.title}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setValue('title',itemValue)
                        }
                        mode='dropdown'>
                        <Picker.Item label="Mr. " value="Mr. " />
                        <Picker.Item label="Mrs. " value="Mrs. " />
                        <Picker.Item label="Ms. " value="Ms. " />
                    </Picker>
                </View>
                <Input
                    placeholder={'Fullname of '+personClass}
                    label='Fullname'
                    value={this.state.name}
                    onChangeText={value => this.setValue('name',value)}
                    containerStyle={styles.input}
                    errorMessage={errorMessage}
                />
                {
                    personClass!=='adult'?
                    <>
                    <View style={[styles.container,{bottom:30}]}>
                    <Text style={styles.containerLabel}>Birth Date</Text>
                    <TouchableOpacity
                    style={styles.date} 
                    onPress={() => this.setState({ dateVisible:true })}>
                        <Text>{this.state.birthDate? this.getDateFormat(this.state.birthDate) : 'Fill the Birth Date'}</Text>
                        <MaterialIcon 
                            name='today'
                            color='gray'
                            size={25}
                        />
                    </TouchableOpacity>
                    </View>
                    {this.renderDatePicker()}
                    </>
                    :
                    null
                }
                <View style={[styles.container,{bottom:30}]}>
                    <Text style={styles.containerLabel}>Nationality</Text>
                    <Picker
                        selectedValue={this.state.nationality}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setValue('nationality',itemValue)
                        }
                        mode='dropdown'>
                        {
                        COUNTRY.map((data,index)=> {
                            return  <Picker.Item key={index} label={data.name} value={data.name} />
                        })
                        }
                    </Picker>
                </View>
                <Button
                    title="Save"
                    containerStyle={{
                        marginHorizontal:50,
                        marginTop:10,
                    }}
                    buttonStyle={{
                        backgroundColor:COLOR.secondary,
                        height:50
                    }}
                    onPress={() => {
                        if(personClass!=='adult'){
                            if(!name || !birthDate) return this.setState({ errorMessage:'Name Must Be Filled' })
                        }else{
                            if(!name) return this.setState({ errorMessage:'Name Must Be Filled' })
                        }

                        this.props.navigation.navigate('Book1FillDetails',{
                            travelerDetailEdit:{
                                id,
                                title,
                                name,
                                birthDate:this.getDateFormat(birthDate),
                                nationality
                            }
                        })
                    }}
                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.3))', false)}
                /> 

            </View> 
            </SafeAreaView>
        );
    }
}
 
export default TravelerDetail;

const styles = StyleSheet.create({
      TravelerDetailContainer:{
          height:500,
          backgroundColor:'#fff'
      },
      container:{
        marginVertical:10,
        borderBottomColor:COLOR.gray,
        borderBottomWidth:2,
        marginHorizontal:20,
      },
      containerLabel:{
        fontSize:13,
        color:'gray',
        top:10
      },
      input:{
        width:'93%',
        marginLeft:10,
        marginVertical:20,
      },
      date:{
          height:50,
          justifyContent:'space-between',
          alignItems:'center',
          flexDirection:'row',
          paddingHorizontal:5
      }
});