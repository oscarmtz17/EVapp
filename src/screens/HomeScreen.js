import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [scheduledDateTime, setScheduledDateTime] = useState(null);

  const fetchScheduledDateTime = async () => {
    try {
      const storedDateTime = await AsyncStorage.getItem("scheduledDateTime");
      if (storedDateTime) {
        setScheduledDateTime(new Date(JSON.parse(storedDateTime)));
      }
    } catch (error) {
      console.error("Error obtaining scheduled date and time", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchScheduledDateTime();
    }, [])
  );

  const handleSchedulePress = () => {
    navigation.navigate("Calendar");
  };

  const cancelRecarga = async () => {
    try {
      await AsyncStorage.removeItem("scheduledDateTime");
      setScheduledDateTime(null);
    } catch (error) {
      console.error("Error canceling recharge", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      {scheduledDateTime ? (
        <View>
          <Text>{`Scheduled date and time: ${scheduledDateTime.toString()}`}</Text>
          <Button title="Cancel recharge" onPress={cancelRecarga} />
        </View>
      ) : (
        <Text>There is no scheduled recharge</Text>
      )}
      <Button title="Schedule" onPress={handleSchedulePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
