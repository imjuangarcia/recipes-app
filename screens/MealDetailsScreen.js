import React from 'react';
import {
  ScrollView, Image, View, Text, StyleSheet, Button,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MEALS } from '../data/dummy-data';
import CustomHeaderButton from '../components/HeaderButton';

const ListItem = (props) => (
  <View style={styles.listItem}>
    <Text>{props.children}</Text>
  </View>
);

const MealDetailsScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
        <View style={styles.details}>
          <Text>
            {selectedMeal.duration}
            m
          </Text>
          <Text>{selectedMeal.complexity.toUpperCase()}</Text>
          <Text>{selectedMeal.affordability.toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>Ingredients</Text>
        {selectedMeal.ingredients.map(
          (ingredient) => <ListItem style={styles.ingredient} key={ingredient}>{ingredient}</ListItem>,
        )}
        <Text style={styles.title}>Steps</Text>
        {selectedMeal.steps.map(
          (step) => <ListItem style={styles.step} key={step}>{step}</ListItem>,
        )}
      </View>
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam('mealId');
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return {
    headerTitle: selectedMeal.title,
    headerRight:
  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item title="Favorite" iconName="ios-star" onPress={() => {}} />
  </HeaderButtons>,
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default MealDetailsScreen;
