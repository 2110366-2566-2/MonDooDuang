import "./App.css"
import { BrowserRouter } from "react-router-dom"
import Router from "./routes/router"
import { Provider } from "react-redux"
import store from "./redux/store"

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  )
}

export default App
