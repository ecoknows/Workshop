import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Pic, Circle, Button} from '../components';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const screens = [
  {
    title: 'SEARCH FOR A\nSUITABLE JOB',
    image: require('../assets/image/splashscreen/splash1.png'),
    info:
      'Hundred of works are listed,\nmake sure to choose the one\nthat fits your ability.',
  },
  {
    title: 'AUTHORIZATION\nPROCESS',
    image: require('../assets/image/splashscreen/splash2.png'),
    info: 'There is an authorization\nprocess to ensure a safe\nenvironment.',
  },
  {
    title: 'HIRING AND\nAPPLICATION',
    image: require('../assets/image/splashscreen/splash3.png'),
    info: 'You can apply as an employer or\nan employee.',
  },
];

function Main({navigation}) {
  const [count, setCount] = useState(0);
  const data = screens[count];
  const {userData, error} = useSelector(state => state.userDetails);

  useEffect(() => {
    if (userData) {
      if (userData.verified) {
        navigation.replace('UserScreen');
      }
    }
  }, [userData, error]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: error,
        text2: 'Please try again 🥺',
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  }, [error]);

  const ProgressBar = () => {
    return (
      <View row middle>
        <View
          style={[
            {height: 5, backgroundColor: '#F68025', marginLeft: 50},
            {flex: 1},
          ]}
        />
        <Circle round={12} style={{backgroundColor: '#F68025'}} />
        <View
          style={[
            {height: 5, backgroundColor: '#F6802531', marginRight: 50},
            count < 1 ? {flex: 3} : {flex: 1},
          ]}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View row between flex={1}>
        <Text touchable press={() => navigation.replace('Login')}>
          SKIP
        </Text>
        <Text
          touchable
          press={() => {
            count < 2 ? setCount(count + 1) : setCount(0);
          }}>
          NEXT
        </Text>
      </View>

      <View flex={7}>
        <View flex={4} middle center>
          <Pic src={data.image} />
        </View>

        <View flex={2} center>
          <Text center h1 gray>
            {data.title}
          </Text>
        </View>

        <View flex={1}>
          <Text center>{data.info}</Text>
        </View>

        <View flex={1} middle center>
          {count != 2 ? (
            <ProgressBar />
          ) : (
            <View>
              <Button
                style={{borderWidth: 2}}
                onPress={() => navigation.navigate('Login')}>
                <Text size={18} semi_bold>
                  Get Started
                </Text>
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
});
