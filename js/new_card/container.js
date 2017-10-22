import React from 'react'
import { connect } from 'react-redux'

import Top from './component'

import action from './action'

const mapStateToProps = (state)=>{
  return state
}

const mapDispatchToProps = (dispatch)=>{
  return {
    loadCollections: (collections)=>{
      return dispatch(action.loadCollections(collections));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Top)

