import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'

import Home from '../screens/Home'
import Profile from '../screens/Profile'
import CreateEmployee from '../screens/CreateEmployee'

const Stack = createStackNavigator();

const myOptions =  {
        title:'Home Page',
        headerTintColor :'white',
        headerStyle:{
            backgroundColor:'#7520a8' //#5622a3
        }
    }

export default function EmployeeNavigation() {
  return (

      <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen 
            name = "Home" 
            component = { Home }
            options = { myOptions } />
            <Stack.Screen 
            name = "Profile" 
            component = { Profile }
            options = { { ...myOptions, title : 'Profile' } } />
            <Stack.Screen 
            name = "Create" 
            component = { CreateEmployee } 
            options = { { ...myOptions, title : 'Create a new employee' ,headerStyle:{
                backgroundColor: '#4a1b8f'
            }} }
            />
            </Stack.Navigator>
      </NavigationContainer>
    
  );
}
