import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MEALS } from '../data/dummy';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaerButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem = (props) => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
}

const MealDetailsScreen = (props) => {
    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = MEALS.find(meal => meal.id === mealId);

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
    const selectedMeal = MEALS.find(meal => meal.id === mealId);

    return {
        headerTitle: selectedMeal.title,
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaerButton}>
            <Item title="Fav" iconName="ios-star" onPress={() => {console.log('fav')}}/>
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