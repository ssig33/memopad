const initialState = {
  page: 1,
  cards: []
}

const reducer = (state = initialState, action)=>{
  switch(action.type){
    case 'LOAD_HOME':
      return {
        fuck: 'shit',
        page: state.page
      }
    case 'SUCCESS_HOME':
      return {
        page: state.page,
        cards: action.payload
      }
    default:
      return state;
  }
}

export default reducer;
