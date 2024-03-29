import { Route, Routes } from "react-router-dom"
import { getPagesData } from "./getPagesData"

const Router = ({ stripePromise }: { stripePromise: any }) => {
  const pagesData = getPagesData(stripePromise)
  const pageRoutes = pagesData.map((pageRoute, index) => {
    return <Route key={index} {...pageRoute} />
  })

  return <Routes>{pageRoutes}</Routes>
}

export default Router
