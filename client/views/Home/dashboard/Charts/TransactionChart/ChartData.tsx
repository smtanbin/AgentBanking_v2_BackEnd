import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../../../../../Context/AuthProvider"

interface IData {
  CR: number,
  DR: number
}

const useCurrentData = async (token: { token: string, refreshToken: string }) => {
  const response = await axios.get<IData[]>(
    process.env.VITE_API_URL +
    "/api/dashboard/charts/TotalDebitCreditCurrent",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.token,
        refrash_key: token.refreshToken,
      },
    }
  )
  return response.data
}

const usePreviousData = async (token: { token: string, refreshToken: string }) => {
  const response = await axios.get<IData[]>(
    process.env.VITE_API_URL +
    "/api/dashboard/charts/TotalDebitCreditPrevious",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.token,
        refrash_key: token.refreshToken,
      },
    }
  )
  return response.data
}

const fetchData = async (dataSource: (token: { token: string, refreshToken: string }) => Promise<IData[]>, setCr: React.Dispatch<React.SetStateAction<number[]>>, setDr: React.Dispatch<React.SetStateAction<number[]>>, token: { token: string, refreshToken: string }) => {
  try {
    const dataCr: number[] = []
    const dataDr: number[] = []
    const data = await dataSource(token)

    data.forEach(({ CR, DR }) => {
      dataCr.push(-CR)
      dataDr.push(DR)
    })

    setCr(dataCr)
    setDr(dataDr)
  } catch (error) {
    console.log(`Error fetching ${dataSource}: `, error)
  }
}

const useChartData = () => {
  const { token }: any = useAuth()
  const [currentCr, setCurrentCr] = useState<number[]>([])
  const [currentDr, setCurrentDr] = useState<number[]>([])
  const [pastCr, setPastCr] = useState<number[]>([])
  const [pastDr, setPastDr] = useState<number[]>([])

  useEffect(() => {
    const fetchDataInterval = setInterval(async () => {
      await fetchData(useCurrentData, setCurrentCr, setCurrentDr, token)
    }, 30000)
    fetchData(useCurrentData, setCurrentCr, setCurrentDr, token)
    fetchData(usePreviousData, setPastCr, setPastDr, token)
    return () => clearInterval(fetchDataInterval)
  }, [token])

  return { currentCr, currentDr, pastCr, pastDr }
}

export default useChartData
