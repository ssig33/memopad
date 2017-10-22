// カードを右側に表示するやつ
import React from 'react'
import { Link } from 'react-router-dom'
const marked = require('marked');

class Related extends React.Component {
  render(){
    const collection = this.props.r.collection
    const cards = this.props.r.cards
    return <div>
      <h4><Link to={`/collections/${collection.id}`}>{collection.name}</Link></h4>
      {cards.map((c)=> <span key={`r_${collection.id}_${c.id}`}><Link className="pure-button related" to={`/cards/${c.id}`}>{c.name}</Link>&nbsp;</span>) }
    </div>
  }
}

export default class Card extends React.Component{
  render(){
    const card = this.props.card;
    marked.setOptions({ breaks: true });
    const body = marked(card.body);
    return <div id="main" className="pure-u-1">
      <div className="email-content">
        <div className="email-content-header pure-g">
          <div className="pure-u-3-4">
              <h3 className="email-content-title">{card.name}</h3>
              <p className="email-content-subtitle">
              Created At {(new Date(card.createdTime)).toLocaleString()}
              <br />
              Updated At {(new Date(card.modifiedTime)).toLocaleString()}
              </p>
          </div>

          <div className="email-content-controls pure-u-1-4">
              <Link to={`/cards/edit/${card.id}`} className="secondary-button pure-button">Edit</Link>
          </div>
          
        </div>
        <div className="email-content-body" dangerouslySetInnerHTML={{__html: body}} />
        <div className="email-content-body">
          {this.props.related.map((r)=> <Related key={`related_${r.collection.id}`} r={r} />)}
        </div>
      </div>
    </div>
  }
}
