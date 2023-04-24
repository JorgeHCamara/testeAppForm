import React, { useState } from 'react';
import { Text, View, Button, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ButtonDate } from '../Button';
import { StyleTextInput } from './css';

export const DatePickerCustom = (props) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      props.setDate(selectedDate);
    }
  };

  const showme = () => {
    setShow(true);
  };

  const datePicker = (
    <DateTimePicker
      value={props.date}
      onChange={onChange}
      mode={props.currentMode}
      is24Hour={true}
      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
    />
  );

  return (
    <View style={StyleTextInput.container}>
      <Text style={[StyleTextInput.input, StyleTextInput.inputDisabled]}>
        {props.date.getDate()}/{props.date.getMonth() + 1}/{props.date.getFullYear()}
      </Text>
      <View style={StyleTextInput.icon}>
        <ButtonDate onPress={showme} />
      </View>
      {show && (
        Platform.OS === 'ios' ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
              setShow(false);
            }}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              {datePicker}
            </View>
          </Modal>
        ) : (
          datePicker
        )
      )}
    </View>
  );
};
