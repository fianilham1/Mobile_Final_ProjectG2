import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key) => {
    return new Promise((resolve) => {
        AsyncStorage.getItem(key)
        .then(jsonValue => {
            resolve(jsonValue != null ? JSON.parse(jsonValue) : null)
        })
    })
    .catch(e => console.log('error reading value async storage')) 
  }

export const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.log('error storing value async storage')
    }
  }