<<<<<<< HEAD
import express, { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import cors from "cors"

// Other controllers
import authRouter from "./Auth/authRouter"
import JWTVerifyToken from "./Middleware/jwtMiddleware"
import chartsDataRouter from "./DashboardData/chartRouter"
import tableDataRouter from "./DashboardData/tableDataRouter"
import customerRouter from "./Customer/customerRouter"
import eftReportRouter from "./eftReports/eftReportRouter"
import notificationRouter from "./Notification/notificationRouter"
import transactionReportRoute from "./Transaction/transactionReportRoute"
import reportRouter from "./Reports"
import massgaeRoute from "./Massage/MassageRoute"

const controller = express.Router() // create an instance of express controller

const corsOptions: cors.CorsOptions = {
  origin: "*", // change this to a specific origin in production
  optionsSuccessStatus: 200,
}

controller.use(cors(corsOptions))
controller.use(bodyParser.json())

// middleware
controller.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  res.header("Access-Control-Allow-Methods", ["GET", "POST", "PATCH", "DELETE"])
  next()
})

// controller.use(
//   "/*",
//   async (req: Request, res: Response, next: NextFunction) => {
//     console.log("Authorization: ", req.headers.authorization)
//     console.log(req.baseUrl + " Body: ", req.body)
//     next()
//   }
// )

controller.use("/login", authRouter)

// controller.use("*", async (req: Request, res: Response, next: NextFunction) => {
//   console.log("Route Requested: ", req.baseUrl)
//   next()
// })
controller.use("/*", JWTVerifyToken)
// Dashboard
controller.use("/dashboard/charts", chartsDataRouter)
controller.use("/dashboard/tables", tableDataRouter)

// Routers
controller.use("/trReportRoute", transactionReportRoute)
controller.use("/notification", notificationRouter)
controller.use("/customer", customerRouter)
controller.use("/reports", reportRouter)
controller.use("/eft", eftReportRouter)
controller.use("/massageLog", massgaeRoute)

controller.get("/", async (req: Request, res: Response) => {
  const date = new Date(Date.now())
  res.send("Server Time" + date)
})

controller.use("/*", async (req: Request, res: Response) => {
  res.status(404).json({ Error: "Invalid Address" })
})

export default controller
=======
import express, { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import cors from "cors"

// Other controllers
import authRouter from "./auth/authRouter"
import JWTVerifyToken from "./middleware/jwtMiddleware"
import chartsDataRouter from "./dashboardData/chartRouter"
import tableDataRouter from "./dashboardData/tableDataRouter"
import customerRouter from "./customer/customerRouter"
import eftReportRouter from "./eftReports/eftReportRouter"
import notificationRouter from "./Notification/notificationRouter"
import transactionReportRoute from "./Transaction/transactionReportRoute"
import reportRouter from "./reports"

const controller = express.Router() // create an instance of express controller

const corsOptions: cors.CorsOptions = {
  origin: "*", // change this to a specific origin in production
  optionsSuccessStatus: 200,
}

controller.use(cors(corsOptions))
controller.use(bodyParser.json())

// middleware
controller.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  res.header("Access-Control-Allow-Methods", ["GET", "POST", "PATCH", "DELETE"])
  next()
})

// controller.use(
//   "/*",
//   async (req: Request, res: Response, next: NextFunction) => {
//     console.log("Authorization: ", req.headers.authorization)
//     console.log(req.baseUrl + " Body: ", req.body)
//     next()
//   }
// )

controller.use("/login", authRouter)

// controller.use("*", async (req: Request, res: Response, next: NextFunction) => {
//   console.log("Route Requested: ", req.baseUrl)
//   next()
// })
controller.use("/*", JWTVerifyToken)
// Dashboard
controller.use("/dashboard/charts", chartsDataRouter)
controller.use("/dashboard/tables", tableDataRouter)

// Routers
controller.use("/trReportRoute", transactionReportRoute)
controller.use("/notification", notificationRouter)
controller.use("/customer", customerRouter)
controller.use("/reports", reportRouter)
controller.use("/eft", eftReportRouter)

controller.get("/", async (req: Request, res: Response) => {
  const date = new Date(Date.now())
  res.send("Server Time" + date)
})

controller.use("/*", async (req: Request, res: Response) => {
  res.status(404).json({ Error: "Invalid Address" })
})

export default controller
>>>>>>> bcc3b103a25ef8f5fa2d9e3957df0b66c19015a9
