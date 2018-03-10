import React, { Component } from 'react';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions'
import IngredientItem from './IngredientItem'

class IngredientsList extends Component {

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.addIngredient(e.target.name.value);
    e.target.reset();
  }

  render() {
    let ingredients = this.props.ingredientsReducer.ingredients.map((ingredient) => {
      return  <IngredientItem id={ingredient.id}
                              key={ingredient.id}
                              className="item"
                              name={ingredient.name}/>
                            });
    return (
      <div className='container'>
        <h3 className='title'>Stwórz listę skadników</h3>
        <div className="container-grid">
          <div className="ingredients">
            {ingredients}
            <form className='item' onSubmit={e => this.handleSubmit(e)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsList);
