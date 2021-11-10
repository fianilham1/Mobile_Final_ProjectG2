import { FLIGHTS_CHOSEN } from "./actions/types";


const initialState = []

const flightsChosenReducer = (state = initialState,action) => {
    switch(action.type){
        case FLIGHTS_CHOSEN:
            return action?.data
        default:
            return state
    }
}

export default flightsChosenReducer;

