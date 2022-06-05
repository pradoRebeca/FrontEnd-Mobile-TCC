import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Entypo, Feather } from "@expo/vector-icons";

import CandidateProfile from "../screen/CanditateProfile";
import TopNavigation from "./TopNavigation";
import { BackHandler } from "react-native";

import SearchBar from "../components/SearchBar";
import Photo from "../components/Photo";
import HeaderSearch from "../components/HeaderSearch";
import Search from "../screen/Search";
import CandidateHome from "../screen/CandidateHome";

const TabNavigation = () => {
  // useEffect(() => {
  //   BackHandler.addEventListener('backPress', () => true)
  //   // BackHandler.removeEventListener('backPress', () => true)
  // }, [])

  const Tab = createBottomTabNavigator();
  // const [keyboardHides, setkeyboardHides] = useState(false)

  return (
    <Tab.Navigator
    initialRouteName="Vagas"
      screenOptions={{
      
        tabBarHideOnKeyboard: "true",
        tabBarStyle: { backgroundColor: "#1E7596" },
        headerStyle: {
          backgroundColor: "#1E7596",
        },
        tabBarInactiveTintColor: "#DCEBF2",
        tabBarActiveTintColor: "white",
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Tab.Screen
        options={{
          headerShown: true,
          headerTitle: () => <Photo />,
          tabBarIcon: ({ color }) => (
            <Foundation name="shopping-bag" color={color} size={26} />
          ),
        }}
        name="Minhas Vagas"
        component={TopNavigation}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          // headerTitle: () => <Photo />,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={26} />
          ),
        }}
        name="Vagas"
        component={CandidateHome}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="search" color={color} size={26} />
          ),
        }}
        name="Pesquisar"
        component={Search}
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
      /> */}
      {/* <Tab.Screen
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
          headerShown: true,
          headerTitle: () => <Photo />,
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
