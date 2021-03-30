import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Animated,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../constants';
import View from './View';
import Pic from './Pic';
import Text from './Text';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawerAction, openBottomDrawerAction, signout } from '../redux';
import Skills from './Skills';
import { local_url } from '../constants/urls';

let is_drawer_open = false;
const LOG_OUT = 6;

export default function Drawer({navigation}) {
  const [hide, setHide] = useState(true);
  const drawer_anim = useRef(new Animated.Value(-theme.height * 0.55)).current;
  const { drawer } = useSelector((state) => state.drawerState);
  const dispatch = useDispatch();
  const openDrawer = () => {
    Animated.timing(drawer_anim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const closeDrawer = () => {
    Animated.timing(drawer_anim, {
      toValue: -theme.height * 0.55,
      duration: 1000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      setHide(true);
      if(drawer.tabSelected == LOG_OUT){
        navigation.current?.navigate('Login')
        dispatch(signout());
      }
    });
  };

  const handleClose = (status) => {
    dispatch(closeDrawerAction(status));
  };

  const openBottomDrawer = (tabSelected) => {
    dispatch(openBottomDrawerAction(tabSelected));
  };

  useEffect(() => {
    if (!hide) {
      openDrawer();
    }
  }, [hide]);

  if (drawer.status && !is_drawer_open) {
    setHide(false);
    is_drawer_open = true;
  }

  if (!drawer.status && is_drawer_open) {
    closeDrawer();
    is_drawer_open = false;
  }

  if (hide) return null;

  return (
    <View style={styles.container}>
      <Fade drawer_anim={drawer_anim} handleClose={handleClose} />
      <DrawerView
        drawer_anim={drawer_anim}
        handleClose={handleClose}
        openBottomDrawer={openBottomDrawer}
      />
    </View>
  );
}

function Fade({ drawer_anim, handleClose }) {
  return (
    <TouchableWithoutFeedback onPress={()=>handleClose(-1)}>
      <View
        animated
        flex={false}
        style={[
          styles.fade,
          {
            opacity: drawer_anim.interpolate({
              inputRange: [-theme.height * 0.55, 0],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          },
        ]}
      />
    </TouchableWithoutFeedback>
  );
}

function DrawerView({ drawer_anim, handleClose, openBottomDrawer }) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userDetails);

  return (
    <View
      animated
      flex={false}
      style={[
        styles.drawerView,
        {
          transform: [
            {
              translateY: drawer_anim,
            },
          ],
        },
      ]}
    >
      <View>
        <TouchableOpacity
          style={{ position: 'absolute', left: '2%', padding: 10 }}
          onPress={() => handleClose(-1)}
        >
          <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
        </TouchableOpacity>
        <Pic src={ userData?.profile_pic ? {uri:local_url + userData?.profile_pic} : require('../assets/image/user/man.png')} profile_picture />

        <View center middle>
          <Text extra_bold gray size={17}>
            Jerico C. Villaraza
          </Text>
          <Text medium size={12} gray>
            Manila, Philippines
          </Text>
        </View>

        <View flex={false} style={{ width: '90%' }} center middle>
          <Skills
            skills={userData?.most_skilled}
            authorized={userData?.authorized || 0}
            size={10}
            iconScale={13}
            add
          />
        </View>
        <View flex={false} center middle style={{ marginTop: 20 }}>
          <Text
            semi_bold
            size={16}
            gray
            touchable
            press={() => openBottomDrawer(0)}
          >
            Edit Profile
          </Text>
          <Text
            semi_bold
            size={16}
            gray
            touchable
            press={() => openBottomDrawer(1)}
          >
            Messages
          </Text>
          <Text
            semi_bold
            size={16}
            gray
            touchable
            press={() => openBottomDrawer(2)}
          >
            Workers
          </Text>
          <Text
            semi_bold
            size={16}
            gray
            touchable
            press={() => openBottomDrawer(3)}
          >
            Applicants
          </Text>
          <Text
            semi_bold
            size={16}
            gray
            touchable
            press={() => openBottomDrawer(4)}
          >
            Documents
          </Text>

          <Text
            semi_bold
            size={16}
            gray
            touchable
            press={() => {
              handleClose(LOG_OUT);
            }}
          >
            Log out
          </Text>
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: theme.height,
    width: '100%',
  },
  fade: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: '100%',
    width: '100%',
  },
  drawerView: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'white',
    width: '65%',
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    borderTopStartRadius: 40,
    paddingTop: StatusBar.currentHeight + 5,
    paddingLeft: 10,
    paddingBottom: 10
  },
});
