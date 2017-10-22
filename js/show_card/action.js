import { CALL_API } from 'redux-api-middleware'

export default {
  loadHome: (files)=> {
    const query = (new URLSearchParams(location.search)).get('query');
    
    return {
      type: 'SUCCESS_HOME',
      payload: files
    }
  },
  loadCard: (card)=>{
    return {
      type: 'SUCCESS_CARD',
      payload: card
    }
  },
  loadRelated: (related)=> {
    return {
      type: 'SUCCESS_RELATED',
      payload: related
    }
  },
  clear: ()=>{  
    return {type: 'CLEAR'}
  }
}
