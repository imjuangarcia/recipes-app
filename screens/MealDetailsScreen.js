import React, { useEffect, useCallback } from 'react';
import {
  ScrollView, Image, View, Text, StyleSheet,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButton';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = (props) => (
  <View style={styles.listItem}>
    <Text>{props.children}</Text>
  </View>
);

const MealDetailsScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');

  const allMeals = useSelector((state) => state.meals.meals);
  const isCurrentMealFavorite = useSelector((state) => state.meals.favoriteMeals.some((meal) => meal.id === mealId));

  const selectedMeal = allMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFavorite: toggleFavoriteHandler });
  }, [toggleFavorite]);

  useEffect(() => {
    props.navigation.setParams({ isFavorite: isCurrentMealFavorite });
  }, [isCurrentMealFavorite]);

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
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFav = navigationData.navigation.getParam('toggleFavorite');
  const isFavorite = navigationData.navigation.getParam('isFavorite');

  return {
    headerTitle: mealTitle,
    headerRight:
  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item title="Favorite" iconName={isFavorite ? 'ios-star' : 'ios-star-outline'} onPress={toggleFav} />
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
