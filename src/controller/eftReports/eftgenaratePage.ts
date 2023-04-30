<<<<<<< HEAD
import handlebars from "handlebars"
import path from "path"
import fs from "fs"
import { fuzzy } from "fast-fuzzy"
import generateQRCodeData from "../../lib/generateQRCodeData"
import puppeteer from "puppeteer"
import EftReportModel from "../../model/eftModel/eftModel"
const eft: any = new EftReportModel()

// Define a wrapper function that calls the fuzzy function with the provided arguments
const fuzzyHelper = (str1: string, str2: string): string => {
  const matchScore = fuzzy(str1, str2, { normalizeWhitespace: true })
  const percentScore = Math.round(matchScore * 100)
  return percentScore.toString() + "%"
}

export const eftgenaratePage = async (user: string) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const d: any = new Date(Date.now())
      const date: any = { date: d, user: user }
      // Getting Summery
      const summeryData: any = await eft.sum()
      // Processing Summery
      const summery = summeryData
      summeryData.summery = summery

      // Getting Summery total
      const sumTotal: any = {
        total: summeryData
          .reduce((acc: any, curr: any) => acc + curr.SUM, 0)
          .toFixed(2),
      }
      // Getting Summery
      const returnData: any = await eft.return()
      // Processing Summery
      const return_data = returnData
      returnData.return_data = return_data

      // Getting Summery total
      const returnTotal: any = {
        total: returnData
          .reduce((acc: any, curr: any) => acc + curr.AMOUNT, 0)
          .toFixed(2),
      }

      const detailslData: any = await eft.list()
      const details = detailslData
      detailslData.details = details

      const detailsSum: any = {
        total: detailslData
          .reduce((acc: any, curr: any) => acc + curr.AMOUNT, 0)
          .toFixed(2),
      }
      const data: any = {
        timestamp: date,
        issuedUser: user,
        data: { summeryData },
      }

      let qrCodeData: any = await generateQRCodeData(data)
      const qrTemplateData = {
        qrCodeData: qrCodeData, // the data URL of the QR code image
      }

      // Register the @index helper
      handlebars.registerHelper("index", function (options) {
        return options.data.index + 1
      })
      handlebars.registerHelper("fuzzyHelper", fuzzyHelper)
      handlebars.registerHelper("eq", function (a, b) {
        return a === b
      })

      const template = handlebars.compile(
        fs.readFileSync(
          path.resolve(__dirname, "src/controller/eftReports", "Template.html"),
          "utf8"
        )
      )

      const html = template({
        summeryData,
        sumTotal,
        returnData,
        returnTotal,
        detailslData,
        detailsSum,
        date,
        qrTemplateData,
      })
      resolve(await generatePDF(html))
    } catch (err) {
      reject(err)
    }
  })
}
async function generatePDF(html: string) {
  const browser = await puppeteer.launch({
    headless: true,
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 1355,
    height: 720,
  })
  await page.setContent(html)
  const pdf = await page.pdf({
    format: "A4",
    margin: {
      top: ".5cm",
      right: "1cm",
      bottom: "2cm",
      left: "1cm",
    },
  })
  await browser.close()
  return pdf
}
=======
import handlebars from "handlebars"
import path from "path"
import fs from "fs"
import EftReportModel from "../../model/Models/eftModel/eftModel"
import { fuzzy } from "fast-fuzzy"
import generateQRCodeData from "../../lib/generateQRCodeData"
import puppeteer from "puppeteer"
const eft: any = new EftReportModel()

// Define a wrapper function that calls the fuzzy function with the provided arguments
const fuzzyHelper = (str1: string, str2: string): string => {
  const matchScore = fuzzy(str1, str2, { normalizeWhitespace: true })
  const percentScore = Math.round(matchScore * 100)
  return percentScore.toString() + "%"
}

export const eftgenaratePage = async (user: string,errorCallback: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const d: any = new Date(Date.now())
      const date: any = { date: d, user: user }
      // Getting Summery
      const summeryData: any = await eft.sum()
      // Processing Summery
      const summery = summeryData
      summeryData.summery = summery

      // Getting Summery total
      const sumTotal: any = {
        total: summeryData
          .reduce((acc: any, curr: any) => acc + curr.SUM, 0)
          .toFixed(2),
      }
      // Getting Summery
      const returnData: any = await eft.return()
      // Processing Summery
      const return_data = returnData
      returnData.return_data = return_data

      // Getting Summery total
      const returnTotal: any = {
        total: returnData
          .reduce((acc: any, curr: any) => acc + curr.AMOUNT, 0)
          .toFixed(2),
      }

      const detailslData: any = await eft.list()
      const details = detailslData
      detailslData.details = details

      const detailsSum: any = {
        total: detailslData
          .reduce((acc: any, curr: any) => acc + curr.AMOUNT, 0)
          .toFixed(2),
      }
      const data: any = {
        timestamp: date,
        issuedUser: user,
        data: { summeryData },
      }

      let qrCodeData: any = await generateQRCodeData(data)
      const qrTemplateData = {
        qrCodeData: qrCodeData, // the data URL of the QR code image
      }

      // Register the @index helper
      handlebars.registerHelper("index", function (options) {
        return options.data.index + 1
      })
      handlebars.registerHelper("fuzzyHelper", fuzzyHelper)
      handlebars.registerHelper("eq", function (a, b) {
        return a === b
      })

      const template = handlebars.compile(
        fs.readFileSync(
          path.resolve(__dirname, "src/controller/eftReports", "Template.html"),
          "utf8"
        )
      )

      const html = template({
        summeryData,
        sumTotal,
        returnData,
        returnTotal,
        detailslData,
        detailsSum,
        date,
        qrTemplateData,
      })
        const pdf = await generatePDF(html,errorCallback)
        resolve(pdf)
    } catch (err) {

      reject(err)
    }
  })
}

async function generatePDF(html: string,errorCallback: any) {
  try {
    console.log("Path of puppeteer", path.join(__dirname))
    const configPath = path.join(__dirname, "./config.json")
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"))

    // if (config && config.chromium) {
      const browser = await puppeteer.launch({
        // executablePath: config.chromium.path,
         args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
      })
      const page = await browser.newPage()
      await page.setViewport({
        width: 1355,
        height: 720,
      })
      await page.setContent(html)
      const pdf = await page.pdf({
        format: "A4",
        margin: {
          top: ".5cm",
          right: "1cm",
          bottom: "2cm",
          left: "1cm",
        },
      })
      await browser.close()
      return pdf
    // } else {
    //   console.error(`Error config.json not found`)
    //   return new Error("config.json not found")
    // }
  } catch (e) {
     errorCallback(e)
    console.error(`Error with Puppeteer, Massage: ${e}`)
    return new Error(`Error Genareting Pdf Msg: ${e}`)
  }
}
>>>>>>> bcc3b103a25ef8f5fa2d9e3957df0b66c19015a9
