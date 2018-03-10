const initialState = {
  dishes: []
}

const dishesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DISH':
      return { ...state,
               dishes: state.dishes.concat({id: (state.dishes.length + 1), name: action.payload, ingredientsById: [], ingredients: [] })
             };
    case 'EDIT_DISH':
      return { ...state,
               dishes: state.dishes.map(dish =>
                 dish.id === action.id ? {...dish, name: action.payload} : dish)
     };
    case 'DELETE_DISH':
      return { ...state,
               dishes: state.dishes.filter(dish => dish.id !== action.id)
             };
    case 'APPEND_INGREDIENT':
      const targetDish = state.dishes.filter(dish => dish.id === action.dishId);
      const ingredientIsNew = targetDish[0].ingredients
        .map(ingredient => { return ingredient.ingId !== action.ingId ? true : false })
        .every(value => value === true);

      return {...state,
              dishes: state.dishes.map(dish =>
                dish.id === action.dishId && ingredientIsNew ?
                  {...dish,
                  ingredientsById: dish.ingredientsById.concat(action.ingId),
                  ingredients: dish.ingredients.concat({ingId: action.ingId, name:action.payload})}
                  : dish)
        };
    case 'REMOVE_INGREDIENT':
      console.log((`You try to remove ing ${action.ingId} from dish number ${action.dishId}`))
      return { ...state,
               dishes: state.dishes.map(dish =>
                 dish.id === action.dishId ?
                 {...dish,
                 ingredientsById: dish.ingredientsById.filter(id => id !== action.ingId),
                 ingredients: dish.ingredients.filter(ingredient => ingredient.ingId !== action.ingId)} : dish)
             };
    default:
      return state;
  }
};

export default dishesReducer;
