import { useState, useContext } from "react"
import qs from "qs"
import axios from "axios"
import { encode } from "base-64"
import Cookies from "universal-cookie"
// Elements
import logo from "../../assets/img/logo.svg"
import Animation from "./Animation/Animation"
import { AuthContext } from "../../Context/AuthContext"

const apiUrl = import.meta.env.VITE_API_URL

export default function LoginUI() {
  const cookies = new Cookies()

  const [username, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [errorClass, setErrorClass] = useState("")
  const authInfo = useContext(AuthContext)
  const updateAuth = authInfo.updateAuth

  /* axios*/
  const data = qs.stringify({
    password: password,
    userid: username,
  })
  const config = {
    method: "post",
    url: apiUrl + "/api/login/oauth",
    headers: {
      Accept: "*/*",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `"Basic "${encode(username + ":" + password)}`,
    },
    data: data,
  }

  const networkRequest = () => {
    return axios(config)
      .then(({ data }) => {
        console.log("Token =>", data)
        cookies.set("auth", data, { path: "/" })
        updateAuth()
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          console.log("Invalid Password")
          alert("Invalid Password")
          setErrorClass("has-error")
        } else {
          alert(err)
        }
      })
  }

  const handelUser = (e) => setUser(e.target.value)
  const handelPassword = (e) => setPassword(e.target.value)
  const removeError = (e) => setErrorClass()
  const handleEnterKey = (e) => {
    if (e.key === "Enter") networkRequest()
  }

  return (
    <div className="container" onClick={removeError} onKeyDown={handleEnterKey}>
      <div className="divider m-5x grid-lg">
        <div className="columns container">
          <div
            className="column col-8 col-lg-6 hide-md 
"
          >
            <Animation />
            {/* <img
              src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg"
              className=" container"
              alt=""
            /> */}
          </div>
          <div className="column col-lg-6 col-4 p-5x grid-lg p-centered material-shadow-v2 rounded">
            <img src={logo} className="col-6 p-centered img-responsive" />
            <br />
            <div className={`form-group column col-12 ${errorClass}`}>
              <label className="form-label">username Name</label>
              <input
                className="form-input rounded"
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => handelUser(e)}
              />
              <label className="form-label">Password</label>
              <input
                className="form-input rounded"
                type="password"
                placeholder="Name"
                value={password}
                onChange={(e) => handelPassword(e)}
              />
              <br />
              <label className="form-checkbox">
                <input type="checkbox" />
                <i className="form-icon"></i> Remember me
              </label>
              <br />
            </div>
            <div className="form-group column col-12">
              <button
                className={`btn shadow-25 rounded col-12 px-2 ${
                  errorClass ? "btn-error" : "btn-primary"
                }`}
                onClick={() => networkRequest()}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
