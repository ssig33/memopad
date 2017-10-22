const initialState = {
  cards: [],
  card: null,
  collections: []
}

const reducer = (state = initialState, action)=>{
  switch(action.type){
    case 'SUCCESS_CARD':
      return {
        cards: state.cards,
        card: action.payload,
        collections: state.collections
      }
    case 'SUCCESS_COLLECTIONS':
      return {
        cards: state.cards,
        card: state.card,
        collections: action.payload
      }
    case 'CLEAR':
      return initialState
    default:
      return initialState
  }
}

export default reducer;
