import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SaveJob from "../screen/SaveJob";
import CandidateJob from "../screen/CandidateJob";
import CandidateHome from "../screen/CandidateHome";

const Tab = createMaterialTopTabNavigator();

const TopNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Inicial"

      screenOptions={{
        tabBarLabelStyle: { fontSize: 13, textTransform: "capitalize"},
        headerShown: true,
      
        // tabBarStyle: { backgroundColor: 'powderblue' },
        tabBarActiveTintColor: "#1E7596",
        // tabBarInactiveTintColor: "red",
        tabBarPressColor: "#DCEBF2",
        // tabBarBounces: 0,
        tabBarIndicatorStyle: { backgroundColor: "#1E7596" },
        // tabBarIndicatorContainerStyle: {
        //   backgroundColor: "#4392B8",
        // },
        tabBarItemStyle: {minWidth: 50,},
      }}
    >
      <Tab.Screen
        name="Incial"
        component={CandidateHome}
        options={{ tabBarLabel: "Inicial" }}
      />
      <Tab.Screen
        name="Candidaturas"
        component={CandidateJob}
        options={{ tabBarLabel: "Canditatar" }}
      />
      <Tab.Screen
        name="Salvar"
        component={SaveJob}
        options={{ tabBarLabel: "Salvar" }}
      />
      <Tab.Screen
        name="Dispensadas"
        component={SaveJob}
        options={{ tabBarLabel: "Dispensar",}}

      />
    </Tab.Navigator>
  );
};

export default TopNavigation;
