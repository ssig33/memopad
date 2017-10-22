import React from 'react'
import { connect } from 'react-redux'

import Top from './component'

import action from './action'

const mapStateToProps = (state)=>{
  return state
}

const mapDispatchToProps = (dispatch)=>{
  return {
    loadCollection: (cards)=> { 
      return dispatch(action.loadCollection(cards)); 
    },
    loadCard: (card)=> {
      return dispatch(action.loadCard(card));
    },
    loadRelated: (id)=> {
      return dispatch(action.loadRelated(id));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Top)

