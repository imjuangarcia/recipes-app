import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Colors from '../constants/Colors';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
};

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: CategoryMealsScreen,
  MealDetail: MealDetailsScreen,
}, {
  defaultNavigationOptions: defaultStackNavigationOptions,
});

const FavoritesNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailsScreen,
}, {
  defaultNavigationOptions: defaultStackNavigationOptions,
});

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInformation) => <Ionicons name="ios-restaurant" size={25} color={tabInformation.tintColor} />,
    },
  },
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: {
      tabBarIcon: (tabInformation) => <Ionicons name="ios-star" size={25} color={tabInformation.tintColor} />,
    },
  },
};

const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(
  tabScreenConfig,
  {
    activeColor: 'white',
    barStyle: {
      backgroundColor: Colors.primaryColor,
    },
  },
) : createBottomTabNavigator(
  tabScreenConfig,
  {
    tabBarOptions: {
      activeTintColor: Colors.accentColor,
    },
  },
);

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen,
}, {
  defaultNavigationOptions: defaultStackNavigationOptions,
});

const MainNavigator = createDrawerNavigator({
  MealFavorites: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals',
    },
  },
  Filters: FiltersNavigator,
}, {
  contentOptions: {
    activeTintColor: Colors.accentColor,
  },
});

export default createAppContainer(MainNavigator);
