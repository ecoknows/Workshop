import {DrawerType, DRAWER_TEXT} from '../types';

interface NAVIGATION_INTERFACE {
    drawer: boolean
}

const initialState: NAVIGATION_INTERFACE = {
    drawer: false,
}

export function drawerReducer(state : NAVIGATION_INTERFACE = initialState, action : DrawerType): NAVIGATION_INTERFACE{
    switch(action.type){
        case DRAWER_TEXT:
            return {drawer: action.payload}
        default : 
            return state;
    }
};
