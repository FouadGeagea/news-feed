/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
import MainScreen from '../screens/MainScreen';
import ModalScreen from '../screens/ModalScreen';

const NewsNavigator = createStackNavigator({
    Main:MainScreen,
    Modal:ModalScreen,
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'black',
        },
        headerTintColor:'white',
    },
});

export default createAppContainer(NewsNavigator);
