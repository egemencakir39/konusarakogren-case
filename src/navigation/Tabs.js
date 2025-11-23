import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import HistoryScreen from "../screens/HistoryScreen";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { loadEntries } from "../redux/diarySlice";


const Tab = createBottomTabNavigator();

const Tabs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEntries());
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#d4e6ff",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "book-outline";
          if (route.name === "History") iconName = "time-outline";

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Günlük" }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: "Geçmiş" }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: "#1565c0",
    position: "absolute",
    bottom: 0,
    borderTopWidth: 0,
    paddingBottom: 10,
    paddingTop: 6,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
  },

  tabLabel: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
});
