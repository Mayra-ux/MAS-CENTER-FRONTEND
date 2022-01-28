//ADD BY MAYRA

import { types } from "../types/types";

const initialState ={

    erizo: [],
    activeDoc : null
}

export const blogErizoReducer = (state = initialState, action) => {

    switch(action.type){
        case types.blogErizoLoaded:
            return {
                ...state,
                erizo: [ ...action.payload ]
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