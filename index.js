/**
 * @format
 */

 import 'react-native-gesture-handler';
 import React from 'react';
 import {AppRegistry} from 'react-native';
 import App from './src/App';
 import {name as appName} from './app.json';
 import {Provider} from 'react-redux';
 import configureStore from './src/store';
 import { SafeAreaProvider } from 'react-native-safe-area-context';
 
 const store = configureStore();
 
 const RNRedux = () => 
     <Provider store={store}>
         <SafeAreaProvider>
             <App />
         </SafeAreaProvider>
     </Provider>
    
 AppRegistry.registerComponent(appName, () => RNRedux);
 
