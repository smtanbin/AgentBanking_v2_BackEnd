<<<<<<< HEAD
import React from "react"
import { Routes, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import LoginUI from "../views/Login/Login"
import ErrorPage from "../views/error-page"
import LoadingPage from "../views/LoadingPage"
import Home from "../views/Home/Home"
import PenadingEftList from "../views/Components/Applications/PenadingEftList/PenadingEftList"
import DynamicCustomer from "../views/Components/Registration/DynamicCustomer"
import MassageLog from "../views/Components/Applications/MassageLog/MassageLog"

const RootRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute children={undefined} />}>
                <Route path="/" element={<Home />} />
                {/* <Route path="/home" element={<Home />} /> */}

                <Route path="/Reports/EftList" element={<PenadingEftList />} />
                <Route path="/MassageLog" element={<MassageLog />} />
                <Route path="/customer/:id" element={<DynamicCustomer />} />
            </Route>
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/login" element={<LoginUI />} />
            {/* <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
    )
}
export default RootRouter
=======
import React from "react"
import { Routes, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import LoginUI from "../views/Login/Login"
import ErrorPage from "../views/error-page"
import LoadingPage from "../views/LoadingPage"
import Home from "../views/Home/Home"
import PenadingEftList from "../views/Components/Applications/PenadingEftList/PenadingEftList"
import DynamicCustomer from "../views/Components/Registration/DynamicCustomer"

const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute children={undefined} />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}

        <Route path="/Reports/EftList" element={<PenadingEftList />} />
        <Route path="/customer/:id" element={<DynamicCustomer />} />
      </Route>
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/login" element={<LoginUI />} />
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
  )
}
export default RootRouter
>>>>>>> 1f6de8d40a045e02159cbb47d8c4198fffa9cd84
