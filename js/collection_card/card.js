// カードを右側に表示するやつ
import React from 'react'
import { Link } from 'react-router-dom'
const marked = require('marked');

class Related extends React.Component {
  render(){
    const collection = this.props.r.collection
    const cards =this.props.r.cards
    return <div>
      <h4><Link to={`/collections/${collection.id}`}>{collection.name}</Link></h4>
      {cards.map((c)=> <span key={`r_${collection.id}_${c.id}`}><Link className="Button related" to={`/cards/${c.id}`}>{c.name}</Link>&nbsp;</span>) }
    </div>
  }
}

export default class Card extends React.Component{
  render(){
    const card = this.props.card;
    marked.setOptions({ breaks: true });
    const body = marked(card.body);
    return <div id="main" className="Main">
      <div className="ContentHeader">
        <div className="Title">
          <h3>{card.name}</h3>
          <p className="Subtitle">
            Created At {(new Date(card.createdTime)).toLocaleString()}
            <br />
            Updated At {(new Date(card.modifiedTime)).toLocaleString()}
          </p>
        </div>
        <div className="Edit">
          <Link to={`/cards/edit/${card.id}`} className="Button ButtonSecondary">Edit</Link>
        </div>
      </div>
        <div className="ContentBody" dangerouslySetInnerHTML={{__html: body}} />
        <div className="ContentBody">
          {this.props.related.map((r)=> <Related key={`related_${r.collection.id}`} r={r} />)}
      </div>
    </div>
  }
}
