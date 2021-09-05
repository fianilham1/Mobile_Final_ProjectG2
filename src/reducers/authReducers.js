import { SIGN_IN_OK, SIGN_OUT, UPDATE_TOKEN, STORE_USER_FORGOTPASS } from "./actions/types";


const initialState = {
    loggedUserProfile:null,
    loginStatus:false,
    token:null,
    tokenType:null,
    forgotPassUsername:null
}

const edit = (list, newData) => {
    const dataList = [...list];
    const index = list.findIndex(item => item.id === newData.id);
    dataList.splice(index, 1, newData);
    return dataList
}

const authReducer = (state = initialState,action) => {
    switch(action.type){
        case SIGN_IN_OK:
            return {
                ...state,
                loggedUserProfile:action?.data?.loggedUserProfile,
                loginStatus:true,
                token:action?.data?.token, //token : {token:'XXXXXXXXXXXXXXXX', tokenType:'...'}
                tokenType:action?.data?.tokenType
            }
         case STORE_USER_FORGOTPASS:
            return {
                ...state,
                forgotPassUsername:action?.data?.username,
                token:action?.data?.token,  //token : {token:'XXXXXXXXXXXXXXXX', tokenType:'...'}
                tokenType:action?.data?.tokenType
            }
        case UPDATE_TOKEN:
            return {
                ...state,
                loginStatus:true,
                token:action?.data?.token,  //token : {token:'XXXXXXXXXXXXXXXX', tokenType:'...'}
                tokenType:action?.data?.tokenType
            }
        case SIGN_OUT:
            return {
                ...state,
                loggedUserProfile:null,
                loginStatus:false,
                token:null,
                tokenType:null
            }
        default:
            return state
    }
}

export default authReducer;