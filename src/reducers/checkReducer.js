import { types } from "../types/types";

const initialState ={
    check: [],
    checkE:[]
}

export const checkReducer = (state = initialState, action) => {

    switch(action.type){
        case types.checkloads:
            return {
                ...state,
                check: [ ...action.payload ]
            }
        case types.checkExtrasloads:
            return {
                
                ...state,
                checkE: [ ...action.payload ]
            }

        default:
            return state;
    }
}