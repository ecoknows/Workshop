import React, {useState} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import Button from '../components/Button';
import {StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {closeBottomDrawerAction} from '../redux';
import {theme} from '../constants';

interface PasswordProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}
function Password(props: PasswordProps) {
  const {UserChoice, drawer_anim} = props;
  const dispatch = useDispatch();
  return (
    <View
      animated
      bottom={0}
      paddingHorizontal={10}
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
      <View height="100%">
        <View row center middle>
          <Text bold size={21} color="#65676A">
            Password
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', left: '2%', padding: 10}}
            onPress={() => {
              dispatch(closeBottomDrawerAction('Password'));
            }}>
            <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
          </TouchableOpacity>
        </View>
        <View center middle>
          <TextInput style={styles.editInput} placeholder="Current Password" />
          <TextInput style={styles.editInput} placeholder="New Password" />
          <TextInput style={styles.editInput} placeholder="Retype Password" />
        </View>
        <View justifyContent="flex-end" flex paddingVertical={20}>
          <View row justifyContent="space-around">
            <Button
              onPress={() => {
                dispatch(closeBottomDrawerAction('Password'));
              }}>
              Cancel
            </Button>
            <Button>Save</Button>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Password;
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
  editInput: {
    width: '80%',
    borderBottomWidth: 1,
    fontSize: 14,
    borderBottomColor: '#D0D0D0',
    fontFamily: 'NotoSands-medium',
    color: theme.colors.gray,
  },
});
