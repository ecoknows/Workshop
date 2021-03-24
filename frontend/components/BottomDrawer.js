import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { theme } from '../constants';
import View from './View';
import { useDispatch, useSelector } from 'react-redux';
import { closeBottomDrawerAction } from '../redux';
import {
  Message,
  Workers,
  Applicants,
  Documents,
  EditProfile,
  AddJob,
  JobInfo,
} from '../bottom_drawer_screens';

let is_drawer_open = false;

export default function BottomDrawer(props) {
  const [hide, setHide] = useState(true);
  const { bottomDrawer } = useSelector((state) => state.bottomDrawerState);
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
    }).start(({ finished }) => {
      setHide(true);
    });
  };

  const handleClose = () => {
    dispatch(
      closeBottomDrawerAction({
        status: false,
        tabSelected: bottomDrawer.tabSelected,
      })
    );
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

function Fade({ drawer_anim, handleClose, UserChoice }) {
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
    case 0:
      return {
        height: theme.height * 0.5,
      };
    case 1:
      return {
        height: theme.height * 0.9,
      };
    case 2:
      return {
        height: theme.height * 0.9,
      };
    case 3:
      return {
        height: theme.height * 0.9,
      };
    case 4:
      return {
        height: theme.height * 0.9,
      };
    case 5:
      return {
        height: theme.height * 0.9,
      };
    case 6:
      return {
        height: theme.height * 0.9,
      };
  }
}

function TabSelectedView({
  tabSelected,
  drawer_anim,
  handleClose,
  UserChoice,
}) {
  switch (tabSelected) {
    case 0:
      return (
        <EditProfile
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 1:
      return (
        <Message
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 2:
      return (
        <Workers
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 3:
      return (
        <Applicants
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 4:
      return (
        <Documents
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 5:
      return (
        <AddJob
          drawer_anim={drawer_anim}
          handleClose={handleClose}
          UserChoice={UserChoice}
        />
      );
    case 6:
      return (
        <JobInfo
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
