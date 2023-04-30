<<<<<<< HEAD
import express from "express"
import FunTables from "../../model/dashboardModel/FunTables"

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
    const result = await tableData.TransductionEvents()
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

export default tableDataRouter
=======
import express from "express"
import FunTables from "../../model/Models/DashboardModel/FunTables"

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
    const result = await tableData.TransductionEvents()
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

export default tableDataRouter
>>>>>>> bcc3b103a25ef8f5fa2d9e3957df0b66c19015a9
