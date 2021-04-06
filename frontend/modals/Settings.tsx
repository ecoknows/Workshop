import React from 'react';
import {Modal, Image, TouchableOpacity} from 'react-native';
import {View, Text, Pic} from '../components';
import {theme} from '../constants';
import {useDispatch} from 'react-redux';
import {openBottomDrawerAction} from '../redux';

interface SettingsProps {
  navigation: any;
}

function Settings(props: SettingsProps) {
  const {navigation} = props;
  const dispatch = useDispatch();
  return (
    <View accent flex>
      <View backgroundColor="white" flex>
        <View row middle>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Pic src={require('../assets/settings/back.png')} scale={30} />
          </TouchableOpacity>

          <Text medium size={30} gray style={{marginStart: 10}}>
            SETTINGS
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            dispatch(openBottomDrawerAction('Personal Information'));
          }}
          style={{
            flexDirection: 'row',
            paddingVertical: 8,
            paddingHorizontal: 18,
          }}>
          <Pic
            src={require('../assets/image/user/man.png')}
            profile_picture
            large
          />
          <View flex center middle>
            <Text extra_bold size={18} gray>
              Jerico C. Villaraza
            </Text>
            <Text medium size={13} gray>
              Manila, Philippines
            </Text>
          </View>
          <View center>
            <Pic src={require('../assets/settings/proceed.png')} scale={25} />
          </View>
        </TouchableOpacity>
        <View paddingHorizontal={18} row middle>
          <Text extra_bold size={18} gray>
            Status:
          </Text>
          <Text extra_bold size={18} color="#D2B100" style={{marginStart: 5}}>
            Authorized
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            dispatch(openBottomDrawerAction('Contact Information'))
          }
          style={{
            flexDirection: 'row',
            backgroundColor: '#EFEFEF',
            paddingVertical: 10,
            paddingHorizontal: 18,
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View flex row style={{alignItems: 'flex-end'}} paddingStart={10}>
            <Pic
              src={require('../assets/settings/contact_info.png')}
              scale={35}
              style={{marginEnd: 10}}
            />
            <Text extra_bold size={18} gray>
              Contact Information
            </Text>
          </View>

          <View center style={{alignItems: 'flex-end'}}>
            <Pic src={require('../assets/settings/proceed.png')} scale={25} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => dispatch(openBottomDrawerAction('Password'))}
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 18,
            alignItems: 'center',
          }}>
          <View flex row style={{alignItems: 'flex-end'}} paddingStart={10}>
            <Pic
              src={require('../assets/settings/password.png')}
              scale={35}
              style={{marginEnd: 10}}
            />
            <Text extra_bold size={18} gray>
              Password
            </Text>
          </View>

          <View center style={{alignItems: 'flex-end'}}>
            <Pic src={require('../assets/settings/proceed.png')} scale={25} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => dispatch(openBottomDrawerAction('Documents'))}
          style={{
            flexDirection: 'row',
            backgroundColor: '#EFEFEF',
            paddingVertical: 10,
            paddingHorizontal: 18,
            alignItems: 'center',
          }}>
          <View flex row style={{alignItems: 'flex-end'}} paddingStart={10}>
            <Pic
              src={require('../assets/settings/document.png')}
              scale={35}
              style={{marginEnd: 10}}
            />
            <Text extra_bold size={18} gray>
              Documents
            </Text>
          </View>

          <View center style={{alignItems: 'flex-end'}}>
            <Pic src={require('../assets/settings/proceed.png')} scale={25} />
          </View>
        </TouchableOpacity>

        <View flex center middle>
          <Pic
            src={require('../assets/settings/rectangle.png')}
            style={{
              position: 'absolute',
              right: theme.width * 0.07,
              height: '100%',
              width: '82%',
            }}
            resizeMode="contain"
          />
          <View
            style={{
              height: theme.width * 0.6,
              width: theme.width * 0.8,
              borderRadius: 25,
              borderWidth: 2,
              borderColor: '#F68025',
              paddingHorizontal: 20,
              paddingVertical: 20,
              backgroundColor: 'white',
            }}>
            <TouchableOpacity
              onPress={() => dispatch(openBottomDrawerAction('Help Center'))}
              style={{
                borderBottomWidth: 1,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: '#D0D0D0',
              }}>
              <Pic
                src={require('../assets/settings/help_center.png')}
                scale={40}
                style={{marginEnd: 20}}
              />
              <Text extra_bold size={18} gray>
                Help Center
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => dispatch(openBottomDrawerAction('Privacy Policy'))}
              style={{
                borderBottomWidth: 1,
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                borderBottomColor: '#D0D0D0',
              }}>
              <Pic
                src={require('../assets/settings/privacy.png')}
                scale={40}
                style={{marginEnd: 20}}
              />
              <Text extra_bold size={18} gray>
                Privacy Policy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => dispatch(openBottomDrawerAction('Eula'))}
              style={{
                borderBottomWidth: 1,
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                borderBottomColor: '#D0D0D0',
              }}>
              <Pic
                src={require('../assets/settings/eula.png')}
                scale={40}
                style={{marginEnd: 20}}
              />
              <Text extra_bold size={18} gray>
                EULA
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Settings;
