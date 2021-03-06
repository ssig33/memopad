import React from 'react'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { apiMiddleware } from 'redux-api-middleware';

import reducer from './reducer'

import Top from './container'

const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer)

export default class Sidebar extends React.Component {
  render(){
    return <Provider store={store}>
      <Top match={this.props.match}/>
    </Provider>
  }
}



