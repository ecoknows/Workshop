import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  LogBox,
  ScrollView,
  TextInput,
} from 'react-native';
import {View, Text, Pic, Table} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  add_resume,
  openBottomDrawerAction,
  openDrawerAction,
  update_document,
} from '../../../redux';
import Skills from '../../../components/Skills';
import {theme} from '../../../constants';
import {add_selected_job, get_jobs} from '../../../redux/actions/jobs.actions';
import {local_url} from '../../../constants/urls';
import Axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';

function Main({navigation}) {
  return (
    <View flex white>
      <Top navigation={navigation} />
      <Bottom />
    </View>
  );
}

const pickDocument = async callback => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    if (res) {
      if (callback) {
        callback(res);
      }
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
};
function Top({navigation}) {
  const dispatch = useDispatch();
  const JobsState = useSelector(state => state.jobsListState);
  const UserState = useSelector(state => state.userDetails);

  const CreateJobState = useSelector(state => state.jobCreateState);
  const {jobCreated} = CreateJobState;

  const {error, loading, jobs} = JobsState;
  const {userData} = UserState;
  const [edit, setEdit] = useState(false);
  const [documentName, setDocumentName] = useState(null);

  useEffect(() => {
    dispatch(get_jobs());
  }, [jobCreated]);

  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        paddingBottom: 100,
        height: '100%',
      }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: '5%',
          height: 40,
          top: StatusBar.currentHeight,
          width: 40,
          alignItems: 'flex-end',
        }}
        onPress={() => {
          dispatch(openDrawerAction(0));
        }}>
        <Pic
          src={require('../../../assets/icons/burger.png')}
          style={{resizeMode: 'contain', height: 20, width: 20}}
        />
      </TouchableOpacity>

      <View
        center
        middle
        style={{
          paddingTop: StatusBar.currentHeight,
        }}>
        <Pic
          src={
            userData?.profile_pic
              ? {uri: local_url + userData?.profile_pic}
              : require('../../../assets/image/user/man.png')
          }
          profile_picture
        />
        <Text extra_bold gray size={23}>
          {userData?.full_name}
        </Text>
        <Text medium size={14} gray>
          {userData?.city}, Philippines
        </Text>

        <View width={'80%'} marginVertical={5} center middle>
          <Skills
            skills={userData?.most_skilled}
            authorized={userData?.authorized || 0}
          />
        </View>
      </View>

      <View center middle>
        <TouchableOpacity
          style={styles.resume}
          onPress={() => {
            console.log(userData.resume);
            if (!userData.resume) {
              pickDocument(res => {
                dispatch(add_resume(res));
              });
            } else {
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Your resume downloaded!',
                text2:
                  'if you want to change your resume please go to settings',
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
                  )}-${userData.resume.file_name}`,
                  description: 'Downloading.',
                },
              };

              config(options)
                .fetch('GET', `${local_url}${userData.resume.path}`)
                .then(res => {});
            }
          }}>
          <Pic
            src={require('../../../assets/icons/profile/document.png')}
            scale={19}
            style={{marginEnd: 10}}
          />
          <Text extra_bold size={13} color="#292929" style={{marginEnd: 30}}>
            Resume
          </Text>

          <Pic
            src={require('../../../assets/icons/profile/download.png')}
            scale={15}
          />
        </TouchableOpacity>
      </View>

      <View>
        <Text medium size={20} gray>
          Others:
        </Text>
        <View style={{alignItems: 'flex-end'}}>
          {!edit ? (
            <TouchableOpacity onPress={() => setEdit(!edit)}>
              <Pic
                src={require('../../../assets/icons/profile/pencil-edit.png')}
                scale={22}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setEdit(!edit)}>
              <Pic
                src={require('../../../assets/icons/profile/pencil-edit-clicked.png')}
                scale={22}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View flex>
        <Table
          data={userData?.documentation_links}
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
                {!edit ? (
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
                      src={require('../../../assets/icons/download_green.png')}
                      scale={17}
                    />
                  </TouchableOpacity>
                ) : (
                  <View row>
                    <TouchableOpacity style={{marginRight: 10}}>
                      <Pic
                        src={require('../../../assets/icons/profile/worker/link.png')}
                        scale={25}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginRight: 10}}>
                      <Pic
                        src={require('../../../assets/icons/profile/worker/share-arrow-2.png')}
                        scale={20}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginRight: 10}}>
                      <Pic
                        src={require('../../../assets/icons/profile/worker/trash.png')}
                        scale={20}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}
        />

        {!edit ? (
          <View style={styles.updateTop}>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <TextInput
                style={{
                  color: '#8E8E8E',
                  fontSize: 14,
                  flex: 1,
                  paddingVertical: 0,
                  borderBottomColor: '#8E8E8E',
                  borderBottomWidth: 0.7,
                }}
                placeholder="Name of document"
                onChangeText={text => setDocumentName(text)}
                value={documentName}
              />
              <TouchableOpacity
                style={{
                  alignSelf: 'baseline',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  pickDocument(res => {
                    dispatch(update_document(res, documentName));
                    setDocumentName(null);
                  })
                }>
                <Pic
                  src={require('../../../assets/icons/profile/add_circle.png')}
                  scale={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

function Bottom(props) {
  return <View white flex={1.5} paddingVertical={10}></View>;
}

export default Main;

const styles = StyleSheet.create({
  bottom_botton_style_first: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#EAEAEA',
    borderBottomColor: '#EAEAEA',
    paddingHorizontal: '10%',
    paddingVertical: '2%',
  },
  bottom_botton_style: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingHorizontal: '10%',
    paddingVertical: '2%',
  },
  bottom_botton_text_style: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 10,
    color: '#917C7C',
  },
  icon: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
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
  updateTop: {
    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
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
});
