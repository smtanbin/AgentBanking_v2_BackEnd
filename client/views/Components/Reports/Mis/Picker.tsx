import React from "react"
import axios from "axios"
import { toast } from "react-toastify"


const Picker = ({
  date,
  setDate,
  setTableData,
  loading,
  setLoading,
  init,
  setInit,
}) => {
  const openWindowAsCanvas = () => {
    const printContent: any = document.querySelector("#mis-body")
    const WinPrint: any = window.open("", "", "width=2480px,height=3508px")
    WinPrint.document.write(`
    <html>
      <head>

      </head>
      <body>
        ${printContent.innerHTML}
        <script>
          document.querySelectorAll(".table-scroll").forEach(el => {
            el.classList.remove("table-scroll");
          });
          window.print();
        </script>
      </body>
    </html>
  `)
    WinPrint.document.close()
    WinPrint.focus()
  }

  const handelDatePick = (e: any) => {
    const _date = e.target.value
    setDate(_date)
  }

  const handelSubmit = async () => {
    setInit(false)
    if (loading) {
      toast("Wait for server to respond.")
    } else {
      setTableData(undefined)
      setLoading(true)
      const baseurl = process.env.VITE_API_URL

      if (!date && !date.value) {
        setLoading(false)
        toast("Date is undefined or has no value")
      }

      try {
        const bodyResponse = await axios.post(`${baseurl}/api/mis/getmis`, {
          date: DateFormar(date),
        })
        setLoading(false)
        console.log(bodyResponse.data)
        setTableData(bodyResponse.data)
      } catch (error) {
        setLoading(false)
        console.error(error)
        // Show error message in UI or use react-toastify library
      }
    }
  }
  return (
    <section className="card m-2">
      <div className="card-header">
        <div className="card-title h5">Pick Date</div>
        <div className="card-body">
          <input
            className="form-input mt-2"
            type="month"
            onChange={handelDatePick}
          />
        </div>
      </div>
      <div className="card-footer p-centered">
        <button className="btn btn-primary" onClick={handelSubmit}>
          Search
        </button>
        {init ? (
          <></>
        ) : (
          <button
            className="ml-2 btn btn-link-primary"
            onClick={openWindowAsCanvas}
          >
            Print
          </button>
        )}
      </div>
    </section>
  )
}

const DateFormar = (dateStr: any) => {
  const [year, month] = dateStr.split("-")

  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ]

  return `${monthNames[Number(month) - 1]}-${year}`
}

export default Picker
