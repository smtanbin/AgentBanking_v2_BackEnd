import React, { useEffect, useState } from "react"
import { useAuth } from "../../../../../Context/AuthProvider"
import Api from "../../../../../app/useApi"

interface IData {
  CR: number,
  DR: number
}

const useCurrentData = async (api: Api): Promise<any> => {
  const response = await api.useApi('GET', '/dashboard/charts/TotalDebitCreditCurrent')
  return response
}

const usePreviousData = async (api: Api): Promise<any> => {
  const response = await api.useApi('GET', '/dashboard/charts/TotalDebitCreditPrevious')
  return response
}

// const fetchData = async (dataSource: () => Promise<any>, setCr: React.Dispatch<React.SetStateAction<number[]>>, setDr: React.Dispatch<React.SetStateAction<number[]>>) => {
//   try {
//     const dataCr: number[] = []
//     const dataDr: number[] = []
//     dataSource().then((data) => {
//       data.forEach(({ CR, DR }) => {
//         dataCr.push(-CR)
//         dataDr.push(DR)
//       })
//       setCr(dataCr)
//       setDr(dataDr)
//     })
//   } catch (error) {
//     console.log(`Error fetching ${dataSource}: `, error)
//   }
// }


const fetchData = async (
  dataSource: (() => Promise<any>) | undefined,
  setCr: React.Dispatch<React.SetStateAction<number[]>>,
  setDr: React.Dispatch<React.SetStateAction<number[]>>
) => {
  try {
    if (typeof dataSource === 'function') {
      const dataCr: number[] = [];
      const dataDr: number[] = [];
      const data = await dataSource();
      data.forEach(({ CR, DR }: { CR: number; DR: number }) => {
        dataCr.push(CR);
        dataDr.push(DR);
      });
      setCr(dataCr);
      setDr(dataDr);
    }
  } catch (error) {
    console.error(`Error fetching ${dataSource}: `, error);
  }
};



// const useChartData = () => {
//   const auth = useAuth()
//   const api = new Api(auth)
//
//   const [currentCr, setCurrentCr] = useState<number[]>([])
//   const [currentDr, setCurrentDr] = useState<number[]>([])
//   const [pastCr, setPastCr] = useState<number[]>([])
//   const [pastDr, setPastDr] = useState<number[]>([])
//
//   useEffect(() => {
//
//     const fetchDataInterval = setInterval(async () => {
//       await fetchData(await useCurrentData(api), setCurrentCr, setCurrentDr)
//     }, 30000)
//
//     const _FetchData = async () => {
//       fetchData(await useCurrentData(api), setCurrentCr, setCurrentDr)
//       fetchData(await usePreviousData(api), setPastCr, setPastDr)
//     }
//     _FetchData()
//
//     return () => clearInterval(fetchDataInterval)
//   }, [auth.token])
//
//   return { currentCr, currentDr, pastCr, pastDr }
// }

const useChartData = () => {
  const auth = useAuth()
  const api = new Api(auth)

  const [currentCr, setCurrentCr] = useState<number[]>([0])
  const [currentDr, setCurrentDr] = useState<number[]>([0])
  const [pastCr, setPastCr] = useState<number[]>([0])
  const [pastDr, setPastDr] = useState<number[]>([0])

  useEffect(() => {
    const fetchDataInterval = setInterval(async () => {
      await fetchData(() => useCurrentData(api), setCurrentCr, setCurrentDr)
    }, 30000)

    const _FetchData = async () => {
      await fetchData(() => useCurrentData(api), setCurrentCr, setCurrentDr)
      await fetchData(() => usePreviousData(api), setPastCr, setPastDr)
    }
    _FetchData()

    return () => clearInterval(fetchDataInterval)
  }, [auth.token])

  return { currentCr, currentDr, pastCr, pastDr }
}


export default useChartData
