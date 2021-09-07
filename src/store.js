  
import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducers';
import flightsReducer from './reducers/flightsReducers';

const rootReducer = combineReducers(
    { 
    auth: authReducer,
    flights: flightsReducer
    }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;