import React from 'react'
import { connect } from 'react-redux'

import Top from './component'

import action from './action'

const mapStateToProps = (state)=>{
  return state
}

const mapDispatchToProps = (dispatch)=>{
  return {
    load: (files)=> { 
      return dispatch(action.load(files)); 
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Top)

