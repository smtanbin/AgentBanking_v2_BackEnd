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
      const { token } = this.auth
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
        resolve(response.data)
      } catch (error: any) {
        if (error.response.status === 401) {
          console.log("401 found")
          const _token = await this.useRefreshToken()
          if (_token) {
            const headers = {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token.token,
            }
            const response: any = await axios({
              method: type,
              url: _url + "/api" + path,
              data,
              headers,
            })

            console.log("api reply: ", response.data)
            resolve(response.data)
          } else {
            reject("Token Error R")
          }
        } else {
          console.error("Error in useApi ,Path:" + path + " Error: ", error)
          reject(error)
        }
      }
    })
  }

  // Define the useApi method
  useBlopApi = (
    type = "GET",
    path: string,
    content: string = "pdf",
    data: any = null
  ) => {
    return new Promise<any>(async (resolve, reject) => {
      const { token } = this.auth
      if (!token) {
        throw new Error("No token found")
      }
      if (!path) {
        throw new Error("No path found")
      }
      const headers = {
        "Content-Type": `application/${content}`,
        Authorization: "Bearer " + token.token,
      }
      try {
        const response: any = await axios({
          method: type,
          responseType: "blob",
          url: _url + "/api" + path,
          data,
          headers,
        })
        resolve(response.data)
      } catch (errorL: any) {
        if (errorL.response.status === 401) {
          const _token = await this.useRefreshToken()
          if (_token) {
            const headers = {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token.token,
            }
            const response: any = await axios({
              method: type,
              responseType: "blob",
              url: _url + "/api" + path,
              data,
              headers,
            })

            console.log("api reply: ", response.data)
            resolve(response.data)
          } else {
            reject("Token Error R")
          }
        } else {
          console.error("Error in useApi ,Path:" + path + " Error: ", errorL)
          reject(errorL)
        }
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
      } catch (error: any) {
        reject({
          status: error.response.status,
          response: error.response.data,
        })
      }
    })
  }

  // Define the useRefreshToken method
  useRefreshToken = () => {
    return new Promise<boolean>(async (resolve, reject) => {
      const { login, token } = this.auth

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
          const { token } = response.data
          login({ token: token, refreshToken: this.auth.token.refreshToken })
          resolve(true)
        } catch (error: any) {
          console.log("Error in useRefreshToken " + error.response)
          reject(error)
        }
      } else {
        reject(
          "Error orgin useRefreshToken: No token found" +
            token.token +
            " ,Refrash " +
            token.refreshToken
        )
        this.auth.logout()
      }
    })
  }
}

export default Api
