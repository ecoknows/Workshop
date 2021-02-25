import React from 'react';
import View from './View';
import Text from './Text';
import {StyleSheet, ScrollView} from 'react-native';
import { theme } from '../constants';

interface TableProps<ItemT>{
    header: string[],
    data: ItemT[],
    height: string | number,
    renderItem: (props: {item: ItemT}, index: number) => void,
    renderHeader: () => void,
}

function Table<ItemT>(props : TableProps<ItemT>){
    const {
        header, 
        data, 
        renderItem, 
        renderHeader,
        height,
    } = props;
    return(
        <View style={{width: '100%'}}> 

            <View>
                {renderHeader()}
                
            </View>

            <ScrollView style={{height: height ? height : theme.height * .5 }}>
                {
                    data.map(
                        (item, index)=>renderItem({item}, index)
                    )
                }
            </ScrollView>
        </View>
    )
}

export default Table;