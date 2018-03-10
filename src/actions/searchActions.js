export const ADD_SEARCH_INGREDIENT = 'ADD_SEARCH_INGREDIENT';
export const REMOVE_SEARCH_INGREDIENT = 'REMOVE_SEARCH_INGREDIENT';


export function addSearchIngredient(name, ingId) {
  return {
    type: ADD_SEARCH_INGREDIENT,
    payload: name,
    ingId
  }
}

export function removeSearchIngredient(name, ingId) {
  return {
    type: REMOVE_SEARCH_INGREDIENT,
    payload: name,
    ingId
  }
}
