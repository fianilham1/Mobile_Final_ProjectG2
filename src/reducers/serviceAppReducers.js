import { SERVICE_LOADING } from "./actions/types";


const initialState = {
    serviceLoading:false,
}

const serviceAppReducers = (state = initialState,action) => {
    switch(action.type){
        case SERVICE_LOADING:
            return {
                ...state,
                serviceLoading:action?.data
            }
        default:
            return state
    }
}

export default serviceAppReducers;