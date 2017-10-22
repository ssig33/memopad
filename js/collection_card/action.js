import { CALL_API } from 'redux-api-middleware'

export default {
  loadCollection: (cards)=> {
    return {
      type: 'SUCCESS_COLLECTION',
      payload: cards
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
  }

}
