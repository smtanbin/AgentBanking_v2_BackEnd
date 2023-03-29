import express, { Request, Response } from "express"
import authModel from "./authModel"
import authApplication from "./authApplication"
const authRouter = express.Router()

const oauth = new authModel()
const authVerify = new authApplication()

/* This is an endpoint that listens to POST requests on the "/check" route. When a request is received, it first extracts the "username" parameter from the request body. It then performs some error handling and validation to ensure that the "username" parameter is not empty and is a string.

After validating the parameter, it calls the "check" function of the "oauth" object with the "username" parameter and waits for the function to return. The result returned from the function is then sent back as the response to the original request.

If an error occurs during the execution of the endpoint, it will be caught in the "catch" block, logged to the console, and an HTTP 500 response with an error message will be sent back to the client.*/

authRouter.post("/userCheck", async (req, res) => {
  try {
    const { username } = req.body
    /* error handling and validation to the request parameters*/
    if (!username) {
      res.status(500).json("Error: User not found")
    }
    /* check to ensure that username is a string before passing it to oauth.get() function.*/
    if (typeof username !== "string") {
      res.status(500).json("Error: Invalid parameters type must be a string")
    }
    const result = await oauth.check(username)
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).json("Error: " + err)
  }
})

authRouter.post("/auth", async (req, res) => {
  try {
    const { username, password } = req.body
    /* error handling and validation to the request parameters*/
    if (!username) {
      res.status(500).json("Error: Username are required")
      return
    }
    const userCheck: boolean = await oauth.check(username)
    if (!userCheck) {
      res.status(500).json("Error: User not found")
      return
    }

    if (!password) {
      res.status(500).json("Error: Password are required")
      return
    }

    /* check to ensure that username is a string before passing it to oauth.get() function.*/
    if (typeof username !== "string" && typeof password !== "string") {
      res.status(500).json("Error: Invalid parameters type must be a string")
      return
    }

    const verified: boolean = await oauth.verify(username, password)
    if (!verified) {
      res.status(500).json("Error: password not match")
      return
    }

    const userInfo: any = await oauth.user(username)
    const { USERNAME, ROLEID }: any = userInfo[0]

    // Generate JWT token with expiration time and refresh token
    let token: string = "undefined"
    let refreshToken: string = "undefined"
    try {
      token = await authVerify.IssueToken(USERNAME, ROLEID)
      refreshToken = await authVerify.IssueRefrashToken(USERNAME)
    } catch (e) {
      console.error(`Error in authRouter.ts "/auth". Error: ${e}`)
      return e
    }

    if (token == "undefined" && refreshToken == "undefined")
      return "Reciving Empty Token String"

    // Store refresh token in database or cache
    const refresh_ststus = await oauth.storeRefreshToken(refreshToken, username)
    if (!refresh_ststus) {
      res.status(500).json("Error: unable to store refresh token")
      return
    }
    // Send token and refresh token as response, along with a cookie
    res.cookie("auth_token", token, { httpOnly: true, secure: true })
    res.json({ token, refreshToken })
  } catch (err) {
    console.error("Error: " + err)
    res.status(500).json("Error: " + err)
    return
  }
})

authRouter.post("/tokenValid", async (req, res) => {
  const authHeader = req.headers["authorization"]
  const token: any = authHeader && authHeader.split(" ")[1]
  try {
    if (!token) {
      res.status(404).json("Error: Token not found")
    }
    try {
      const tokenStatus: boolean = await authVerify.TokenCheck(token)
      if (tokenStatus) {
        res.status(200).json({ massage: tokenStatus })
      }
    } catch (err) {
      res.status(500).json({ massage: err })
    }
  } catch (err) {
    console.error("Error in Token Verification: ", err)
    res.status(500).json("Error in Token Verification: " + err)
  }
})
authRouter.post("/refrashToken", async (req, res) => {
  const authHeader = req.headers["authorization"]
  const token: any = authHeader && authHeader.split(" ")[1]

  const { refreshToken } = req.body
  try {
    if (!refreshToken) {
      res.status(404).json("Error: Token not found")
    }
    try {
      const tokenStatus: string = await authVerify.RefrashTokenCheck(
        token,
        refreshToken
      )
      if (tokenStatus) {
        res.status(200).json({ token: tokenStatus })
      }
    } catch (err) {
      res.status(500).json({ massage: err })
    }
  } catch (err) {
    console.error("Error in Token Verification: ", err)
    res.status(500).json("Error in Token Verification: " + err)
  }
})

export default authRouter
