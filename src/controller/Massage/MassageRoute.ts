import express from "express"
import MassageLogModel from "../../model/massage/massageLogModel"

const massgaeRoute = express.Router()
const sms = new MassageLogModel()

massgaeRoute.get("/list", async (req, res) => {
  try {
    const payload = await sms.list()

    res.send(payload)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

massgaeRoute.post("/search", async (req, res) => {
  try {
    const { contact } = req.body
    console.log(contact)
    const payload = await sms.search(contact)
    console.log(payload)
    res.send(payload)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

export default massgaeRoute
