import { ActionCreator } from 'redux';
import {DRAWER_TEXT} from '../types';


 export function openDrawerAction(status: boolean){
     return{
         type: DRAWER_TEXT,
         payload: true,
     }
 }
 export function closeDrawerAction(status: boolean){
     return{
         type: DRAWER_TEXT,
         payload: false,
     }
 }