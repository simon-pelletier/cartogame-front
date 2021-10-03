export function inputReducer(state, action) {
  switch (action.type) {
    case "update":
      if (state[action.payload.field] !== action.payload.field) {
        return {
          ...state,
          [action.payload.field]: action.payload.value,
          errors: {},
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}
