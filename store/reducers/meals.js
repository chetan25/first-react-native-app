import { MEALS } from '../../data/dummy';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';


const initialState = {
   meals: MEALS,
   filteredMeals: MEALS,
   favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_FAVORITE:
            console.log(action.mealId);
            const existingIndex = state.favoriteMeals.findIndex(meals => meals.id === action.mealId);   
            console.log(existingIndex);
            if (existingIndex >= 0) {
                return {
                    ...state,
                    favoriteMeals: state.favoriteMeals.filter(meal => meal.id != action.mealId)
                }
            }
            return {
                ...state,
                favoriteMeals: [...state.favoriteMeals, state.meals.find(meal => meal.id === action.mealId)]
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilterMeals = state.meals.filter(meal => {
                if (appliedFilters.glutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
                    return false;
                }
                if (appliedFilters.vegan && !meal.isVegan) {
                    return false;
                }
                if (appliedFilters.vegeterian && !meal.isVegeterian) {
                    return false;
                }

                return true;
            }); 
            return {
                ...state,
                filteredMeals: updatedFilterMeals
            }
        default:
           return state;
    }
}

export default mealsReducer;