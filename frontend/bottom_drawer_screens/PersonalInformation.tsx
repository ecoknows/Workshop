import React, {useState, useEffect, useRef} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import Button from '../components/Button';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  closeBottomDrawerAction,
  RootState,
  update_personal_info,
} from '../redux';
import {theme} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {local_url} from '../constants/urls';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';
import Toast from 'react-native-toast-message';

interface PersonalInformationProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}

function PersonalInformation(props: PersonalInformationProps) {
  const {UserChoice, drawer_anim} = props;
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState(null);
  const {userData} = useSelector((state: RootState) => state.userDetails);
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
            Personal Information
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', left: '2%', padding: 10}}
            onPress={() => {
              if (!edit) {
                dispatch(closeBottomDrawerAction('Personal Information'));
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
        {edit ? (
          <View center middle>
            <TouchableOpacity
              onPress={() => {
                ImagePicker.openPicker({
                  width: 300,
                  height: 400,
                  cropping: true,
                }).then((image: any) => {
                  setProfilePic(image);
                });
              }}>
              <Pic
                src={
                  profilePic
                    ? {uri: profilePic.path}
                    : userData.profile_pic
                    ? {uri: local_url + userData.profile_pic}
                    : require('../assets/image/user/man.png')
                }
                profile_picture
                edit
              />
            </TouchableOpacity>
          </View>
        ) : (
          <Pic
            src={
              userData.profile_pic
                ? {uri: local_url + userData.profile_pic}
                : require('../assets/image/user/man.png')
            }
            profile_picture
          />
        )}

        {!edit ? (
          <EditProfileStatus setEdit={setEdit} />
        ) : (
          <EditProfileUpdate setEdit={setEdit} profile={profilePic} />
        )}
      </View>
    </View>
  );
}

function EditProfileStatus(props: any) {
  const {setEdit} = props;
  const {userData} = useSelector((state: RootState) => state.userDetails);

  return (
    <ScrollView>
      <TouchableOpacity
        style={{alignItems: 'flex-end'}}
        onPress={() => setEdit(true)}>
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
            {userData.full_name}
          </Text>
          <Text extra_bold gray size={20}>
            Address
          </Text>
          <Text>{userData.address}</Text>
          <Text extra_bold gray size={20}>
            City
          </Text>
          <Text>{userData.city}, Philippines</Text>
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
    </ScrollView>
  );
}

function EditProfileUpdate(props: any) {
  const {profile} = props;
  const {userData} = useSelector((state: RootState) => state.userDetails);
  const dispatch = useDispatch();
  const [full_name, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [birth_day, setBirthday] = useState('');
  const [sex, setSex] = useState('');
  const updateStart = useRef(false);

  useEffect(() => {
    if (userData && updateStart.current) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Update Successful',
        text2: 'Hello mr. new man!',
        visibilityTime: 4000,
        autoHide: true,
      });
    }
    updateStart.current = true;
  }, [userData]);

  async function UploadImage() {
    const formData = new FormData();
    formData.append('image', {
      name: 'deymsan',
      type: profile.mime,
      uri: profile.path,
    });

    try {
      const {data} = await Axios.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data) {
        dispatch(
          update_personal_info({
            full_name,
            birth_day,
            address,
            sex,
            city,
            profile_pic: data,
          }),
        );
      }
    } catch (error) {}
  }

  const verfifyInputs = () => {
    if (profile != null) {
      UploadImage();
    } else {
      dispatch(
        update_personal_info({
          full_name,
          birth_day,
          address,
          sex,
          city,
          profile_pic: profile,
        }),
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={{paddingVertical: 20}}>
      <View row paddingHorizontal={10} paddingVertical={20}>
        <View flex paddingEnd={10}>
          <Text extra_bold gray size={20}>
            Name
          </Text>
          <View style={{maxHeight: 90}}>
            <TextInput
              style={styles.editInput}
              placeholder={userData.full_name}
              multiline
              maxLength={40}
              value={full_name}
              onChangeText={text => setFullName(text)}
            />
          </View>
          <Text extra_bold gray size={20}>
            Address
          </Text>
          <View style={{maxHeight: 90}}>
            <TextInput
              style={styles.editInput}
              placeholder={userData.address}
              multiline
              maxLength={40}
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </View>
          <Text extra_bold gray size={20}>
            City
          </Text>
          <View style={{maxHeight: 90}}>
            <TextInput
              style={styles.editInput}
              placeholder={userData.city}
              multiline
              maxLength={40}
              value={city}
              onChangeText={text => setCity(text)}
            />
          </View>
        </View>

        <View flex paddingStart={10}>
          <Text extra_bold gray size={20}>
            Birthday
          </Text>
          <View style={{maxHeight: 90}}>
            <TextInput
              style={styles.editInput}
              placeholder={userData.birth_day}
              multiline
              maxLength={40}
              value={birth_day}
              onChangeText={text => setBirthday(text)}
            />
          </View>
          <Text extra_bold gray size={20}>
            Sex
          </Text>
          <View style={{maxHeight: 90}}>
            <TextInput
              style={styles.editInput}
              placeholder={userData.sex}
              multiline
              maxLength={40}
              value={sex}
              onChangeText={text => setSex(text)}
            />
          </View>
        </View>
      </View>

      <View row justifyContent="space-around">
        <Button>Cancel</Button>
        <Button onPress={verfifyInputs}>Save</Button>
      </View>
    </ScrollView>
  );
}

export default PersonalInformation;
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
