import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity,TouchableWithoutFeedback } from 'react-native';
import Text from '../components/Text';
import View from '../components/View';
import Pic from '../components/Pic';
import { theme } from '../constants';

interface ModalBoxDialog {
  children: any;
  hide: boolean;
  flex?: boolean;
  setHide: (status: boolean) => void
}

function ModalBox(props: ModalBoxDialog) {
  const { hide, setHide, children, flex} = props;

  const handleClose =()=> setHide(false);

  return (
    <Modal animationType="fade" transparent={true} visible={hide}>
      <Fade handleClose={handleClose}/>
      <View style={styles.modalView} >
        <View style={styles.modalCenter}>
          <View flex={flex} >
            <View paddingVertical={5} paddingStart={10}>
              <TouchableOpacity onPress={handleClose}>
                <Pic
                  src={require('../assets/icons/profile/x.png')}
                  scale={20}
                />
              </TouchableOpacity>
            </View>
            <View paddingHorizontal={19} flex={flex} >
              {children}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Fade({ handleClose }) {
  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View
        animated
        style={styles.fade}
      />
    </TouchableWithoutFeedback>
  );
}

export default ModalBox;

const styles = StyleSheet.create({
  modalView: { flex: 1,justifyContent:'center', alignItems:'center'},
  modalCenter: {
    minHeight: theme.height * .3,
    width: '90%',
    backgroundColor: 'white',
  },
  fade: {
    position:'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: '100%',
    width: '100%',
  },
});
