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
import {connect} from "react-redux";
import { updateTraveler } from '../../reducers/actions/traveler';
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
          errorMessageTitle:'',
          errorMessageName:'',
          errorMessageBirth:'',
          dateVisible:false
        }
    }

    componentDidMount(){
        const { travelerDetail } = this.props.route.params
        console.log(travelerDetail)
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
           errorMessageName:'',
           errorMessageTitle:''
       })
   }

   setValueDate = (event, selectedDate) => {
        if(event.type==='set'){
           this.setState({
               birthDate:selectedDate,
           })
        }
        this.setState({
            dateVisible:false,
            errorMessageBirth:''
        })
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
            allCountryName, errorMessageName, errorMessageBirth, errorMessageTitle,
            id, 
            title, 
            name, 
            nationality, 
            birthDate,
            personClass} = this.state
        return (
          <>
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
                        <Picker.Item label="" value="" />
                        <Picker.Item label="Mr. " value="Mr. " />
                        <Picker.Item label="Mrs. " value="Mrs. " />
                        <Picker.Item label="Ms. " value="Ms. " />
                    </Picker>
                    <Text style={{color:'red', fontSize:12,position:'absolute',top:75}}>{errorMessageTitle}</Text>
                </View>
                <Input
                    placeholder={'Fullname of '+personClass}
                    label='Fullname'
                    value={this.state.name}
                    onChangeText={value => this.setValue('name',value)}
                    containerStyle={styles.input}
                    errorMessage={errorMessageName}
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
                    <Text style={{color:'red', fontSize:12,position:'absolute',top:70}}>{errorMessageBirth}</Text>
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
                            if(!title) this.setState({ errorMessageTitle:'Title Must Be Filled' })
                            if(!name) this.setState({ errorMessageName:'Name Must Be Filled' })
                            if(!birthDate) return this.setState({ errorMessageBirth:'BirthDate Must Be Filled' })
                        }else{
                            if(!title) this.setState({ errorMessageTitle:'Title Must Be Filled' })
                            if(!name) return this.setState({ errorMessageName:'Name Must Be Filled' })
                        }
                        const newDataTraveler = {
                            id,
                            title,
                            name,
                            birthDate:this.getDateFormat(birthDate),
                            nationality
                        }
                        this.props.doUpdateTraveler(newDataTraveler)
                        this.props.navigation.goBack()
                    }}
                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.3))', false)}
                /> 

            </View> 
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    doUpdateTraveler: data => dispatch(updateTraveler(data))
  })
 
export default connect(null, mapDispatchToProps)(TravelerDetail);

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