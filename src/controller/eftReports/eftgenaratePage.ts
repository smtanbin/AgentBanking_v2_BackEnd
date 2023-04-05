import handlebars from "handlebars"
import path from "path"
import fs from "fs"
import EftReportModel from "../../model/Models/eftModel/eftModel"
const eft: any = new EftReportModel()

export const eftgenaratePage = async () => {
  return new Promise<any>(async (resolve, reject) => {
    const date: any = new Date(Date.now())
    const sumData: any = await eft.sum()
    const summery = sumData
    sumData.summery = summery

    const template = handlebars.compile(
      fs.readFileSync(
        path.resolve(__dirname, "src/controller/eftReports", "Template.html"),
        "utf8"
      )
    )
    console.log(sumData)
    return await template(sumData)

    //          const dtlData: any = await eft.list()
    //   const returnData: any = await eft.return()

    //   let totalCount = 0
    //   let totalBalance = 0
  })
}
