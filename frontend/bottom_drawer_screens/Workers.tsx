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
} from 'react-native';
import { theme } from '../constants';
import { useDispatch } from 'react-redux';
import { closeBottomDrawerAction } from '../redux';

interface WorkersProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}

function Workers(props: WorkersProps) {
  const { UserChoice, drawer_anim } = props;
  const [isWorker, setIsWorker] = useState({
    status: false,
    item: {},
  });
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
      {isWorker.status ? (
        <WorkerInfo isWorker={isWorker} setIsWorker={setIsWorker} />
      ) : (
        <WorkersList setIsWorker={setIsWorker} />
      )}
    </View>
  );
}

function WorkerInfo(props: any) {
  const { isWorker, setIsWorker } = props;
  const [edit, setEdit] = useState(false);
  const progressPan = useRef<any>(
    new Animated.ValueXY({ y: theme.height * 0.7, x: 0 })
  ).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        progressPan.setOffset({
          y: progressPan.y._value,
        });
      },
      onPanResponderMove: (e, { dy }) => {
        progressPan.setValue({ y: dy });
      },
      onPanResponderRelease: (_, { dy }) => {
        // progressPan.setValue({ y: 0 });
        progressPan.flattenOffset();
      },
    })
  ).current;

  return (
    <View height="100%" paddingBottom={15}>
      <View row center middle style={{ marginBottom: 15 }}>
        <TouchableOpacity
          style={{ position: 'absolute', left: '6%', padding: 10 }}
          onPress={() =>
            setIsWorker({
              status: false,
              item: {},
            })
          }
        >
          <Pic src={require('../assets/icons/profile/back.png')} scale={25} />
        </TouchableOpacity>

        <Text bold size={21} color="#65676A">
          Workers
        </Text>
      </View>
      <View>
        <Pic profile_picture src={isWorker.item.image} medium />

        <Text
          extra_bold
          size={18}
          color="#65676A"
          style={{ alignSelf: 'center' }}
        >
          {isWorker.item.name}
        </Text>
        <Text
          medium
          size={14}
          color="#65676A"
          style={{ marginBottom: 15, alignSelf: 'center' }}
        >
          {isWorker.item.course}
        </Text>
      </View>

      <View flex>
        <CirclePercent
          size={20}
          name={'Work Progress'}
          rotate={'90deg'}
          percent={75 / 100}
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
          style={{ marginTop: 15, alignSelf: 'center' }}
        >
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
        white
      >
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
            <Text bold size={18} color="#65676A" style={{ marginStart: '5%' }}>
              Progress:
            </Text>

            <TouchableOpacity
              style={{ position: 'absolute', right: '10%' }}
              onPress={() => setEdit(!edit)}
            >
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

      <Button style={{ alignSelf: 'flex-end', marginEnd: 10 }}>Fire</Button>
    </View>
  );
}

function WorkersList(props: any) {
  const { setIsWorker } = props;
  const dispatch = useDispatch();
  return (
    <View>
      <View row center middle>
        <Text bold size={21} color="#65676A">
          Workers
        </Text>
        <TouchableOpacity
          style={{ position: 'absolute', left: '2%', padding: 10 }}
          onPress={() => {
            dispatch(
              closeBottomDrawerAction({
                status: false,
                tabSelected: 2,
              })
            );
          }}
        >
          <Pic src={require('../assets/icons/profile/x.png')} scale={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={3}
        style={{ width: '100%' }}
        data={[
          {
            name: 'Chevy Quitquitan',
            course: 'Software Developer',
            image: require('../assets/image/user/man.png'),
          },
          {
            name: 'John Smith',
            course: 'Software Developer',
            image: require('../assets/image/user/man.png'),
          },
          {
            name: 'Elon Musk',
            course: 'Software Developer',
            image: require('../assets/image/user/man.png'),
          },
          {
            name: 'Eco Villaraza',
            course: 'Software Developer',
            image: require('../assets/image/user/man.png'),
          },
        ]}
        renderItem={({ item }) => (
          <View flex center middle marginBottom={20}>
            <TouchableOpacity
              onPress={() => setIsWorker({ status: true, item: item })}
            >
              <Pic profile_picture src={item.image} small />
              <Text extra_bold size={12} gray>
                {item.name}
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
  return (
    <View flex>
      <View paddingHorizontal={'10%'}>
        <Table
          maxHeight={theme.height * 0.3}
          data={[
            { tasks: 'Create UI/UX Design', status: 0 },
            { tasks: 'Construct Front-end', status: 0 },
            { tasks: 'Install Frameworks', status: 1 },
            { tasks: 'Construct Back-end', status: 2 },
            { tasks: 'Construct Back-end', status: 2 },
            { tasks: 'Construct Back-end', status: 2 },
            { tasks: 'Construct Back-end', status: 2 },
            { tasks: 'Construct Back-end', status: 2 },
            { tasks: 'Construct Back-end', status: 2 },
            { tasks: 'Construct Back-end', status: 2 },
            { tasks: 'Construct Back-end', status: 2 },
            { tasks: 'Construct Back-end', status: 2 },
          ]}
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
          renderItem={({ item }, index) => (
            <View
              row
              key={index}
              center
              middle
              style={{
                borderTopColor: '#CCCCCC',
                borderTopWidth: 1,
                paddingVertical: 3,
              }}
            >
              <View flex={1.3}>
                <Text gray>{item.tasks}</Text>
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
  return (
    <View flex>
      <View paddingHorizontal={'10%'}>
        <Table
          maxHeight={theme.height * 0.3}
          data={[
            { tasks: 'Create UI/UX Design', status: 0 },
            { tasks: 'Construct Front-end', status: 0 },
            { tasks: 'Install Frameworks', status: 1 },
            { tasks: 'Install Frameworks', status: 1 },
            { tasks: 'Install Frameworks', status: 1 },
            { tasks: 'Install Frameworks', status: 1 },
            { tasks: 'Install Frameworks', status: 1 },
            { tasks: 'Install Frameworks', status: 1 },
            { tasks: 'Install Frameworks', status: 1 },
          ]}
          renderHeader={() => (
            <View row paddingVertical={3}>
              <View flex={1.3}>
                <Text bold gray>
                  Tasks
                </Text>
              </View>
            </View>
          )}
          renderItem={({ item }, index) => (
            <View
              row
              key={index}
              center
              middle
              style={{
                borderTopColor: '#CCCCCC',
                borderTopWidth: 1,
                paddingVertical: 3,
              }}
            >
              <View flex={1.3}>
                <Text gray>{item.tasks}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View flex={1.5} style={styles.updateTop}>
        <TouchableOpacity
          style={{ alignItems: 'center', flexDirection: 'row' }}
        >
          <Text color="#8E8E8E" size={14}>
            Add Task
          </Text>
          <Pic
            src={require('../assets/icons/profile/add_circle.png')}
            scale={25}
            style={{ position: 'absolute', right: 0 }}
          />
        </TouchableOpacity>
        <View middle center row marginTop={20} justifyContent="space-around">
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
});
