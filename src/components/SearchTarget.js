import React, { Component } from 'react';
import { DropTarget } from 'react-dnd'
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions'

let searchTarget = {
  drop (props) {
    return { name: props.name,
             id: props.id,
             target: "searchTarget"
     }
  }
}

let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class SearchTarget extends Component {

  handleRemove(e) {
    if(e.target.className === 'remove-ingredient') {
      let name = e.target.parentNode.textContent.slice(0, -2);
      let ingId = Number(e.target.parentNode.id);
      this.props.actions.removeSearchIngredient(name, ingId);
    }
  }

  render() {
    const { connectDropTarget } = this.props
    let ingredients = this.props.searchReducer.ingredients.map(ingredient =>
                              <li id={ingredient.ingId} key={ingredient.ingId}>
                                {ingredient.name}
                                <span className="remove-ingredient"> &#215;</span>
                              </li> );
    return connectDropTarget(
      <div className="search-target">
        <h3>Lub przeciągnij skladnik tutaj i zobacz co możesz z nim przyrządzić</h3>
        <ul onClick={e => this.handleRemove(e)}>{ingredients}</ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchReducer: state.searchReducer,
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

SearchTarget = DropTarget('ingredient', searchTarget, collect)(SearchTarget)
export default connect(mapStateToProps, mapDispatchToProps)(SearchTarget);
