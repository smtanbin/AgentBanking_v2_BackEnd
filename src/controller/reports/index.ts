import express from "express"
import remittanceReportRoute from "./remittanceReportRoute"

const reportRouter = express.Router()
reportRouter.use("/remittance", remittanceReportRoute)

export default reportRouter
