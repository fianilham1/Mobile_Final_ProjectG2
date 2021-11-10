import { PURCHASE_DETAIL } from "./types";


export const purchaseDetail = (detail) => (
    {
        type:PURCHASE_DETAIL,
        data:detail
    }
);
