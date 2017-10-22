import { CALL_API } from 'redux-api-middleware'

export default {
  load: (files)=> {
    const query = (new URLSearchParams(location.search)).get('query');

    return {
      type: 'SUCCESS_HOME',
      payload: files.map((e)=>{
        e.name = e.name.replace(/\.txt$/, '');
        return e
      })
    }
  }
}
