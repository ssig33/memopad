import React from 'react'
import { Link } from 'react-router-dom'

import { getHome, search } from '../google'

import Sidebar from '../sidebar'

class Search extends React.Component{
  search(e){
    e.preventDefault();
    const keyword = this.refs.search.value;
    search(keyword, (files)=> this.props.loadHome(files));
  }
  render(){
    return <div>
      <form onSubmit={(e)=> this.search(e)}>
        <fieldset>
          <input ref='search' className='Search' size="20" type='text'/>
          <button type='submit' className='Button ButtonPrimary'>Search</button>
        </fieldset>
      </form>
    </div>
  }
}

class NewCard extends React.Component{
  render(){
    const url = "/new"
    return <div className="Item">
      <Search history={this.props.history} loadHome={this.props.loadHome} />
      <div>
        <Link to={url} className="Button ButtonSecondary">New</Link>
      </div>
    </div>
  }
}

const card = (card)=>{
  const href = `/cards/${card.id}`;

  return <div className="Item" key={`card-${card.id}`}>
    <div>
      <Link to={href}><h4>{card.name}</h4></Link>
      <p>
        Created At {(new Date(card.createdTime)).toLocaleString()}
        <br />
        Updated At {(new Date(card.modifiedTime)).toLocaleString()}
      </p>
    </div>
  </div>
}



class CardList extends React.Component {
  render(){
    return <div id='list' className='CardList'>
      <NewCard history={this.props.history} loadHome={this.props.loadHome}/>
      {this.props.cards.map((e)=>{return card(e) })}  
    </div>
  }
}


export default class Top extends React.Component {
  componentDidMount(){
    getHome((files)=> this.props.loadHome(files));
  }
  render(){
    return <div id="layout" className="Content">
      <Sidebar />
      <CardList history={this.props.history} cards={this.props.cards} loadHome={this.props.loadHome}/>
    </div>
  }
}
