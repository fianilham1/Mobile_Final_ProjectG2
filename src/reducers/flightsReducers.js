import { FLIGHTS_SEARCH_INFO } from "./actions/types";


const initialState = {
   departureAirport:'',
   arrivalAirport:'',
   airportCityFlight:{},
   airportCodeFlight:{},
   passengers:{},
   totalPassengers:0,
   seatClass:'',
   departureDate:'',
   returnDate:'',
   includeFlexibleTicket:false
}

const flightsReducer = (state = initialState,action) => {
    switch(action.type){
        case FLIGHTS_SEARCH_INFO:
            return {
                ...state,
                departureAirport:action?.data?.departureAirport,
                arrivalAirport:action?.data?.arrivalAirport,
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