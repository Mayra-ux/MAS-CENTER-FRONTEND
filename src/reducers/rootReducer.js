import {combineReducers} from 'redux';
import { authReducer } from './authReducer';
import { checkReducer } from './checkReducer';
import { customReducer } from './customReducer';
import { paisReducer } from './paisReducer';
import { uiReducer } from './uiReducer';

//add by Mayra
import { blogCardsReducer } from './blogCardsReducer';
import { blogCarouselReducer} from './blogCarouselReducer';
import { blogErizoReducer } from './blogErizoReducer';
import { blogSpecialRulesReducer} from './blogSpecialRulesReducer';
import { blogObsoleteRulesReducer} from './blogObsoleteRulesReducer';
import { blogMemesReducer} from './blogMemesReducer';



export const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    paises: paisReducer,
    custom: customReducer,
    check: checkReducer,
    cards:  blogCardsReducer,
    carousel: blogCarouselReducer,
    erizo: blogErizoReducer,
    special: blogSpecialRulesReducer,
    obsolete: blogObsoleteRulesReducer,
    memes: blogMemesReducer
})