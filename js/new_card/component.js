import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import CardList from './card_list'
import Sidebar from '../sidebar'

import { LiveMarkedArea } from 'react-markdown-area'

import { getHome, search, getCard, update, create, collections } from '../google'

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
    const title = document.querySelector('input.title').value;
    const body = document.querySelector('textarea').value;
    create(title, body, (card)=> {
      if(this.props.collection_id){
        this.props.history.push(`/collections_cards/${this.props.collection_id}/${card.id}`);
      } else {
        this.props.history.push(`/cards/${card.id}`);
      }
    });
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
    return <div id='main'>
      <div className='Content'>
        <div className="ContentHeader">
          <div className='Title'>
            <Link to={`/`} className="Button ButtonSecondary">Cancel</Link>
            <span>&nbsp;</span>
            <button className="Button ButtonSecondary" onClick={()=> this.save()}>Save</button>
          </div>
        </div>
        <div className="ContentBody">
          <div className='EditForm'>
            <div className='TextArea'>
              <input className='title' defaultValue={(new Date()).toLocaleDateString().replace(/\//g, '-')}/>
              <LiveMarkedArea/>
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

export default class NewCard extends React.Component {
  componentDidMount(){
    collections((collections)=> this.props.loadCollections(collections));
  }
  render(){
    const p = new URLSearchParams(this.props.location.search);
    const collection_id = p.get("collection_id");
    return <div className="pure-u-1">
      <Edit history={this.props.history} collection_id={collection_id} collections={this.props.collections}/>
    </div>
  }
}
