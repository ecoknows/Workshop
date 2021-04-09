import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from 'react-native';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import {theme} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {closeBottomDrawerAction, RootState} from '../redux';
import {
  get_chats,
  get_latest_messages,
  send_message,
  update_latest_chat,
} from '../redux/actions/messages.actions';
import {local_url} from '../constants/urls';
import SocketInstance from '../constants/SocketIO';

import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';

interface MessageProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}
interface MessageListProps {
  setMessageList: (params: {status: boolean; item: DataType}) => void;
}
interface ChatProps {
  messageList: {status: boolean; item: DataType};
  setMessageList: (params: {status: boolean; item: DataType}) => void;
}

interface DataType {
  name: string;
  latestMessage: string;
  workers: boolean;
}

function Message(props: MessageProps) {
  const {UserChoice, drawer_anim} = props;

  const [messageList, setMessageList] = useState({
    status: true,
    item: {},
  });

  return (
    <View
      animated
      bottom={0}
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
      {messageList.status ? (
        <MessageList setMessageList={setMessageList} />
      ) : (
        <Chat messageList={messageList} setMessageList={setMessageList} />
      )}
    </View>
  );
}
function Chat(props: ChatProps) {
  const {messageList, setMessageList}: any = props;
  const dispatch = useDispatch();
  const ChatState = useSelector((state: RootState) => state.chatState);
  const {userData}: any = useSelector((state: RootState) => state.userDetails);
  const [message, setMessage] = useState('');
  const socket = SocketInstance.getInstance();
  const [attachment, setAttachment] = useState(false);
  const [image, setImage] = useState(null);

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
        if (message) {
          let messageData = null;
          if (messageList.item.reciever_id != userData._id) {
            messageData = {
              author_id: userData._id,
              author_profile: userData.profile_pic,
              author_name: userData.full_name,
              author_status: userData.is_employer,

              reciever_id: messageList.item.reciever_id,
              reciever_name: messageList.item.reciever_name,
              reciever_profile: messageList.item.reciever_profile,
              reciever_status: !userData.is_employer,

              message: message,
              attached_message: data,
            };
          } else {
            messageData = {
              author_id: userData._id,
              author_profile: userData.profile_pic,
              author_name: userData.full_name,
              author_status: userData.is_employer,

              reciever_id: messageList.item.author_id,
              reciever_name: messageList.item.author_name,
              reciever_profile: messageList.item.author_profile,
              reciever_status: !userData.is_employer,

              message: message,
              attached_message: data,
            };
          }

          dispatch(send_message(messageData));
          socket.send('message', {...messageData});
          setMessage('');
          setImage(null);
        }
      }
    } catch (error) {}
  }
  useEffect(() => {
    dispatch(get_chats(messageList.item.author_id));
    socket.listen('message', (data: any) => {
      dispatch(update_latest_chat(data));
    });
  }, []);

  const sendMessage = () => {
    let messageData = null;

    if (image) {
      UploadImage();
    } else {
      if (message) {
        if (messageList.item.reciever_id != userData._id) {
          messageData = {
            author_id: userData._id,
            author_profile: userData.profile_pic,
            author_name: userData.full_name,
            author_status: userData.is_employer,

            reciever_id: messageList.item.reciever_id,
            reciever_name: messageList.item.reciever_name,
            reciever_profile: messageList.item.reciever_profile,
            reciever_status: !userData.is_employer,

            message: message,
            attached_message: 'unknown',
          };
        } else {
          messageData = {
            author_id: userData._id,
            author_profile: userData.profile_pic,
            author_name: userData.full_name,
            author_status: userData.is_employer,

            reciever_id: messageList.item.author_id,
            reciever_name: messageList.item.author_name,
            reciever_profile: messageList.item.author_profile,
            reciever_status: !userData.is_employer,

            message: message,
            attached_message: 'unknown',
          };
        }

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
          onPress={() =>
            setMessageList({
              status: true,
              item: {},
            })
          }>
          <Pic src={require('../assets/icons/profile/back.png')} scale={25} />
        </TouchableOpacity>
        <Text bold size={24} color="#65676A">
          {messageList.item.author_name}
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
        center
        middle
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

function MessageList(props: MessageListProps) {
  const {setMessageList} = props;
  const dispatch = useDispatch();
  const MessageState = useSelector((state: RootState) => state.messagesState);

  useEffect(() => {
    dispatch(get_latest_messages());
  }, []);

  const ChatClick = (item: DataType) => {
    setMessageList({status: false, item});
  };
  return (
    <View>
      <View row center middle>
        <Text bold size={21} color="#65676A">
          Messages
        </Text>
        <TouchableOpacity
          style={{position: 'absolute', left: '2%', padding: 10}}
          onPress={() => {
            dispatch(closeBottomDrawerAction('Messages'));
          }}>
          <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
        </TouchableOpacity>
      </View>
      <View row center middle style={{marginBottom: 15}}>
        <View
          style={{
            height: 8,
            width: 8,
            backgroundColor: theme.colors.accent,
            borderRadius: 30,
            marginRight: 5,
          }}
        />
        <Text style={{marginRight: 10}}>workers</Text>
        <View
          style={{
            height: 8,
            width: 8,
            backgroundColor: theme.colors.green,
            borderRadius: 30,
            marginRight: 5,
          }}
        />
        <Text>applicants</Text>
      </View>
      <View row>
        <FlatList
          data={MessageState.data}
          numColumns={2}
          contentContainerStyle={{paddingHorizontal: 10}}
          renderItem={({item, index}) => (
            <View
              style={{
                width: '50%',
                height: theme.height * 0.3,
                justifyContent: index % 2 != 0 ? 'flex-end' : 'flex-start',
              }}>
              <TouchableOpacity onPress={() => ChatClick(item)}>
                <Pic
                  src={
                    item.author_profile
                      ? {uri: local_url + item.author_profile}
                      : require('../assets/image/user/man.png')
                  }
                  profile_picture
                  medium
                />
                <Text extra_bold gray size={17} style={{textAlign: 'center'}}>
                  {item.author_name}
                </Text>
                <Text medium gray size={13} style={{textAlign: 'center'}}>
                  {item.message}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

export default Message;

const styles = StyleSheet.create({
  sender: {
    alignItems: 'flex-end',
    backgroundColor: '#FFFCFC',
    width: '92%',
    borderRadius: 15,
    borderColor: '#ABABAB',
    borderWidth: 1,
  },
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
});
