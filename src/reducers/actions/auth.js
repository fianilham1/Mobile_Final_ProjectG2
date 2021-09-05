import { SIGN_IN_OK,  SIGN_OUT, UPDATE_TOKEN, STORE_USER_FORGOTPASS } from "./types";


export const signIn = (user) => (
    {
        type:SIGN_IN_OK,
        data:user
    }
);

export const storeUserForgotPass = (user) => (
    {
        type:STORE_USER_FORGOTPASS,
        data:user
    }
);

export const updateToken = (token) => (
    {
        type:UPDATE_TOKEN,
        data:token
    }
);

export const signOut = () => (
    {
        type:SIGN_OUT,
    }
);

