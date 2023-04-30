import puppeteer from "puppeteer-core"
import * as handlebars from "handlebars"
import * as fs from "fs"
import path from "path"
import TransactionModel from "../../../model/transactionModels/transactionModel"
const model = new TransactionModel()

export class StatmentModule {
  [x: string]: any
  constructor() {}

  genaratePage = async (mphone: string, fromdate: string, todate: string) => {
    try {
      const payload: any = await model.statment(mphone, fromdate, todate)
      // Compile the template
      // Assume that the `payload` object has a property named `transactions` that contains an array of items to be rendered in the HTML table
      const transactions = payload
      // Add the `transactions` array to the `payload` object
      payload.transactions = transactions

      const template = handlebars.compile(
        fs.readFileSync(
          path.resolve(
            __dirname,
            "src/controller/Transaction/Statment",
            "Template.html"
          ),
          "utf8"
        )
      )
      // console.log(payload)
      return template(payload)
      // console.log("----template:", payload)
      // Generate the HTML from the template and data
      // const html = template(payload)
      // Launch headless Chrome and open a new page
      /* tester.
      const chromePath = await puppeteer.executablePath()
      console.log("chromePath:", chromePath)
      const browser = await puppeteer.launch({
        executablePath: chromePath,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--headless",
          "--disable-gpu",
        ],
      })
      const page: any = await browser.newPage()

      // Set the page size and margins for printing
      await page.emulateMedia("print")
      await page.goto("data:text/html," + encodeURI(payload), {
        waitUntil: "networkidle0",
      })
      await page.pdf({
        path: "bank-account-statement.pdf",
        format: "A4",
        margin: { top: "50px", right: "50px", bottom: "50px", left: "50px" },
        printBackground: true,
      })
      await browser.close()
      return page
      console.log(page) */
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
