import Store from '../store/recipes';

export const initialState = Store;

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: action.data || [],
      };
    }
    case 'MEALS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        meals: action.data,
      };
    }
    case 'RECIPES_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'RECIPES_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        recipes: action.data,
      };
    }
    default:
      return state;
  }
}
