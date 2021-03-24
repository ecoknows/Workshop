import React from 'react';
import View from './View';
import Text from './Text';
import { StyleSheet, ScrollView } from 'react-native';
import { theme } from '../constants';

interface TableProps<ItemT> {
  data: ItemT[];
  maxHeight?: string | number;
  renderItem: (props: { item: ItemT }, index: number) => void;
  renderHeader: () => void;
}

function Table<ItemT>(props: TableProps<ItemT>) {
  const { renderItem, renderHeader, maxHeight } = props;
  let { data } = props;
  if (data == undefined) data = [];

  return (
    <View style={{ width: '100%', maxHeight }}>
      <View>{renderHeader()}</View>

      <ScrollView>
        {data.map((item, index) => renderItem({ item }, index))}
      </ScrollView>
    </View>
  );
}

export default Table;
