import { LOADING_API} from "./actions/types";

const initialState = {
    status:false,
    text:'Loading..',
    textStyle:{
        fontSize:18,
        marginTop:10
      }
}

const loadingApiReducer = (state = initialState,action) => {
    switch(action.type){
        case LOADING_API:
            return {
                ...state,
                status:action?.data?.status ? action?.data?.status : false,
                text:action?.data?.text ? action?.data?.text : 'Loading...',
                textStyle:action?.data?.textStyle ? action?.data?.textStyle : {
                    fontSize:18,
                    marginTop:10
                  },
            }
        default:
            return state
    }
}

export default loadingApiReducer;

