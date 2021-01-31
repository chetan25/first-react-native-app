import React from 'react';
import { StyleSheet, View } from 'react-native';
import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaerButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';

const FavoriteScreen = (props) => {
    const favorites = useSelector(state => state.meals.favoriteMeals);
    // const favorites = availableMeals.filter(meal => meal.id === 'm1');

    if (!favorites || favorites.length === 0) {
        return <View style={styles.content}>
            <DefaultText>No favorite meals found.</DefaultText>
        </View>
    }
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoriteScreen;