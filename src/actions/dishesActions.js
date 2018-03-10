export const ADD_DISH = 'ADD_DISH';
export const EDIT_DISH = 'EDIT_DISH';
export const DELETE_DISH = 'DELETE_DISH';
export const APPEND_INGREDIENT = 'APPEND_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export function addDish(name) {
  return {
    type: ADD_DISH,
    payload: name
  }
}

export function editDish(name, id) {
  return {
    type: EDIT_DISH,
    id,
    payload: name
  }
}

export function deleteDish(id) {
  return {
    type: DELETE_DISH,
    id
  }
}

export function appendIngredient(name, dishId, ingId) {
  return {
    type: APPEND_INGREDIENT,
    payload: name,
    dishId,
    ingId
  }
}

export function removeIngredient(ingId, dishId) {
  return {
    type: REMOVE_INGREDIENT,
    ingId,
    dishId
  }
}
