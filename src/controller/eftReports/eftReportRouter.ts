import express from "express"
import EftReportModel from "./eftModel"
import { Response } from "express-serve-static-core"
import { eftReportApp } from "./eftApp"
import { compareNames } from "./eftApp"
import { randomUUID } from "crypto"

import pdf from "html-pdf"
import { capitalizeWords } from "../../lib/Letter"

const eftReportRouter = express.Router()

const eft = new EftReportModel()

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
        ABS_AC_TITEL: ABS_AC_TITEL.toUpperCase(),
        ACTNUM,
        AMOUNT,
        HONOURED: HONOURED === "Y" ? "Honoured" : "Pending",
        NOTE: capitalizeWords(NOTE),
        ORIG_BANK_NAME: capitalizeWords(ORIG_BANK_NAME),
        ORIG_BRANCH_NAME: capitalizeWords(ORIG_BRANCH_NAME),
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

eftReportRouter.get("/test", async (req, res) => {
  const html = await eftReportApp()
  res.send(html)
})

eftReportRouter.get("/report*", async (req, res) => {
  const html = await eftReportApp()
  const filename = `${randomUUID()}.pdf`
  const options: object = {
    format: "A4",
    margin: {
      top: "2cm",
      right: "2cm",
      bottom: "2cm",
      left: "2cm",
    },
  }

  try {
    pdf.create(html, options).toStream(
      (
        err: any,
        stream: {
          pipe: (arg0: Response<any, Record<string, any>, number>) => void
        }
      ) => {
        res.type("pdf")
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${filename}"`
        )
        stream.pipe(res)
      }
    )
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

export default eftReportRouter
