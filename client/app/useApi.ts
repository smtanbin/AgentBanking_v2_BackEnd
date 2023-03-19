import axios from "axios"
const _url = "http://10.140.8.126:3000"

interface responseData {
  status: number
  response: {
    token: string
    refreshToken: string
  }
}

class Api {
  auth: any
  constructor(auth: any) {
    // Save the auth object as an instance variable
    this.auth = auth
  }

  // Define the useApi method
  useApi = (type = "GET", path: string, data: any = null) => {
    return new Promise<any>(async (resolve, reject) => {
      const { token, login } = this.auth
      console.log("api input: ", type, path, data)

      if (!token) {
        throw new Error("No token found")
      }
      if (!path) {
        throw new Error("No path found")
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.token,
      }

      try {
        const response: any = await axios({
          method: type,
          url: _url + "/api" + path,
          data,
          headers,
        })
        if (response.status === 401) {
          const _token = await this.useRefreshToken(login, token)
          if (_token) {
            const headers = {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token.token,
            }
            const response: any = await axios({
              method: type,
              url: _url + "/api/" + path,
              data,
              headers,
            })
            console.log("api reply: ", response.data)
            resolve(response.data)
          } else {
            reject("Token Error R")
          }
        } else {
          resolve(response.data)
        }
      } catch (error) {
        console.error("Error generated in NetworkRequest", error)
        reject(error)
      }
    })
  }

  // Define the useLogin method
  useLogin = (data: any) => {
    return new Promise<responseData>(async (resolve, reject) => {
      const headers = {
        "Content-Type": "application/json",
      }
      try {
        const response: any = await axios({
          method: "POST",
          url: _url + "/api/login/auth",
          data,
          headers,
        })

        resolve({ status: response.status, response: response.data })
      } catch (error) {
        reject({
          status: error.response.status,
          response: error.response.data,
        })
      }
    })
  }

  // Define the useRefreshToken method
  useRefreshToken = (
    login: (arg0: { token: any; refreshToken: any }) => void,
    token: { token: string; refreshToken: any }
  ) => {
    return new Promise<boolean>(async (resolve, reject) => {
      if (token.token && token.refreshToken) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
        }

        const data = { refreshToken: token.refreshToken }

        try {
          const response: any = await axios({
            method: "POST",
            url: _url + "/api/login/refrashToken",
            data: data,
            headers,
          })
          if (response.status === 200) {
            const { token } = response.data
            login({ token: token, refreshToken: token.refreshToken })
            resolve(true)
          } else {
            console.log("Error" + response)
            reject(false)
          }
        } catch (error) {
          reject(error)
        }
      } else {
        reject("No token found")
      }
    })
  }
}

export default Api
