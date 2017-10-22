import React from 'react'
import { connect } from 'react-redux'

import Top from './component'

import action from './action'

const mapStateToProps = (state)=>{
  return state
}

const mapDispatchToProps = (dispatch)=>{
  return {
    loadHome: (files)=> { 
      return dispatch(action.loadHome(files)); 
    },
    loadCard: (card)=> {
      return dispatch(action.loadCard(card));
    },
    loadRelated: (related)=> {
      return dispatch(action.loadRelated(related));
    },
    clear: ()=>{
      return dispatch(action.clear());
    }

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Top)

