import React, { useState, useEffect } from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import Button from '../components/Button';
import ModalBox from '../components/ModalBox';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../constants';
import { closeBottomDrawerAction } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import { add_job, get_jobs } from '../redux/actions/jobs.actions';

interface DocumentsProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}

const APPROVED = 0;
const DENIED = 1;
const PENDING = 2;

const testdata = [
  { document: 'DTI Registration', status: APPROVED },
  { document: 'SEC Registration', status: DENIED },
  { document: 'BIR Registration', status: PENDING },
];

function Documents(props: DocumentsProps) {
  const { drawer_anim } = props;
  const dispatch = useDispatch();
  const [isProfile, setIsProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(-1);
  const [availablePositions, setAvailablePositions] = useState('0');
  const [nameOfJob, setNameOfJob] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    setIsProfile(false);
  }, [profilePic])

  return (
    <View
      animated
      bottom={0}
      paddingHorizontal={20}
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
      ]}
    >
      <ModalBox hide={isProfile} setHide={setIsProfile}>
        <View>
          <View
            row
            borderBottomColor="#CECECE"
            borderBottomWidth={1}
            paddingBottom={10}
          >
            <Pic
              src={profilePic == -1 ? require('../assets/icons/profile/icon_placeholder.png') : profilePic}
              scale={65}
            />
            <View center flex paddingStart={10}>
              <Text bold size={18} gray>
                Add Icon
              </Text>
            </View>
          </View>
          <View center middle paddingTop={10}>
            <View row style={{flexWrap:'wrap', width : '90%'}}>
              {theme.jobsIcons.map((item, index) => (
                <View  key={index} paddingRight={12} paddingBottom={10}>
                  <TouchableOpacity onPress={()=>setProfilePic(item.image)}>
                    <Pic
                      src={item.image}
                      scale={50}
                    />
                  </TouchableOpacity>
                </View>
              ))}
                <View paddingRight={12} paddingBottom={10}>
                  <TouchableOpacity>
                    <Pic
                      src={require('../assets/icons/profile/job_icons/add_icon.png')}
                      scale={50}
                    />
                  </TouchableOpacity>
                </View>
            </View>
          </View>
        </View>
      </ModalBox>

      <View height="100%" paddingBottom={10}>
        <View row center middle>
          <Text bold size={21} color="#65676A">
            Add a Job
          </Text>
          <TouchableOpacity
            style={{ position: 'absolute', left: '2%', padding: 10 }}
            onPress={() => {
              dispatch(
                closeBottomDrawerAction({
                  status: false,
                  tabSelected: 5,
                })
              );
            }}
          >
            <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View middle center paddingTop={40}>
            <TouchableOpacity onPress={() => setIsProfile(true)}>
              <Pic
                src={profilePic == -1 ? require('../assets/icons/profile/icon_placeholder.png') : profilePic}
                scale={85}
              />
            </TouchableOpacity>
            <View width="80%" row style={styles.name_of_job}>
              <Pic
                src={require('../assets/icons/profile/portfolio.png')}
                scale={30}
              />
              <TextInput
                style={styles.name_of_job_input}
                value={nameOfJob}
                onChangeText={setNameOfJob}
                placeholder="NAME OF JOB"
              />
            </View>
          </View>

          <View paddingTop={20} paddingStart={20}>
            <Text bold gray size={18}>
              Available Positions:
            </Text>
            <View center middle row paddingTop={16}>
              <TouchableOpacity onPress={()=>{
                setAvailablePositions((parseInt(availablePositions)-1).toString())
              }}>
                <Pic
                  src={require('../assets/icons/profile/circle-minus.png')}
                  scale={30}
                />
              </TouchableOpacity>
              <View center middle style={styles.position_input_view}>
                <TextInput
                  value={availablePositions}
                  onChangeText={setAvailablePositions}
                  style={styles.position_input}
                  maxLength={3}
                  keyboardType="numeric"
                />
              </View>
              <TouchableOpacity onPress={()=>{
                setAvailablePositions((parseInt(availablePositions)+1).toString())
              }}>
                <Pic
                  src={require('../assets/icons/profile/circle-plus.png')}
                  scale={30}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View paddingHorizontal={20} paddingStart={20} flex>
            <Text bold gray size={18}>
              Job Description:
            </Text>
            <TextInput
              multiline
              value={description}
              onChangeText={setDescription}
              style={styles.description_input}
              placeholder="Write a message..."
            />
            <View
              row
              middle
              justifyContent="space-around"
              width="80%"
              alignSelf="center"
            >
              <Button onPress={()=>{
                dispatch(
                  closeBottomDrawerAction({
                    status: false,
                    tabSelected: 5,
                  })
                );
              }}>Cancel</Button>
              <Button onPress={()=>{
                dispatch(add_job({       
                    job: nameOfJob,
                    current_workers: 0,
                    current_applicants: 0,
                    max_workers: parseInt(availablePositions),
                    description: description,
                    icons: profilePic,
                }));
                dispatch(
                  closeBottomDrawerAction({
                    status: false,
                    tabSelected: 5,
                  })
                );
              }}>Save</Button>
            </View>
          </View>
        </ScrollView>
        <View flex></View>
      </View>
    </View>
  );
}

export default Documents;

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
  border: {
    marginLeft: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 100,
    marginRight: 3,
    marginTop: 4,
  },
  border_status: {
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 100,
    marginRight: 3,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  updateTop: {
    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
    paddingVertical: 3,
  },
  name_of_job: {
    borderBottomColor: '#CECECE',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingStart: 20,
    marginTop: 50,
  },
  name_of_job_input: {
    marginStart: 10,
    width: '100%',
    fontFamily: 'Noto-medium',
    fontSize: 14,
  },
  position_input_view: {
    borderColor: '#CECECE',
    width: '25%',
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  position_input: {
    fontFamily: 'Noto-medium',
    fontSize: 24,
    color: theme.colors.gray,
  },
  description_input: {
    flex: 1,
    borderRadius: 20,
    borderColor: '#CECECE',
    borderWidth: 1,
    height: theme.height * 0.25,
    textAlignVertical: 'top',
    fontFamily: 'Noto-medium',
    color: theme.colors.gray,
    padding: 20,
  },
});
