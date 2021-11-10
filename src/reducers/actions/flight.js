import { FLIGHTS_SEARCH_INFO, FLIGHTS_CHOSEN } from "./types";


export const flightSearchInfo = (info) => (
    {
        type:FLIGHTS_SEARCH_INFO,
        data:info
    }
);

export const flightChosen = (flight) => (
    {
        type:FLIGHTS_CHOSEN,
        data:flight
    }
);
