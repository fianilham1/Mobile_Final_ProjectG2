import { PAYMENT_METHOD_LIST} from "./actions/types";


const initialState = {
    purchaseId:0,
    thirdPartyPaymentList:[],
    totalPrice:0
}
//list of third party payment (bank) and its VA Number


const paymentMethodListReducer = (state = initialState,action) => {
    switch(action.type){
        case PAYMENT_METHOD_LIST:
            return {
                ...state,
                purchaseId:action?.data?.purchaseId,
                thirdPartyPaymentList:action?.data?.thirdPartyPaymentList,
                totalPrice:action?.data?.totalPrice,
            }
        default:
            return state
    }
}

export default paymentMethodListReducer;

