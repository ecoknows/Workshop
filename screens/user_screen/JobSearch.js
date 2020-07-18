import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function JobSearch() {
  return (
    <View style={styles.container}>
      <Text>JobSearch</Text>
    </View>
  );
}

export default JobSearch;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
