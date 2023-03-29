import express from "express"
import Customer from "./customerModel"
import _default from "chart.js/dist/plugins/plugin.tooltip"
import numbers = _default.defaults.animations.numbers
const customerRouter = express.Router()
const customer = new Customer()

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

    const result = await customer.search(params)
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

customerRouter.post("/getImage", async (req, res) => {
  try {
    /* we check if the params field is present in the request body. If it is not, we throw an error. We also catch any errors that occur during the execution of the casmas.get() method and send an appropriate error response to the client.*/
    const { params } = req.body

    /* error handling and validation to the request parameters*/
    if (!params) {
      throw new Error("Params are required.")
    }
    /* check to ensure that params is a string before passing it to casmas.get() function.*/
    const result: any = await customer.photo(params)
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})
customerRouter.post("/getImageData", async (req, res) => {
  try {
    /* we check if the params field is present in the request body. If it is not, we throw an error. We also catch any errors that occur during the execution of the casmas.get() method and send an appropriate error response to the client.*/
    const { params } = req.body

    /* error handling and validation to the request parameters*/
    if (!params) {
      throw new Error("Params are required.")
    }
    /* check to ensure that params is a string before passing it to casmas.get() function.*/
    const result: any = await customer.imageData(params)
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

customerRouter.post("/get", async (req, res) => {
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
    const result = await customer.get(params)
    res.send(result)
  } catch (err) {
    console.error(err)
    res.status(500).send("Error: " + err)
  }
})

export default customerRouter
