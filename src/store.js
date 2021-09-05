  
import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducers';

const rootReducer = combineReducers(
    { 
    auth: authReducer,
    }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;