import React from 'react'

import { Link } from 'react-router-dom'

import { collections } from '../google'

const collectionLi = (collection, id)=>{
  const collection_id = id;
  const className = collection_id == collection.id ? "pure-menu-item pure-menu-selected" : "pure-menu-item"
  return <li className={className} key={`collection_${collection.id}`}>
    <Link to={`/collections/${collection.id}`} className='pure-menu-link'>{collection.name}</Link>
  </li>
}

export default class Top extends React.Component {
  componentDidMount(){
    collections((files)=> this.props.load(files));
  }
  next(){
    history.go(1);
  }
  prev(){
    history.go(-1);
  }
  handleSearch(e){
    this.props.search(e);
  }
  search_collections(){
    if(String(this.props.search_text) === ''){
      return this.props.collections
    } else {
      return this.props.collections.filter((c)=>{
        return c.name.match(new RegExp(this.props.search_text))
      });
    }
  }
  signOut(){
    gapi.auth2.getAuthInstance().signOut();
  }
  render(){
    const collection_id = this.props.match ? this.props.match.params.collection_id : null;
    return <div id='nav' className='pure-u'>
      <a className="nav-menu-button">Menu</a>
      <div className="nav-inner">
        <Link to="/" className="primary-button pure-button">Home</Link>
        <div className="pure-menu">
          
          <ul className="pure-menu-list">
            <li className="pure-menu-item history">
              <button className="pure-button" onClick={()=> this.prev()}>{`<`}</button>
              <button className="pure-button" onClick={()=> this.next()}>{`>`}</button>
            </li>
            <li className='pure-menu-item search_collection'>
              <input value={this.props.search_text} onChange={(e)=> this.handleSearch(e)}/>
            </li>
            {this.search_collections().map((e)=>{ return collectionLi(e, collection_id) })}
            <li className='pure-menu-item'>
              <hr/>
              <a className='pure-menu-link' href='javascript:void(0)' onClick={()=> this.signOut()}>Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  }
}
