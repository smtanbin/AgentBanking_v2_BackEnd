import jwt from "jsonwebtoken"
import path from "path"
import fs from "fs"

export default class authApplication {
  IssueToken(USERNAME: string, ROLEID: string) {
    return new Promise<string>((resolve, reject) => {
      const configPath = path.join(__dirname, "config.json") //config file
      const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
      const jwtConfig = config.server.security
      const jkey = jwtConfig.jkey || process.env.JKEY
      try {
        const token = jwt.sign(
          { username: USERNAME, roll: ROLEID, refresh: true },
          jkey
          // {
          //   expiresIn: 3000,
          // }
        )
        resolve(token)
      } catch (e) {
        reject({ error: e })
      }
    })
  }
  IssueRefrashToken(USERNAME: string) {
    return new Promise<string>((resolve, reject) => {
      const configPath = path.join(__dirname, "config.json") //config file
      const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
      const jwtConfig = config.server.security
      try {
        const token = jwt.sign(
          { username: USERNAME },
          jwtConfig.rkey || process.env.RKEY!
          // {
          //   expiresIn: jwtConfig.refrash_expires || process.env.RKEY_EXPIRES!,
          // }
        )
        resolve(token)
      } catch (e) {
        reject({ error: e })
      }
    })
  }

  TokenCheck(token: string) {
    return new Promise<boolean>((resolve, reject) => {
      const configPath = path.join(__dirname, "config.json") //config file
      const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
      const jwtConfig = config.server.security
      const jkey = jwtConfig.jkey || process.env.JKEY

      jwt.verify(token, jkey!, (err: jwt.VerifyErrors | null, user: any) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            reject(false)
          }
          console.error("user :", user, "error :", err.message)
          reject(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  RefrashTokenCheck(token: string, refreshToken: string) {
    return new Promise<any>((resolve, reject) => {
      const configPath = path.join(__dirname, "config.json") //config file

      const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
      const jwtConfig = config.server.security
      console.log("jwtConfig", jwtConfig)
      const jkey = jwtConfig.rkey || process.env.RKEY

      const _token: any = jwt.decode(token)

      jwt.verify(
        refreshToken,
        jkey!,
        (err: jwt.VerifyErrors | null, user: any) => {
          if (err) {
            if (err.name === "TokenExpiredError") {
              reject("Token_Expired")
            }
            reject("Token Error")
          } else {
            try {
              const newToken: any = this.IssueToken(
                _token.username,
                _token.roll
              )
              resolve(newToken)
            } catch (e) {
              reject(e)
            }
          }
        }
      )
    })
  }
}
