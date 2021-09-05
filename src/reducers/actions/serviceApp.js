import { SERVICE_LOADING } from "./types";


export const serviceLoading = (status) => (
    {
        type:SERVICE_LOADING,
        data:status
    }
);