const initialState = {
  collections: [],
  search_text: ''
}

const reducer = (state = initialState, action)=>{
  switch(action.type){
    case 'SUCCESS':
      return {
        collections: action.payload,
        search_text: state.search_text
      }
    case 'UPDATE_SEARCH_TEXT':
      return {
        collections: state.collections,
        search_text: action.payload
      }
    default:
      return state;
  }
}

export default reducer;
