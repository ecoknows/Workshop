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
import socketIOClient from 'socket.io-client';

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

const chat_data = [
  // ******TEMPORARY****
  {
    _id: '1234123',
    message:
      'We have a problem sir, I think our generator is not working anymore and we need some replacement of it as soon as possible We have a problem sir, I think our generator is not working anymore and we need some replacement of it as soon as possible We have a problem sir, I think our generator is not working anymore and we need some replacement of it as soon as possible',
  },
  {
    _id: '678901',
    message: 'Okay Chevy lets think about a solution about that problem',
  },
  {
    _id: '1234123',
    message:
      'I found a place where we can buy a high quality genartor on a affordable cause.',
  },
  {_id: '678901', message: 'Where? can you tell me what place'},
  {_id: '678901', message: 'And also specify the address'},
  {_id: '678901', message: 'remember also the cause'},
  {
    _id: '1234123',
    message:
      'We have a problem sir, I think our generator is not working anymore and we need some replacement of it as soon as possible We have a problem sir, I think our generator is not working anymore and we need some replacement of it as soon as possible We have a problem sir, I think our generator is not working anymore and we need some replacement of it as soon as possible',
  },
  {
    _id: '1234123',
    message:
      'We have a problem sir, I think our generator is not working anymore and we need some replacement of it as soon as possible We have a problem sir, I think our generator is not working anymore and we need some replacement of it as soon as possible We have a problem sir, I think our generator is not working anymore and we need some replacement of it as soon as possible',
  },
];

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
          height: '90%',
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
  const socket = useRef<any>();
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(get_chats(messageList.item.author_id));
    socket.current = socketIOClient(local_url, {
      query: {roomId: '1234'},
    });
    socket.current.on('message', data => {
      dispatch(update_latest_chat(data));
    });

    return () => socket.current.disconnect();
  }, []);

  const sendMessage = () => {
    let messageData = null;
    if (messageList.item.reciever_id != userData._id) {
      messageData = {
        author_id: userData._id,
        author_profile: userData.profile_pic,
        author_name: userData.full_name,

        reciever_id: messageList.item.reciever_id,
        reciever_name: messageList.item.reciever_name,
        reciever_profile: messageList.item.reciever_profile,
        message: message,
        attached_message: 'unknown',
      };
    } else {
      messageData = {
        author_id: userData._id,
        author_profile: userData.profile_pic,
        author_name: userData.full_name,

        reciever_id: messageList.item.author_id,
        reciever_name: messageList.item.author_name,
        reciever_profile: messageList.item.author_profile,
        message: message,
        attached_message: 'unknown',
      };
    }

    dispatch(send_message(messageData));
    socket.current.emit('message', {...messageData});
    setMessage('');
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
                      item.author_name
                        ? {uri: local_url + item.author_profile}
                        : require('../assets/image/user/man.png')
                    }
                    profile_picture
                    green={!item.workers}
                    large
                  />
                  <View center width={'100%'} flex>
                    <Text medium size={14} gray style={{paddingStart: 10}}>
                      {item.message}
                    </Text>
                  </View>
                </View>
              );
            else
              return (
                <View
                  rowVerse
                  paddingVertical={10}
                  width={'100%'}
                  style={{alignSelf: 'flex-end'}}>
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
          backgroundColor: 'white',
          paddingBottom: 15,
        }}>
        <View style={styles.sender} middle paddingHorizontal={5} row>
          <Pic
            src={require('../assets/icons/profile/attachments.png')}
            scale={25}
            style={{marginBottom: 13, marginRight: 5}}
          />
          <TextInput
            style={{minHeight: 50, maxHeight: 100, flex: 1}}
            onChangeText={text => setMessage(text)}
            value={message}
            multiline
          />
          <TouchableOpacity
            style={{marginBottom: 13, marginRight: 5}}
            onPress={sendMessage}>
            <Pic src={require('../assets/icons/profile/send.png')} scale={25} />
          </TouchableOpacity>
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
                    item.reciever_profile
                      ? {uri: local_url + item.reciever_profile}
                      : require('../assets/image/user/man.png')
                  }
                  profile_picture
                  medium
                />
                <Text extra_bold gray size={17} style={{textAlign: 'center'}}>
                  {item.reciever_name}
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
