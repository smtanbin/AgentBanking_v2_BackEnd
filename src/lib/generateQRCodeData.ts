import QRCode from "qrcode"
const generateQRCodeData = async (data: any) => {
  return new Promise((resolve, reject) => {
    const stringdata: string = JSON.stringify(data)
    QRCode.toDataURL(stringdata, (err, qrCodeData) => {
      if (err) {
        reject(err)
      } else {
        resolve(qrCodeData)
      }
    })
  })
}

export default generateQRCodeData
