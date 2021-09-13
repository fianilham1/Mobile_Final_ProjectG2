import { LOADING_API } from "./types";


export const loadingApi = (status) => (
    {
        type:LOADING_API,
        data:status
    }
);
