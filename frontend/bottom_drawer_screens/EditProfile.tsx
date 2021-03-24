import React, { useState } from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { closeBottomDrawerAction } from '../redux';
import { theme } from '../constants';

interface EditProfileProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}

const testdata = [
  { name: 'Github Website', key: 'https://github.com/', download: false },
  { name: 'CISCO Certificate', key: 'https://github.com/', download: true },
  {
    name: 'TESDA National Certificate',
    key: 'https://github.com/',
    download: true,
  },
];

function EditProfile(props: EditProfileProps) {
  const { UserChoice, drawer_anim } = props;
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
      ]}
    >
      <View height="100%">
        <View row center middle>
          <Text bold size={21} color="#65676A">
            Personal Information
          </Text>
          <TouchableOpacity
            style={{ position: 'absolute', left: '2%', padding: 10 }}
            onPress={() => {
              if (!edit) {
                dispatch(
                  closeBottomDrawerAction({
                    status: false,
                    tabSelected: 0,
                  })
                );
              } else {
                setEdit(false);
              }
            }}
          >
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
        <Pic src={require('../assets/image/user/man.png')} profile_picture />

        {!edit ? (
          <EditProfileStatus setEdit={setEdit} />
        ) : (
          <EditProfileUpdate setEdit={setEdit} />
        )}
      </View>
    </View>
  );
}

function EditProfileStatus(props: any) {
  const { setEdit } = props;

  return (
    <View>
      <TouchableOpacity
        style={{ alignItems: 'flex-end' }}
        onPress={() => setEdit(true)}
      >
        <Pic
          src={require('../assets/icons/profile/pencil-edit.png')}
          scale={24}
        />
      </TouchableOpacity>
      <View row paddingHorizontal={10}>
        <View flex>
          <Text extra_bold gray size={20}>
            Name
          </Text>
          <Text medium gray>
            Jerico C. Villaraza
          </Text>
          <Text extra_bold gray size={20}>
            Address
          </Text>
          <Text>Manila, Philippines</Text>
        </View>

        <View flex>
          <Text extra_bold gray size={20}>
            Birthday
          </Text>
          <Text medium gray>
            December 2, 1999
          </Text>
          <Text extra_bold gray size={20}>
            Sex
          </Text>
          <Text medium gray>
            Male
          </Text>
        </View>
      </View>
    </View>
  );
}
function EditProfileUpdate(props: any) {
  return (
    <ScrollView>
      <View row paddingHorizontal={10}>
        <View flex paddingEnd={10}>
          <Text extra_bold gray size={20}>
            Name
          </Text>
          <View style={{ maxHeight: 90 }}>
            <TextInput style={styles.editInput} multiline maxLength={40} />
          </View>
          <Text extra_bold gray size={20}>
            Address
          </Text>
          <View style={{ maxHeight: 90 }}>
            <TextInput style={styles.editInput} multiline maxLength={40} />
          </View>
        </View>

        <View flex paddingStart={10}>
          <Text extra_bold gray size={20}>
            Birthday
          </Text>
          <View style={{ maxHeight: 90 }}>
            <TextInput style={styles.editInput} multiline maxLength={40} />
          </View>
          <Text extra_bold gray size={20}>
            Sex
          </Text>
          <View style={{ maxHeight: 90 }}>
            <TextInput style={styles.editInput} multiline maxLength={40} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default EditProfile;
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
