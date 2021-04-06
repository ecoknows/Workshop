import React, {useState, useEffect} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import Button from '../components/Button';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../constants';
import {closeBottomDrawerAction, RootState} from '../redux';
import {useDispatch, useSelector} from 'react-redux';
import {local_url} from '../constants/urls';

interface NotificationProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}

function Notification(props: NotificationProps) {
  const {drawer_anim} = props;
  const [viewProfile, setViewProfile] = useState(false);
  return (
    <View
      animated
      bottom={0}
      paddingHorizontal={20}
      style={[
        styles.drawerView,
        {
          height: '90%',
          transform: [
            {
              translateY: drawer_anim,
            },
          ],
        },
      ]}>
      {!viewProfile ? (
        <NotificationView setViewProfile={setViewProfile} />
      ) : (
        <ViewProfile setViewProfile={setViewProfile} />
      )}
    </View>
  );
}

function NotificationView({setViewProfile}: any) {
  const dispatch = useDispatch();
  const SelectedNotification: any = useSelector(
    (state: RootState) => state.selectedNotificationState,
  );

  return (
    <View height="100%" paddingBottom={10}>
      <View row center middle>
        <Text bold size={21} color="#65676A">
          Notification
        </Text>
        <TouchableOpacity
          style={{position: 'absolute', left: '2%', padding: 10}}
          onPress={() => {
            dispatch(closeBottomDrawerAction('Notification'));
          }}>
          <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View middle center paddingTop={40}>
          <Pic
            src={
              SelectedNotification.data.sender_profile
                ? {uri: local_url + SelectedNotification.data.sender_profile}
                : require('../assets/image/user/man.png')
            }
            profile_picture
            large
            green
          />
          <Text medium size={18} gray>
            {SelectedNotification.data.sender_name}
          </Text>
        </View>

        <View paddingTop={20} paddingStart={20} flex>
          <Text bold size={18} gray>
            {SelectedNotification.data.description}!
          </Text>

          <Text size={14} gray style={{paddingHorizontal: 20, marginTop: 10}}>
            This is to inform you that the applicant you hired above confirmed
            your hiring notice.{'\n\n'}
            Please established a connection with the employee immediately to
            negotiate the terms regarding the job.
          </Text>

          <View flex marginTop={40}>
            <Text bold size={18} gray>
              For Position of:
            </Text>
            <View
              center
              middle
              style={{
                marginTop: 10,
              }}>
              <Text
                size={14}
                gray
                style={{
                  borderBottomColor: theme.colors.gray,
                  borderBottomWidth: 1,
                  paddingHorizontal: 20,
                }}>
                Software Developer
              </Text>
            </View>
          </View>
        </View>
        {SelectedNotification.data.description == 'Application Notice' ? (
          <View
            paddingHorizontal={20}
            paddingVertical={20}
            flex
            row
            style={{justifyContent: 'space-around'}}>
            <Button>Message</Button>
            <Button onPress={() => setViewProfile(true)}>View Profile</Button>
          </View>
        ) : (
          <View
            paddingHorizontal={20}
            paddingVertical={20}
            flex
            row
            style={{justifyContent: 'space-around'}}>
            <Button>Message</Button>
            <Button>Confirm</Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function ViewProfile({setViewProfile}: any) {
  return (
    <View height="100%" paddingBottom={10}>
      <View row center middle>
        <Text bold size={21} color="#65676A">
          Notification
        </Text>
        <TouchableOpacity
          style={{position: 'absolute', left: '2%', padding: 10}}
          onPress={() => {
            setViewProfile(false);
          }}>
          <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
        </TouchableOpacity>
      </View>
      <ScrollView></ScrollView>
    </View>
  );
}

export default Notification;

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
  border: {
    marginLeft: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 100,
    marginRight: 3,
    marginTop: 4,
  },
  border_status: {
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 100,
    marginRight: 3,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  updateTop: {
    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
    paddingVertical: 3,
  },
  name_of_job: {
    borderBottomColor: '#CECECE',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingStart: 20,
    marginTop: 50,
  },
  name_of_job_input: {
    marginStart: 10,
    width: '100%',
    fontFamily: 'Noto-medium',
    fontSize: 14,
  },
  position_input_view: {
    borderColor: '#CECECE',
    width: '25%',
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  position_input: {
    fontFamily: 'Noto-medium',
    fontSize: 24,
    color: theme.colors.gray,
  },
  description_input: {
    flex: 1,
    borderRadius: 20,
    borderColor: '#CECECE',
    borderWidth: 1,
    height: theme.height * 0.25,
    textAlignVertical: 'top',
    fontFamily: 'Noto-medium',
    color: theme.colors.gray,
    padding: 20,
  },
});
