import express from "express"
import eftReportModel from "./eftModel"
import { Response } from "express-serve-static-core"
import { eftReportApp } from "./eftApp"
import { compareNames } from "./eftApp"

const pdf = require("html-pdf")

const eftReportRouter = express.Router()

const eft = new eftReportModel()

eftReportRouter.get("/summery", async (req, res) => {
  try {
    const result = await eft.sum()
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})
// eftReportRouter.get("/list", async (req, res) => {
//   try {
//     const result = await eft.list()
//     res.send(result)
//   } catch (err) {
//     console.error(err)
//     res.status(500).send("Error: " + err)
//   }
// })

eftReportRouter.get("/list", async (req, res) => {
  try {
    const result = await eft.list()

    const indexedResult = result.map((row: any, index: number) => {
      const {
        ABS_AC_TITEL,
        ACTNUM,
        AMOUNT,
        HONOURED,
        NOTE,
        ORIG_BANK_NAME,
        ORIG_BRANCH_NAME,
        RECIVER,
        SENDER,
      } = row
      return {
        ABS_AC_TITEL,
        ACTNUM,
        AMOUNT,
        HONOURED,
        NOTE,
        ORIG_BANK_NAME,
        ORIG_BRANCH_NAME,
        RECIVER,
        SENDER,
        index: index + 1,
        match: compareNames(row.ABS_AC_TITEL, row.RECIVER),
      }
    })
    res.send(indexedResult)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

eftReportRouter.get("/return", async (req, res) => {
  try {
    const result = await eft.return()
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

eftReportRouter.get("/report.pdf", async (req, res) => {
  try {
    const html = await eftReportApp()
    const options = {
      format: "A4",
      margin: {
        top: "2cm",
        right: "2cm",
        bottom: "2cm",
        left: "2cm",
      },
    }

    pdf.create(html, options).toStream(
      (
        err: any,
        stream: {
          pipe: (arg0: Response<any, Record<string, any>, number>) => void
        }
      ) => {
        if (err) return res.send(err)
        res.type("pdf")
        stream.pipe(res)
      }
    )
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

export default eftReportRouter
