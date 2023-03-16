import axios from "axios"
import { toast } from "react-toastify"
import { saveAs } from "file-saver"
export const getEftSummeryList = async (token: any) => {
  try {
    const response = await axios.get(
      process.env.VITE_API_URL + "/api/eft/summery",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
          refrash_key: token.refreshToken,
        },
      }
    )
    return response.data
  } catch (e) {
    toast("Error" + e)
    return e
  }
}
export const getEftList = async (token: any) => {
  try {
    const response = await axios.get(
      process.env.VITE_API_URL + "/api/eft/list",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
          refrash_key: token.refreshToken,
        },
      }
    )
    return response.data
  } catch (e) {
    toast("Error" + e)
    return e
  }
}
export const getEftReturnList = async (token: any) => {
  try {
    const response = await axios.get(
      process.env.VITE_API_URL + "/api/eft/return",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
          refrash_key: token.refreshToken,
        },
      }
    )
    return response.data
  } catch (e) {
    toast("Error" + e)
    return e
  }
}
export const getReport = async (token: any) => {
  try {
    const response = await axios.get(
      process.env.VITE_API_URL + "/api/eft/report.pdf",
      {
        responseType: "blob",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: "Bearer " + token.token,
          refrash_key: token.refreshToken,
        },
      }
    )
    const pdfBlob = new Blob([response.data], { type: "application/pdf" })
    saveAs(pdfBlob, "report.pdf")
    return false
  } catch (e) {
    toast("Error" + e)
    return false
  }
}
