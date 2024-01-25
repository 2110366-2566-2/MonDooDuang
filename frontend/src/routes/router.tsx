import { Route, Routes } from "react-router-dom"
import pagesData from "./pagesData"

const Router = () => {
  const pageRoutes = pagesData.map((pageRoute) => {
    return <Route {...pageRoute} />
  })

  return <Routes>{pageRoutes}</Routes>
}

export default Router
