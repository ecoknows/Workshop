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
  get_workers_contact_person,
  single_worker,
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

interface WorkersProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}

function Workers(props: WorkersProps) {
  const {UserChoice, drawer_anim} = props;
  const [isWorker, setIsWorker] = useState(false);
  const [chat, setChat] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_workers_contact_person());
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
            <WorkersList setIsWorker={setIsWorker} />
          )}
        </View>
      ) : (
        <Chat setChat={setChat} />
      )}
    </View>
  );
}

function WorkerInfo(props: any) {
  const {isWorker, setIsWorker, setChat} = props;
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const SingleWorkerState: any = useSelector(
    (state: RootState) => state.singleWorkerState,
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
          Workers
        </Text>
      </View>
      <View>
        <Pic
          profile_picture
          src={
            SingleWorkerState?.data?.worker_name_profile
              ? {uri: local_url + SingleWorkerState?.data?.worker_name_profile}
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
          {SingleWorkerState?.data?.job_name}
        </Text>
      </View>

      <View flex>
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
        <Text
          medium
          size={14}
          color="#65676A"
          style={{marginTop: 15, alignSelf: 'center'}}>
          Work Progress
        </Text>
      </View>
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

            <TouchableOpacity
              style={{position: 'absolute', right: '10%'}}
              onPress={() => setEdit(!edit)}>
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

          {!edit ? <WorkStatus panResponder={panResponder} /> : <WorkUpdate />}
        </View>
      </View>
      <View row justifyContent="space-around">
        <Button onPress={() => setChat(true)}>Message</Button>
        <Button
          onPress={() => {
            dispatch(fire_worker(SingleWorkerState?.data._id));
            setIsWorker(false);
          }}
          style={{alignSelf: 'flex-end', marginEnd: 10}}>
          Fire
        </Button>
      </View>
    </View>
  );
}

function WorkersList(props: any) {
  const {setIsWorker} = props;
  const dispatch = useDispatch();
  const WorkerState = useSelector((state: RootState) => state.workersState);

  return (
    <View>
      <View row center middle>
        <Text bold size={21} color="#65676A">
          Workers
        </Text>
        <TouchableOpacity
          style={{position: 'absolute', left: '2%', padding: 10}}
          onPress={() => {
            dispatch(closeBottomDrawerAction('Workers'));
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
                  item.worker_name_profile
                    ? {uri: local_url + item.worker_name_profile}
                    : require('../assets/image/user/man.png')
                }
                small
              />
              <Text extra_bold size={12} gray style={{textAlign: 'center'}}>
                {item.worker_name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

function WorkStatus(props: any) {
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
            <View
              row
              key={index}
              center
              middle
              style={{
                borderTopColor: '#CCCCCC',
                borderTopWidth: 1,
                paddingVertical: 3,
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
            </View>
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

function WorkUpdate(props: any) {
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState(0);
  const [text, setText] = useState('');
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
              <View flex>
                <Text gray>{item.name}</Text>
              </View>
              <View middle>
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

      <View flex={1.5} style={styles.updateTop}>
        {!edit ? (
          <TouchableOpacity
            onPress={() => setEdit(true)}
            style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text color="#8E8E8E" size={14}>
              Add Task
            </Text>
            <Pic
              src={require('../assets/icons/profile/add_circle.png')}
              scale={25}
              style={{position: 'absolute', right: 0}}
            />
          </TouchableOpacity>
        ) : (
          <View row center middle>
            <TouchableOpacity
              onPress={() => {
                setEdit(false);
              }}>
              <Pic
                src={require('../assets/icons/x.png')}
                scale={20}
                style={{marginEnd: 5}}
              />
            </TouchableOpacity>
            <TextInput
              style={{paddingVertical: 0, flex: 1}}
              value={text}
              onChangeText={(text: string) => setText(text)}
              placeholder="input task name"
            />
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <View
                style={{
                  backgroundColor:
                    status == 0
                      ? '#148D00'
                      : status == 1
                      ? '#F68025'
                      : status == 2
                      ? '#FF0000'
                      : null,
                  borderRadius: 13,
                  height: 13,
                  width: 13,
                }}
              />
            </TouchableOpacity>
          </View>
        )}

        {edit ? (
          <View row center middle>
            <TouchableOpacity
              onPress={() => setStatus(0)}
              style={status == 0 ? styles.status_clicked : styles.status}>
              <View
                style={{
                  backgroundColor: '#148D00',
                  borderRadius: 13,
                  height: 13,
                  width: 13,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setStatus(1)}
              style={status == 1 ? styles.status_clicked : styles.status}>
              <View
                style={{
                  backgroundColor: '#F68025',
                  borderRadius: 13,
                  height: 13,
                  width: 13,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setStatus(2)}
              style={status == 2 ? styles.status_clicked : styles.status}>
              <View
                style={{
                  backgroundColor: '#FF0000',
                  borderRadius: 13,
                  height: 13,
                  width: 13,
                }}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        {edit ? (
          <View center middle marginTop={10}>
            <Button
              onPress={() => {
                dispatch(
                  add_task({
                    worker_id: SingleWorkerState?.data?.worker_id,
                    job_id: SingleWorkerState?.data?.job_id,
                    name: text,
                    status,
                  }),
                );
              }}>
              Add Task
            </Button>
          </View>
        ) : null}

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

          reciever_id: SingleWorkerState.data.worker_id,
          reciever_name: SingleWorkerState.data.worker_name,
          reciever_profile: SingleWorkerState.data.worker_name_profile,
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
    dispatch(get_chats(SingleWorkerState.data.worker_id));
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

          reciever_id: SingleWorkerState.data.worker_id,
          reciever_name: SingleWorkerState.data.worker_name,
          reciever_profile: SingleWorkerState.data.worker_name_profile,

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
          {/* {messageList.item.author_name} */}
          Jerico C. Villaraza
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
export default Workers;

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

  sender: {
    alignItems: 'flex-end',
    backgroundColor: '#FFFCFC',
    width: '92%',
    borderRadius: 15,
    borderColor: '#ABABAB',
    borderWidth: 1,
  },
});
