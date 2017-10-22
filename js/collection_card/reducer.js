const initialState = {
  cards: [],
  card: {title: "loading", body: ""},
  related: []
}

const reducer = (state = initialState, action)=>{
  switch(action.type){
    case 'SUCCESS_COLLECTION':
      return {
        cards: action.payload,
        card: state.card,
        related: state.related
      }
    case 'SUCCESS_CARD':
      return {
        cards: state.cards,
        card: action.payload,
        related: state.related
      }
    case 'SUCCESS_RELATED':
      return {
        cards: state.cards,
        card: state.card,
        related: action.payload
      }
    default:
      return state;
  }
}

export default reducer;
