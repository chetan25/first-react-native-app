import React from 'react';
import { CATEGORIES, MEALS } from '../data/dummy';
import MealList from '../components/MealList';

const CategoryMealScreen = (props) => {
    const categoryId = props.navigation.getParam('categoryId');
    const mealsIncluded = MEALS.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0 );

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

export default CategoryMealScreen;