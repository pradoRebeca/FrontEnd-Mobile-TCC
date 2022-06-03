import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const InputCalendar = ({
  label,
  keyObject,
  object,
  onChangeObject,
  valueDefault,
}) => {
  const [text, setText] = useState(label);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // console
  useEffect(() => {
    if (valueDefault) {
      setText(valueDefault);
    }
  }, [valueDefault]);

  const formatDate = (data, mode) => {
    let dateTimeString;

    switch (mode) {
      case "user":
        dateTimeString =
          data.getDate() +
          "/" +
          (data.getMonth() + 1) +
          "/" +
          data.getFullYear();
        break;

      case "database":
        dateTimeString =
          data.getFullYear() +
          "-" +
          (data.getMonth() + 1) +
          "-" +
          data.getDate();
        break;
    }

    return dateTimeString;
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setText(label);
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    const formatUser = formatDate(date, "user");
    const formatDatabase = formatDate(date, "database");
    onChangeObject({ ...object, [keyObject]: formatUser });
    setText(formatUser);
  };

  return (
    <TouchableOpacity onPress={() => showDatePicker()} style={style.container}>
      <Text
        style={
          text.includes("Data")
            ? style.inputText
            : { ...style.inputText, color: "#000" }
        }
      >
        {text}
      </Text>
      <Icon name="calendar" color="#1E7596" size={30} />
      {isDatePickerVisible && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      )}
    </TouchableOpacity>
  );
};

export default InputCalendar;

const style = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 14,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 40,
  },
  inputText: {
    color: "#6D6D6D",
    fontSize: 15,
    width: "100%",
  },
});
