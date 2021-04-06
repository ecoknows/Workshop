import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {Text} from '../../components';

import NotificationItem from '../../components/NotificationItem';
import {useDispatch, useSelector} from 'react-redux';
import {openBottomDrawerAction} from '../../redux';
import {
  delete_notification,
  get_notifications,
  select_notification,
} from '../../redux/actions/notifications.actions';

export default function NotificationScreen() {
  const dispatch = useDispatch();
  const NotificationState = useSelector(state => state.notificationsState);
  useEffect(() => {
    dispatch(get_notifications());
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.markAll}>
        <Text medium size={15}>
          Mark All Read
        </Text>
      </TouchableOpacity>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={NotificationState.data}
          renderItem={({item, index}) => (
            <NotificationItem
              title={item.sender_name}
              description={item.description}
              timestamp={item.timestamp}
              isAdmin={false}
              onClick={() => {
                dispatch(select_notification(item));
                dispatch(openBottomDrawerAction('Notification'));
              }}
              onDelete={() => {
                dispatch(delete_notification(item));
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  markAll: {
    height: 20,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  safeArea: {
    flex: 1,
  },
  text: {
    fontSize: 15,
    fontWeight: '900',
  },
});
