import React, {useState} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import Button from '../components/Button';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {closeBottomDrawerAction} from '../redux';
import {theme} from '../constants';

interface HelpCenterProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}
function HelpCenter(props: HelpCenterProps) {
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
          height: '90%',
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
            Help Center
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', left: '2%', padding: 10}}
            onPress={() => {
              dispatch(closeBottomDrawerAction('Help Center'));
            }}>
            <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
          </TouchableOpacity>
        </View>
        <View center middle paddingVertical={20}>
          <Pic
            src={require('../assets/settings/help_center_3x.png')}
            scale={100}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View width="80%">
            <Text bold size={18} gray>
              Report a Problem:
            </Text>

            <TextInput
              multiline
              style={styles.description_input}
              placeholder="Write a message..."
            />
            <View marginTop={15} alignItems="flex-end">
              <Button>Send</Button>
            </View>

            <Text bold size={18} gray>
              Actions
            </Text>
            <View paddingStart={20}>
              <Text accent size={14}>
                Change email address
              </Text>
              <Text accent size={14}>
                Change phone number
              </Text>
              <Text accent size={14}>
                Change password
              </Text>
              <Text accent size={14}>
                Change account
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default HelpCenter;
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
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    fontFamily: 'Noto-medium',
    color: theme.colors.gray,
  },
  description_input: {
    borderRadius: 20,
    borderColor: '#CECECE',
    borderWidth: 1,
    height: theme.height * 0.25,
    textAlignVertical: 'top',
    fontFamily: 'Noto-medium',
    color: theme.colors.gray,
    marginTop: 15,
    padding: 20,
  },
});
