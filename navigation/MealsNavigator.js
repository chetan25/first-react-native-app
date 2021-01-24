import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import { Platform, Text } from 'react-native';
import Colors from '../constants/Colors';
import FavoriteScreen from '../screens/FavoriteScreen';
import FilterScreen from '../screens/FilterScreen';

import { Ionicons } from '@expo/vector-icons';

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : '',
    headerTitle: 'A Screen' //these default values can be overriden by the specific ones in Screen config
};

const MealsNavigator = createStackNavigator(
    {
        Categories: CategoriesScreen,
        CategoryMeals: {
            screen: CategoryMealScreen, //this way we can pass data for screen
            // navigationOptions: {
            //     headerStyle: {
            //         backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            //     },
            //     headerTintColor: Platform.OS === 'android' ? 'white' : ''
            // }
        },
        MealDetails: MealDetailsScreen  
    },
    {
        // mode: 'modal',
        // initialRouteName: 'MealDetails', //change the initial route
        defaultNavigationOptions: defaultNavigationOptions
    }
);


const FavouriteNavigator = createStackNavigator({
    Favourite: FavoriteScreen,
    MealDetails: MealDetailsScreen
  }, {
        // mode: 'modal',
        // initialRouteName: 'MealDetails', //change the initial route
        defaultNavigationOptions: defaultNavigationOptions
  });

const tabsScreenConfig  = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
               return <Ionicons
                 name='ios-restaurant'
                 size={25}
                 color={tabInfo.tintColor}
             />
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
        }
     }, // this will load the stack navigator sceen and functionality
     Favourite: {
        screen: FavouriteNavigator,
        navigationOptions: {
             tabBarIcon: (tabInfo) => {
                 return <Ionicons
                 name='ios-star'
                 size={25}
                 color={tabInfo.tintColor}
             />
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favourite</Text> : 'Favourite' 
        }
     } 
};

const MealsTabNavigtor = Platform.OS === 'android' ? createMaterialBottomTabNavigator(
    tabsScreenConfig, {
        activeColor: 'white',
        shifting: true, // will only have effect if tabBarColor is used
        barStyle: {
           backgroundColor: Colors.primaryColor
        }// changes color for non shifting case
    }
) : createBottomTabNavigator(tabsScreenConfig, {
    tabBarOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
          fontFamily: 'open-sans-bold'
      }
    }
});

const FiltesrNavigator = createStackNavigator({
    Filters: FilterScreen
}, {
    // navigationOptions: {
    //     drawerLabel: 'Filters!!' // overwrite drawer title
    // },
    defaultNavigationOptions: defaultNavigationOptions
});

const SideNavigator = createDrawerNavigator({
    MealsFavorite: {
        screen: MealsTabNavigtor,
        navigationOptions: {
            drawerLabel: 'Meals' // overwrite drawer title
        }
    },
    Filters: FiltesrNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(SideNavigator);