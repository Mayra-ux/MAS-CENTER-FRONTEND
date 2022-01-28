//ADD BY MAYRA

import { types } from "../types/types";

const initialState ={

    cards: [],
    activeDoc : null
}

export const blogCardsReducer = (state = initialState, action) => {
console.log(JSON.stringify (action))

    switch(action.type){
        case types.blogCardsLoaded:
            return {
                ...state,
                cards: [ ...action.payload ]
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