import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Calendar = ({ onChange }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const formatDateBD = (data) => {
    let dateTimeString =
      data.getDate() +
      "-" +
      (data.getMonth() + 1) +
      "-" +
      data.getFullYear() +
      " ";

    return dateTimeString;
  };



  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const format = formatDateBD(date);
    hideDatePicker();
    onChange(format);
  };

  return (
  
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
  );
};

export default Calendar;
