import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaerButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

const FilterSwitch = (props) => {
    return (
        <View style={styles.filterCOntainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{
                    true: Colors.primaryColor,
                }}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                value={props.value}
                onValueChange={newValue => props.onChange(newValue)}
            />
        </View>
    );
}

const FilterScreen = (props) => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegeterian, setIsVegeterian] = useState(false);

    const saveFilters = useCallback(() => {
       const appliedFilters = {
           glutenFree: isGlutenFree,
           lactoseFree: isLactoseFree,
           vegan: isVegan,
           vegeterian: isVegeterian
        }
        console.log(appliedFilters);
        }, [isGlutenFree, isLactoseFree, isVegan, isVegeterian])
    
    useEffect(() => {
       // ways to communicate between state functions and navigation options 
       navigation.setParams({
           save: saveFilters
       });
    }, [saveFilters]);

    return (
       <View style={styles.screen}>
           <Text style={styles.title}>Available Filters</Text>
           <FilterSwitch label='Gluten-Free' onChange={setIsGlutenFree} value={isGlutenFree} />
           <FilterSwitch label='Lactose-Free' onChange={setIsLactoseFree} value={isLactoseFree} />
           <FilterSwitch label='Vegan' onChange={setIsVegan} value={isVegan} />
           <FilterSwitch label='Vegeterian' onChange={setIsVegeterian} value={isVegeterian} />
       </View>
    );
}

const styles = StyleSheet.create({
   screen: {
       flex: 1,
       alignItems: 'center'
   },
   title: {
      fontFamily: 'open-sans-bold',
      fontSize: 22,
      margin: 20,
      textAlign: 'center'
   },
   filterCOntainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       width: '80%',
       marginVertical: 15
    }
});

FilterScreen.navigationOptions = (navData) => {
    return {
      headerTitle: 'Filters',
      headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaerButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => {
              navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>,
      headerRight: () =>  <HeaderButtons HeaderButtonComponent={CustomHeaerButton}>
            <Item title='Save' iconName='ios-save' onPress={navData.navigation.getParam('save')} />
        </HeaderButtons>
    }
}

export default FilterScreen;