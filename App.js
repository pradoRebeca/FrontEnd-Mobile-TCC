import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/Navigation/StackNavigation';
import TabNavigation from './src/Navigation/TabNavigation';

const App = () => {
  return (
    <NavigationContainer>
     <StackNavigation/>
    </NavigationContainer>
  );
};

export default App;