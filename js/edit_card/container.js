import React from 'react'
import { connect } from 'react-redux'

import Top from './component'

import action from './action'

const mapStateToProps = (state)=>{
  return state
}

const mapDispatchToProps = (dispatch)=>{
  return {
    loadCard: (id)=> {
      return dispatch(action.loadCard(id));
    },
    clear: ()=>{
      return dispatch(action.clear());
    },
    loadCollections: (c)=>{
      return dispatch(action.loadCollections(c));
    }

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Top)

