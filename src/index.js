import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AllReducers from "./reducers";
import {loadState, saveState} from "./localStorage";
// import Firebase, { FirebaseContext } from './config/firebase';


const persistedState = loadState();


const store = createStore(
  AllReducers,
  // persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// store.subscribe(() => saveState(
//   store.getState()
//   ));

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
   {/* <FirebaseContext.Provider value={new Firebase()}> */}
        <App />
      {/* </FirebaseContext.Provider> */}
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
