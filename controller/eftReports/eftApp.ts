import eftReportModel from "./eftModel"

export const eftReportApp = () => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const eft: any = new eftReportModel()
      const date: any = new Date(Date.now())
      const sumData: any = await eft.sum()
      const dtlData: any = await eft.list()
      const returnData: any = await eft.return()

      let totalCount = 0
      let totalBalance = 0
      const sumRows = sumData
        .map(({ TYPE, COUNT, SUM, HONOURED }: any) => {
          totalCount += COUNT
          totalBalance += SUM
          return `<tr><td class="text-center">${TYPE}</td><td class="text-center">${COUNT}</td><td class="text-right">${
            SUM ? SUM.toFixed(2) : SUM
          }</td><td class="text-center">${
            HONOURED ? "Honoured" : "Pending"
          }</td></tr>`
        })
        .join("")

      let totalAMOUNT = 0
      const listRows = dtlData
        .map(
          (
            {
              ACTNUM,
              RECIVER,
              HONOURED,
              ABS_AC_TITEL,
              AMOUNT,
              ORIG_BANK_NAME,
              ORIG_BRANCH_NAME,
              SENDER,
            }: any,
            index: number
          ) => {
            totalAMOUNT += AMOUNT
            return `<tr>
        <td class="text-center">${index + 1}</td>
        <td class="text-center">${ACTNUM}</td>
        <td class="text-left">${RECIVER}</td>
        <td class="text-left">${ABS_AC_TITEL}</td>
        <td class="text-center">${compareNames(RECIVER, ABS_AC_TITEL)}%</td>
        <td class="text-left">${SENDER}</td>
        <td class="text-left">${ORIG_BRANCH_NAME + " " + ORIG_BANK_NAME}</td>
      <td class="text-right"><b>${AMOUNT ? AMOUNT.toFixed(2) : AMOUNT}</b></td>
        <td class="text-center">${HONOURED ? "Honoured" : "Pending"}</td>
        </tr>`
          }
        )
        .join("")

      let returnTotalAMOUNT = 0
      const returnListRows = returnData
        .map(
          (
            {
              ACTNUM,
              RECIVER,
              HONOURED,
              ABS_AC_TITEL,
              AMOUNT,
              ORIG_BANK_NAME,
              ORIG_BRANCH_NAME,
            }: any,
            index: number
          ) => {
            if (ACTNUM) {
              returnTotalAMOUNT += AMOUNT
              return `<tr>
        <td class="text-center">${index + 1}</td>
        <td class="text-center">${ACTNUM}</td>
        <td class="text-left">${RECIVER}</td>
        <td class="text-left">${ABS_AC_TITEL}</td>
        <td class="text-left">${ORIG_BRANCH_NAME + " " + ORIG_BANK_NAME}</td>
                 <td class="text-right"><b>${
                   AMOUNT ? AMOUNT.toFixed(2) : AMOUNT
                 }</b></td>
 
        <td class="text-center">${HONOURED ? "Honoured" : "Pending"}</td>
        </tr>`
            } else {
              return `<tr>
                <td colspan='7'> No Return</td>
                </tr>`
            }
          }
        )
        .join("")

      const html = `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Eft List</title>

<style>
*{
margin: 0;
padding: 0;
font-family:  sans-serif;
}
body{
    width: 8.27in;
  
}

.container{
    
      display:flex;
   
      justify-content: center;
      align-content: space-between;
      align-items: top;
  margin: 0 0 15px 0;
}

.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}

table {
margin: 20px;
  border-collapse: collapse;
  font-size: 12px;
  min-width: 50%;
}

table td, table th {
  border: .1rem solid #ddd;
  padding:1px 3px;

}

.text-color{
color: #4F97F0;
}


table tr:nth-child(even){background-color: #f2f2f2;}

table th {
text-align: center;
  padding-top: 12px;
  padding-bottom: 12px;
 
  background-color: #99C1F2;
  color: black;
}
.row::after {
  content: "";
  clear: both;
  display: table;
}

[class*="col-"] {
  float: left;

}

.col-1 {
  width: 8.33%;
}

.col-2 {
  width: 16.66%;
}

.col-3 {
  width: 25%;
}

.col-4 {
  width: 33.33%;
}

.col-5 {
  width: 41.66%;
}

.col-6 {
  width: 50%;
}

.col-7 {
  width: 58.33%;
}

.col-8 {
  width: 66.66%;
}

.col-9 {
  width: 75%;
}

.col-10 {
  width: 83.33%;
}

.col-11 {
  width: 91.66%;
}

.col-12 {
  width: 100%;
}

</style>
    </head>
    <body>
    <div>   
    <div class="col-12 container text-center">
            ${logo}
             <h4>Agent Banking</h4>
        </div>   
       
       <br/>
      <div class="col-12 row text-center">
      <h4 class="text-color">PENDING LIST OF ELECTRONIC FUNDS TRANSFER (EFT) ON ${
        months[date.getMonth()] + " " + date.getDay() + "," + date.getFullYear()
      }</h4></div>   
      </div>
        <div class="row">
        <div class="col-12 col-6">
          <table>
          <thead>
    
            <tr>
              <th class="text-center">Type</th>
              <th class="text-center">Total</th>
              <th class="text-right">Balance</th>
              <th class="text-center">Status</th>
            </tr>
            </thead>
            ${sumRows}
            <tr>
              <td class="text-center"><b>Total</b></td>
              <td class="text-center"><b>${totalCount}</b></td>
              <td class="text-right"><b>${
                totalBalance ? totalBalance.toFixed(2) : totalBalance
              }</b></td>
         
              <td></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="row">
      <h4 class="text-center">Pending List</h4>
      </div>
      <div class="row">
      <div class="col-12">
             <table>
             <thead>
            <tr>
        
                   <th>Sl</th>
              <th>Account No</th>
              <th>Reciver</th>
              <th>System Titel</th>
              <th>Match</th>
              <th>Sender</th>
              <th>Origen</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
             </thead>
             <tbody>
             ${listRows}
             </tbody>
            <tr>
              <td colspan="7"><b>Total</b></td>
   
                   <td><b>${
                     totalAMOUNT ? totalAMOUNT.toFixed(2) : totalAMOUNT
                   }</b></td>
              <td></td>
            </tr>
          </table>
    </div>
    </div>

    <div class="row" style=${
      returnData[0] != undefined ? "display:block" : "display:none"
    } >
    <h4 class="text-center">Return </h4>
    </div>
    
    <div class="row" style=${
      returnData[0] != undefined ? "display:block" : "display:none"
    } >
  
      <div class="col-12">
             
      <table>
      <tr>
          <th>Sl</th>
              <th>Account No</th>
              <th>Reciver</th>
              <th>Titel</th>
              <th>Sender</th>
              <th>Origen</th>
              <th>Amount</th>
              <th>Status</th>
           
            </tr>
            ${returnListRows}
            <tr>
              <td colspan="6"><b>Total</b></td>
              <td><b>${
                returnTotalAMOUNT
                  ? returnTotalAMOUNT.toFixed(2)
                  : returnTotalAMOUNT
              }</b></td>
              <td></td>
            </tr>
        </table>
          
    </div>
    </div>

    </div>
  </body>
  </html>`
      resolve(html)
    } catch (e) {
      reject(e)
    }
  })
}

export const compareNames = (name1: string, name2: string): number => {
  const name1Lower = name1.toLowerCase()
  const name2Lower = name2.toLowerCase()
  const name1Arr = name1Lower.split("")
  const name2Arr = name2Lower.split("")
  let matches = 0

  for (let i = 0; i < name1Arr.length; i++) {
    if (name2Arr.includes(name1Arr[i])) {
      matches++
      name2Arr.splice(name2Arr.indexOf(name1Arr[i]), 1)
    }
  }

  const percentageMatch = (matches / name1Arr.length) * 100
  return Number(percentageMatch.toFixed(2))
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const logo = `
<svg style="height:35px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 456 76.57"><defs><style>
.cls-1{fill:#003616;}.cls-1,.cls-2,.cls-3{fill-rule:evenodd;}.cls-2,.cls-4{fill:#5a0000;}.cls-3{fill:#f80;}</style></defs><title>Asset 1</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M65.91,35.69,71,35.17a7,7,0,0,0,1.86,4.1,5.32,5.32,0,0,0,3.77,1.3,5.47,5.47,0,0,0,3.79-1.16,3.57,3.57,0,0,0,1.28-2.72,2.7,2.7,0,0,0-.54-1.7,4.21,4.21,0,0,0-1.87-1.22c-.61-.23-2-.64-4.16-1.23a13.57,13.57,0,0,1-5.85-2.79,7.62,7.62,0,0,1-2.37-5.66,7.77,7.77,0,0,1,1.11-4,7.2,7.2,0,0,1,3.23-2.85,11.94,11.94,0,0,1,5.07-1c3.24,0,5.67.78,7.31,2.34A8.56,8.56,0,0,1,86.2,24.8L81,25a5,5,0,0,0-1.43-3.1A4.93,4.93,0,0,0,76.24,21a5.56,5.56,0,0,0-3.54,1,2.09,2.09,0,0,0-.82,1.74,2.24,2.24,0,0,0,.77,1.7q1,.9,4.78,1.88a23.38,23.38,0,0,1,5.62,2A7.58,7.58,0,0,1,85.9,32.2a9.14,9.14,0,0,1,1,4.51,9,9,0,0,1-1.24,4.55,7.6,7.6,0,0,1-3.49,3.16,13.47,13.47,0,0,1-5.62,1q-4.9,0-7.53-2.49a11.24,11.24,0,0,1-3.14-7.27"/><path class="cls-1" d="M99.93,24.48v4.31H96.56v8.3A24.17,24.17,0,0,0,96.65,40a1.22,1.22,0,0,0,.43.69,1.28,1.28,0,0,0,.82.27,5.64,5.64,0,0,0,1.95-.52l.44,4.18a9,9,0,0,1-3.89.81A5.78,5.78,0,0,1,94,45a3.53,3.53,0,0,1-1.57-1.28,5.28,5.28,0,0,1-.7-2.11,30.64,30.64,0,0,1-.15-3.83v-9H89.29V24.48h2.29V20.43l5-3.16v7.21Z"/><path class="cls-1" d="M113.73,35.22a26.06,26.06,0,0,1-3,.83A8.46,8.46,0,0,0,108,37a2.29,2.29,0,0,0-1,1.9,2.73,2.73,0,0,0,.77,2,2.6,2.6,0,0,0,2,.82,4.06,4.06,0,0,0,2.56-1,3.35,3.35,0,0,0,1.19-1.78,11.5,11.5,0,0,0,.19-2.62ZM107,30.82l-4.47-.89a7.77,7.77,0,0,1,2.62-4.42,8.92,8.92,0,0,1,5.52-1.44,11.09,11.09,0,0,1,5,.85A5.15,5.15,0,0,1,118,27.09a12.06,12.06,0,0,1,.66,4.83l0,6.31a23.52,23.52,0,0,0,.24,4,12,12,0,0,0,.9,2.74h-4.93q-.19-.52-.48-1.56c-.08-.31-.14-.52-.18-.62a9,9,0,0,1-2.72,2,7.4,7.4,0,0,1-3.09.67,6.09,6.09,0,0,1-4.57-1.71,5.86,5.86,0,0,1-1.67-4.31,6.14,6.14,0,0,1,.76-3.08A5.06,5.06,0,0,1,105,34.28a15.68,15.68,0,0,1,4-1.26,27,27,0,0,0,4.83-1.32v-.55A3,3,0,0,0,113,28.9a3.93,3.93,0,0,0-2.69-.68,3.3,3.3,0,0,0-2.08.58,4,4,0,0,0-1.21,2"/><path class="cls-1" d="M140.48,44.93h-5V34.53a17.7,17.7,0,0,0-.31-4.27,3,3,0,0,0-1-1.5,2.72,2.72,0,0,0-1.7-.54,3.75,3.75,0,0,0-2.3.77,3.89,3.89,0,0,0-1.39,2,19.41,19.41,0,0,0-.37,4.68v9.23h-5V24.48H128v3a7.35,7.35,0,0,1,6.17-3.41,6.85,6.85,0,0,1,3,.64,5.09,5.09,0,0,1,2.06,1.65,6.19,6.19,0,0,1,1,2.26,18.46,18.46,0,0,1,.28,3.63Z"/><path class="cls-1" d="M149.53,34.33a10,10,0,0,0,.83,4.74,3.7,3.7,0,0,0,3.36,2.12,3.55,3.55,0,0,0,2.91-1.59,7.82,7.82,0,0,0,1.2-4.75q0-3.53-1.16-5.08a3.64,3.64,0,0,0-5.95,0,7.41,7.41,0,0,0-1.19,4.58m13.23,10.6h-4.62v-3a7.83,7.83,0,0,1-2.71,2.64,6.42,6.42,0,0,1-3.15.88,6.92,6.92,0,0,1-5.53-2.84q-2.31-2.85-2.31-7.93c0-3.47.75-6.1,2.24-7.91a7,7,0,0,1,5.67-2.7,6.79,6.79,0,0,1,5.43,2.84V16.75h5Z"/><path class="cls-1" d="M178,35.22a26.06,26.06,0,0,1-3,.83,8.46,8.46,0,0,0-2.7.94,2.29,2.29,0,0,0-1,1.9,2.78,2.78,0,0,0,.77,2,2.6,2.6,0,0,0,2,.82,4.06,4.06,0,0,0,2.56-1,3.35,3.35,0,0,0,1.19-1.78A11.5,11.5,0,0,0,178,36.3Zm-6.69-4.4-4.47-.89a7.77,7.77,0,0,1,2.62-4.42A8.92,8.92,0,0,1,175,24.07a11.09,11.09,0,0,1,4.95.85,5.1,5.1,0,0,1,2.29,2.17,12.06,12.06,0,0,1,.66,4.83l-.05,6.31a23.52,23.52,0,0,0,.24,4,12,12,0,0,0,.9,2.74H179q-.19-.52-.48-1.56c-.08-.31-.14-.52-.18-.62a9.12,9.12,0,0,1-2.72,2,7.37,7.37,0,0,1-3.09.67A6.08,6.08,0,0,1,168,43.74a5.87,5.87,0,0,1-1.68-4.31,6.15,6.15,0,0,1,.77-3.08,5.06,5.06,0,0,1,2.13-2.07A15.68,15.68,0,0,1,173.16,33,26.46,26.46,0,0,0,178,31.7v-.55a3,3,0,0,0-.71-2.25,3.93,3.93,0,0,0-2.69-.68,3.3,3.3,0,0,0-2.08.58,4,4,0,0,0-1.21,2"/><path class="cls-1" d="M192.49,44.93h-5V24.48h4.61v2.9a8.31,8.31,0,0,1,2.13-2.68,3.76,3.76,0,0,1,2.14-.63,6,6,0,0,1,3.26,1l-1.53,4.7a4.14,4.14,0,0,0-2.33-.89,2.56,2.56,0,0,0-1.75.63,4.44,4.44,0,0,0-1.14,2.26,34.71,34.71,0,0,0-.41,6.84Z"/><path class="cls-1" d="M205.78,34.33a10,10,0,0,0,.83,4.74A3.69,3.69,0,0,0,210,41.19a3.57,3.57,0,0,0,2.92-1.59,7.82,7.82,0,0,0,1.2-4.75q0-3.53-1.17-5.08a3.63,3.63,0,0,0-5.94,0,7.35,7.35,0,0,0-1.19,4.58M219,44.93h-4.62v-3a8,8,0,0,1-2.71,2.64,6.42,6.42,0,0,1-3.15.88A6.94,6.94,0,0,1,203,42.61q-2.3-2.85-2.3-7.93c0-3.47.75-6.1,2.24-7.91a7.06,7.06,0,0,1,5.67-2.7A6.79,6.79,0,0,1,214,26.91V16.75h5Z"/><path class="cls-1" d="M239.25,32.63v7.53h4.81a22.46,22.46,0,0,0,3.57-.17,3.2,3.2,0,0,0,1.89-1.13,3.65,3.65,0,0,0,.73-2.39,4,4,0,0,0-.56-2.15A3.24,3.24,0,0,0,248.06,33a16.63,16.63,0,0,0-4.61-.4Zm0-11.21V28h3.39c2,0,3.28,0,3.77-.1a3.25,3.25,0,0,0,2.09-1,3.14,3.14,0,0,0,.76-2.21,3.3,3.3,0,0,0-.66-2.13,2.86,2.86,0,0,0-1.95-1c-.51-.07-2-.1-4.43-.1ZM234,16.75h10.32a27.82,27.82,0,0,1,4.56.28,6.35,6.35,0,0,1,2.7,1.16,7.11,7.11,0,0,1,2,2.36,6.92,6.92,0,0,1,.79,3.29,7,7,0,0,1-1,3.63A6.22,6.22,0,0,1,250.74,30a6.75,6.75,0,0,1,3.63,2.56,7.17,7.17,0,0,1,1.27,4.25,9,9,0,0,1-.82,3.74,7.35,7.35,0,0,1-2.23,2.9,7.13,7.13,0,0,1-3.5,1.34q-1.31.15-6.29.19H234Z"/><path class="cls-1" d="M270.38,35.22a26.06,26.06,0,0,1-3,.83,8.56,8.56,0,0,0-2.7.94,2.29,2.29,0,0,0-1,1.9,2.74,2.74,0,0,0,.78,2,2.57,2.57,0,0,0,2,.82,4.06,4.06,0,0,0,2.55-1,3.35,3.35,0,0,0,1.19-1.78,11.5,11.5,0,0,0,.19-2.62Zm-6.69-4.4-4.47-.89a7.83,7.83,0,0,1,2.62-4.42,8.92,8.92,0,0,1,5.52-1.44,11.06,11.06,0,0,1,4.95.85,5.1,5.1,0,0,1,2.29,2.17,12.06,12.06,0,0,1,.66,4.83l-.05,6.31a23.52,23.52,0,0,0,.24,4,12,12,0,0,0,.9,2.74h-4.93q-.19-.52-.48-1.56c-.08-.31-.14-.52-.17-.62a9.15,9.15,0,0,1-2.73,2,7.37,7.37,0,0,1-3.09.67,6.08,6.08,0,0,1-4.57-1.71,5.86,5.86,0,0,1-1.67-4.31,6.14,6.14,0,0,1,.76-3.08,5.06,5.06,0,0,1,2.13-2.07A15.82,15.82,0,0,1,265.55,33a26.71,26.71,0,0,0,4.83-1.32v-.55a3,3,0,0,0-.71-2.25,3.91,3.91,0,0,0-2.69-.68,3.3,3.3,0,0,0-2.08.58,3.92,3.92,0,0,0-1.21,2"/><path class="cls-1" d="M297.13,44.93h-5V34.53a17.51,17.51,0,0,0-.32-4.27,3,3,0,0,0-1-1.5,2.72,2.72,0,0,0-1.7-.54,3.75,3.75,0,0,0-2.3.77,3.89,3.89,0,0,0-1.39,2A19.41,19.41,0,0,0,285,35.7v9.23h-5V24.48h4.61v3a7.36,7.36,0,0,1,6.17-3.41,6.85,6.85,0,0,1,3,.64,5.09,5.09,0,0,1,2.06,1.65,6.19,6.19,0,0,1,1,2.26,17.72,17.72,0,0,1,.28,3.63Z"/><polygon class="cls-1" points="302.03 44.93 302.03 16.75 307.01 16.75 307.01 31.68 312.8 24.48 318.92 24.48 312.5 31.98 319.39 44.93 314.04 44.93 309.28 35.74 307.01 38.38 307.01 44.93 302.03 44.93"/><polygon class="cls-1" points="332.49 44.93 332.49 17.01 337.73 17.01 337.73 40.16 350.75 40.16 350.75 44.93 332.49 44.93"/><path class="cls-1" d="M354.36,24.48h5V44.93h-5Zm0-7.73h5v5h-5Z"/><path class="cls-1" d="M364.09,24.48h4.56v2.79a7.27,7.27,0,0,1,5.88-3.2,5.88,5.88,0,0,1,3.13.81,6.05,6.05,0,0,1,2.19,2.45,8.82,8.82,0,0,1,2.67-2.45,6.16,6.16,0,0,1,3.07-.81,6.38,6.38,0,0,1,3.5.91,5.54,5.54,0,0,1,2.14,2.68,12.57,12.57,0,0,1,.52,4.23v13h-5V33.28a9.31,9.31,0,0,0-.52-3.91,2.32,2.32,0,0,0-2.12-1.15,3.19,3.19,0,0,0-2,.69,3.81,3.81,0,0,0-1.33,2,15.7,15.7,0,0,0-.41,4.21v9.78h-5V33.77a17.26,17.26,0,0,0-.26-3.84,2.18,2.18,0,0,0-2.34-1.71,3.42,3.42,0,0,0-2.07.67,3.64,3.64,0,0,0-1.31,1.94,15.31,15.31,0,0,0-.4,4.2v9.9h-5Z"/><path class="cls-1" d="M396.54,24.48h5V44.93h-5Zm0-7.73h5v5h-5Z"/><path class="cls-1" d="M415.25,24.48v4.31h-3.38v8.3A21.15,21.15,0,0,0,412,40a1.13,1.13,0,0,0,.43.69,1.26,1.26,0,0,0,.82.27,5.69,5.69,0,0,0,1.95-.52l.44,4.18a9.07,9.07,0,0,1-3.9.81,5.78,5.78,0,0,1-2.4-.49,3.65,3.65,0,0,1-1.57-1.28,5.45,5.45,0,0,1-.69-2.11,28.16,28.16,0,0,1-.16-3.83v-9h-2.28V24.48h2.28V20.43l5-3.16v7.21Z"/><path class="cls-1" d="M429.83,33a5.46,5.46,0,0,0-1.12-3.56,3.29,3.29,0,0,0-2.59-1.22,3.35,3.35,0,0,0-2.69,1.29,5.28,5.28,0,0,0-1,3.49Zm-.27,5.49,4.93.89a8.8,8.8,0,0,1-3,4.52,8.37,8.37,0,0,1-5.16,1.55q-4.89,0-7.25-3.49a12.45,12.45,0,0,1-1.86-7.05c0-3.39.82-6,2.44-8a7.76,7.76,0,0,1,6.18-2.88,8,8,0,0,1,6.61,3q2.42,3,2.31,9.24H422.3a5.72,5.72,0,0,0,1.21,3.74,3.66,3.66,0,0,0,2.88,1.34,2.92,2.92,0,0,0,2-.69,4.33,4.33,0,0,0,1.2-2.22"/><path class="cls-1" d="M442.76,34.33a10,10,0,0,0,.84,4.74A3.69,3.69,0,0,0,447,41.19a3.57,3.57,0,0,0,2.92-1.59,7.82,7.82,0,0,0,1.2-4.75q0-3.53-1.17-5.08a3.63,3.63,0,0,0-5.94,0,7.35,7.35,0,0,0-1.2,4.58M456,44.93h-4.62v-3a8,8,0,0,1-2.71,2.64,6.42,6.42,0,0,1-3.15.88A6.92,6.92,0,0,1,440,42.61q-2.31-2.85-2.31-7.93c0-3.47.75-6.1,2.24-7.91a7,7,0,0,1,5.67-2.7A6.79,6.79,0,0,1,451,26.91V16.75h5Z"/><path class="cls-2" d="M13.25,27.74c.88.6,3.92,2.49,6.62,2.21s2.61-1.81,2.46-2.45a1.57,1.57,0,0,0-1.71-.45v2.24a5.83,5.83,0,0,1-3.79-.23v-4H24A2.26,2.26,0,0,1,25.84,28c-.22,1.07-1.17,3.3-5,3.41a11.72,11.72,0,0,1-6.69-2.54,6.08,6.08,0,0,1-1-1.06c-.07-.09,0-.14,0-.1Z"/><path class="cls-2" d="M16.83,36.53V30.85a9,9,0,0,0,3.79.88V34.6c0,.31,2.58-.23,2.12-2.91.38-.08,2.31-.71,2.69-1.77.34.07,2.15,1.32,1.14,3.93a3.86,3.86,0,0,1-3.64,2.68Z"/><path class="cls-3" d="M26.92,25.23h4.29v6.2h3.67v5.14h-8V35s1.68-2.7,0-4.89Z"/><path class="cls-1" d="M13.06,27.41a12.69,12.69,0,0,0,2.76,1.31V25.08H13.93l10.63-10.9s6.84-1.69,8.73,3c.42,1.4.65,3.18-1.09,3.78,0-.79-.51-4.08-4.35-2.91a3,3,0,0,0-1.77,3.6c.29.86,1.92,3.51,5.85,2.75,1-.15,5.9-.87,6.32-5.9a10.4,10.4,0,0,0-3-7c-.42-.42-9-10.81-9-10.81L25.62,0,0,25.17V36.39H15.76v-6s-2.64-1.52-2.91-2.79c0,0,0-.27.21-.17"/><path class="cls-1" d="M35.91,25.26H52.13V36.81L26.64,61.68,16.88,50.19s-4.92-5.07-2-10c1.3-2.39,6.81-4.54,10.21-1.81,1,.69,2.46,3.7-.24,5.23-1.23.57-4.37.7-4.67-2.78-2.42.18-2.87,8.85,7.62,6.69.7-.76,10.49-10.85,10.49-10.85H35.91Z"/><path class="cls-4" d="M129,71.34l1.93-.16a4.19,4.19,0,0,0,.64,1.9,3.53,3.53,0,0,0,1.55,1.2,6,6,0,0,0,2.37.46,5.76,5.76,0,0,0,2.07-.35,2.84,2.84,0,0,0,1.33-1,2.26,2.26,0,0,0,.44-1.33,2,2,0,0,0-.42-1.27,3.2,3.2,0,0,0-1.39-.91c-.42-.16-1.34-.41-2.75-.75a14.3,14.3,0,0,1-3-1,4.35,4.35,0,0,1-1.65-1.44,3.58,3.58,0,0,1-.54-1.93,3.86,3.86,0,0,1,.67-2.18,4.12,4.12,0,0,1,1.93-1.55A7.4,7.4,0,0,1,135,60.6a7.76,7.76,0,0,1,3,.55,4.38,4.38,0,0,1,2,1.63,4.61,4.61,0,0,1,.75,2.43l-1.95.15a3.2,3.2,0,0,0-1.07-2.21,4.18,4.18,0,0,0-2.7-.75,4.35,4.35,0,0,0-2.7.68,2.05,2.05,0,0,0-.85,1.64,1.77,1.77,0,0,0,.6,1.37,8.23,8.23,0,0,0,3.09,1.1,19.67,19.67,0,0,1,3.41,1,4.73,4.73,0,0,1,2,1.58,3.89,3.89,0,0,1,.64,2.19,4.22,4.22,0,0,1-.71,2.33,4.55,4.55,0,0,1-2,1.69,7,7,0,0,1-3,.61,8.88,8.88,0,0,1-3.52-.61,5,5,0,0,1-2.22-1.84A5.21,5.21,0,0,1,129,71.34Z"/><path class="cls-4" d="M143.83,76.31V60.86h1.89V66.4a4.28,4.28,0,0,1,3.36-1.54,4.65,4.65,0,0,1,2.16.49,2.92,2.92,0,0,1,1.31,1.36,6.29,6.29,0,0,1,.39,2.51v7.09h-1.89V69.22a2.93,2.93,0,0,0-.62-2.07,2.26,2.26,0,0,0-1.74-.65,3.06,3.06,0,0,0-1.59.43A2.49,2.49,0,0,0,146,68.12a5.47,5.47,0,0,0-.32,2.07v6.12Z"/><path class="cls-4" d="M163.13,74.93a7,7,0,0,1-2,1.26,5.74,5.74,0,0,1-2.09.37,4.06,4.06,0,0,1-2.83-.9,3,3,0,0,1-1-2.3,3.1,3.1,0,0,1,1.35-2.59,4.41,4.41,0,0,1,1.37-.63,13,13,0,0,1,1.68-.28,17.34,17.34,0,0,0,3.38-.65c0-.26,0-.43,0-.5a2.11,2.11,0,0,0-.53-1.63,3.19,3.19,0,0,0-2.16-.65,3.38,3.38,0,0,0-2,.47,2.91,2.91,0,0,0-.94,1.66l-1.86-.25a4.59,4.59,0,0,1,.84-1.92A3.57,3.57,0,0,1,158,65.26a7.56,7.56,0,0,1,2.54-.4,6.83,6.83,0,0,1,2.33.34,3.18,3.18,0,0,1,1.32.85,3.08,3.08,0,0,1,.59,1.29,11.26,11.26,0,0,1,.09,1.75v2.53A26.94,26.94,0,0,0,165,75a4.2,4.2,0,0,0,.48,1.35h-2A4.12,4.12,0,0,1,163.13,74.93ZM163,70.69a14.16,14.16,0,0,1-3.09.72,7.08,7.08,0,0,0-1.66.38,1.68,1.68,0,0,0-.75.61,1.66,1.66,0,0,0-.26.9,1.63,1.63,0,0,0,.57,1.27,2.48,2.48,0,0,0,1.68.5,4,4,0,0,0,1.95-.47,3,3,0,0,0,1.26-1.32,4.65,4.65,0,0,0,.3-1.89Z"/><path class="cls-4" d="M167.81,76.31V65.12h1.71v1.69a4.66,4.66,0,0,1,1.2-1.57,2.15,2.15,0,0,1,1.22-.38,3.69,3.69,0,0,1,1.95.62l-.65,1.76a2.7,2.7,0,0,0-1.4-.42,1.8,1.8,0,0,0-1.11.38,2,2,0,0,0-.71,1,7.38,7.38,0,0,0-.31,2.21v5.86Z"/><path class="cls-4" d="M175,63V60.86h1.89V63Zm0,13.27V65.12h1.89V76.31Z"/><path class="cls-4" d="M192.11,74.93a7,7,0,0,1-2,1.26,5.74,5.74,0,0,1-2.09.37,4.06,4.06,0,0,1-2.83-.9,3,3,0,0,1-1-2.3,3.1,3.1,0,0,1,1.35-2.59,4.52,4.52,0,0,1,1.37-.63,13,13,0,0,1,1.68-.28,17.34,17.34,0,0,0,3.38-.65c0-.26,0-.43,0-.5a2.07,2.07,0,0,0-.53-1.63,3.19,3.19,0,0,0-2.16-.65,3.4,3.4,0,0,0-2,.47,2.91,2.91,0,0,0-.94,1.66l-1.86-.25a4.59,4.59,0,0,1,.84-1.92A3.57,3.57,0,0,1,187,65.26a7.56,7.56,0,0,1,2.54-.4,6.83,6.83,0,0,1,2.33.34,3.11,3.11,0,0,1,1.32.85,3.08,3.08,0,0,1,.59,1.29,11.26,11.26,0,0,1,.09,1.75v2.53A26.94,26.94,0,0,0,194,75a4.2,4.2,0,0,0,.48,1.35h-2A4.12,4.12,0,0,1,192.11,74.93ZM192,70.69a14,14,0,0,1-3.09.72,7.21,7.21,0,0,0-1.66.38,1.68,1.68,0,0,0-.75.61,1.66,1.66,0,0,0-.26.9,1.63,1.63,0,0,0,.57,1.27,2.49,2.49,0,0,0,1.69.5,4,4,0,0,0,1.94-.47,3,3,0,0,0,1.26-1.32,4.65,4.65,0,0,0,.3-1.89Z"/><path class="cls-4" d="M196.81,76.31V60.86h1.9V66.4a4.25,4.25,0,0,1,3.35-1.54,4.59,4.59,0,0,1,2.16.49,2.87,2.87,0,0,1,1.31,1.36,6.27,6.27,0,0,1,.4,2.51v7.09H204V69.22a2.93,2.93,0,0,0-.62-2.07,2.26,2.26,0,0,0-1.74-.65,3.11,3.11,0,0,0-1.59.43A2.59,2.59,0,0,0,199,68.12a5.5,5.5,0,0,0-.31,2.07v6.12Z"/><path class="cls-4" d="M217,76.31V60.86h5.79a7.21,7.21,0,0,1,2.84.47,3.68,3.68,0,0,1,1.68,1.44,3.84,3.84,0,0,1,.6,2,3.53,3.53,0,0,1-.54,1.87,3.77,3.77,0,0,1-1.62,1.41,4,4,0,0,1,2.16,1.4,3.76,3.76,0,0,1,.75,2.34,4.47,4.47,0,0,1-.46,2A3.88,3.88,0,0,1,227,75.29a4.79,4.79,0,0,1-1.69.76,10.4,10.4,0,0,1-2.49.26Zm2-9h3.34a7.39,7.39,0,0,0,2-.18,2.11,2.11,0,0,0,1.17-.77,2.18,2.18,0,0,0,.4-1.35,2.44,2.44,0,0,0-.37-1.35,1.87,1.87,0,0,0-1.05-.8,9,9,0,0,0-2.35-.22H219Zm0,7.13h3.85a8.89,8.89,0,0,0,1.39-.07,3.22,3.22,0,0,0,1.18-.42,2.34,2.34,0,0,0,.78-.86,2.74,2.74,0,0,0,.3-1.3,2.58,2.58,0,0,0-.44-1.5,2.3,2.3,0,0,0-1.23-.9,7.62,7.62,0,0,0-2.26-.26H219Z"/><path class="cls-4" d="M238.5,74.93a7,7,0,0,1-2,1.26,5.74,5.74,0,0,1-2.09.37,4.06,4.06,0,0,1-2.83-.9,3,3,0,0,1-1-2.3,3.1,3.1,0,0,1,1.35-2.59,4.52,4.52,0,0,1,1.37-.63,13,13,0,0,1,1.68-.28,17.34,17.34,0,0,0,3.38-.65c0-.26,0-.43,0-.5a2.08,2.08,0,0,0-.54-1.63,3.19,3.19,0,0,0-2.16-.65,3.4,3.4,0,0,0-2,.47,2.91,2.91,0,0,0-.94,1.66l-1.85-.25a4.46,4.46,0,0,1,.83-1.92,3.57,3.57,0,0,1,1.67-1.13,7.56,7.56,0,0,1,2.54-.4,6.83,6.83,0,0,1,2.33.34,3.11,3.11,0,0,1,1.32.85,3,3,0,0,1,.59,1.29,11.26,11.26,0,0,1,.09,1.75v2.53a26.94,26.94,0,0,0,.12,3.34,4.2,4.2,0,0,0,.48,1.35h-2A4.37,4.37,0,0,1,238.5,74.93Zm-.16-4.24a14,14,0,0,1-3.09.72,7.21,7.21,0,0,0-1.66.38,1.68,1.68,0,0,0-.75.61,1.66,1.66,0,0,0-.26.9,1.61,1.61,0,0,0,.58,1.27,2.44,2.44,0,0,0,1.68.5,4,4,0,0,0,1.95-.47A3,3,0,0,0,238,73.28a4.65,4.65,0,0,0,.3-1.89Z"/><path class="cls-4" d="M242.44,73l1.88-.3a2.61,2.61,0,0,0,.88,1.73,3.06,3.06,0,0,0,2,.6,3,3,0,0,0,1.94-.53,1.6,1.6,0,0,0,.63-1.25,1.15,1.15,0,0,0-.56-1,8.27,8.27,0,0,0-1.94-.64,17.09,17.09,0,0,1-2.89-.92,2.71,2.71,0,0,1-1.22-1.06,2.78,2.78,0,0,1-.42-1.5,2.89,2.89,0,0,1,.34-1.39,3.26,3.26,0,0,1,.93-1.06,4.15,4.15,0,0,1,1.21-.55,5.8,5.8,0,0,1,1.64-.23,6.5,6.5,0,0,1,2.31.38,3.15,3.15,0,0,1,1.47,1,4,4,0,0,1,.66,1.73l-1.86.26a2,2,0,0,0-.73-1.35,2.72,2.72,0,0,0-1.71-.49,3.1,3.1,0,0,0-1.87.44,1.25,1.25,0,0,0-.56,1,1,1,0,0,0,.24.66,1.71,1.71,0,0,0,.72.51q.28.1,1.68.48a24.1,24.1,0,0,1,2.81.88,2.8,2.8,0,0,1,1.24,1,2.7,2.7,0,0,1,.46,1.62,3.2,3.2,0,0,1-.56,1.79,3.55,3.55,0,0,1-1.59,1.29,5.75,5.75,0,0,1-2.36.46,5.24,5.24,0,0,1-3.33-.91A4.21,4.21,0,0,1,242.44,73Z"/><path class="cls-4" d="M261.65,72.7l2,.25a4.76,4.76,0,0,1-1.72,2.66,5.16,5.16,0,0,1-3.2,1,5.1,5.1,0,0,1-3.89-1.51,5.9,5.9,0,0,1-1.44-4.24,6.18,6.18,0,0,1,1.45-4.39,4.93,4.93,0,0,1,3.78-1.56,4.78,4.78,0,0,1,3.66,1.53,6.06,6.06,0,0,1,1.42,4.3c0,.11,0,.28,0,.51h-8.34a4.31,4.31,0,0,0,1,2.82,3.13,3.13,0,0,0,2.34,1,2.86,2.86,0,0,0,1.78-.55A3.64,3.64,0,0,0,261.65,72.7Zm-6.23-3.06h6.25a3.79,3.79,0,0,0-.71-2.12,2.92,2.92,0,0,0-2.35-1.1,3,3,0,0,0-2.2.88A3.5,3.5,0,0,0,255.42,69.64Z"/><path class="cls-4" d="M273.25,76.31V74.9a3.47,3.47,0,0,1-3.13,1.66,4.41,4.41,0,0,1-2.46-.74,4.83,4.83,0,0,1-1.74-2.06,7.11,7.11,0,0,1-.61-3,7.84,7.84,0,0,1,.56-3,4.43,4.43,0,0,1,1.67-2.09,4.54,4.54,0,0,1,2.5-.73,3.8,3.8,0,0,1,1.8.43,3.88,3.88,0,0,1,1.29,1.11V60.86H275V76.31Zm-6-5.59a4.89,4.89,0,0,0,.9,3.22A2.74,2.74,0,0,0,270.3,75a2.66,2.66,0,0,0,2.11-1,4.66,4.66,0,0,0,.87-3.1,5.27,5.27,0,0,0-.88-3.37,2.72,2.72,0,0,0-2.18-1.08,2.61,2.61,0,0,0-2.11,1A5.06,5.06,0,0,0,267.26,70.72Z"/><path class="cls-4" d="M284.58,76.31V60.86h2V76.31Z"/><path class="cls-4" d="M289.23,73l1.87-.3A2.65,2.65,0,0,0,292,74.4a3.06,3.06,0,0,0,2,.6,3,3,0,0,0,1.94-.53,1.6,1.6,0,0,0,.63-1.25,1.15,1.15,0,0,0-.56-1,8.27,8.27,0,0,0-1.94-.64,17.09,17.09,0,0,1-2.89-.92,2.76,2.76,0,0,1-1.64-2.56,3,3,0,0,1,.34-1.39,3.17,3.17,0,0,1,.94-1.06,4,4,0,0,1,1.2-.55,5.8,5.8,0,0,1,1.64-.23,6.5,6.5,0,0,1,2.31.38,3.15,3.15,0,0,1,1.47,1A4,4,0,0,1,298.1,68l-1.86.26a2,2,0,0,0-.73-1.35,2.68,2.68,0,0,0-1.71-.49,3.12,3.12,0,0,0-1.87.44,1.24,1.24,0,0,0-.55,1,1,1,0,0,0,.23.66,1.71,1.71,0,0,0,.72.51q.29.1,1.68.48a23.47,23.47,0,0,1,2.81.88,2.89,2.89,0,0,1,1.25,1,2.76,2.76,0,0,1,.45,1.62,3.27,3.27,0,0,1-.55,1.79,3.63,3.63,0,0,1-1.6,1.29,5.75,5.75,0,0,1-2.36.46,5.21,5.21,0,0,1-3.32-.91A4.17,4.17,0,0,1,289.23,73Z"/><path class="cls-4" d="M300.73,76.31V60.86h1.9V76.31Z"/><path class="cls-4" d="M312.87,74.93a7,7,0,0,1-2,1.26,5.78,5.78,0,0,1-2.09.37,4.06,4.06,0,0,1-2.83-.9,3,3,0,0,1-1-2.3,3,3,0,0,1,.37-1.5,3,3,0,0,1,1-1.09,4.46,4.46,0,0,1,1.36-.63,13.57,13.57,0,0,1,1.69-.28,17.34,17.34,0,0,0,3.38-.65c0-.26,0-.43,0-.5a2.08,2.08,0,0,0-.54-1.63,3.15,3.15,0,0,0-2.16-.65,3.34,3.34,0,0,0-2,.47,2.85,2.85,0,0,0-.94,1.66l-1.86-.25a4.71,4.71,0,0,1,.83-1.92,3.65,3.65,0,0,1,1.68-1.13,7.56,7.56,0,0,1,2.54-.4,6.87,6.87,0,0,1,2.33.34,3.14,3.14,0,0,1,1.31.85,2.85,2.85,0,0,1,.59,1.29,9.81,9.81,0,0,1,.1,1.75v2.53a26.94,26.94,0,0,0,.12,3.34,4.2,4.2,0,0,0,.48,1.35h-2A4.12,4.12,0,0,1,312.87,74.93Zm-.16-4.24a14.13,14.13,0,0,1-3.1.72,7,7,0,0,0-1.65.38,1.68,1.68,0,0,0-.75.61,1.66,1.66,0,0,0-.26.9,1.63,1.63,0,0,0,.57,1.27,2.48,2.48,0,0,0,1.68.5,4,4,0,0,0,1.95-.47,3,3,0,0,0,1.26-1.32,4.65,4.65,0,0,0,.3-1.89Z"/><path class="cls-4" d="M317.57,76.31V65.12h1.7v1.57a4,4,0,0,1,3.39-1.83,3.72,3.72,0,0,1,2,.52,2.82,2.82,0,0,1,1.12,1.44,4,4,0,0,1,3.46-2,3.41,3.41,0,0,1,2.56.93,4,4,0,0,1,.89,2.84v7.68h-1.89v-7a5.3,5.3,0,0,0-.18-1.64,1.64,1.64,0,0,0-.67-.81,2.11,2.11,0,0,0-1.14-.3,2.67,2.67,0,0,0-2,.78,3.47,3.47,0,0,0-.78,2.52v6.5h-1.89V69a3.18,3.18,0,0,0-.47-1.9,1.75,1.75,0,0,0-1.51-.63,2.74,2.74,0,0,0-1.48.42,2.34,2.34,0,0,0-1,1.23,7.06,7.06,0,0,0-.3,2.34v5.81Z"/><path class="cls-4" d="M335.55,63V60.86h1.9V63Zm0,13.27V65.12h1.9V76.31Z"/><path class="cls-4" d="M346.49,76.31V60.86h5.8a7.24,7.24,0,0,1,2.84.47,3.61,3.61,0,0,1,1.67,1.44,3.76,3.76,0,0,1,.61,2,3.53,3.53,0,0,1-.54,1.87,3.89,3.89,0,0,1-1.62,1.41,4,4,0,0,1,2.15,1.4,3.77,3.77,0,0,1,.76,2.34,4.6,4.6,0,0,1-.46,2,4,4,0,0,1-1.14,1.44,4.71,4.71,0,0,1-1.69.76,10.34,10.34,0,0,1-2.49.26Zm2.05-9h3.34a7.49,7.49,0,0,0,1.95-.18A2.11,2.11,0,0,0,355,66.4a2.25,2.25,0,0,0,.4-1.35A2.53,2.53,0,0,0,355,63.7a1.86,1.86,0,0,0-1.06-.8,8.9,8.9,0,0,0-2.35-.22h-3.08Zm0,7.13h3.84a8.81,8.81,0,0,0,1.39-.07A3.15,3.15,0,0,0,355,74a2.18,2.18,0,0,0,.78-.86,2.63,2.63,0,0,0,.31-1.3,2.58,2.58,0,0,0-.44-1.5,2.34,2.34,0,0,0-1.23-.9,7.72,7.72,0,0,0-2.26-.26h-3.57Z"/><path class="cls-4" d="M368,74.93a7,7,0,0,1-2,1.26,5.78,5.78,0,0,1-2.09.37,4.08,4.08,0,0,1-2.84-.9,3,3,0,0,1-1-2.3,3,3,0,0,1,.38-1.5,3,3,0,0,1,1-1.09,4.46,4.46,0,0,1,1.36-.63,13.24,13.24,0,0,1,1.69-.28,17.34,17.34,0,0,0,3.38-.65c0-.26,0-.43,0-.5a2.08,2.08,0,0,0-.54-1.63,3.15,3.15,0,0,0-2.16-.65,3.34,3.34,0,0,0-2,.47,2.85,2.85,0,0,0-.94,1.66l-1.86-.25a4.71,4.71,0,0,1,.83-1.92,3.65,3.65,0,0,1,1.68-1.13,7.56,7.56,0,0,1,2.54-.4,6.87,6.87,0,0,1,2.33.34,3.14,3.14,0,0,1,1.31.85,3,3,0,0,1,.59,1.29,9.81,9.81,0,0,1,.1,1.75v2.53a26.94,26.94,0,0,0,.12,3.34,4.2,4.2,0,0,0,.48,1.35h-2A4.12,4.12,0,0,1,368,74.93Zm-.16-4.24a14.13,14.13,0,0,1-3.1.72,7,7,0,0,0-1.65.38,1.68,1.68,0,0,0-.75.61,1.66,1.66,0,0,0-.26.9,1.63,1.63,0,0,0,.57,1.27,2.44,2.44,0,0,0,1.68.5,4,4,0,0,0,1.95-.47,3,3,0,0,0,1.26-1.32,4.65,4.65,0,0,0,.3-1.89Z"/><path class="cls-4" d="M372.73,76.31V65.12h1.7v1.59A4,4,0,0,1,378,64.86a4.75,4.75,0,0,1,1.86.37,3,3,0,0,1,1.27,1,3.85,3.85,0,0,1,.59,1.4,11.11,11.11,0,0,1,.1,1.85v6.88h-1.9V69.5a5,5,0,0,0-.22-1.73,1.83,1.83,0,0,0-.78-.92,2.5,2.5,0,0,0-1.32-.34,3.06,3.06,0,0,0-2.1.77,3.81,3.81,0,0,0-.88,2.92v6.11Z"/><path class="cls-4" d="M384.74,76.31V60.86h1.9v8.81l4.48-4.55h2.46l-4.28,4.15,4.71,7h-2.34L388,70.59l-1.33,1.28v4.44Z"/><path class="cls-4" d="M182.62,66.18a1.56,1.56,0,0,1-.48,1.15,1.6,1.6,0,0,1-1.18.48,1.65,1.65,0,0,1-1.36-.69,2.48,2.48,0,0,1-.54-1.55,3.55,3.55,0,0,1,.77-2.17A4.09,4.09,0,0,1,181.68,62l.3.58A3.22,3.22,0,0,0,180.32,65a1.5,1.5,0,0,1,.91-.34C182.16,64.66,182.62,65.17,182.62,66.18Z"/></g></g></svg>`
