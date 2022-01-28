import { types } from "../types/types";

const initialState ={
    customs: [],
    customsDocs:[],
    dashb:[],
    dashDocs:[],
}

export const customReducer = (state = initialState, action) => {

    switch(action.type){
        case types.customLoaded:
            return {
                ...state,
                customs: [ ...action.payload ]
            }
        case types.cdLoaded:
            return {
                ...state,
                customsDocs: [ ...action.payload ]
            }
        case types.dashbLoaded:
            return {
                ...state,
                dashb: [ ...action.payload ]
            }
        case types.ddLoaded:
            return {
                ...state,
                dashDocs: [ ...action.payload ]
            }

        default:
            return state;
    }
}