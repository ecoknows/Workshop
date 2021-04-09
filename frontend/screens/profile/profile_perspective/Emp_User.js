import React, {useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {View, Text, Pic, Table} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {openBottomDrawerAction, openDrawerAction} from '../../../redux';
import Skills from '../../../components/Skills';
import {theme} from '../../../constants';
import {add_selected_job, get_jobs} from '../../../redux/actions/jobs.actions';
import {local_url} from '../../../constants/urls';
import {height} from '../../../constants/theme';
import Toast from 'react-native-toast-message';

function Main({navigation}) {
  return (
    <View flex white>
      <Top navigation={navigation} />
      <Bottom />
    </View>
  );
}

function Top({navigation}) {
  const dispatch = useDispatch();
  const JobsState = useSelector(state => state.jobsListState);
  const UserState = useSelector(state => state.userDetails);

  const CreateJobState = useSelector(state => state.jobCreateState);
  const {jobCreated} = CreateJobState;

  const {error, loading, jobs} = JobsState;
  const {userData} = UserState;
  useEffect(() => {
    dispatch(get_jobs());
  }, [jobCreated]);

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: StatusBar.currentHeight,
        height: '100%',
      }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: '5%',
          top: StatusBar.currentHeight,
          height: 40,
          width: 40,
          alignItems: 'flex-end',
        }}
        onPress={() => {
          dispatch(openDrawerAction(0));
        }}>
        <Pic
          src={require('../../../assets/icons/burger.png')}
          style={{resizeMode: 'contain', height: 20, width: 20}}
        />
      </TouchableOpacity>

      <View center middle>
        <Pic
          src={
            userData?.profile_pic
              ? {uri: local_url + userData?.profile_pic}
              : require('../../../assets/image/user/man.png')
          }
          profile_picture
        />
        <Text extra_bold gray size={23}>
          {userData?.full_name}
        </Text>
        <Text medium size={14} gray>
          {userData?.city}, Philippines
        </Text>

        <View width={'80%'} marginVertical={5} center middle>
          <Skills
            skills={userData?.most_skilled}
            authorized={userData?.authorized || 0}
          />
        </View>
      </View>

      <View flex>
        <Table
          maxHeight={theme.height * 0.5}
          data={jobs}
          renderHeader={() => (
            <View row paddingVertical={3}>
              <View flex={1.3}>
                <Text bold gray>
                  Find Employee
                </Text>
              </View>
              <View flex middle>
                <Text bold gray>
                  Workers
                </Text>
              </View>
              <View flex middle>
                <Text bold gray>
                  Status
                </Text>
              </View>
            </View>
          )}
          renderItem={({item}, index) => (
            <TouchableOpacity
              onPress={() => {
                dispatch(openBottomDrawerAction('Job Info'));
                dispatch(add_selected_job(item));
              }}
              key={index}
              style={{
                borderTopColor: '#CCCCCC',
                borderTopWidth: 1,
                paddingVertical: 3,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View flex={1.3}>
                <Text gray>{item.job}</Text>
              </View>
              <View flex middle>
                <Text gray>
                  {item.current_workers} / {item.max_workers}
                </Text>
              </View>
              <View flex middle>
                {item.current_workers != item.max_workers ? (
                  <Text green>Available</Text>
                ) : (
                  <Text red>Full</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View middle>
        <TouchableOpacity
          style={{paddingTop: 10}}
          onPress={() => {
            dispatch(openBottomDrawerAction('Add Job'));
          }}>
          <View row middle>
            <Pic src={require('../../../assets/icons/profile/job.png')} />
            <Text semi_bold color="#145DCA">
              Add a Job
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Bottom(props) {
  return <View white flex={1.5} paddingVertical={10}></View>;
}

export default Main;

const styles = StyleSheet.create({
  bottom_botton_style_first: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#EAEAEA',
    borderBottomColor: '#EAEAEA',
    paddingHorizontal: '10%',
    paddingVertical: '2%',
  },
  bottom_botton_style: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingHorizontal: '10%',
    paddingVertical: '2%',
  },
  bottom_botton_text_style: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 10,
    color: '#917C7C',
  },
  icon: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
  },
});
