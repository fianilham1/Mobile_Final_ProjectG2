import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    PermissionsAndroid
  } from 'react-native';
 import { ListItem } from 'react-native-elements';
 import Icon from 'react-native-vector-icons/MaterialIcons';
 import RNFS from 'react-native-fs';

class TestSqlite extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    accessDir = async uri => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Your app needs permission.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                const fileName = 'project01.db'
                const filePath = '/data/user/0/com.androidproject/databases/'+fileName 

                RNFS.exists(filePath).then((status)=>{
                    if(status){
                        console.log('Yay! File exists')
                        RNFS.copyFile(filePath,RNFS.PicturesDirectoryPath+'/AndroidProject/'+fileName) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
                        .then((result) => {
                          console.log('GOT RESULT', result);
                        })
                        .then((contents) => {
                          // log the file contents
                          console.log(contents);
                        })
                        .catch((err) => {
                          console.log(err.message, err.code);
                        });
                    } else {
                        console.log('File not exists')
                    }
                    })

              
            } else {
                console.log("Camera permission denied");
                return false;
            }
        } catch (err) {
            console.log("ERROR ASKING:", err);
        }
    }

    render() { 
        return (  
            <View>
                <TouchableOpacity
                onPress={() => this.accessDir()}
                style={{width:100,height:100,backgroundColor:'red'}}
                >

                </TouchableOpacity>
                <Text>aaa</Text>
            </View>
        );
    }
}
 
export default TestSqlite;