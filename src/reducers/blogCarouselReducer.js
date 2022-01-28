//ADD BY MAYRA

import { types } from "../types/types";

const initialState ={

    carousel: [],
    activeDoc : null
}

export const blogCarouselReducer = (state = initialState, action) => {

    switch(action.type){
        case types.blogCarouselLoaded:
            return {
                ...state,
                carousel: [ ...action.payload ]
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