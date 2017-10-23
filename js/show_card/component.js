import React from 'react'
import { Link } from 'react-router-dom'

import {getHome, search, getCard, related} from '../google'

import Card from './card'
import Sidebar from '../sidebar'

class Search extends React.Component{
  search(e){
    e.preventDefault();
    const keyword = this.refs.search.value;
    this.props.history.push("/query="+encodeURIComponent(keyword));
    search(keyword, (files)=> this.props.loadHome(files));
  }
  render(){
    return <div className='pure-u'>
      <form className='pure-form' onSubmit={(e)=> this.search(e)}>
        <fieldset>
          <input ref='search' className='search' size="20" type='text'/>
          <button type='submit' className='pure-button pure-button-primary'>Search</button>
        </fieldset>
      </form>
    </div>
  }
}

class NewCard extends React.Component{
  render(){
    const url = "/new"
    return <div className="email-item pure-g">
      <Search history={this.props.history} loadHome={this.props.loadHome} />
      <div className='pure-u-1'>
        <Link to={url} className="secondary-button pure-button">New</Link>
      </div>
    </div>
  }
}

const card = (card, select_id)=>{
  const href = `/cards/${card.id}`;
  
  const className = select_id == card.id ? "email-item email-item-selected pure-g" : "email-item pure-g"
  
  return <div className={className} key={`card-${card.id}`}>
    <div className="pure-u">
      <Link to={href}><h4 className="email-subject">{card.name}</h4></Link>
      <p className="email-desc">
        Created At {(new Date(card.createdTime)).toLocaleString()}
        <br />
        Updated At {(new Date(card.modifiedTime)).toLocaleString()}
      </p>
    </div>
  </div>
}



class CardList extends React.Component {
  render(){
    return <div id='list' className='pure-u-1'>
      <NewCard history={this.props.history} loadHome={this.props.loadHome}/>
      {this.props.cards.map((e)=>{return card(e, this.props.select_id) })}  
    </div>
  }
}

export default class ShowCard  extends React.Component {
  componentDidMount(){
    const { card_id } = this.props.match.params
    getHome((files)=> this.props.loadHome(files));
    getCard(card_id, (card)=> this.props.loadCard(card));
    related(card_id, (related)=> this.props.loadRelated(related));
  }

  componentWillUnmount(){
    this.props.clear();
  }

  componentWillReceiveProps(nextProps){
    const { card_id } = nextProps.match.params
    if(card_id != this.props.match.params.card_id){
      getCard(card_id, (card)=> this.props.loadCard(card));
      related(card_id, (related)=> this.props.loadRelated(related));
    }
  }

  render(){
    const card = this.props.card;
    if(!card){return null }

    return <div id="layout" className="content pure-g">
      <Sidebar match={this.props.match}/>
      <CardList history={this.props.history} cards={this.props.cards} loadHome={this.props.loadHome} select_id={card.id}/>
      <Card card={card} related={this.props.related}/>     
    </div>
  }
}
