import React from 'react'

import Sidebar from '../sidebar'

import { Link } from 'react-router-dom'

const card = (card)=>{
  const href = `/cards/${card.id}`;

  const className = "email-item pure-g"
  
  return <div className={className} key={`card-${card.id}`}>
    <div className="pure-u">
      <Link to={href}><h4 className="email-subject">{card.title}</h4></Link>
      <p className="email-desc">
        Created At {(new Date(card.created_at)).toLocaleString()}
        <br />
        Updated At {(new Date(card.updated_at)).toLocaleString()}
      </p>
    </div>
  </div>
}

export default class CardList extends React.Component {
  render(){
    return <div id='list' className='pure-u-1'>
      <NewCard history={this.props.history} loadHome={this.props.loadHome}/>
      {this.props.cards.map((e)=>{return card(e) })}  
    </div>
  }
}


