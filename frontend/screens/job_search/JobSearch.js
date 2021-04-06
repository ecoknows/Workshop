import React, {useEffect} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {View, Text, Pic, Button} from '../../components';
import {theme} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {add_selected_job, all_jobs} from '../../redux/actions/jobs.actions';
import {openBottomDrawerAction} from '../../redux';

function JobSearch({navigation}) {
  const dispatch = useDispatch();
  const {jobs} = useSelector(state => state.jobsAllListState);
  useEffect(() => {
    dispatch(all_jobs());
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput placeholder="Search" style={{fontSize: 18}} />
      </View>
      <FlatList
        data={jobs}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{flex: 1, padding: 8}}
            onPress={() => {
              dispatch(openBottomDrawerAction('Apply Job'));
              dispatch(add_selected_job(item));
            }}>
            <View center middle white padding={20} borderRadius={20}>
              <Pic scale={60} src={item.icons} />
              <Text
                medium
                size={18}
                style={{textAlign: 'center', marginVertical: 10}}>
                {item.job}
              </Text>
              <View
                style={[
                  styles.status_style,
                  {borderColor: theme.colors.green},
                ]}>
                <Text color={theme.colors.green} size={12}>
                  Available
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default JobSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingVertical: 30,
    paddingHorizontal: 5,
  },
  search: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: '80%',
    marginBottom: 30,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  status_style: {
    backgroundColor: 'white',
    borderColor: '#FF900D',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
});
