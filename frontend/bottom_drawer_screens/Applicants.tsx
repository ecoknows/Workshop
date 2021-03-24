import React, { useState } from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Pic from '../components/Pic';
import Table from '../components/Table';
import Button from '../components/Button';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { closeBottomDrawerAction } from '../redux';

interface ApplicantsProps {
  UserChoice: {
    anim_treshold: number;
    height: number;
  };
  drawer_anim: any;
}

const testdata = [
  { name: 'Github Website', key: 'https://github.com/', download: false },
  { name: 'CISCO Certificate', key: 'https://github.com/', download: true },
  {
    name: 'TESDA National Certificate',
    key: 'https://github.com/',
    download: true,
  },
];

function Applicants(props: ApplicantsProps) {
  const { UserChoice, drawer_anim } = props;
  const [isApplicant, setIsApplicant] = useState({
    status: false,
    item: {},
  });
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
      ]}
    >
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
  const { isApplicant, setIsApplicant } = props;
  return (
    <View height="100%">
      <View row center middle style={{ marginBottom: 15 }}>
        <TouchableOpacity
          style={{ position: 'absolute', left: '6%', padding: 10 }}
          onPress={() =>
            setIsApplicant({
              status: false,
              item: {},
            })
          }
        >
          <Pic src={require('../assets/icons/profile/back.png')} scale={25} />
        </TouchableOpacity>

        <Text bold size={21} color="#65676A">
          Applicant
        </Text>
      </View>

      <View middle>
        <Pic profile_picture src={isApplicant.item.image} medium green />

        <Text extra_bold size={18} color="#65676A">
          {isApplicant.item.name}
        </Text>
        <Text medium size={14} color="#65676A" style={{ marginBottom: 15 }}>
          {isApplicant.item.course}
        </Text>
        <TouchableOpacity style={styles.resume}>
          <Pic
            src={require('../assets/icons/profile/document.png')}
            scale={19}
            style={{ marginEnd: 10 }}
          />
          <Text extra_bold size={13} color="#292929" style={{ marginEnd: 30 }}>
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
          maxHeight="100%"
          data={testdata}
          renderHeader={() => (
            <View row paddingVertical={3}>
              <View flex={1.3}>
                <Text bold gray>
                  Name
                </Text>
              </View>
              <View flex middle>
                <Text bold gray>
                  Link
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
                <Text gray>{item.name}</Text>
              </View>
              <View flex middle>
                {item.download ? (
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <Pic
                      src={require('../assets/icons/profile/download_green.png')}
                      scale={15}
                      style={{ marginEnd: 5 }}
                    />
                    <Text green>Download</Text>
                  </TouchableOpacity>
                ) : (
                  <Text green>{item.key}</Text>
                )}
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
          }}
        >
          Software Developer
        </Text>

        <Button style={{ alignSelf: 'center' }}>Hire</Button>
      </View>
    </View>
  );
}

function ApplicantsList(props: any) {
  const { setIsApplicant } = props;
  const dispatch = useDispatch();
  return (
    <View>
      <View row center middle>
        <Text bold size={21} color="#65676A">
          Applicants
        </Text>
        <TouchableOpacity
          style={{ position: 'absolute', left: '2%', padding: 10 }}
          onPress={() => {
            dispatch(
              closeBottomDrawerAction({
                status: false,
                tabSelected: 3,
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
              onPress={() => setIsApplicant({ status: true, item: item })}
            >
              <Pic profile_picture src={item.image} small green />
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
});
