import genId from 'gen-id';

const generator = new genId()
generator.setFormat('nnnnn');

const initialState = {
  ingredients: []
}

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return { ...state,
               ingredients: state.ingredients.concat({id: Number(generator.generate()), name: action.payload}) };
    case 'EDIT_INGREDIENT':
      return { ...state,
               ingredients: state.ingredients.map(ingredient => ingredient.id === action.id ?
                                                  {...ingredient, name: action.payload}
                                                  : ingredient) };
    case 'DELETE_INGREDIENT':
      return { ...state,
               ingredients: state.ingredients.filter(ingredient => ingredient.id !== action.id) };
    default:
      return state;
  }
};

export default ingredientsReducer;
