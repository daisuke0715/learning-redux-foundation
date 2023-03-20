### 本資料のまとめ

- storeは、currentState / currentReducerなどのプロパティ、dispatch / getStateなどのメソッドを持ったオブジェクトである（[こちら](https://github.com/reduxjs/redux/blob/db753b13f89861e31749fecee359e48cc9d45356/src/createStore.ts#L135-L136)と[こちら](https://github.com/reduxjs/redux/blob/db753b13f89861e31749fecee359e48cc9d45356/src/createStore.ts#L376)）
- 現在のstateは、storeのgetStateメソッドで取得できる。（[こちら](https://github.com/reduxjs/redux/blob/db753b13f89861e31749fecee359e48cc9d45356/src/createStore.ts#L163)）
- createStoreでstoreを構築したときに引数に与えられるreducerをstoreのcurrentReducerのプロパティに保持させている。（[こちら](https://github.com/reduxjs/redux/blob/db753b13f89861e31749fecee359e48cc9d45356/src/createStore.ts#L135)）
- storeで保持されているreducerは、storeのdispatchメソッド実行時に実行されるように実装されている。（[こちら](https://github.com/reduxjs/redux/blob/db753b13f89861e31749fecee359e48cc9d45356/src/createStore.ts#L267)）
- combineReducersで複数のreducerをcreateStoreの引数として渡すとき、storeのdispatchメソッドが実行されたときに、[こちら](https://github.com/reduxjs/redux/blob/a5680db8f511d4df88183ac5539b6f4460e38cf2/src/combineReducers.ts#L157)のcombinationメソッドがinstal実行されるため、登録したreducerが全て実行されるようになっている。
- react-reduxのuseSelectorメソッドは、stateのkeyにの値としてstore.getStateメソッドの返り値を持つように実装されている。（[こちら](https://github.com/reduxjs/react-redux/blob/master/src/hooks/useSelector.ts#L55)）

### Reduxとは

1箇所で状態管理できるようにするためのライブラリ

→ コンポーネント間でデータのやり取りをややこしくせず、1箇所でデータを全部管理できるようにする。

### Reduxの裏側の仕組み

以下に動き全部載っている。

[Redux Essentials, Part 1: Redux Overview and Concepts | Redux](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)

1. State（状態）からUIを表示する。
2. UIからのイベントでactionCreatorを引数に取ったDispatch（通知）メソッドを実行する。
3. stateから現在の状態を取ってくる。
4. 現在のstateとactionTypeのデータを引数に取ってreducer（何かを変える、変更する）を実行する。
5. stateを更新する。

### ReactとReduxの関係性

- React ⇒ UIを作るためのフレームワーク
- Redux ⇒ Reactで作ったUIの状態として管理したいデータをよしなに管理しやすくしてくれるライブラリ

※ 全くの別物なので、ReactでReduxを使い安くしてくれるライブラリであるReact-Reduxというライブラリを使う。（ReactとReduxを繋げるためのモジュールが入っている。）

### reduxのソースコードを元により深く学習

- [https://github.com/reduxjs/redux/blob/master/src/createStore.ts#L267](https://github.com/reduxjs/redux/blob/master/src/createStore.ts#L267)
- reduxのライブラリ
    - storeはgetState、dispatchメソッドなどを持っている。（[こちら](https://github.com/reduxjs/redux/blob/c3af089fcd105878e47fb40febd5ef9ff3d0b677/src/types/store.ts#L123)）
    - stateとactionは、reducerが持っている。（[こちら](https://github.com/reduxjs/redux/blob/28489afac4ffe9c46d5e1a4679ed1513034fa4d5/src/types/reducers.ts#L29)）
    - combineReducersメソッドで、reducerを1つのオブジェクトにまとめる。以下のfinalReducersが該当している。（finalReducersKeyを使って、reducerを特定できる。）
        
        
    - 正確にはcombineReducersメソッドの返り値はメソッドで、reducersオブジェクト内のすべてのreducerを呼び出して、stateの更新を行えるようにするメソッドである。（[こちら](https://github.com/reduxjs/redux/blob/a5680db8f511d4df88183ac5539b6f4460e38cf2/src/combineReducers.ts#L157)）
    - combineReducersメソッドの返り値を第一引数に取った状態で、createStoreでstoreをインスタンス化する（[こちら](https://github.com/reduxjs/redux/blob/db753b13f89861e31749fecee359e48cc9d45356/src/createStore.ts#L376)）
    - この関数は、オブジェクト形式で渡される複数のリデューサーを結合し、1つのリデューサー関数を返します。これにより、複数の状態を管理することができます。各リデューサーは、Reduxストアの1つの状態プロパティにマップされます。たとえば、`combineReducers({ counter: counterReducer, todos: todosReducer })`というコードでは、`counter`と`todos`という2つの状態が定義され、それぞれの状態を管理するための`counterReducer`と`todosReducer`という2つのリデューサーが提供される。
    - [https://redux.js.org/api/combinereducers](https://redux.js.org/api/combinereducers)
- createStoreメソッド
    - アプリケーションで複数のストアを作成するのはやめましょう!その代わりに、combineReducersを使用して、多くのreducerの中から1つのroot reducerを作成することができるので、root reducerの中にあるreducerを全て実行して、action typeに合うreducerを実行してくれるようになる。
    - stateは[こちら](https://github.com/reduxjs/redux/blob/db753b13f89861e31749fecee359e48cc9d45356/src/createStore.ts#L92)にある通り、reducerのstateを参考に初期化される。
    - `combineReducers`で生成したreducerを使ってcreateStoreした場合、そのkeyの値がstateのkeyに該当するようになる。

        
    
- reducerのcase文でdefault caseがなかったり、stateの初期値がundefinedだとエラーになってしまう原因
    - storeが初期化されるとき、Reduxはダミーアクションをreducerにdispatchして、ストアの初期状態を構築する。その際、第一引数として与えられたstateがundefinedだとエラーが出てしまうため、なんらかの初期状態を必ずセットしないといけない。（[こちら](https://github.com/reduxjs/redux/blob/db753b13f89861e31749fecee359e48cc9d45356/src/createStore.ts#L374)）
        
    
    [https://redux.js.org/api/createstore](https://redux.js.org/api/createstore)
    
- ここまで準備できたら、処理の流れは以下
    - アクションをディスパッチすることで状態の更新をトリガーする。（こちら）
    - アクションを処理するために、Reduxはリデューサーを使用する。
    - 前提として、リデューサーは、現在の状態とアクションを引数に取り、新しい状態を返す純粋な関数です。リデューサーの役割は、アクションが与えられたときに、適切な処理を実行して新しい状態を返す。（combineReducersは複数のreducerとstateを持つ単一のオブジェクトだと認識して良い。）
    - storeのdispatchメソッドは、createStoreの第一引数に渡したreducerに対して、現在のstateとaction typeを添えて呼び出す。（[こちら](https://github.com/reduxjs/redux/blob/db753b13f89861e31749fecee359e48cc9d45356/src/createStore.ts#L288)）
    - `combineReducers`を使用してreducerを生成してcreateStoreの第一引数に渡した場合、[こちら](https://github.com/reduxjs/redux/blob/a5680db8f511d4df88183ac5539b6f4460e38cf2/src/combineReducers.ts#L157)のようなcombinationと命名されたメソッドが第一引数に渡され、[こちら](https://github.com/reduxjs/redux/blob/a5680db8f511d4df88183ac5539b6f4460e38cf2/src/combineReducers.ts#L179)でfinalReducerKeys分だけ繰り返し処理が行われ、`combineReducers`を使用してリデューサーを定義した場合、アクションがディスパッチされるたびに、定義された各リデューサーが呼び出される。
    具体的には、`combineReducers`関数を使用して複数のリデューサーを結合すると、新しいリデューサーが作成されます。この新しいリデューサーは、各リデューサーに対して、各リデューサーが担当する状態の一部を渡す。
    アクションがディスパッチされた場合、ストアは新しいアクションをすべてのリデューサーに渡します。各リデューサーは、アクションのタイプに基づいて、自分が担当する部分の状態を更新します。他のリデューサーが担当する状態は変更されない。
        
        ※ ちなみに以下のようにactionの返り値オブジェクトに自前のkeyを使って、値をセットすることができたりする。（まぁReducerメソッドにactionsの返り値のオブジェクトを渡しているから、オブジェクトに追加できるのはそりゃそう）
        
- react-redux → reactでreduxのdispatchやstateの取得などの実装を楽に実施してくれるためのライブラリ
    - react-reduxでuseDispatchしたときに[こちら](https://github.com/reduxjs/react-redux/blob/master/src/hooks/useDispatch.ts#L28-L30)が呼びされて、返り値にstoreのdispatchメソッドが格納される。
    - react-redux内でstoreは、React.Contextを使って実装されていそう。（うまいことラップしてくれて、contextを意識せずともProvider経由でstoreを取得できるようにしてくれてそう。）[こちら](https://github.com/reduxjs/react-redux/blob/8d03182d36abe91cb0cc883478f3b0c2d7f9e17f/src/hooks/useStore.ts#L12)
    - react-reduxのuseSelectorでは、storeのgetStateメソッドを使ってstateを取得していそう。[こちら](https://github.com/reduxjs/react-redux/blob/master/src/hooks/useSelector.ts#L55)

### Reduxのデータはブラウザのどこに保存されるのか

アプリケーションで初期化しているので、アプリ閉じたらStoreのデータは消える気がする。

### Providerを使ってグローバルで使えるようにする

- Storeに入っているstateも全てのコンポーネントで使うことができるし、Dispatchもできるようになる

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from 'redux';
// Providerには提供者という意味がある
import { Provider } from 'react-redux';
import reducers from './reducers';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
console.dir(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### Stateの値にアクセスする方法

- react-reduxでアクセスできるようになる
- useSelectorでは、[こちら](https://github.com/reduxjs/react-redux/blob/master/src/hooks/useSelector.ts#L55)にある通り返り値のオブジェクトのstateをkeyとしたstore.getStateの返り値を持たせている。
- store.getStateは、[こちら](https://github.com/reduxjs/redux/blob/db753b13f89861e31749fecee359e48cc9d45356/src/createStore.ts#L172)にある通り、storeのcurrentStateを返している。
- currentStateは、dispatchメソッド実行時に[こちら](https://github.com/reduxjs/redux/blob/db753b13f89861e31749fecee359e48cc9d45356/src/createStore.ts#L288)にある通りreducerの実行によって更新される。（このときcurrentReducerに入っている値は、combineReducersの返り値）

```tsx
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
```

### 関連資料
[https://qiita.com/okmttdhr/items/11d72c51faeff13ddfd9#:~:text=Redux Persistは、Reduxの,データ保持を実装できる。](https://qiita.com/okmttdhr/items/11d72c51faeff13ddfd9#:~:text=Redux%20Persist%E3%81%AF%E3%80%81Redux%E3%81%AE,%E3%83%87%E3%83%BC%E3%82%BF%E4%BF%9D%E6%8C%81%E3%82%92%E5%AE%9F%E8%A3%85%E3%81%A7%E3%81%8D%E3%82%8B%E3%80%82)
[Storeの永続化にredux-persistを使う - Qiita](https://qiita.com/yasuhiro-yamada/items/bd86d7c9f35ebb1c1e7c)
[TwitterやSlackのRedux Storeを覗く](https://blog.recruit.co.jp/rls/2019-12-20-dissecting-redux-store/)
[Reduxのdispatchはawait出来るぞ - EY-Office](https://www.ey-office.com/blog_archive/2022/05/13/redux-dispatch-can-await/)
[【入門編】Reduxによる状態管理の仕組みを理解する](https://zenn.dev/jojo/articles/25c10b27783093)
[React-Reduxの動きがよくわからなくなるのでまとめた - Qiita](https://qiita.com/RitaChan/items/07f0cac59e70309571ff)
