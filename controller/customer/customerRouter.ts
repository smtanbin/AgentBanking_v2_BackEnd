import express from "express"
import customer from "./customerFunction"

const customerRouter = express.Router()

const casmas = new customer()

customerRouter.post("/search", async (req, res) => {
  try {
    /* we check if the params field is present in the request body. If it is not, we throw an error. We also catch any errors that occur during the execution of the casmas.get() method and send an appropriate error response to the client.*/
    const { params } = req.body
    /* error handling and validation to the request parameters*/
    if (!params) {
      throw new Error("Params are required.")
    }
    /* check to ensure that params is a string before passing it to casmas.get() function.*/
    if (typeof params !== "string") {
      throw new Error("Invalid parameters")
    }
    const result = await casmas.get(params)
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

export default customerRouter
