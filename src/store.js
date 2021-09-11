  
import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducers';
import flightsSearchReducer from './reducers/flightsSearchReducers';
import flightsChosenReducer from './reducers/flightsChosenReducers';
import travelerReducer from './reducers/travelerReducers';
import priceBookingReducer from './reducers/priceReducers';
import paymentMethodListReducer from './reducers/paymentMethodListReducers';

const rootReducer = combineReducers(
    { 
    auth: authReducer,
    flightsSearch: flightsSearchReducer,
    flightsChosen: flightsChosenReducer,
    traveler: travelerReducer,
    price: priceBookingReducer,
    payment: paymentMethodListReducer
    }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;