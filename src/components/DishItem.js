import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd'
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions'

let dishTarget = {
  drop (props) {
    return { name: props.name,
             id: props.id,
             target: 'dishTarget'
     }
  }
}

let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class DishItem extends Component {
  constructor() {
    super();
    this.state = {
      editedField: null
    };
  }

  handleDelete(e) {
    if(e.target.className === 'item-delete') {
      let id = Number(e.target.parentNode.parentNode.id);
      this.props.actions.deleteDish(id);
    }
  }

  handleEdit(e) {
    if(e.target.className === 'item-name') {
      let id = Number(e.target.parentNode.id);
      this.setState({editedField: id});
    }
  }

  handleClick(e) {
    if(e.target.className === 'item-delete') {
      this.handleDelete(e);
    } else if (e.target.className === 'item-name') {
      this.handleEdit(e);
    }
  }

  handleUpdate(e) {
    e.preventDefault();
    let id = Number(e.target.parentNode.parentNode.id);
    let value = e.target.name.value;
    this.props.actions.editDish(value, id);
    this.setState({editedField: null});
  }

  handleRemove(e) {
    if(e.target.className === 'remove-ingredient') {
      let dishId = Number(e.target.parentNode.parentNode.parentNode.id);
      let ingId = Number(e.target.parentNode.id);
      this.props.actions.removeIngredient(ingId, dishId);
    }
  }

  render() {
    const { connectDropTarget } = this.props;
    const ingredients = this.props.ingredients.map((ingredient) =>
                                    <li id={ingredient.ingId} key={ingredient.ingId}>
                                      {ingredient.name}
                                      <span className="remove-ingredient"> &#215;</span>
                                    </li> );
    return connectDropTarget(
      <div id={this.props.id} key={this.props.id} className={this.props.className} onClick={e => this.handleClick(e)} >
        <div className="dish-item-name">
          <span className="item-name">{this.state.editedField === this.props.id ?
            <form onSubmit={e => this.handleUpdate(e)}><input type='text' name="name" defaultValue={this.props.name} autoFocus /></form>
            : this.props.name }
          </span>
          <span className="item-delete"> &#215;</span>
        </div>
        <ul onClick={e => this.handleRemove(e)}>
          {ingredients}
        </ul>
        <p>Przeciągnij skadnik tutaj by skomponować potrawę</p>
      </div>
    )
  }
}

DishItem.propTypes = {
  id: PropTypes.number.isRequired,
  key: PropTypes.number,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object),
};

function mapStateToProps(state) {
  return {
    dishesReducer: state.dishesReducer,
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

DishItem = DropTarget('ingredient', dishTarget, collect)(DishItem)
export default connect(mapStateToProps, mapDispatchToProps)(DishItem);
