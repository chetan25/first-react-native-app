import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { CATEGORIES } from '../data/dummy';
import CategoryGridItem from '../components/CategoryGridItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaerButton from '../components/HeaderButton';

const CategoriesScreen = (props) => {
    const renderGridItem = (itemData) => {
        return <CategoryGridItem
          title={itemData.item.title}
          color={itemData.item.color}
          onSelect={() => {
            props.navigation.navigate({
                routeName: 'CategoryMeals',
                params: {
                    categoryId: itemData.item.id,
                }
            })
          }}
        />
     }

    return (
       <FlatList
          numColumns={2}
          data={CATEGORIES}
          renderItem={renderGridItem}
        />
    );
}

// this prop will be respected by react-navigation
CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaerButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>
        // headerStyle: {
        //     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        // },
        // headerTintColor: Platform.OS === 'android' ? 'white' : ''
    }
};

const styles = StyleSheet.create({
   screen: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
   },
  

});

export default CategoriesScreen;