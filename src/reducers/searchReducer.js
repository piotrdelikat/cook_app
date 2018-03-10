const initialState = {
  ingredientsById: [],
  ingredients: []
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SEARCH_INGREDIENT':
      const ingredientIsNew = state.ingredients
        .map(ingredient => { return ingredient.ingId !== action.ingId ? true : false })
        .every(value => value === true);
      if (ingredientIsNew) {
        return { ...state,
          ingredientsById: state.ingredientsById.concat(action.ingId),
          ingredients: state.ingredients.concat({ingId: action.ingId, name: action.payload})};
      } else {
       return state
      }
    case 'REMOVE_SEARCH_INGREDIENT':
      return { ...state,
        ingredientsById: state.ingredientsById.filter(id => id !== action.ingId),
        ingredients: state.ingredients.filter(ingredient => ingredient.ingId !== action.ingId)};
    default:
      return state;
  }
};

export default searchReducer;
