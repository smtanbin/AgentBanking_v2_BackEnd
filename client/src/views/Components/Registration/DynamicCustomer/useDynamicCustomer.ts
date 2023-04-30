export default class useDynamicCustomer {
  api: any
  constructor(api: any) {
    // Save the auth object as an instance variable
    this.api = api
  }

  fatchCustomerData = async (setData: (arg0: any) => void, id: any) => {
    try {
      const response = await this.api.useApi("POST", "/customer/search", {
        params: id,
      })
      setData(response[0])
      return response[0]
    } catch (e: any) {
      throw new Error(e)
    }
  }

  fetchProfilePicture = async (setProfilePicture: any, accountNo: string) => {
    try {
      const response: any = await this.api.useApi(
        "POST",
        "/customer/getImage",
        {
          params: accountNo,
        }
      )
      if (!response[0].IMG) {
        console.log("No image found")
        return undefined
      }
      const base64Data = response[0].IMG
      const dataUrl: any = `data:image/jpeg;base64,${base64Data}`
      setProfilePicture(dataUrl)
    } catch (err: any) {
      throw new Error("Error fetching  profile picture. Error: ", err)
    }
  }

  fetchImgData = async (accountNo: any) => {
    try {
      const imageArr: any = []
      const response: any = await this.api.useApi(
        "POST",
        "/customer/getImageData",
        {
          params: accountNo,
        }
      )
      if (Array.isArray(response)) {
        response.forEach(({ SL_NO, IMG, IMAGE_TYPE_ID }: any) => {
          try {
            const base64Data = IMG
            const dataUrl = `data:image/jpeg;base64,${base64Data}`
            imageArr.push({ sl: SL_NO, type: IMAGE_TYPE_ID, img: dataUrl })
          } catch (err: any) {
            throw new Error("Error fetching  pictures Error: ", err)
          }
        })
      } else if (response && typeof response === "object") {
        try {
          const base64Data = response.IMG
          const dataUrl = `data:image/jpeg;base64,${base64Data}`
          imageArr.push({
            sl: response.SL_NO,
            type: response.IMAGE_TYPE_ID,
            img: dataUrl,
          })
        } catch (err: any) {
          throw new Error("Error fetching  pictures Error: ", err)
        }
      }
      return imageArr
    } catch (err: any) {
      console.error(err)
      return undefined
    }
  }

  fatchMiniStatment = async (setMinistatment: any, accountNo: any) => {
    try {
      const response = await this.api.useApi(
        "POST",
        "/trReportRoute/ministatment",
        {
          mphone: accountNo,
        }
      )
      setMinistatment(response)
    } catch (e: any) {
      throw new Error(e)
    }
  }
}
