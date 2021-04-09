import React, {useState, useEffect} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import Table from '../components/Table';
import Button from '../components/Button';
import Skills from '../components/Skills';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeBottomDrawerAction,
  get_applicant_contact_person,
  get_applicant_info,
  RootState,
} from '../redux';
import {local_url} from '../constants/urls';
import {theme} from '../constants';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-toast-message';
import {add_worker} from '../redux/actions/workers.actions';
import {
  get_chats,
  send_message,
  update_latest_chat,
} from '../redux/actions/messages.actions';
import SocketInstance from '../constants/SocketIO';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';

interface ChatProps {
  isApplicant: any;
  setChat: (params: boolean) => void;
}

interface ApplicantsProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}

function Applicants(props: ApplicantsProps) {
  const {UserChoice, drawer_anim} = props;
  const [isApplicant, setIsApplicant] = useState({
    status: false,
    item: {},
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_applicant_contact_person());
  }, []);
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
      {isApplicant.status ? (
        <ApplicantInfo
          isApplicant={isApplicant}
          setIsApplicant={setIsApplicant}
        />
      ) : (
        <ApplicantsList setIsApplicant={setIsApplicant} />
      )}
    </View>
  );
}

function ApplicantInfo(props: any) {
  const {isApplicant, setIsApplicant} = props;
  const dispatch = useDispatch();
  const [chat, setChat] = useState(false);
  useEffect(() => {
    dispatch(get_applicant_info(isApplicant.item));
  }, []);

  return (
    <View>
      {!chat ? (
        <ApplicantInfoView
          isApplicant={isApplicant}
          setIsApplicant={setIsApplicant}
          setChat={setChat}
        />
      ) : (
        <Chat setChat={setChat} isApplicant={isApplicant} />
      )}
    </View>
  );
}

function ApplicantInfoView(props: any) {
  const {isApplicant, setIsApplicant, setChat} = props;
  const dispatch = useDispatch();
  const ApplicantInfo = useSelector(
    (state: RootState) => state.selectedApplicantState,
  );
  return (
    <ScrollView style={{height: '100%'}}>
      <View row center middle style={{marginBottom: 15}}>
        <TouchableOpacity
          style={{position: 'absolute', left: '6%', padding: 10}}
          onPress={() =>
            setIsApplicant({
              status: false,
              item: {},
            })
          }>
          <Pic src={require('../assets/icons/profile/back.png')} scale={25} />
        </TouchableOpacity>

        <Text bold size={21} color="#65676A">
          Applicant
        </Text>
      </View>

      <View middle>
        <Pic
          profile_picture
          src={
            isApplicant.item.applicant_name_profile
              ? {uri: local_url + isApplicant.item.applicant_name_profile}
              : require('../assets/image/user/man.png')
          }
          medium
          green
        />

        <Skills
          skills={ApplicantInfo?.data?.most_skilled}
          authorized={ApplicantInfo?.data?.authorized || 0}
        />

        <Text extra_bold size={18} color="#65676A">
          {isApplicant.item.applicant_name}
        </Text>
        <Text medium size={14} color="#65676A" style={{marginBottom: 15}}>
          {isApplicant.item.course}
        </Text>
        <TouchableOpacity
          style={styles.resume}
          onPress={() => {
            if (ApplicantInfo?.data?.resume) {
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Applicant resume downloaded!',
                text2: 'You can now check the application of the applicant',
                visibilityTime: 2000,
                autoHide: true,
              });

              const {config, fs} = RNFetchBlob;
              const date = new Date();

              const {DownloadDir} = fs.dirs; // You can check the available directories in the wiki.
              const options = {
                fileCache: true,
                addAndroidDownloads: {
                  useDownloadManager: true, // true will use native manager and be shown on notification bar.
                  notification: true,
                  path: `${DownloadDir}/${Math.floor(
                    date.getTime() + date.getSeconds() / 2,
                  )}-${ApplicantInfo?.data?.resume.file_name}`,
                  description: 'Downloading.',
                },
              };

              config(options)
                .fetch('GET', `${local_url}${ApplicantInfo?.data?.resume.path}`)
                .then(res => {});
            }
          }}>
          <Pic
            src={require('../assets/icons/profile/document.png')}
            scale={19}
            style={{marginEnd: 10}}
          />
          <Text extra_bold size={13} color="#292929" style={{marginEnd: 30}}>
            Resume
          </Text>

          <Pic
            src={require('../assets/icons/profile/download.png')}
            scale={15}
          />
        </TouchableOpacity>
      </View>

      <Text medium gray size={18}>
        Others:
      </Text>
      <View flex>
        <Table
          data={ApplicantInfo?.data?.documentation_links}
          maxHeight={theme.height * 0.5}
          renderHeader={() => (
            <View row paddingVertical={3}>
              <View flex={1.3}>
                <Text bold gray>
                  Name
                </Text>
              </View>
              <View flex middle>
                <Text bold gray>
                  Download
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
              <View flex middle row center>
                <TouchableOpacity
                  onPress={() => {
                    const {config, fs} = RNFetchBlob;
                    const date = new Date();

                    const {DownloadDir} = fs.dirs; // You can check the available directories in the wiki.
                    const options = {
                      fileCache: true,
                      addAndroidDownloads: {
                        useDownloadManager: true, // true will use native manager and be shown on notification bar.
                        notification: true,
                        path: `${DownloadDir}/${Math.floor(
                          date.getTime() + date.getSeconds() / 2,
                        )}-${item.file_name}`,
                        description: 'Downloading.',
                      },
                    };

                    config(options)
                      .fetch('GET', `${local_url}${item.path}`)
                      .then(res => {});
                  }}
                  style={[styles.border_status, {borderColor: '#148D00'}]}>
                  <Pic
                    src={require('../assets/icons/download_green.png')}
                    scale={17}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <View flex>
        <Text gray bold size={18}>
          Applying for position of:
        </Text>
        <Text
          gray
          size={14}
          style={{
            borderColor: '#CCCCCC',
            borderBottomWidth: 1,
            textAlign: 'center',
            paddingBottom: 10,
            width: '70%',
            alignSelf: 'center',
            marginTop: '5%',
          }}>
          {isApplicant.item.job_name}
        </Text>
        <View row justifyContent="space-around" marginTop={20}>
          <Button
            onPress={() => {
              setChat(true);
            }}>
            Message
          </Button>
          <Button
            onPress={() => {
              dispatch(
                add_worker(
                  isApplicant.item.applicant_id,
                  isApplicant.item.job_id,
                ),
              );

              setIsApplicant({
                status: false,
                item: {},
              });
            }}>
            Hire
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

function ApplicantsList(props: any) {
  const {setIsApplicant} = props;
  const dispatch = useDispatch();

  const ApplicantState = useSelector(
    (state: RootState) => state.applicantsState,
  );

  return (
    <View>
      <View row center middle>
        <Text bold size={21} color="#65676A">
          Applicants
        </Text>
        <TouchableOpacity
          style={{position: 'absolute', left: '2%', padding: 10}}
          onPress={() => {
            dispatch(closeBottomDrawerAction('Applicants'));
          }}>
          <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={3}
        style={{width: '100%'}}
        data={ApplicantState.data}
        renderItem={({item}) => (
          <View flex center middle marginBottom={20}>
            <TouchableOpacity
              onPress={() => setIsApplicant({status: true, item: item})}>
              <Pic
                profile_picture
                src={
                  item.applicant_name_profile
                    ? {uri: local_url + item.applicant_name_profile}
                    : require('../assets/image/user/man.png')
                }
                small
                green
              />
              <Text extra_bold size={12} gray style={{textAlign: 'center'}}>
                {item.applicant_name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

function Chat(props: ChatProps) {
  const {setChat, isApplicant}: any = props;
  const dispatch = useDispatch();
  const ChatState = useSelector((state: RootState) => state.chatState);
  const {userData}: any = useSelector((state: RootState) => state.userDetails);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [attachment, setAttachment] = useState(false);
  const socket = SocketInstance.getInstance();

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

          reciever_id: isApplicant.item.applicant_id,
          reciever_name: isApplicant.item.applicant_name,
          reciever_profile: isApplicant.item.applicant_name_profile,
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
    dispatch(get_chats(isApplicant.item.applicant_id));
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

          reciever_id: isApplicant.item.applicant_id,
          reciever_name: isApplicant.item.applicant_name,
          reciever_profile: isApplicant.item.applicant_name_profile,
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

export default Applicants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
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
  border_status: {
    borderWidth: 1,
    paddingHorizontal: 5,
    width: '40%',
    paddingVertical: 4,
    borderRadius: 100,
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  resume: {
    backgroundColor: '#E5E5E5',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
  },
  hire_btn: {
    borderColor: '#FF900D',
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 2,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
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
