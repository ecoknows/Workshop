import React, {useState, useRef, useEffect} from 'react';
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
  TextInput,
} from 'react-native';
import {theme} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {closeBottomDrawerAction, RootState} from '../redux';
import {
  fire_worker,
  get_employers_worker_id,
  get_workers_contact_person,
  resign_employer,
  single_worker,
  update_progress,
} from '../redux/actions/workers.actions';
import {local_url} from '../constants/urls';
import {
  add_task,
  fetch_tasks,
  update_status,
} from '../redux/actions/tasks.actions';

import SocketInstance from '../constants/SocketIO';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';
import {
  get_chats,
  send_message,
  update_latest_chat,
} from '../redux/actions/messages.actions';

interface EmployersProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}

function Employers(props: EmployersProps) {
  const {UserChoice, drawer_anim} = props;
  const [isWorker, setIsWorker] = useState(false);
  const [chat, setChat] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_employers_worker_id());
  }, []);
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
      ]}>
      {!chat ? (
        <View>
          {isWorker ? (
            <WorkerInfo
              isWorker={isWorker}
              setIsWorker={setIsWorker}
              setChat={setChat}
            />
          ) : (
            <WorkerList setIsWorker={setIsWorker} />
          )}
        </View>
      ) : (
        <Chat setChat={setChat} />
      )}
    </View>
  );
}

function WorkerInfo(props: any) {
  const {setChat, setIsWorker} = props;
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState('');
  const SingleWorkerState: any = useSelector(
    (state: RootState) => state.singleWorkerState,
  );
  const [progressPercentage, setProgressPercentage] = useState(
    SingleWorkerState?.data?.progress
      ? SingleWorkerState?.data?.progress.toString()
      : '0',
  );
  useEffect(() => {
    dispatch(fetch_tasks());
  }, []);
  const progressPan = useRef<any>(
    new Animated.ValueXY({y: theme.height * 0.7, x: 0}),
  ).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        progressPan.setOffset({
          y: progressPan.y._value,
        });
      },
      onPanResponderMove: (e, {dy}) => {
        progressPan.y.setValue(dy);
      },
      onPanResponderRelease: (_, {dy}) => {
        // progressPan.setValue({ y: 0 });
        progressPan.flattenOffset();
      },
    }),
  ).current;

  return (
    <View height="100%" paddingBottom={15}>
      <View row center middle style={{marginBottom: 15}}>
        <TouchableOpacity
          style={{position: 'absolute', left: '6%', padding: 10}}
          onPress={() => setIsWorker(false)}>
          <Pic src={require('../assets/icons/profile/back.png')} scale={25} />
        </TouchableOpacity>

        <Text bold size={21} color="#65676A">
          Employer
        </Text>
      </View>
      <View>
        <Pic
          profile_picture
          src={
            SingleWorkerState?.data?.person_of_contact_profile
              ? {
                  uri:
                    local_url +
                    SingleWorkerState?.data?.person_of_contact_profile,
                }
              : require('../assets/image/user/man.png')
          }
          medium
        />

        <Text
          extra_bold
          size={18}
          color="#65676A"
          style={{alignSelf: 'center'}}>
          {SingleWorkerState?.data?.worker_name}
        </Text>
        <Text
          medium
          size={14}
          color="#65676A"
          style={{marginBottom: 15, alignSelf: 'center'}}>
          {SingleWorkerState?.data?.person_of_contact_position}
        </Text>
      </View>

      <View flex>
        <View alignItems="flex-end" width="80%">
          <TouchableOpacity onPress={() => setEdit(!edit)}>
            {!edit ? (
              <Pic
                src={require('../assets/icons/profile/pencil-edit.png')}
                scale={23}
              />
            ) : (
              <Pic
                src={require('../assets/icons/profile/pencil-edit-clicked.png')}
                scale={23}
              />
            )}
          </TouchableOpacity>
        </View>
        {!edit ? (
          <CirclePercent
            size={20}
            name={'Work Progress'}
            rotate={'90deg'}
            percent={
              SingleWorkerState?.data?.progress
                ? SingleWorkerState?.data?.progress / 100
                : 0 / 100
            }
            textSize={0.2}
            textColor={'#F68025'}
            gradient={{
              start: '#F9D423',
              end: '#e65c00',
            }}
          />
        ) : (
          <View paddingTop={20} paddingHorizontal={20}>
            <View>
              <Text bold gray size={18}>
                Progress Percentage:
              </Text>
              <View center middle row paddingTop={16}>
                <TouchableOpacity
                  onPress={() => {
                    setProgressPercentage(
                      (parseInt(progressPercentage) - 1).toString(),
                    );
                  }}>
                  <Pic
                    src={require('../assets/icons/profile/circle-minus.png')}
                    scale={30}
                  />
                </TouchableOpacity>
                <View center middle style={styles.position_input_view}>
                  <TextInput
                    value={progressPercentage}
                    onChangeText={setProgressPercentage}
                    style={styles.position_input}
                    maxLength={3}
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setProgressPercentage(
                      (parseInt(progressPercentage) + 1).toString(),
                    );
                  }}>
                  <Pic
                    src={require('../assets/icons/profile/circle-plus.png')}
                    scale={30}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View height={theme.height * 0.3}>
              <Text bold gray size={18}>
                Report:
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
                marginTop={20}
                alignSelf="center">
                <Button
                  onPress={() => {
                    dispatch(
                      update_progress(
                        SingleWorkerState?.data?._id,
                        parseInt(progressPercentage),
                      ),
                    );
                    setEdit(false);
                  }}>
                  Save
                </Button>
              </View>
            </View>
          </View>
        )}

        {!edit ? (
          <Text
            medium
            size={14}
            color="#65676A"
            style={{marginTop: 15, alignSelf: 'center'}}>
            Work Progress
          </Text>
        ) : null}
      </View>
      {!edit ? (
        <View
          animated
          style={[
            styles.progress,
            {
              transform: [
                {
                  translateY: progressPan.y,
                },
              ],
            },
          ]}
          white>
          <View flex>
            <View paddingVertical={15} {...panResponder.panHandlers}>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#FF900D',
                  height: 15,
                  width: '30%',
                  alignSelf: 'center',
                }}
              />
            </View>

            <View row middle>
              <Text bold size={18} color="#65676A" style={{marginStart: '5%'}}>
                Progress:
              </Text>
            </View>
            <EmployerStatus panResponder={panResponder} />
          </View>
        </View>
      ) : null}

      <View justifyContent="space-around" row>
        <Button
          onPress={() => {
            setChat(true);
          }}>
          Message
        </Button>
        <Button
          onPress={() => {
            dispatch(resign_employer(SingleWorkerState?.data?._id));
            setIsWorker(false);
          }}>
          Resign
        </Button>
      </View>
    </View>
  );
}

function WorkerList(props: any) {
  const {setIsWorker} = props;
  const dispatch = useDispatch();
  const WorkerState = useSelector((state: RootState) => state.workersState);

  return (
    <View>
      <View row center middle>
        <Text bold size={21} color="#65676A">
          Employers
        </Text>
        <TouchableOpacity
          style={{position: 'absolute', left: '2%', padding: 10}}
          onPress={() => {
            dispatch(closeBottomDrawerAction('Employers'));
          }}>
          <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={3}
        style={{width: '100%'}}
        data={WorkerState.data}
        renderItem={({item}) => (
          <View flex center middle marginBottom={20}>
            <TouchableOpacity
              onPress={() => {
                dispatch(single_worker(item));
                setIsWorker(true);
              }}>
              <Pic
                profile_picture
                src={
                  item.person_of_contact_profile
                    ? {uri: local_url + item.person_of_contact_profile}
                    : require('../assets/image/user/man.png')
                }
                small
              />
              <Text extra_bold size={12} gray style={{textAlign: 'center'}}>
                {item.person_of_contact}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

function EmployerStatus(props: any) {
  const dispatch = useDispatch();
  const SingleWorkerState = useSelector(
    (state: RootState) => state.singleWorkerState,
  );

  const TaskState = useSelector((state: RootState) => state.taskState);
  return (
    <View flex>
      <View paddingHorizontal={'10%'}>
        <Table
          maxHeight={theme.height * 0.3}
          data={TaskState.data}
          renderHeader={() => (
            <View row paddingVertical={3}>
              <View flex={1.3}>
                <Text bold gray>
                  Tasks
                </Text>
              </View>
              <View flex middle>
                <Text bold gray>
                  Status
                </Text>
              </View>
            </View>
          )}
          renderItem={({item}, index) => (
            <TouchableOpacity
              onPress={() => {
                dispatch(update_status(item._id, index));
              }}
              key={index}
              style={{
                borderTopColor: '#CCCCCC',
                borderTopWidth: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 3,
                paddingEnd: 5,
              }}>
              <View flex={1.3}>
                <Text gray>{item.name}</Text>
              </View>
              <View flex middle>
                {item.status == 0 ? (
                  <View
                    style={{
                      backgroundColor: '#148D00',
                      borderRadius: 13,
                      height: 13,
                      width: 13,
                    }}
                  />
                ) : item.status == 1 ? (
                  <View
                    style={{
                      backgroundColor: '#F68025',
                      borderRadius: 13,
                      height: 13,
                      width: 13,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      backgroundColor: '#FF0000',
                      borderRadius: 13,
                      height: 13,
                      width: 13,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View paddingStart="10%" paddingTop="10%">
        <View row middle>
          <View
            style={{
              backgroundColor: '#148D00',
              borderRadius: 13,
              height: 13,
              width: 13,
              marginRight: 10,
            }}
          />
          <Text bold size={13}>
            Done
          </Text>
        </View>

        <View row middle>
          <View
            style={{
              backgroundColor: '#F68025',
              borderRadius: 13,
              height: 13,
              width: 13,
              marginRight: 10,
            }}
          />
          <Text bold size={13}>
            Currently Working
          </Text>
        </View>

        <View row middle>
          <View
            style={{
              backgroundColor: '#FF0000',
              borderRadius: 13,
              height: 13,
              width: 13,
              marginRight: 10,
            }}
          />
          <Text bold size={13}>
            Not Done
          </Text>
        </View>
      </View>
    </View>
  );
}

function Chat(props: ChatProps) {
  const {setChat}: any = props;
  const dispatch = useDispatch();
  const ChatState = useSelector((state: RootState) => state.chatState);
  const {userData}: any = useSelector((state: RootState) => state.userDetails);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [attachment, setAttachment] = useState(false);
  const socket = SocketInstance.getInstance();

  const SingleWorkerState: any = useSelector(
    (state: RootState) => state.singleWorkerState,
  );

  async function UploadImage() {
    const formData = new FormData();
    formData.append('message_image', {
      name: 'deymsan',
      type: image.mime,
      uri: image.path,
    });

    try {
      const {data} = await Axios.post('/uploads/message', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data) {
        const messageData = {
          author_id: userData._id,
          author_profile: userData.profile_pic,
          author_name: userData.full_name,
          author_status: true,

          reciever_id: SingleWorkerState.data.person_of_contact_id,
          reciever_name: SingleWorkerState.data.person_of_contact,
          reciever_profile: SingleWorkerState.data.person_of_contact_profile,
          reciever_status: false,

          message: message,
          attached_message: data,
        };

        dispatch(send_message(messageData));
        socket.send('message', {...messageData});
        setMessage('');
        setImage(null);
      }
    } catch (error) {}
  }

  useEffect(() => {
    dispatch(get_chats(SingleWorkerState.data.person_of_contact_id));
    socket.listen('message', (data: any) => {
      dispatch(update_latest_chat(data));
    });
  }, []);

  const sendMessage = () => {
    if (image) {
      UploadImage();
    } else {
      if (message != '') {
        const messageData = {
          author_id: userData._id,
          author_profile: userData.profile_pic,
          author_name: userData.full_name,
          author_status: true,

          reciever_id: SingleWorkerState.data.person_of_contact_id,
          reciever_name: SingleWorkerState.data.person_of_contact,
          reciever_profile: SingleWorkerState.data.person_of_contact_profile,
          reciever_status: false,

          message: message,
          attached_message: 'unknown',
        };

        dispatch(send_message(messageData));
        socket.send('message', {...messageData});
        setMessage('');
      }
    }
  };

  return (
    <View height="100%">
      <View row center middle>
        <TouchableOpacity
          style={{position: 'absolute', left: '6%', padding: 10}}
          onPress={() => setChat(false)}>
          <Pic src={require('../assets/icons/profile/back.png')} scale={25} />
        </TouchableOpacity>
        <Text bold size={24} color="#65676A">
          {SingleWorkerState.data.person_of_contact}
        </Text>
      </View>

      <View paddingHorizontal={15}>
        <FlatList
          inverted
          data={ChatState.data}
          style={{height: '90%'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 100}}
          renderItem={({item, index}) => {
            if (item.author_id !== userData._id)
              return (
                <View
                  row
                  style={{alignItems: 'flex-start'}}
                  paddingVertical={10}>
                  <Pic
                    src={
                      item.author_profile
                        ? {uri: local_url + item.author_profile}
                        : require('../assets/image/user/man.png')
                    }
                    profile_picture
                    green={!item.workers}
                    large
                  />
                  <View>
                    <View center width={'100%'} flex>
                      <Text medium size={14} gray style={{paddingStart: 10}}>
                        {item.message}
                      </Text>
                    </View>

                    {item.attached_message != 'unknown' ? (
                      <Pic
                        src={{uri: local_url + item.attached_message}}
                        scale={200}
                        style={{marginTop: 20}}
                        resizeMode="contain"
                      />
                    ) : null}
                  </View>
                </View>
              );
            else
              return (
                <View
                  paddingVertical={10}
                  width={'100%'}
                  style={{alignSelf: 'flex-end', alignItems: 'flex-end'}}>
                  {item.attached_message != 'unknown' ? (
                    <Pic
                      src={{uri: local_url + item.attached_message}}
                      scale={200}
                      resizeMode="contain"
                    />
                  ) : null}
                  <Text medium size={14} gray style={{textAlign: 'right'}}>
                    {item.message}
                  </Text>
                </View>
              );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        {attachment ? (
          <View width="92%" alignItems="flex-start" paddingHorizontal={10}>
            <View
              row
              padding={6}
              marginBottom={10}
              style={{borderColor: '#F68025', borderWidth: 1, borderRadius: 5}}>
              <TouchableOpacity
                onPress={() => {
                  ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                  }).then((image: any) => {
                    setImage(image);
                  });
                }}>
                <Pic src={require('../assets/icons/image.png')} scale={20} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Pic
                  src={require('../assets/icons/paperclip.png')}
                  scale={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <View white flex paddingBottom={15} center middle>
          <View style={styles.sender} middle paddingHorizontal={5} row>
            <TouchableOpacity
              style={{marginBottom: 13, marginRight: 5}}
              onPress={() => {
                setAttachment(!attachment);
              }}>
              <Pic
                src={require('../assets/icons/profile/attachments.png')}
                scale={25}
              />
            </TouchableOpacity>

            <View flex middle center>
              {image ? (
                <View style={{marginTop: 25}}>
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => setImage(null)}>
                    <Pic
                      src={require('../assets/icons/profile/x.png')}
                      scale={20}
                    />
                  </TouchableOpacity>
                  <Pic
                    src={{uri: image.path}}
                    resizeMode="contain"
                    scale={250}
                  />
                </View>
              ) : null}
              <TextInput
                style={{
                  minHeight: 50,
                  maxHeight: 100,
                  width: '100%',
                }}
                onChangeText={text => setMessage(text)}
                value={message}
                multiline
              />
            </View>
            <TouchableOpacity
              style={{marginBottom: 13, marginRight: 5}}
              onPress={sendMessage}>
              <Pic
                src={require('../assets/icons/profile/send.png')}
                scale={25}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
export default Employers;

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
  status_clicked: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  status: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
  sender: {
    alignItems: 'flex-end',
    backgroundColor: '#FFFCFC',
    width: '92%',
    borderRadius: 15,
    borderColor: '#ABABAB',
    borderWidth: 1,
  },
});
