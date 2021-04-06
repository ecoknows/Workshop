import React, {useState} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import Table from '../components/Table';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../constants';
import {closeBottomDrawerAction} from '../redux';
import {useDispatch} from 'react-redux';

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
  {document: 'DTI Registration', status: APPROVED},
  {document: 'SEC Registration', status: DENIED},
  {document: 'BIR Registration', status: PENDING},
];

function Documents(props: DocumentsProps) {
  const {UserChoice, drawer_anim} = props;
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

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
      <View>
        <View row center middle>
          <Text bold size={21} color="#65676A">
            Documents
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', left: '2%', padding: 10}}
            onPress={() => {
              dispatch(closeBottomDrawerAction('Documents'));
            }}>
            <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View paddingHorizontal={5}>
        <View row middle>
          <Text extra_bold size={18} gray>
            Status:
          </Text>
          <View style={[styles.border, {borderColor: '#F79040'}]}>
            <Text medium size={12} color="#F79040">
              Pending
            </Text>
          </View>
        </View>

        <Text size={14} color="#858585" style={{marginTop: 10}}>
          Uploading of documents related to the legitimacy of the business will
          earn an authorized tag.
        </Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        {!edit ? (
          <TouchableOpacity onPress={() => setEdit(!edit)}>
            <Pic
              src={require('../assets/icons/profile/pencil-edit.png')}
              scale={25}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setEdit(!edit)}>
            <Pic
              src={require('../assets/icons/profile/pencil-edit-clicked.png')}
              scale={25}
            />
          </TouchableOpacity>
        )}
      </View>
      {!edit ? <DocumentStatus /> : <DocumentUpdate />}
      <Text bold size={18} gray style={{marginTop: 20}}>
        Issues
      </Text>
      <Text color="#7B7B7B" size={14} style={{marginTop: 5}}>
        No issues found.
      </Text>
    </View>
  );
}

function DocumentStatus(props: any) {
  return (
    <View>
      <Table
        data={testdata}
        maxHeight={theme.height * 0.2}
        renderHeader={() => (
          <View row paddingVertical={3}>
            <View flex={1.3}>
              <Text bold gray>
                Document
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
              <Text gray>{item.document}</Text>
            </View>
            <View flex middle>
              {item.status == APPROVED ? (
                <Text color="#148D00" medium size={14}>
                  Approved
                </Text>
              ) : item.status == DENIED ? (
                <Text color="#FF0000" medium size={14}>
                  Denied
                </Text>
              ) : item.status == PENDING ? (
                <Text color="#F68025" medium size={14}>
                  Pending
                </Text>
              ) : null}
            </View>
          </View>
        )}
      />
      <View style={styles.updateTop}>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text color="#8E8E8E" size={14} style={{flex: 1.3}}>
            Add document...
          </Text>
          <View flex center middle>
            <Pic
              src={require('../assets/icons/profile/add_circle.png')}
              scale={24}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function DocumentUpdate(props: any) {
  return (
    <View>
      <Table
        data={testdata}
        maxHeight={theme.height * 0.2}
        renderHeader={() => (
          <View row paddingVertical={3}>
            <View flex={1.3}>
              <Text bold gray>
                Document
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
              <Text gray>{item.document}</Text>
            </View>
            <View flex middle row center>
              <TouchableOpacity
                style={[styles.border_status, {borderColor: '#148D00'}]}>
                <Pic
                  src={require('../assets/icons/profile/share-arrow.png')}
                  scale={11}
                  style={{marginRight: 3}}
                />
                <Text medium size={10} color="#148D00">
                  Update
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.border_status, {borderColor: '#FF0000'}]}>
                <Pic
                  src={require('../assets/icons/profile/red-circle.png')}
                  scale={11}
                  style={{marginRight: 3}}
                />
                <Text medium size={10} color="#FF0000">
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View
        middle
        center
        row
        paddingTop={10}
        justifyContent="space-around"
        style={styles.updateTop}>
        <TouchableOpacity style={styles.fire_btn}>
          <Text color="#F79040" size={12} medium>
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fire_btn}>
          <Text color="#F79040" size={12} medium>
            Save
          </Text>
        </TouchableOpacity>
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
  fire_btn: {
    borderColor: '#FF900D',
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 2,
    borderRadius: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
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
});
