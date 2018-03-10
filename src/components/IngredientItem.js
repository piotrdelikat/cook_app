import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd'
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions'

const ingredientSource = {
  beginDrag(props) {
    return {
      name: props.name,
      id: props.id
    };
  },
  endDrag(props, monitor) {
    const dragItem = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if(dropResult) {
      console.log(`Dropped ${dragItem.name} with ${dragItem} on ${dropResult.name} with ${dropResult.id}`);
      console.log(dragItem);
      if (dropResult.target === 'dishTarget') {
        props.actions.appendIngredient(dragItem.name, dropResult.id, dragItem.id);
      } else if (dropResult.target === 'searchTarget')
        props.actions.addSearchIngredient(dragItem.name, dragItem.id);
    }
  }

}

let collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  }
}

class IngredientItem extends Component {
  constructor() {
    super();
    this.state = {
      editedField: null
    };
  }

  handleDelete(e) {
    if(e.target.className === 'item-delete') {
      let id = Number(e.target.parentNode.id);
      this.props.actions.deleteIngredient(id);
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
    let name = e.target.name.value;
    this.props.actions.editIngredient(name , id);
    this.setState({editedField: null});
  }

  render() {
    const { connectDragSource } = this.props;

    return (
      connectDragSource(
        <div id={this.props.id} key={this.props.id} className={this.props.className} onClick={e => this.handleClick(e)}>
          <span className="item-name">
            {this.state.editedField === this.props.id ?
            <form onSubmit={e => this.handleUpdate(e)}>
              <input type='text' name="name" defaultValue={this.props.name} autoFocus />
            </form>
            : this.props.name } </span>
          <span className="item-delete"> &#215;</span>
        </div>
      )
    )
  }
}

IngredientItem.propTypes = {
  id: PropTypes.number.isRequired,
  key: PropTypes.number,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
};

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


IngredientItem = DragSource('ingredient', ingredientSource, collect)(IngredientItem)
export default connect(mapStateToProps, mapDispatchToProps)(IngredientItem);
