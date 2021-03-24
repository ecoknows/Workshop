import React, { useState, useRef } from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import Table from '../components/Table';
import Button from '../components/Button';
import CirclePercent from '../components/CirclePercent';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  PanResponder,
  ScrollView
} from 'react-native';
import { theme } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { closeBottomDrawerAction } from '../redux';

interface JobInfoProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}

const person = [
  {name: 'Chevy Quitquitan'},
  {name: 'John Smith'},
  {name: 'Elon Musk'},
  {name: 'Jerico Villaraza'},
  {name: 'Jerico Villaraza'},
]

function JobInfo(props: JobInfoProps) {
  const { UserChoice, drawer_anim } = props;
  const CreateJobState = useSelector((state) => state.jobsSelectedState);
  const {jobSelected} = CreateJobState;
  const [isApplicant, setApplicant] = useState(false);

  const dispatch = useDispatch();
  console.log(jobSelected);
  
  return (
    <View
      bottom={0}
      animated
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
        <View flex >       
            <View row center middle>
                <Text bold size={21} color="#65676A">
                Job
                </Text>
                <TouchableOpacity
                style={{ position: 'absolute', left: '2%', padding: 10 }}
                onPress={() => {
                    dispatch(
                    closeBottomDrawerAction({
                        status: false,
                        tabSelected: 6,
                    })
                    );
                }}
                >
                <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
                </TouchableOpacity>
            </View>

          <ScrollView style={{height: '100%'}}>

                <View center middle paddingVertical={30}>
                    <View>
                      <Pic
                      src={jobSelected.icons != -1 ? jobSelected.icons :require('../assets/icons/profile/job_icons/icon_0.png')}
                      scale={65}
                      />
                    </View>

                    <View paddingTop={20}>
                        <Text gray medium size={18}>
                            {jobSelected.job}  
                        </Text>
                    </View>
                </View>

                <View style={{ alignItems: 'flex-end' }} paddingHorizontal={20}>
                  {!isApplicant ? (
                    <TouchableOpacity onPress={() => setApplicant(!isApplicant)}>
                      <Pic
                        src={require('../assets/icons/profile/pencil-edit.png')}
                        scale={25}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setApplicant(!isApplicant)}>
                      <Pic
                        src={require('../assets/icons/profile/pencil-edit-clicked.png')}
                        scale={25}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View paddingHorizontal={20}  row>
                  <Text bold size={18}>{!isApplicant ? 'Current Employees:' : 'Applicants:'}</Text>

                  
                  { !isApplicant ? 
                    <View middle row>
                      <Text size={18} style={{paddingLeft: 10}}>{jobSelected.current_workers} </Text>
                      <Text size={14} color='#AAAAAA'>/ {jobSelected.max_workers}</Text>
                    </View> : 
                      <Text size={18} style={{paddingLeft: 10}}>{jobSelected.current_applicants}</Text>
                  }
                </View>

                <View paddingHorizontal={30}>

                     { !isApplicant ? <Table
                        maxHeight={theme.height * 0.3}
                        data={person}
                        renderHeader={() => (
                          <View row paddingVertical={3}>
                            <View flex={1.3}>
                              <Text bold gray>
                                Name
                              </Text>
                            </View>
                            <View flex middle>
                              <Text bold gray>
                                Remove
                              </Text>
                            </View>
                          </View>
                        )}
                        renderItem={({ item }, index) => (
                          <TouchableOpacity
                            onPress={() => {
                              // dispatch(openBottomDrawerAction({ status: true, tabSelected: 6 }));
                              // dispatch(add_selected_job(item));
                            }}
                            key={index}
                            style={{
                              borderTopColor: '#CCCCCC',
                              borderTopWidth: 1,
                              paddingVertical: 3,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <View flex={1.3}>
                              <Text gray>{item.name}</Text>
                            </View>
                            <View flex middle>
                              <Pic src={require('../assets/icons/profile/job_icons/remove.png')} 
                                scale={23}
                              />
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                      :
                      <Table
                        maxHeight={theme.height * 0.3}
                        data={person}
                        renderHeader={() => (
                          <View row paddingVertical={3}>
                            <View flex={1.3}>
                              <Text bold gray>
                                Name
                              </Text>
                            </View>
                          </View>
                        )}
                        renderItem={({ item }, index) => (
                          <TouchableOpacity
                            onPress={() => {
                              // dispatch(openBottomDrawerAction({ status: true, tabSelected: 6 }));
                              // dispatch(add_selected_job(item));
                            }}
                            key={index}
                            style={{
                              borderTopColor: '#CCCCCC',
                              borderTopWidth: 1,
                              paddingVertical: 3,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <View flex={1.3}>
                              <Text gray>{item.name}</Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      /> }


                    </View>
                  
                <View paddingHorizontal={20} marginTop={20}>
                  <Text bold size={18} gray>Job Description: </Text>
                </View>

                <View paddingHorizontal={30} paddingBottom={20}>
                  <Text medium size={15} gray>{jobSelected.description}</Text>
                  <View 
                    row
                    marginTop={20}
                    alignSelf="flex-end">
                    <Button>
                      Close Application
                    </Button>
                  </View>
                </View>



          </ScrollView>

        </View>
    </View>
  );
}


export default JobInfo;

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
  progress: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '103%',
    height: theme.height,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    borderWidth: 2,
    borderColor: '#FF900D',
  },
  updateTop: {
    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
    paddingVertical: 3,
    marginHorizontal: '10%',
  },
});
