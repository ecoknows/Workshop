import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  Modal,
  PanResponder,
  Image,
} from 'react-native';

import {Pic, Text} from '../components';
import {theme} from '../constants';

// import {TouchableHighlight, Swipeable} from 'react-native-gesture-handler';
// import { Ionicons } from '@expo/vector-icons';

import AdminModalContent from './modalcontents/AdminModalContent';
import EmployeeModalContent from './modalcontents/EmployeeModalContent';

const NotificationItem = ({
  title,
  description,
  timestamp,
  onDelete,
  onClick,
}) => {
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const resetItem = () => {
    Animated.timing(pan.x, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const deleteItem = () => {
    Animated.timing(pan.x, {
      toValue: 0,
      useNativeDriver: false,
    }).start(() => {
      onDelete();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
        });
      },
      onPanResponderMove: (e, {dx}) => {
        pan.x.setValue(dx);
      },
      onPanResponderRelease: (_, {dx}) => {
        if (dx > -120) resetItem();

        pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <Animated.View style={styles.item} {...panResponder.panHandlers}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: '#FF6363',
          height: '100%',
          width: '15%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={deleteItem}>
        <Pic src={require('../assets/icons/trash_white.png')} scale={24} />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.sub_item,
          {
            transform: [
              {
                translateX: pan.x.interpolate({
                  inputRange: [-100, 0],
                  outputRange: [-theme.width * 0.13, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            onClick();
          }}
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            paddingHorizontal: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text semi_bold size={14}>
              {title}
            </Text>
            <Text size={12} gray>
              {description}
            </Text>
          </View>
          <Text color="#F7C780">{timestamp}</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    height: 83,
    width: '95%',
    borderTopEndRadius: 17,
    borderBottomEndRadius: 17,
    marginTop: 8,
    marginBottom: 2,
    overflow: 'hidden',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',

    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 100,
  },
  sub_item: {
    backgroundColor: 'white',
    width: '95%',
    height: '100%',
    borderBottomStartRadius: 17,
    borderTopStartRadius: 17,
  },
  design: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 17,
  },
  info: {
    flex: 4,
    margin: 10,
    marginLeft: 20,
  },
  title: {
    flex: 1.5,
    justifyContent: 'center',
  },
  description: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  timestamp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    fontSize: 14,
  },
  slideRight: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 83,
    marginRight: 20,
    marginTop: 8,
    marginBottom: 2,
  },

  modalView: {
    flex: 1,
    alignSelf: 'center',
    top: '10%',
    width: '101%',
    backgroundColor: 'white',
    borderColor: 'orange',
    borderWidth: 3,
    borderBottomWidth: 0,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#65676A',
  },
});
