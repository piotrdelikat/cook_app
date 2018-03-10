import React, { Component } from 'react';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions'
import DishItem from './DishItem'
import IngredientItem from './IngredientItem'

class DishesList extends Component {

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.addDish(e.target.name.value);
    e.target.reset();
  }

  handleIngredientSubmit(e) {
    e.preventDefault();
    this.props.actions.addIngredient(e.target.name.value);
    e.target.reset();
  }

  render() {
    let dishes = this.props.dishesReducer.dishes.map((dish) => {
      return  <DishItem id={dish.id}
                        key={dish.id}
                        className="item-dish"
                        name={dish.name}
                        ingredients={dish.ingredients} />
                       });
     let ingredients = this.props.ingredientsReducer.ingredients.map((ingredient) => {
       return  <IngredientItem id={ingredient.id}
                               key={ingredient.id}
                               className="item dragable-ingredient"
                               name={ingredient.name} />
                              });
    return (
      <div className="container">
        <h3 className='title'>Stwórz listę dań</h3>
        <div className='container-grid'>
          <div className="dishes">
            {dishes}
            <form className='item' onSubmit={e => this.handleSubmit(e)}>
              <input type='text' name="name" placeholder="Dodaj Danie" />
              <input type="submit" value="&#x2713;" />
            </form>
          </div>
          <div className="dragable-ingredients">
            {ingredients}
            <form className='item' onSubmit={e => this.handleIngredientSubmit(e)}>
              <input type='text' name="name" placeholder="Dodaj skadnik" required/>
              <input type="submit" value="&#x2713;" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dishesReducer: state.dishesReducer,
    ingredientsReducer: state.ingredientsReducer,
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DishesList);
