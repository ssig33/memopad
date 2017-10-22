import React from 'react'

import Sidebar from '../sidebar'

import { Link } from 'react-router-dom'

import { getHome, search, getCard, update, create, collection } from '../google'

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

const card = (card, col_id)=>{
  const href = `/collections_cards/${col_id}/${card.id}`;
  const className =  "email-item pure-g";
  
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
      {this.props.cards.map((e)=>{return card(e, this.props.collection_id) })}  
    </div>
  }
}

export default class Home extends React.Component {
  componentDidMount(){
    const { collection_id } = this.props.match.params
    collection(collection_id, (files)=> this.props.load(files));
  }
  componentWillReceiveProps(nextProps){
    const { collection_id } = nextProps.match.params
    if(collection_id != this.props.match.params.collection_id){
      collection(collection_id, (files)=> this.props.load(files));
    }
  }
  render(){
    const { collection_id } = this.props.match.params

    return <div id="layout" className="content pure-g">
      <Sidebar match={this.props.match}/>
      <CardList collection_id={collection_id} cards={this.props.cards}/>
    </div>
  }
}
