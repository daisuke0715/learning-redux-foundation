const isLoginReducer = (state = false, action) => {
  console.log('isLoginReducer');
  console.log(action.type);
  switch(action.type) {
    case 'LOGIN':
      return !state;
    default:
      return state;
  }
}

export default isLoginReducer;
