import React from 'react';
import { StyleSheet } from 'react-native';
import { MEALS } from '../data/dummy';
import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaerButton from '../components/HeaderButton';

const FavoriteScreen = (props) => {
    const favorites = MEALS.filter(meal => meal.id === 'm1');

    return <MealList mealsData={favorites} navigation={props.navigation}/>;
}

FavoriteScreen.navigationOptions = (navData) => {
   return {
      headerTitle: 'Your Favorites',
      headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaerButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>
   }
}

const styles = StyleSheet.create({
});

export default FavoriteScreen;