//ADD BY MAYRA

import { types } from "../types/types";

const initialState ={

    memes: [],
    activeDoc : null
}

export const blogMemesReducer = (state = initialState, action) => {
//console.log("action: " + JSON.stringify(action));

    switch(action.type){

        case types.blogMemesLoaded:
            // console.log("entra switch: ")
            return {
                ...state,
                memes: [ ...action.payload ]
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


// ...state
// { memes: [ lista-de-memes-db ], activeDoc: null }
//