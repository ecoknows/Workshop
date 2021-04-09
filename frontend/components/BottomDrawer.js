import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Animated, TouchableWithoutFeedback} from 'react-native';
import {theme} from '../constants';
import View from './View';
import {useDispatch, useSelector} from 'react-redux';
import {closeBottomDrawerAction} from '../redux';
import {
  Message,
  Workers,
  Applicants,
  Documents,
  Settings,
  AddJob,
  JobInfo,
  ApplyJob,
  Notification,
  PersonalInformation,
  ContactInformation,
  Password,
  PrivacyPolicy,
  HelpCenter,
  Employers,
  Eula,
} from '../bottom_drawer_screens';
import {tabs} from '../constants/theme';

let is_drawer_open = false;

export default function BottomDrawer(props) {
  const [hide, setHide] = useState(true);
  const {bottomDrawer} = useSelector(state => state.bottomDrawerState);
  const dispatch = useDispatch();
  const UserChoice = check_user_choice(bottomDrawer.tabSelected);

  const drawer_anim = useRef(new Animated.Value(UserChoice.height)).current;

  const openDrawer = () => {
    drawer_anim.setValue(UserChoice.height);
    Animated.timing(drawer_anim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawer_anim, {
      toValue: UserChoice.height,
      duration: 1000,
      useNativeDriver: true,
    }).start(({finished}) => {
      setHide(true);
    });
  };

  const handleClose = () => {
    dispatch(closeBottomDrawerAction(bottomDrawer.tabSelected));
  };

  useEffect(() => {
    if (!hide) {
      openDrawer();
    }
  }, [hide]);

  if (bottomDrawer.status && !is_drawer_open) {
    setHide(false);
    is_drawer_open = true;
  }

  if (!bottomDrawer.status && is_drawer_open) {
    closeDrawer();
    is_drawer_open = false;
  }

  if (hide) return null;

  return (
    <View style={styles.container}>
      <Fade
        drawer_anim={drawer_anim}
        handleClose={handleClose}
        UserChoice={UserChoice}
      />
      <TabSelectedView
        tabSelected={bottomDrawer.tabSelected}
        drawer_anim={drawer_anim}
        handleClose={handleClose}
        UserChoice={UserChoice}
      />
    </View>
  );
}

function Fade({drawer_anim, handleClose, UserChoice}) {
  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View
        animated
        style={[
          styles.fade,
          {
            backgroundColor: 'rgba(0,0,0,0.4)',
            opacity: drawer_anim.interpolate({
              inputRange: [0, UserChoice.height],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          },
        ]}
      />
    </TouchableWithoutFeedback>
  );
}

function check_user_choice(code) {
  switch (code) {
    case 'Messages':
      return {
        height: theme.height * 0.9,
      };
    case 'Workers':
      return {
        height: theme.height * 0.9,
      };
    case 'Applicants':
      return {
        height: theme.height * 0.9,
      };
    case 'Employers':
      return {
        height: theme.height * 0.9,
      };
    case 'Help Center':
      return {
        height: theme.height * 0.9,
      };
    case 'Privacy Policy':
      return {
        height: theme.height * 0.9,
      };
    case 'Eula':
      return {
        height: theme.height * 0.9,
      };
    case 'Documents':
      return {
        height: theme.height * 0.9,
      };
    case 'Contact Information':
      return {
        height: theme.height * 0.6,
      };
    case 'Personal Information':
      return {
        height: theme.height * 0.5,
      };
    case 'Password':
      return {
        height: theme.height * 0.5,
      };
    case 'Add Job':
      return {
        height: theme.height * 0.9,
      };
    case 'Job Info':
      return {
        height: theme.height * 0.9,
      };
    case 'Apply Job':
      return {
        height: theme.height * 0.9,
      };
    case 'Notification':
      return {
        height: theme.height * 0.9,
      };
    default:
      return {
        height: theme.height * 0.5,
      };
  }
}

function TabSelectedView({tabSelected, drawer_anim, handleClose, UserChoice}) {
  switch (tabSelected) {
    case 'Messages':
      return (
        <Message
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 'Workers':
      return (
        <Workers
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 'Applicants':
      return (
        <Applicants
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 'Employers':
      return (
        <Employers
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 'Help Center':
      return (
        <HelpCenter
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 'Privacy Policy':
      return (
        <PrivacyPolicy
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 'Eula':
      return (
        <Eula
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 'Documents':
      return (
        <Documents
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 'Contact Information':
      return (
        <ContactInformation
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 'Password':
      return (
        <Password
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 'Personal Information':
      return (
        <PersonalInformation
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 'Add Job':
      return (
        <AddJob
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 'Job Info':
      return (
        <JobInfo
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 'Apply Job':
      return (
        <ApplyJob
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 'Notification':
      return (
        <Notification
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    default:
      return null; // Return Error I think ? or loading page
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  fade: {
    height: '100%',
    width: '100%',
  },
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
});
