import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SaveJob from "../screen/SaveJob";
import CandidateJob from "../screen/CandidateJob";
import CandidateHome from "../screen/CandidateHome";
import DispensadasJob from "../screen/DispensadasJob";


const Tab = createMaterialTopTabNavigator();

const TopNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Inicial"

      screenOptions={{
        tabBarLabelStyle: { fontSize: 15, textTransform: "capitalize"},
        headerShown: true,
      
        // tabBarStyle: { backgroundColor: 'powderblue' },
        tabBarActiveTintColor: "#1E7596",
        // tabBarInactiveTintColor: "red",
        tabBarPressColor: "#DCEBF2",
        // tabBarBounces: 0,
        tabBarIndicatorStyle: { backgroundColor: "#1E7596" },
        // tabBarIndicatorContainerStyle: {
        //   backgroundColor: "#1E7596",
        // },
        
        tabBarItemStyle: {minWidth: 50,},   
       
      }}

    >
      {/* <Tab.Screen
        name="Incial"
        component={CandidateHome}
        options={{ tabBarLabel: "Inicial" }}
      /> */}
      <Tab.Screen
        name="Candidaturas"
        component={CandidateJob}
        options={{ tabBarLabel: "Candidaturas" }}
      />
      <Tab.Screen
        name="Salvar"
        component={SaveJob}
        options={{ tabBarLabel: "Salvas" }}
      />
      <Tab.Screen
        name="Dispensadas"
        component={DispensadasJob}
        options={{ tabBarLabel: "Dispensadas",}}
      />
    </Tab.Navigator>
  );
};

export default TopNavigation;
