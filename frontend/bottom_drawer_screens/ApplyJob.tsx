import React, {useState} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import Button from '../components/Button';

import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {theme} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {add_applicant, closeBottomDrawerAction, RootState} from '../redux';

interface ApplyJobProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}

function ApplyJob(props: ApplyJobProps) {
  const {UserChoice, drawer_anim} = props;
  const CreateJobState = useSelector(
    (state: RootState) => state.jobsSelectedState,
  );
  const {userData}: any = useSelector((state: RootState) => state.userDetails);
  const {jobSelected}: any = CreateJobState;
  const dispatch = useDispatch();

  // const socket = useRef<any>();
  // useEffect(() => {
  //   socket.current = socketIOClient(local_url, {
  //     query: {roomId: '1234'},
  //   });
  //   return () => socket.current.disconnect();
  // }, []);

  return (
    <View
      bottom={0}
      animated
      style={[
        styles.drawerView,
        {
          height: UserChoice.height,
          transform: [
            {
              translateY: drawer_anim,
            },
          ],
        },
      ]}>
      <View flex>
        <View row center middle>
          <Text bold size={21} color="#65676A">
            Job
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', left: '2%', padding: 10}}
            onPress={() => {
              dispatch(closeBottomDrawerAction('Apply Job'));
            }}>
            <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
          </TouchableOpacity>
        </View>

        <ScrollView style={{height: '100%'}}>
          <View center middle paddingVertical={30}>
            <View>
              <Pic
                src={
                  jobSelected.icons != -1
                    ? jobSelected.icons
                    : require('../assets/icons/profile/job_icons/icon_0.png')
                }
                scale={65}
              />
            </View>

            <View paddingTop={30}>
              <Text gray medium size={18}>
                {jobSelected.job}
              </Text>
            </View>
          </View>

          <View paddingHorizontal={20} marginTop={20}>
            <View row marginBottom={45}>
              <Text bold gray size={18} style={{marginEnd: 10}}>
                Available Positions:
              </Text>
              <Text gray size={18}>
                {jobSelected.max_workers - jobSelected.current_workers}
              </Text>
            </View>

            <Text bold size={18} gray>
              Job Description:
            </Text>
          </View>

          <View paddingHorizontal={30} paddingBottom={20}>
            <Text medium size={15} gray>
              {jobSelected.description}
            </Text>
            <View row marginTop={20} alignSelf="flex-end">
              {jobSelected.max_workers - jobSelected.current_workers > 0 &&
              !userData.is_employer ? (
                <Button
                  onPress={() => {
                    dispatch(
                      add_applicant({
                        job_id: jobSelected._id,
                        job_name: jobSelected.job,
                        person_of_contact_id: jobSelected.employer_id,
                        person_of_contact: jobSelected.employer_full_name,
                        person_of_contact_profile: jobSelected.employer_profile,
                        person_of_contact_position:
                          jobSelected.employer_position,
                      }),
                    );
                  }}>
                  Apply
                </Button>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ApplyJob;

const styles = StyleSheet.create({
  drawerView: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'white',
    width: '100%',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderWidth: 2,
    borderColor: '#FF900D',
    paddingTop: 15,
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '103%',
    height: theme.height,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    borderWidth: 2,
    borderColor: '#FF900D',
  },
  updateTop: {
    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
    paddingVertical: 3,
    marginHorizontal: '10%',
  },
});
