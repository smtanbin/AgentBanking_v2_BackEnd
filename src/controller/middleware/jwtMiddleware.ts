import { Request, Response, NextFunction } from "express"
import authApplication from "../auth/authApplication"
const authVerify = new authApplication()

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

const JWTVerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"]
  const token: any = authHeader && authHeader.split(" ")[1]
  if (!token) {
    console.log("token", token)
    return res.status(401).send({ message: "Access token not found" })
  }
  try {
    const status = await authVerify.TokenCheck(token)
    if (status) {
      console.log("Verification Success")
      next()
    } else {
      return res.status(401).json({ message: "token_not_valid" })
    }
  } catch (e) {
    return res.status(401).json({ message: "token_not_valid" })
  }
}

export default JWTVerifyToken
