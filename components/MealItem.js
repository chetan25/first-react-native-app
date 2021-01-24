import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import DefaultText from './DefaultText';

const MealItem = props => {
   return (
       <View style={styles.mealContainer}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader}}>
                        <ImageBackground source={{
                            uri: props.meal.imageUrl
                        }} style={styles.bgImage}
                        >
                         <View style={styles.titleContainer}>
                           <Text style={styles.title} numberOfLines={1}>{props.meal.title}</Text>
                        </View>
                        </ImageBackground>  
                    </View>
                    <View style={{...styles.mealRow, ...styles.mealDetail}}>
                        <DefaultText>{props.meal.duration}m</DefaultText>
                        <DefaultText>{props.meal.complexity.toUpperCase()}</DefaultText>
                        <DefaultText>{props.meal.affordability.toUpperCase()}</DefaultText>
                    </View>
                </View>
          </TouchableOpacity>
       </View>
   )
}

const styles = StyleSheet.create({
    mealContainer: {
       height: 200,
       width: '100%',
       backgroundColor: '#f5f5f5',
       borderRadius: 10,
       overflow: 'hidden',
       marginVertical: 10
    },
    mealRow: {
       flexDirection: 'row'
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    title: {
       fontSize: 'open-sans-bold',
       fontSize: 20,
       color: 'white',
       textAlign: 'center'
    },
    mealHeader: {
        height: '85%'
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    }
});

export default MealItem;