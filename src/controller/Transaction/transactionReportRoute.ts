import express from "express"
import { StatmentModule } from "./Statment/statmentModule"
import TransactionModel from "../../model/Models/TransactionModels/transactionModel"
const transactionReportRoute = express.Router()
const transaction = new TransactionModel()
const stmModel = new StatmentModule()

transactionReportRoute.post("/ministatment", async (req, res) => {
  try {
    const { mphone } = req.body
    /* error handling and validation to the request parameters*/
    if (!mphone) {
      throw new Error("Params are required.")
    }
    const payload = await transaction.ministatment(mphone)
    res.send(payload)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

transactionReportRoute.post("/statment_download", async (req, res) => {
  try {
    const { mphone, fromdate, todate } = req.body
    /* error handling and validation to the request parameters*/
    if (!mphone && !todate) {
      throw new Error("Params are required.")
    }
    const payload = await stmModel.genaratePage(mphone, fromdate, todate)
    res.send(payload)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

transactionReportRoute.post("/statment", async (req, res) => {
  try {
    const { mphone, fromdate, todate } = req.body
    /* error handling and validation to the request parameters*/
    if (!mphone && !todate) {
      throw new Error("Params are required.")
    }

    const payload = await transaction.statment(mphone, fromdate, todate)
    res.send(payload)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})
export default transactionReportRoute
