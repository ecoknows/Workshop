import React, { useState, useEffect } from 'react';
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
import { theme } from '../constants';
import { useDispatch } from 'react-redux';
import { closeBottomDrawerAction } from '../redux';

interface MessageProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}
interface MessageListProps {
  setMessageList: (params: { status: boolean; item: DataType }) => void;
}
interface ChatProps {
  messageList: { status: boolean; item: DataType };
  setMessageList: (params: { status: boolean; item: DataType }) => void;
}

interface DataType {
  name: string;
  latestMessage: string;
  workers: boolean;
}
const data = [
  // ******TEMPORARY****
  {
    name: 'Chevy Quitquitan',
    latestMessage: 'We have a problem...',
    workers: true,
  },
  {
    name: 'Camry Villaraza',
    latestMessage: 'Hello I want to apply...',
    workers: false,
  },
  { name: 'John Smith', latestMessage: 'Good afternoon sir...', workers: true },
  { name: 'Elon Musk', latestMessage: 'Can we talk about th..', workers: true },
];

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
  { _id: '678901', message: 'Where? can you tell me what place' },
  { _id: '678901', message: 'And also specify the address' },
  { _id: '678901', message: 'remember also the cause' },
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

const user_id = '678901'; // ******TEMPORARY****

function Message(props: MessageProps) {
  const { UserChoice, drawer_anim } = props;

  const [messageList, setMessageList] = useState({
    status: true,
    item: { name: '', latestMessage: '', workers: false },
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
      ]}
    >
      {messageList.status ? (
        <MessageList setMessageList={setMessageList} />
      ) : (
        <Chat messageList={messageList} setMessageList={setMessageList} />
      )}
    </View>
  );
}
function Chat(props: ChatProps) {
  const { messageList, setMessageList } = props;

  return (
    <View height="100%">
      <View row center middle>
        <TouchableOpacity
          style={{ position: 'absolute', left: '6%', padding: 10 }}
          onPress={() =>
            setMessageList({
              status: true,
              item: { name: '', latestMessage: '', workers: false },
            })
          }
        >
          <Pic src={require('../assets/icons/profile/back.png')} scale={25} />
        </TouchableOpacity>
        <Text bold size={24} color="#65676A">
          {messageList.item.name}
        </Text>
      </View>

      <View paddingHorizontal={15}>
        <FlatList
          data={chat_data}
          renderItem={({ item, index }) => {
            if (item._id !== user_id)
              return (
                <View
                  row
                  style={{ alignItems: 'flex-start' }}
                  paddingVertical={10}
                >
                  <Pic
                    src={require('../assets/image/user/man.png')}
                    profile_picture
                    green={!messageList.item.workers}
                    large
                  />
                  <View center width={'100%'} flex>
                    <Text medium size={14} gray style={{ paddingStart: 10 }}>
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
                  style={{ alignSelf: 'flex-end' }}
                >
                  <Text medium size={14} gray style={{ textAlign: 'right' }}>
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
        }}
      >
        <View style={styles.sender} middle paddingHorizontal={5} row>
          <Pic
            src={require('../assets/icons/profile/attachments.png')}
            scale={25}
            style={{ marginBottom: 13, marginRight: 5 }}
          />
          <TextInput
            style={{ minHeight: 50, maxHeight: 100, flex: 1 }}
            multiline
          />
          <Pic
            src={require('../assets/icons/profile/send.png')}
            scale={25}
            style={{ marginBottom: 13, marginRight: 5 }}
          />
        </View>
      </View>
    </View>
  );
}

function MessageList(props: MessageListProps) {
  const { setMessageList } = props;
  const dispatch = useDispatch();
  const ChatClick = (item: DataType) => {
    setMessageList({ status: false, item });
  };
  return (
    <View>
      <View row center middle>
        <Text bold size={21} color="#65676A">
          Messages
        </Text>
        <TouchableOpacity
          style={{ position: 'absolute', left: '2%', padding: 10 }}
          onPress={() => {
            dispatch(
              closeBottomDrawerAction(1)
            );
          }}
        >
          <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
        </TouchableOpacity>
      </View>
      <View row center middle style={{ marginBottom: 15 }}>
        <View
          style={{
            height: 8,
            width: 8,
            backgroundColor: theme.colors.accent,
            borderRadius: 30,
            marginRight: 5,
          }}
        />
        <Text style={{ marginRight: 10 }}>workers</Text>
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
          data={data}
          numColumns={2}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: '50%',
                height: theme.height * 0.3,
                justifyContent: index % 2 != 0 ? 'flex-end' : 'flex-start',
              }}
            >
              <TouchableOpacity onPress={() => ChatClick(item)}>
                <Pic
                  src={require('../assets/image/user/man.png')}
                  profile_picture
                  green={!item.workers}
                  medium
                />
                <Text extra_bold gray size={17} style={{ textAlign: 'center' }}>
                  {item.name}
                </Text>
                <Text medium gray size={13} style={{ textAlign: 'center' }}>
                  {item.latestMessage}
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
