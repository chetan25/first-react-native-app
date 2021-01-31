import React, { useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaerButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';
import mealsReducer from '../store/reducers/meals';

const ListItem = (props) => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
}

const MealDetailsScreen = (props) => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    const isCurrentMealFavorite = useSelector(
        state => state.meals.favoriteMeals.some(
            meal => meal.id === mealId
        )
    );
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    // one way to pass data to navigation options in header
    useEffect(() => {
        // passing data to navigation props
        props.navigation.setParams({toggleFav: toggleFavoriteHandler });
        props.navigation.setParams({isFav: isCurrentMealFavorite});
    }, [toggleFavoriteHandler, isCurrentMealFavorite]);
   

    return (
        <ScrollView>
            <Image source={{
                uri: selectedMeal.imageUrl
            }} style={styles.image}/>  
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.ttitle}>Ingredients</Text>
            {
                selectedMeal.ingredients.map(ingredient => {
                    return <ListItem key={ingredient}>{ingredient}</ListItem>
                })
            }
            <Text style={styles.ttitle}>Steps</Text>
            {
                selectedMeal.steps.map(step => {
                    return <ListItem key={step}>{step}</ListItem>
                })
            }
        </ScrollView>
    );
}

MealDetailsScreen.navigationOptions = (navigationData) => {
    const mealId = navigationData.navigation.getParam('mealId');
    // const selectedMeal = MEALS.find(meal => meal.id === mealId);
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFav = navigationData.navigation.getParam('toggleFav');
    const isFav = navigationData.navigation.getParam('isFav');

    return {
        headerTitle: mealTitle,
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaerButton}>
            <Item title="Fav" iconName={isFav ? 'ios-star' : 'ios-star-outline'} onPress={toggleFav}/>
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    details: {
      flexDirection: 'row',
      padding: 15,
      justifyContent: 'space-around'
    },
    ttitle: {
      fontFamily: 'open-sans-bold',
      fontSize: 22,
      textAlign: 'center'
    },
    image: {
       width: '100%',
       height: 200
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailsScreen;