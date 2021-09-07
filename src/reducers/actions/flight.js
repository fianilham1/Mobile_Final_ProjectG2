import { FLIGHTS_SEARCH_INFO } from "./types";


export const flightSearchInfo = (info) => (
    {
        type:FLIGHTS_SEARCH_INFO,
        data:info
    }
);

