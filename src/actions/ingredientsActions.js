export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const EDIT_INGREDIENT = 'EDIT_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export function addIngredient(name) {
  return {
    type: ADD_INGREDIENT,
    payload: name
  }
}

export function editIngredient(name, id) {
  return {
    type: EDIT_INGREDIENT,
    id,
    payload: name
  }
}

export function deleteIngredient(id) {
  return {
    type: DELETE_INGREDIENT,
    id
  }
}
