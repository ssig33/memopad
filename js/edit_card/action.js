import { CALL_API } from 'redux-api-middleware'

export default {
  loadCard: (card)=>{
    return {
      type: 'SUCCESS_CARD',
      payload: card
    }
  },
  loadCollections: (collections)=>{
    return {
      type: 'SUCCESS_COLLECTIONS',
      payload: collections
    }
  },
  clear: ()=>{
    return {type: 'CLEAR'}
  }
}
