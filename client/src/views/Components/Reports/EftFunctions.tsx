import { toast } from "react-toastify"
import { saveAs } from "file-saver"


export const getEftSummeryList = async (api: any) => {
  try {

    const response = await api.useApi('GET', '/eft/summery')
    return response
  } catch (e) {
    toast("Error" + e)
    return e
  }
}
export const getEftList = async (api: any) => {
  try {
    const response = await api.useApi('GET', '/eft/list')
    return response
  } catch (e) {
    toast("Error" + e)
    return e
  }
}
export const getEftReturnList = async (api: any) => {
  try {
    const response = await api.useApi('GET', '/eft/return')
    return response
  } catch (e) {
    toast("Error" + e)
    return e
  }
}
export const getReport = async (api: any) => {
  try {
    const date = new Date()
    const response = await api.useBlopApi('GET', '/eft/report.pdf', 'pdf')
    const pdfBlob = new Blob([response], { type: "application/pdf" })
    const filename = `EFT_Report_${date}.pdf`
    saveAs(pdfBlob, filename)
    return false
  } catch (e) {
    console.error("Error" + e)
    return false
  }
}



