import express from "express"
import jwt_decode from "jwt-decode"
import EftReportModel from "../../model/Models/eftModel/eftModel"
import { fuzzy } from "fast-fuzzy"
import { capitalizeWords } from "../../lib/Letter"
import { eftgenaratePage } from "./eftgenaratePage"

const eftReportRouter = express.Router()

const eft = new EftReportModel()

const fuzzyHelper = (str1: string, str2: string): string => {
  const matchScore = fuzzy(str1, str2, { normalizeWhitespace: true })
  const percentScore = Math.round(matchScore * 100)
  return percentScore.toString() + "%"
}

eftReportRouter.get("/summery", async (req, res) => {
  try {
    const result = await eft.sum()
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

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
        match: fuzzyHelper(row.ABS_AC_TITEL, row.RECIVER),
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

eftReportRouter.get("/report*", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"]
    const token: any = authHeader && authHeader.split(" ")[1]
    const decoded: any = jwt_decode(token)
    const pdf = await eftgenaratePage(decoded.username)
    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", "attachment; filename=example.pdf")
    res.send(pdf)
  } catch (err: any) {
    res.status(500).send("Error: " + err)
    throw Error(err)
  }
})

export default eftReportRouter
