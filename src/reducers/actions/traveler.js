import { TRAVELER_DETAIL, UPDATE_TRAVELER } from "./types";


export const travelerDetail = (detail) => (
    {
        type:TRAVELER_DETAIL,
        data:detail
    }
);

export const updateTraveler = (detail) => (
    {
        type:UPDATE_TRAVELER,
        data:detail
    }
);

