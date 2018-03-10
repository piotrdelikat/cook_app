import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import IngredientsList from './components/IngredientsList'
import DishesList from './components/DishesList'
import Search from './components/Search'

class App extends Component {
  render() {
    return (
      <Provider store= { store }>
        <Router>
          <div className="App">
            <ul className="nav">
              <li>
                <Link to="/">Skadniki</Link>
              </li>
              <li>
                <Link to="/dishes">Potrawy</Link>
              </li>
              <li>
                <Link to="/search">Wyszukaj</Link>
              </li>
            </ul>
              <Route exact path="/" component={IngredientsList} />
              <Route path="/dishes" component={DishesList} />
              <Route path="/search" component={Search} />
          </div>
        </Router>
      </Provider>
    );
  }
}

App = DragDropContext(MultiBackend(HTML5toTouch))(App)
export default App;
