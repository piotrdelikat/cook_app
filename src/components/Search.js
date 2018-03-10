import React, { Component } from 'react';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import IngredientItem from './IngredientItem';
import DishItem from './DishItem';
import SearchTarget from './SearchTarget';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchedTerm: null
    };
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({searchedTerm: e.target.value.toLowerCase()});
  }


  render() {
    let ingredients;
    let dishes;

    if (this.state.searchedTerm) {
      ingredients = this.props.ingredientsReducer.ingredients.filter(ingredient => { return ingredient.name.toLowerCase().indexOf(this.state.searchedTerm) > -1})
    } else {
      ingredients = this.props.ingredientsReducer.ingredients;
    };

    ingredients = ingredients.map(ingredient => {
        return  <IngredientItem id={ingredient.id}
                                key={ingredient.id}
                                className="item dragable-ingredient"
                                name={ingredient.name} />
                              });

    if (this.state.searchedTerm) {
      dishes = this.props.dishesReducer.dishes.filter(dish => { return dish.name.toLowerCase().indexOf(this.state.searchedTerm) > -1})
    } else if (this.props.searchReducer.ingredientsById.length > 0) {
      let searchedIds = this.props.searchReducer.ingredientsById;
      dishes = this.props.dishesReducer.dishes.filter(dish => dish.ingredientsById.some(v => searchedIds.includes(v)));
    } else {
      dishes = this.props.dishesReducer.dishes;
    };

    dishes = dishes.map(dish => {
      return  <DishItem id={dish.id}
                        key={dish.id}
                        className="item-dish"
                        name={dish.name}
                        ingredients={dish.ingredients} />
                      });
    return(
      <div className="container">
        <div className='item search'>
          <input type='text' name="name" placeholder="Wyszukaj skladnik lub potrawę" onChange={e => this.handleSearch(e)} required/>
        </div>
        <SearchTarget />
        <div className="dragable-ingredients">
          {ingredients}
        </div>
        <div className="dishes">
          {dishes}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchReducer: state.searchReducer,
    dishesReducer: state.dishesReducer,
    ingredientsReducer: state.ingredientsReducer
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
