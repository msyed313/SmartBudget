import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Main from '../screens/Main'
import Expense from '../screens/Expense'
import Statistics from '../screens/Statistics'
import Splash from '../screens/Splash'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Profile from '../screens/Profile'
import EditProfile from '../screens/EditProfile'
const stack = createNativeStackNavigator()
const Navigation = () => {
    return (
        <NavigationContainer>
            <stack.Navigator screenOptions={{ headerShown: false }}>
                <stack.Screen name='splash' component={Splash} />
                <stack.Screen name='statistics' component={Statistics} />
                <stack.Screen name='main' component={Main} />
                <stack.Screen name='login' component={Login} />
                <stack.Screen name='signup' component={Signup}/>
                <stack.Screen name='expenses' component={Expense} />
                <stack.Screen name='profile' component={Profile} />
                <stack.Screen name='editprofile' component={EditProfile} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation