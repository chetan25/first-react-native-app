import React from 'react';
import { CATEGORIES } from '../data/dummy';
import MealList from '../components/MealList';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';

const CategoryMealScreen = (props) => {
    const availableMeals = useSelector((state) => state.meals.filteredMeals);
    const categoryId = props.navigation.getParam('categoryId');
    const mealsIncluded = availableMeals.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0 );

    if(mealsIncluded.length === 0) {
       return <View style={styles.container}>
          <DefaultText>No meals found, may be filters are set.</DefaultText>
       </View>
    }
    return <MealList mealsData={mealsIncluded} navigation={props.navigation}/>;
}

// can be a object if data is static but can be function if we need dynamic data
CategoryMealScreen.navigationOptions = (navigationData) => {
    const categoryId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);

    return {
        headerTitle: selectedCategory.title,
        // headerStyle: {
        //     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        // },
        // headerTintColor: Platform.OS === 'android' ? 'white' : ''
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealScreen;