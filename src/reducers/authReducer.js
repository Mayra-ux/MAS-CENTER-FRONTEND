import { types } from "../types/types";

const initialState ={
    checking: true,
    uid: null,
    name: null,
    role: null,
    status: null,
    shift:null, 
    hub:null, 
    breakT:null,
    users: []
}

export const authReducer = (state = initialState, action) => {

    switch(action.type){
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }

        case types.authCheckingFinish:
            return {
                ...state,
                ...action.payload,
                checking: false
            }

        case types.authLogout:
            return {
                checking: false
            }

        default:
            return state;
    }
}