import { types } from "../types/types";

const initialState ={

    special: [],
    activeDoc : null
}

export const blogSpecialRulesReducer = (state = initialState, action) => {

    switch(action.type){
        case types.blogSpecialRulesLoaded:
            return {
                ...state,
                special: [ ...action.payload ]
            }

            case types.docActive:
            return {
                ...state,
                activeDoc: action.payload
            }
    

        default:
            return state;
    }
}