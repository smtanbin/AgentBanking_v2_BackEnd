import express from "express"
import ChartsData from "./model/FunChart"

const chartRouter = express.Router()
const charts = new ChartsData()

chartRouter.get("/balanceChart", async (req, res) => {
  try {
    const result = await charts.balanceChart()
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})
chartRouter.get("/TotalDebitCreditPrevious", async (req, res) => {
  try {
    const result = await charts.TotalDebitCreditPrevious()
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})
chartRouter.get("/TotalDebitCreditCurrent", async (req, res) => {
  try {
    const result = await charts.TotalDebitCreditCurrent()
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

export default chartRouter
