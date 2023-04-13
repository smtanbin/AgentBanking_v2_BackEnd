import express from "express"
import fs from "fs"
import path from "path"
import cors from "cors"
import cookieParser from "cors"
import controller from "./src/controller/controller"
import { createClient } from "./src/model/oracleClient"

const app: express.Express = express()

const corsOptions: cors.CorsOptions = {
  origin: "*", // change this to a specific origin in production
  optionsSuccessStatus: 200,
}

// Functions
const runDB = async () => {
  const client = createClient()
}

// Lazy Loading
const lazy = async () => {
  const bodyParser: any = await import("body-parser")
  app.use(bodyParser.json())
}
lazy()

app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/api", controller)
app.use(express.static(path.join(__dirname, "./public")))
app.use("/*", express.static(path.join(__dirname, "./public/index.html")))

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send("Page not found.")
  }
)

const configPath = path.join(__dirname, "./config.json")
const config = JSON.parse(fs.readFileSync(configPath, "utf8"))

let port: any = null

if (config.server.port) {
  port = config.server.port
} else {
  port = process.env.PORT
}

app.listen(port, () => {
  runDB()
  console.log(`Server is listening on port: ${port}`)
})
