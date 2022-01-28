import { types } from '../types/types';


const initialState = {
    paises: [],
    docs:[],
    sr: [],
    activeDoc: null
};


export const paisReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.paisLoaded:
            return {
                ...state,
                paises: [ ...action.payload ]
            }
        case types.docLoaded:
            return {
                ...state,
                docs: [ ...action.payload ]
            }
        case types.srLoaded:
            return {
                ...state,
                sr: [ ...action.payload ]
            }
        case types.authLoaded:
            return {
                ...state,
                users: [ ...action.payload ]
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
