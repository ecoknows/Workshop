import React, {useState} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {closeBottomDrawerAction} from '../redux';
import {theme} from '../constants';

interface ContactInformationProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}

const testdata = [
  {name: 'Github Website', key: 'https://github.com/', download: false},
  {name: 'CISCO Certificate', key: 'https://github.com/', download: true},
  {
    name: 'TESDA National Certificate',
    key: 'https://github.com/',
    download: true,
  },
];

function ContactInformation(props: ContactInformationProps) {
  const {UserChoice, drawer_anim} = props;
  const [edit, setEdit] = useState(false);
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
            Contact Information
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', left: '2%', padding: 10}}
            onPress={() => {
              if (!edit) {
                dispatch(closeBottomDrawerAction('Contact Information'));
              } else {
                setEdit(false);
              }
            }}>
            {!edit ? (
              <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
            ) : (
              <Pic
                src={require('../assets/icons/profile/back.png')}
                scale={20}
              />
            )}
          </TouchableOpacity>
        </View>

        {!edit ? (
          <ContactInformationStatus setEdit={setEdit} />
        ) : (
          <ContactInformationUpdate setEdit={setEdit} />
        )}
      </View>
    </View>
  );
}

function ContactInformationStatus(props: any) {
  const {setEdit} = props;

  const {userData} = useSelector(state => state.userDetails);

  return (
    <View>
      <TouchableOpacity
        style={{alignItems: 'flex-end'}}
        onPress={() => setEdit(true)}>
        <Pic
          src={require('../assets/icons/profile/pencil-edit.png')}
          scale={24}
        />
      </TouchableOpacity>
      <View center middle>
        <View width="80%">
          <Text medium size={14} gray>
            Primary Email Address
          </Text>
          <View row marginTop={20}>
            <Pic
              src={require('../assets/icons/profile/red-circle.png')}
              scale={23}
            />
            <View paddingHorizontal={10}>
              <Text extra_bold size={17} gray>
                {userData.email}
              </Text>
              <View row middle>
                <Text medium size={14} gray>
                  Not verified |
                </Text>
                <Text medium color="#F68025" style={{marginStart: 4}}>
                  Resend verification
                </Text>
              </View>
            </View>
          </View>

          <Text medium size={14} gray style={{marginTop: 20}}>
            Primary Phone Number
          </Text>
          <View row marginTop={20}>
            <Pic src={require('../assets/state-icons/check.png')} scale={23} />
            <View paddingHorizontal={10}>
              <Text extra_bold size={17} gray>
                +63 912 345 6789
              </Text>
              <View row middle>
                <Text medium size={14} gray>
                  Verified
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
function ContactInformationUpdate(props: any) {
  const {userData} = useSelector(state => state.userDetails);
  return (
    <View>
      <View center middle paddingVertical={20}>
        <View width="80%">
          <Text medium size={14} gray>
            Primary Email Address
          </Text>
          <TextInput style={styles.editInput} placeholder={userData.email} />
          <Text medium size={14} gray style={{marginTop: 40}}>
            Primary Phone Number
          </Text>
          <TextInput
            style={styles.editInput}
            placeholder="
            +63 912 345 6789"
          />
        </View>
      </View>
    </View>
  );
}

export default ContactInformation;
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
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'NotoSans-ExtraBold',
    color: theme.colors.gray,
  },
});
