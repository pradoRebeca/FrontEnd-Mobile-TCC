import React from "react";
import {
  createBottomTabNavigator,
  CardStyleInterpolators,
} from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import CandidateProfile from "../screen/CanditateProfile";
import TopNavigation from "./TopNavigation";

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#1E7596" },
        headerStyle: {
          backgroundColor: "#1E7596",
        },
        tabBarInactiveTintColor: "#DCEBF2",
        tabBarActiveTintColor: "white",
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Foundation name="shopping-bag" color={color} size={26} />
          ),
        }}
        name="Vagas"
        component={TopNavigation}
      />
      {/* <Tab.Screen
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" color={color} size={26} />
          ),
        }}
        name="Chat"
        component={Screen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" color={color} size={26} />
          ),
        }}
        name="Acessibilidade"
        component={Screen}
      /> */}
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle-o" color={color} size={26} />
          ),
        }}
        name="Perfil"
        component={CandidateProfile}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
