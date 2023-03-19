import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './actions/counter';
import { login } from './actions/isLogin';

function App() {
  const counter = useSelector((state) => state.counter);
  const isLogin = useSelector((state) => state.login);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Hello, Redux</h1>
      <h3>count: {counter}</h3>
      <button onClick={() => dispatch(increment(7))}>+</button>
      <button onClick={() => dispatch(decrement(7))}>-</button>
      <h3>{`isLogin: ${isLogin}`}</h3>
      <h3>{isLogin ? 'ログインに成功!' : 'ログインしてください。'}</h3>
      <button onClick={() => dispatch((login()))}>{ isLogin ? 'ログアウト' : 'ログイン'}</button>
    </div>
  );
}

export default App;
