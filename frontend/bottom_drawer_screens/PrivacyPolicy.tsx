import React, {useState} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {closeBottomDrawerAction} from '../redux';
import {theme} from '../constants';

interface PrivacyPolicyProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}
function PrivacyPolicy(props: PrivacyPolicyProps) {
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
            Privacy Policy
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', left: '2%', padding: 10}}
            onPress={() => {
              dispatch(closeBottomDrawerAction('Privacy Policy'));
            }}>
            <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
          </TouchableOpacity>
        </View>

        <View center middle paddingVertical={20}>
          <Pic src={require('../assets/settings/privacy_3x.png')} scale={100} />
        </View>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <View
              style={{
                borderBottomColor: '#FFC192',
                borderBottomWidth: 1,
                paddingVertical: 10,
              }}>
              <View paddingHorizontal={15}>
                <Text gray bold size={18}>
                  Your Privacy Matters!
                </Text>
                <Text gray size={14} style={{paddingStart: 20}}>
                  In Workshop, you give us certain of information voluntarily
                  which is used to connect you to potential employers. We ensure
                  the transparency in which your data is used.
                </Text>
                <Text gray size={14} style={{paddingStart: 20, marginTop: 15}}>
                  This Privacy Policy applies when you use our services.
                </Text>
              </View>
            </View>
            <View paddingHorizontal={15} paddingVertical={20}>
              <Text gray bold size={14} style={{marginBottom: 4}}>
                Information Collection and Use
              </Text>
              <Text gray size={12} style={{paddingStart: 20, marginBottom: 15}}>
                For a better experience while using our Service, we may require
                you to provide us with certain personally identifiable
                information, including but not limited to your name, phone
                number, and postal address. The information that we collect will
                be used to contact or identify you.
              </Text>

              <Text gray bold size={14} style={{marginBottom: 4}}>
                Safeguarding and Securing the Data
              </Text>
              <Text gray size={12} style={{paddingStart: 20}}>
                Workshope is committed to securing your data and keeping it
                confidential. Workshop has done all in its power to prevent data
                theft, unathorized access, and disclosure by implementing latest
                technologies and software, which helps us safeguard all the
                information we collect online.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default PrivacyPolicy;
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
});
