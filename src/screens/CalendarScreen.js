import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CalendarScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [minDate, setMinDate] = useState(new Date()); // Mínima fecha y hora permitida

  const saveDateTime = async () => {
    try {
      await AsyncStorage.setItem("scheduledDateTime", JSON.stringify(date));
      setShowModal(true);
    } catch (error) {
      console.error("Error saving date and time", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Select the upload date and time</Text>
      <Button
        onPress={() => setShowDatePicker(true)}
        title="Select date and time"
      />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          is24hour={true}
          minimumDate={minDate}
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}
      <Button onPress={saveDateTime} title="Save" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>
              Thank you very much for scheduling the electric recharge for your
              vehicle.
            </Text>
            <Text>{`Day ${date.toDateString()} at ${date.toLocaleTimeString()}`}</Text>
            <Button onPress={closeModal} title="Ok" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default CalendarScreen;
