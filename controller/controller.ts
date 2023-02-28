import express, { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import cors from "cors"

// Other controllers
import customercontroller from "./customer/customerRouter"

const controller = express.Router() // create an instance of express controller

const corsOptions: cors.CorsOptions = {
  origin: "*", // change this to a specific origin in production
  optionsSuccessStatus: 200,
}

controller.use(cors(corsOptions))
controller.use(bodyParser.json())
controller.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  res.header("Access-Control-Allow-Methods", ["GET", "POST", "PATCH", "DELETE"])
  next()
})

controller.use("/customer", customercontroller)

controller.get("/", async (req: Request, res: Response) => {
  res.json("Welcome to Restful API Power by Tanbin Hassan Bappi")
})

controller.use("/*", async (req: Request, res: Response) => {
  res.status(404).json({ Error: "Invalid Address" })
})

export default controller
