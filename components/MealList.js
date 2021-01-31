import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MealItem from './MealItem';

const MealList = (props) => {
    const renderMealItem = (itemData) => {
        return <MealItem 
           meal={itemData.item}
            onSelectMeal={() => {
                props.navigation.navigate({
                    routeName: 'MealDetails',
                    params: {
                        mealId: itemData.item.id,
                        mealTitle: itemData.item.title
                    }
                })
            }}
        />
    }

   return (
    <View style={styles.list}>
      <FlatList
         data={props.mealsData}
         renderItem={renderMealItem}
         style={{width: '100%'}}
      />
    </View>
   );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MealList;