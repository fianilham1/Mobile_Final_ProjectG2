import { TRAVELER_DETAIL, UPDATE_TRAVELER } from "./actions/types";


const initialState = [ ]

const travelerReducer = (state = initialState,action) => {
    switch(action.type){
        case TRAVELER_DETAIL:
            return action?.data
        case UPDATE_TRAVELER:
            return state.map((item, index) => {
                if (index !== (action?.data.id-1)) {
                  return item
                }
                return {
                  ...item,
                  ...action.data
                }
              })
        default:
            return state
    }
}

export default travelerReducer;