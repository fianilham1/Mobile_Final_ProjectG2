
import { PAYMENT_METHOD_LIST } from "./types";

export const paymentMethodList = (list) => (
    {
        type:PAYMENT_METHOD_LIST,
        data:list
    }
);