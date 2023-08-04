import "./App.css";
import Header from "./components/Header";
import CommerceCart from "./components/CommerceCart";
import CommerceProducts from "./components/CommerceProducts";
import { Provider } from "react-redux"
import { store } from "./stores/store"

store.subscribe(() => {
  console.log(store.getState());
})

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <CommerceProducts />
        <CommerceCart />
      </div>
    </Provider>
  )
}

export default App
