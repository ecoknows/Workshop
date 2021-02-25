import {DrawerType, DRAWER_TEXT,BOTTOM_DRAWER_TEXT, BottomDrawerType} from '../types/navigation.types';

interface NAVIGATION_INTERFACE {
    drawer: boolean
}
interface BOTTOM_NAVIGATION_INTERFACE {
    bottomDrawer: {status: boolean, tabSelected: number}
}

const initialState: NAVIGATION_INTERFACE = {
    drawer: false,
}

const bottomInitialState: BOTTOM_NAVIGATION_INTERFACE = {
    bottomDrawer: {status: false, tabSelected: 0},
}
export function drawerReducer(state : NAVIGATION_INTERFACE = initialState, action : DrawerType): NAVIGATION_INTERFACE{
    switch(action.type){
        case DRAWER_TEXT:
            return {drawer: action.payload}
        default : 
            return state;
    }
};

export function bottomDrawerReducer(state : BOTTOM_NAVIGATION_INTERFACE = bottomInitialState, action : BottomDrawerType): BOTTOM_NAVIGATION_INTERFACE{
    switch(action.type){
        case BOTTOM_DRAWER_TEXT:
            return {bottomDrawer: action.payload}
        default : 
            return state;
    }
};
