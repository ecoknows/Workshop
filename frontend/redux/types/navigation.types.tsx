export const DRAWER_TEXT = 'DRAWER';
export const BOTTOM_DRAWER_TEXT = 'BOTTOM DRAWER';
export interface DrawerType {
    type: typeof DRAWER_TEXT,
    payload: boolean
}
export interface BottomDrawerType {
    type: typeof BOTTOM_DRAWER_TEXT,
    payload: {status: boolean, tabSelected: string}
}
