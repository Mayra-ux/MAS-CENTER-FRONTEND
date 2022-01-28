import { types } from "../types/types";

const initialState ={

    obsolete: [],
    activeDoc : null
}

export const blogObsoleteRulesReducer = (state = initialState, action) => {

    switch(action.type){
        case types.blogObsoleteRulesLoaded:
            return {
                ...state,
                obsolete: [ ...action.payload ]
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