import { PURCHASE_DETAIL } from "./actions/types";


const initialState = {}

const purchaseDetailReducer = (state = initialState,action) => {
    switch(action.type){
        case PURCHASE_DETAIL:
            return action?.data
        default:
            return state
    }
}

export default purchaseDetailReducer;