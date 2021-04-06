import React, {useState} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {closeBottomDrawerAction} from '../redux';
import {theme} from '../constants';

interface EulaProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}
function Eula(props: EulaProps) {
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
            Eula
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', left: '2%', padding: 10}}
            onPress={() => {
              dispatch(closeBottomDrawerAction('Eula'));
            }}>
            <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
          </TouchableOpacity>
        </View>

        <View center middle paddingVertical={20}>
          <Pic src={require('../assets/settings/eula_3x.png')} scale={100} />
        </View>

        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <View>
            <Text gray bold size={18}>
              End User License Agreement
            </Text>
            <Text
              gray
              size={13}
              style={{paddingStart: 20, marginTop: 4, marginBottom: 15}}>
              This End User License Agreement (the "EULA") is a binding legal
              agreement between you, as an individual or entity, and LinkedIn
              Corporation ("LinkedIn"). By downloading, installing, or using
              this application for Android, iOS or other mobile platform, as
              applicable (the "Software"), you agree to be bound by the terms of
              this EULA. If you do not agree to the EULA, do not check the "I
              accept the terms" box and do not use the Software.
            </Text>
            <Text gray size={13} style={{paddingStart: 40}}>
              You agree that installation or use of the Software signifies that
              you have read, understood, and agree to be bound by the EULA.
            </Text>
            <Text gray size={13} style={{paddingStart: 40, marginTop: 15}}>
              The Software is provided to you under this EULA solely for your
              private, non-commercial use. Use of the Software or of the
              Workshop content, information, membership functionality, job
              search, recruiting, marketing, sales or any other services
              (“Workshop Service”) within an organization or the use of multiple
              copies of the Software (except a back-up copy) requires a
              commercial license for the Software.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Eula;
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
