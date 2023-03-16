import React from "react"
import { Routes, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import LoginUI from "../views/Login/Login"
import ErrorPage from "../views/error-page"
import LoadingPage from "../views/LoadingPage"
import Home from "../views/Home/Home"
import EftList from "../views/Components/Reports/EftList"

const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute children={undefined} />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}

        <Route path="/Reports/EftList" element={<EftList />} />
      </Route>
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/login" element={<LoginUI />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
export default RootRouter
