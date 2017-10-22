import { CALL_API } from 'redux-api-middleware'

export default {
  load: (files)=> {
    return {
      type: 'SUCCESS',
      payload: files
    }
  }
}
