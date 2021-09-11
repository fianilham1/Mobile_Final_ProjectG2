import { PRICE_BOOKING, ADD_INSURANCES, ADD_BAGGAGE_SEATTYPE, SELECT_PAYMENT_METHOD } from "./types";


export const priceBooking = (price) => (
    {
        type:PRICE_BOOKING,
        data:price
    }
);

export const addInsurances = (ins) => (
    {
        type:ADD_INSURANCES,
        data:ins
    }
);

export const addBaggageSeatType = (facilities) => (
    {
        type:ADD_BAGGAGE_SEATTYPE,
        data:facilities
    }
);

export const selectPaymentMethod = (payment) => (
    {
        type:SELECT_PAYMENT_METHOD,
        data:payment
    }
);