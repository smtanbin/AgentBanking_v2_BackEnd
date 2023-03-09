import express from "express"
import FunTables from "./model/FunTables"

const tableDataRouter = express.Router()

const tableData = new FunTables()

tableDataRouter.get("/pendingEvent", async (req, res) => {
  try {
    const result = await tableData.PendingEvent()
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})
tableDataRouter.get("/event", async (req, res) => {
  try {
    const result = await tableData.Events()
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

export default tableDataRouter
