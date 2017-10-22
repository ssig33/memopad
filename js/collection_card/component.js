import React from 'react'
import { Link } from 'react-router-dom'

import Card from './card'
import Sidebar from '../sidebar'

import {getHome, search, getCard, collection, related} from '../google'

class NewCard extends React.Component{
  render(){
    const url = this.props.collection_id ? `/new?collection_id=${this.props.collection_id}` : "/new";
    return <div className="email-item pure-g">
      <div className='pure-u-1'>
        <Link to={url} className="secondary-button pure-button">New</Link>
      </div>
    </div>
  }
}

const card = (card, col_id, select_id)=>{
  const href = `/collections_cards/${col_id}/${card.id}`;
  // 選択中のカードは強調表示
  const className = parseInt(String(select_id)) == card.id ? "email-item email-item-selected pure-g" : "email-item pure-g"
  
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
      <NewCard collection_id={this.props.collection_id} history={this.props.history}/>
      {this.props.cards.map((e)=>{return card(e, this.props.collection_id, this.props.select_id) })}  
    </div>
  }
}

export default class CollectionCard  extends React.Component {
  componentDidMount(){
    const { collection_id , card_id} = this.props.match.params;
    getCard(card_id, (card)=> this.props.loadCard(card));
    collection(collection_id, (files)=> this.props.loadCollection(files));
    related(card_id, (related)=> this.props.loadRelated(related));
  }

  componentWillReceiveProps(nextProps){
    const { card_id } = nextProps.match.params
    if(card_id != this.props.match.params.card_id){
      getCard(card_id, (card)=> this.props.loadCard(card));
      related(card_id, (related)=> this.props.loadRelated(related));
    }
  }

  render(){
    const { collection_id, card_id } = this.props.match.params

    const card = this.props.card;
    if(!card){return null }
    return <div id="layout" className="content pure-g">
      <Sidebar match={this.props.match}/>
      <CardList collection_id={collection_id} cards={this.props.cards} select_id={card.id}/>
      <Card card={card} related={this.props.related}/>     
    </div>
  }
}
