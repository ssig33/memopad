import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Link } from 'react-router-dom'

import Home from './home'
import NewCard from './new_card'
import ShowCard from './show_card'
import EditCard from './edit_card'
import Collection from './collection'
import CollectionCard from './collection_card'

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/new' component={NewCard} />
      <Route exact path='/cards/:card_id' component={ShowCard} />
      <Route exact path='/collections/:collection_id' component={Collection} />
      <Route exact path='/cards/edit/:card_id' component={EditCard} />
      <Route exact path='/collections_cards/:collection_id/:card_id' component={CollectionCard} />
    </div>
  </BrowserRouter>
)

window.startReact = ()=>{
  document.querySelector("#outerrim").remove();
  ReactDOM.render(
    <App/>,
    document.querySelector('div'),
  )
}
