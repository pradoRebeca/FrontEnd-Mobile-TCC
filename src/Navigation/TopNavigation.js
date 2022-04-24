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
        headerShown: false,
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
        options={{ tabBarLabel: "Candidatura" }}
      />
      <Tab.Screen
        name="Salvar"
        component={SaveJob}
        options={{ tabBarLabel: "Candidatura" }}
      />
    </Tab.Navigator>
  );
};

export default TopNavigation;
