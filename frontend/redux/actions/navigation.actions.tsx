
import {DRAWER_TEXT, BOTTOM_DRAWER_TEXT} from '../types/navigation.types';


export function openDrawerAction(){
     return{
         type: DRAWER_TEXT,
         payload: true,
     }
 }
 export function closeDrawerAction(){
     return{
         type: DRAWER_TEXT,
         payload: false,
     }
 }
 export function openBottomDrawerAction({status, tabSelected}: {status: boolean, tabSelected: number}){
     return{
         type: BOTTOM_DRAWER_TEXT,
         payload: {status,tabSelected},
     }
 }

 export function closeBottomDrawerAction({status, tabSelected}: {status: boolean, tabSelected: number}){
    return{
        type: BOTTOM_DRAWER_TEXT,
        payload: {status,tabSelected},
    }
}