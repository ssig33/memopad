import { CALL_API } from 'redux-api-middleware'

export default {
  loadCollections: (collections)=>{
    return {
      type: 'SUCCESS_COLLECTIONS',
      payload: collections
    }
  }
}
