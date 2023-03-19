import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducers);
console.dir(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);



// actions ->  increment, decrement
const increment = () => {
  return {
    type: 'INCREMENT',
  }
}

const decrement = () => {
  return {
    type: 'DECREMENT',
  }
}
