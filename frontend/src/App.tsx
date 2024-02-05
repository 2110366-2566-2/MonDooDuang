import "./App.css"
import { BrowserRouter } from "react-router-dom"
import Router from "./routes/router"
import { Provider } from "react-redux"
import store from "./redux/store"
import { useEffect, useState } from "react"
import { Stripe, loadStripe } from "@stripe/stripe-js"
import { StripeService } from "./common/services/StripeService"

const App = () => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)

  useEffect(() => {
    const getPublicKey = async () => {
      const publishableKey = await StripeService.getPublishableKey()
      setStripePromise(loadStripe(publishableKey))
    }
    getPublicKey()
  }, [StripeService, setStripePromise, loadStripe])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router stripePromise={stripePromise} />
      </BrowserRouter>
    </Provider>
  )
}

export default App
