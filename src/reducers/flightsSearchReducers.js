import { FLIGHTS_SEARCH_INFO } from "./actions/types";


const initialState = {
   fromAirport:'',
   toAirport:'',
   airportCityFlight:{},
   airportCodeFlight:{},
   passengers:{},
   totalPassengers:0,
   seatClass:'',
   departureDate:'',
   returnDate:'',
   includeFlexibleTicket:false,
   sortBy:'EarliestDeparture'
}

const flightsReducer = (state = initialState,action) => {
    switch(action.type){
        case FLIGHTS_SEARCH_INFO:
            return {
                ...state,
                fromAirport:action?.data?.fromAirport,
                toAirport:action?.data?.toAirport,
                airportCityFlight:action?.data?.airportCityFlight,
                airportCodeFlight:action?.data?.airportCodeFlight,
                passengers:action?.data?.passengers,
                totalPassengers:action?.data?.totalPassengers,
                seatClass:action?.data?.seatClass,
                departureDate:action?.data?.departureDate,
                returnDate:action?.data?.returnDate,
                includeFlexibleTicket:action?.data?.includeFlexibleTicket
            }
        default:
            return state
    }
}

export default flightsReducer;