import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import { getHome, search, getCard, update, collections } from '../google'

import CardList from './card_list'
import Sidebar from '../sidebar'

import { LiveMarkedArea } from 'react-markdown-area'

class CollectionSelector extends React.Component {
  elm(collection){
    if(this.state && String(this.state.word) !== ""){
      const regexp = new RegExp(String(this.state.word))
      if(!collection.name.match(regexp)){ return null }
    }
    return <li key={`collection_edit_${collection.id}`}><a className='Button' href='javascript:void(0)' onClick={(e)=> this.click(e)}>{collection.name}</a></li>
  }
  click(e){
    this.props.addTag(` #${e.target.textContent.replace(/\ /g, '_')}`);
  }
  search(word){
    this.setState({word: word});
  }
  render(){
    return <ul className='collection_selector'>
      <li>
        <input onChange={(e)=> this.search(e.target.value)}/>
      </li>
      {this.props.collections.map((e)=> this.elm(e))}
    </ul>
  }
}

class Edit extends React.Component {
  save(){
    const card = this.props.card;
    const title = document.querySelector('input.title').value;
    const body = document.querySelector('textarea').value;
    update(card.id, title, body, ()=> this.props.history.push(`/cards/${card.id}`));
  }
  addTag(tag){
    const v = document.querySelector('textarea').value;
    if(v.split("\n").pop().match(/#/)){
      document.querySelector('textarea').value += tag;
    } else {
      document.querySelector('textarea').value += `\n\n${tag}`;
    }
  }
  render(){
    const card = this.props.card;
    return <div id='main'>
      <div className='Content'>
        <div className="ContentHeader">
          <div className='Title'>
            <Link to={`/cards/${card.id}`} className="Button ButtonSecondary">Cancel</Link>
            <span>&nbsp;</span>
            <button className="Button ButtonSecondary" onClick={()=> this.save()}>Save</button>
          </div>
        </div>
        <div className="ContentBody">
          <div className='EditForm'>
            <div className='TextArea'>
              <input className='title' defaultValue={card.name}/>
              <LiveMarkedArea defaultValue={card.body}/>
            </div>
            <div>
               <CollectionSelector collections={this.props.collections} addTag={(s)=> this.addTag(s)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default class EditCard extends React.Component {
  componentDidMount(){
    const { card_id } = this.props.match.params
    getCard(card_id, (card)=> this.props.loadCard(card));
    collections((collections)=> this.props.loadCollections(collections));
  }
  componentWillUnmount(){
    this.props.clear();
  }

  render(){
    const { card_id } = this.props.match.params

    const card = this.props.card
    if(!card){return null}
    if(card.id != card_id){return null}

    return <div className="pure-u-1">
      <Edit card={card} history={this.props.history} collections={this.props.collections}/>
    </div>
  }
}
