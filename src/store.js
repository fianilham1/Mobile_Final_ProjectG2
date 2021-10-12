  
import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducers';
import flightsSearchReducer from './reducers/flightsSearchReducers';
import flightsChosenReducer from './reducers/flightsChosenReducers';
import travelerReducer from './reducers/travelerReducers';
import priceBookingReducer from './reducers/priceReducers';
import paymentMethodListReducer from './reducers/paymentMethodListReducers';
import purchaseDetailReducer from './reducers/purchaseDetailReducers';
import loadingApiReducer from './reducers/loadingApiReducers';

const rootReducer = combineReducers(
    { 
    auth: authReducer,
    flightsSearch: flightsSearchReducer,
    flightsChosen: flightsChosenReducer,
    traveler: travelerReducer,
    price: priceBookingReducer,
    payment: paymentMethodListReducer,
    purchaseDetail: purchaseDetailReducer,
    loading: loadingApiReducer
    }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;