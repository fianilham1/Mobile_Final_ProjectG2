import { PAYMENT_METHOD_LIST} from "./actions/types";


const initialState = []
//list of third party payment (bank) and its VA Number


const paymentMethodListReducer = (state = initialState,action) => {
    switch(action.type){
        case PAYMENT_METHOD_LIST:
            return action?.data
        default:
            return state
    }
}

export default paymentMethodListReducer;

