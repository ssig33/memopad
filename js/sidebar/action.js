import { CALL_API } from 'redux-api-middleware'

export default {
  load: (files)=> {
    return {
      type: "SUCCESS",
      payload: files
    }
  },
  search: (e)=>{
    return {type: "UPDATE_SEARCH_TEXT", payload: e.target.value}
  }
}
