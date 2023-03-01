import jwt from "jsonwebtoken"
import path from "path"
import fs from "fs"
import { Request, Response, NextFunction } from "express"

interface User {
  username: string
}

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

const JWTVerifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Access token not found" })
  }

  const configPath = path.join(__dirname, "../../", "config.json") //config file
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
  const jwtConfig = config.server.security

  const jkey = jwtConfig.jkey || process.env.JKEY

  jwt.verify(token, jkey!, (err: jwt.VerifyErrors | null, user: any) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
          return res.status(401).json({ message: "Refresh token not found" })
        }

        jwt.verify(
          refreshToken,
          jwtConfig.refrash_key || process.env.JWT_REFRESH_SECRET!,
          (err: jwt.VerifyErrors | null, user: any) => {
            if (err) {
              return res.status(403).json({ message: "Invalid refresh token" })
            }

            const newToken = jwt.sign(
              { username: user.username },
              jwtConfig.jkey || process.env.JWT_SECRET!,
              {
                expiresIn: jwtConfig.expires || process.env.JWT_EXPIRES_IN!,
              }
            )
            const newRefreshToken = jwt.sign(
              { username: user.username },
              jwtConfig.refrash_key || process.env.JWT_REFRESH_SECRET!,
              {
                expiresIn:
                  jwtConfig.refrash_expires ||
                  process.env.JWT_REFRESH_EXPIRES_IN!,
              }
            )

            res.cookie("accessToken", newToken, { httpOnly: true })
            res.cookie("refreshToken", newRefreshToken, { httpOnly: true })
            req.user = user
            next()
          }
        )
      } else {
        return res.status(403).json({ message: "Invalid access token" })
      }
    } else {
      req.user = user
      next()
    }
  })
}

export default JWTVerifyToken
