
import {DRAWER_TEXT, BOTTOM_DRAWER_TEXT} from '../types/navigation.types';


export function openDrawerAction(tabSelected: number){
     return{
         type: DRAWER_TEXT,
         payload: {status : true, tabSelected},
     }
 }
 export function closeDrawerAction(tabSelected: number){
     return{
         type: DRAWER_TEXT,
         payload: {status : false, tabSelected},
     }
 }
 export function openBottomDrawerAction(tabSelected: number){
     return{
         type: BOTTOM_DRAWER_TEXT,
         payload: {status: true,tabSelected},
     }
 }

 export function closeBottomDrawerAction(tabSelected: number){
    return{
        type: BOTTOM_DRAWER_TEXT,
        payload: {status: false,tabSelected},
    }
}