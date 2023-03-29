import express from "express"
import Report from "./reportFunction"

const reportRouter = express.Router()
const reportConst = new Report()

reportRouter.post("/mis", async (req, res) => {
  try {
    /* we check if the date field is present in the request body. If it is not, we throw an error. We also catch any errors that occur during the execution of the reportConst.get() method and send an appropriate error response to the client.*/
    const { date } = req.body
    console.log(date)
    /* error handling and validation to the request parameters*/
    if (!date) {
      throw new Error("Date are required.")
    }
    /* check to ensure that date is a string before passing it to reportConst.get() function.*/
    if (typeof date !== "string") {
      throw new Error("Invalid parameters")
    }
    const result = await reportConst.mis(date)
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

export default reportRouter
