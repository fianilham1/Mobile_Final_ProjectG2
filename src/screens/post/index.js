import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLOR } from '../../constant/color';
import {InputApp, } from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    StatusBar,
    Image} from 'react-native';

import {ListItem} from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Header } from 'react-native-elements'; 

const WIDTH= Dimensions.get('window').width;

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task:'', 
            todo:[
                {id:1,task:'Breakfast',status:false},
                {id:2,task:'Study',status:false},
                {id:3,task:'Watch Movie H',status:false},
                {id:4,task:'Play ML',status:false}
            ],
            isFocusTodo:false
         }
    }

    setFocus = name => {
        const nameFocus = `isFocus${name}`
        this.setState({
            [nameFocus]:!this.state[nameFocus]
        })
    }

    setValue = (inputName, value) => {
       this.setState({
        [inputName]:value,
        validUsername:true,
        validPassword:true
       })
    }

    toggleStatus = id => {
        const {todo} = this.state
        const dataList = [...todo];
        const index = todo.findIndex(item => item.id === id);
        const newData = {
            ...dataList[index],
            status:true
        }
        dataList.splice(index, 1,newData);
        this.setState({
            todo:dataList
        })
    }

    renderImage = (status,id) => {
    return status ? 
    <TouchableOpacity onPress={() => this.toggleStatus(id)}>
    <FeatherIcon 
    name='check-circle'
    size={20}
    color='green'
    />
    </TouchableOpacity>
    :
    <TouchableOpacity onPress={() => this.toggleStatus(id)}>
    <FeatherIcon 
    name='circle'
    size={20}
    color='gray'
    />
    </TouchableOpacity>
   
    }

    renderItem = ({item}) => {
        return (
          <ListItem 
          bottomDivider={true} 
        //   onPress={() => this.props.navigation.navigate('ContactDetail',{itemData:item})}
          >
            {this.renderImage(item.status,item.id)}
            <ListItem.Content>
                <ListItem.Title>{item.task}</ListItem.Title>
                <ListItem.Subtitle>Task</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      }

      addRow = () => {
        const {task} = this.state
        const {todo} = this.state
        if(task!==''){
            const dataList = [...todo];
            const id = todo.length===0 ? 1 : Math.max(...todo.map(item => item.id)) + 1
            dataList.push({
                id,
                task,
                status:false
              })
              this.setState({
                todo:dataList
              })
        }
      }

      deleteRow = (rowMap, rowKey) => {
        const {todo} = this.state
        this.closeRow(rowMap, rowKey);
        const dataList = [...todo];
        const index = todo.findIndex(item => item.id === rowKey);
        dataList.splice(index, 1);
        this.setState({
            todo:dataList
        })
    }

      closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

      renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <Text>Left</Text>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => this.closeRow(rowMap, data.item.id)}
            >
            <Icon
              name='window-close'
              size={20}
              color='white'
            />
            <Text style={{color:'white'}}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => this.deleteRow(rowMap, data.item.id)}
            >
            <Icon
              name='trash'
              size={20}
              color='white'
            />
             <Text style={{color:'white'}}>Delete</Text>
            </TouchableOpacity>
        </View>
      );


    render() { 
        // console.log(this.state.task)
        return (  
            <View style={{ flex: 1 }}>
                <Header
                statusBarProps={{barStyle: 'dark-content',backgroundColor:'#fff'  }}
                leftComponent={
                    <View>
                         <Text style={{color:'white',fontWeight:'bold', fontSize:17,marginTop:10}}>To-Do</Text>
                    </View>
                   
                }
                rightComponent={
                    <View>
                        <Text style={{color:'white',fontWeight:'bold', fontSize:17, width:100,marginTop:10}}>2021-08-10</Text>
                    </View>
                }
                // centerComponent={{ text: itemData.name, style: { fontSize:17, fontWeight:'bold',color: '#fff' } }}
                containerStyle={{
                    backgroundColor: COLOR.main,
                    justifyContent: 'space-around',
                }}
                />

                <SwipeListView 
                disableRightSwipe
                data={this.state.todo}
                keyExtractor = {(item) => {
                    return item.id;
                }}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={this.onRowDidOpen}
                />

                <View style={{marginBottom:50,marginLeft:-20,marginRight:30}}>
                <InputApp 
                    state={this.state}
                    label="Task"
                    name="Task"
                    valid={true}
                    setFocus={this.setFocus}
                    setValue={this.setValue}
                    icon="pencil"/>
                <TouchableOpacity
                onPress={() => this.addRow()}
                style={styles.buttonAdd}>
                  <AntDesign 
                    name='plus'
                    size={26}
                    color='white'
                  />
                </TouchableOpacity>
                

                </View>

               
            </View>
        );
    }
}
 
export default Post;

const styles = StyleSheet.create({
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: '#05375a',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    pic: {
      borderRadius: 30,
      width: 60,
      height: 60,
    },
    buttonAdd:{
      alignItems:'center',
      justifyContent:'center',
      top:-65,
      left:WIDTH*0.75,
      height:75,
      width:75,
      borderRadius:40,
      backgroundColor:COLOR.main
    },
  });