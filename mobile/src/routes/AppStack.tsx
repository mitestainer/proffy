import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Landing from '../pages/Landing'
import GiveClasses from '../pages/GiveClasses'
import Studytabs from './Studytabs'

const {Navigator, Screen} = createStackNavigator()

export default () => {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Landing" component={Landing} />
                <Screen name="GiveClasses" component={GiveClasses} />
                <Screen name="Study" component={Studytabs} />
            </Navigator>
        </NavigationContainer>
    )
}