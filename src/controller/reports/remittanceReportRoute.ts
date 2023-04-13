import express from "express"
import Remittance from "../../model/Models/reportModel/remittance/remittanceModel"
const remittanceReportRoute = express.Router()
const remittance = new Remittance()

remittanceReportRoute.post("/summary", async (req, res) => {
  try {
    const { fromdate, todate } = req.body
    /* error handling and validation to the request parameters*/
    if (!fromdate && !todate) {
      throw new Error("Params are required.")
    }
    const payload = await remittance.remittancesummary(fromdate, todate)
    res.send(payload)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

remittanceReportRoute.get("/houselist", async (req, res) => {
  try {
    const { fromdate, todate } = req.body
    /* error handling and validation to the request parameters*/
    if (!fromdate && !todate) {
      throw new Error("Params are required.")
    }
    const payload = await remittance.remittancehouselist()
    res.send(payload)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

remittanceReportRoute.post("/report", async (req, res) => {
  try {
    const { fromdate, todate } = req.body
    /* error handling and validation to the request parameters*/
    if (!fromdate && !todate) {
      throw new Error("Params are required.")
    }
    const payload = await remittance.remittanceReport(fromdate, todate)
    res.send(payload)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

remittanceReportRoute.get("/requestList", async (req, res) => {
  try {
    const { fromdate, todate } = req.body
    /* error handling and validation to the request parameters*/
    if (!fromdate && !todate) {
      throw new Error("Params are required.")
    }
    const payload = await remittance.remittanceRequestList()
    res.send(payload)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

export default remittanceReportRoute
