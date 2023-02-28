import React from "react";
import { toast } from "react-toastify"
import ExcelJS from "exceljs"
export const ExportToExcel = async (payload) => {
  if (payload && payload.length > 0) {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook()
    // Add a new worksheet
    const worksheet = workbook.addWorksheet("Sheet1")

    // Define column headers and their data types
    const headers = [
      { header: "AccountNo", key: "AccountNo", width: 20 },
      { header: "AccountTitel", key: "AccountTitel", width: 25 },
      { header: "Address", key: "Address", width: 35 },
      {
        header: "Balance",
        key: "Balance",
        width: 15,
        style: { numFmt: "#,##0.00" },
      },
      { header: "Contact", key: "Contact", width: 15 },
      { header: "DOB", key: "DOB", width: 15, style: { numFmt: "yyyy-mm-dd" } },
      { header: "Father", key: "Father", width: 20 },
      { header: "GENDER", key: "GENDER", width: 10 },
      { header: "ID", key: "ID", width: 20 },
      { header: "ID Type", key: "ID Type", width: 15 },
      {
        header: "LASTDATE",
        key: "LASTDATE",
        width: 15,
        style: { numFmt: "yyyy-mm-dd" },
      },
      {
        header: "OpeningDate",
        key: "OpeningDate",
        width: 15,
        style: { numFmt: "yyyy-mm-dd" },
      },
      { header: "Spouse", key: "Spouse", width: 20 },
    ]
    worksheet.columns = headers

    // Populate the worksheet with the data from payload
    payload.forEach((row) => {
      // Add the data to the worksheet
      worksheet.addRow(row)
    })

    // Style header row
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true }
    })

    // Save the workbook as an Excel file
    await workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "payload.xlsx"
      a.click()
    })
  } else toast("Payload empty")
}
