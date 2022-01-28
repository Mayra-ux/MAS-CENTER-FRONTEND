import { types } from "../types/types";

const initialState = {
    modalOpenDoc: false,
    modalOpenBug: false,
    modalErizo: false,
    modalMemes: false,
    modalSpecial: false,
    modalObsolete: false,
}



export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.uiOpenModalDoc:
            console.log(action)
            return {
                ...state,
                modalOpenDoc: true
            }

        case types.uiCloseModalDoc:
            return {
                ...state,
                modalOpenDoc: false
            }
        case types.uiOpenModalBug:
            return {
                ...state,
                modalOpenBug: true
            }

        case types.uiCloseModalBug:
            return {
                ...state,
                modalOpenBug: false
            }

            case types.uiOpenModalErizo:
                return {
                    ...state,
                    modalErizo: true
                }
    
            case types.uiCloseModalErizo:
                return {
                    ...state,
                    modalErizo: false
                }
            case types.uiOpenModalMemes:
                return {
                        ...state,
                        modalMemes: true
                    }
        
            case types.uiCloseModalMemes:
                return {
                        ...state,
                        modalMemes: false
                    }
            case types.uiOpenModalSpecialRules:
                return {
                            ...state,
                            modalSpecial: true
                    }
            
            case types.uiCloseModalSpecialRules:
                return {
                            ...state,
                            modalSpecial: false
                    }
            case types.uiOpenModalObsoleteRules:
                return {
                            ...state,
                            modalObsolete: true
                    }
            
            case types.uiCloseModalObsoleteRules:
                return {
                            ...state,
                            modalObsolete: false
                    }


        
        default:
            return state;
    }


}