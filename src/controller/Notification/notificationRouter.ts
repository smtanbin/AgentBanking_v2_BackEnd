import express from "express"
import Notification from "../../model/Models/notificationModel/notificationModel"

const notificationRouter = express.Router()

const notification = new Notification()

notificationRouter.get("/maturity", async (req, res) => {
  try {
    const result = await notification.maturity()
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})
export default notificationRouter
