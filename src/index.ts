import express from "express"
import fs from "fs"
import path from "path"
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from "cookie-parser"
import controller from "../controller/controller"
import { createClient } from "../model/oracleClient"
const app: express.Express = express()

const corsOptions: cors.CorsOptions = {
  origin: "*", // change this to a specific origin in production
  optionsSuccessStatus: 200,
}

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(cookieParser())
console.log(path.join(__dirname, "../public"))
app.use(express.static(path.join(__dirname, "../public")))

app.use("/api", controller)

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send("Page not found.")
  }
)

async function runDB() {
  const client = await createClient()
  // Use the client to interact with the database
}

const configPath = path.join(__dirname, "../config.json")
const config = JSON.parse(fs.readFileSync(configPath, "utf8"))

if (config.server.port) {
  const port: any = config.server.port
  app.listen(port, () => {
    runDB()
    console.log(`Server is listening on port: ${port}`)
  })
} else {
  console.log("'config.json' file not found. or port not specified.")
}
