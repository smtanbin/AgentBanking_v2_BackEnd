import { useState } from "react"
import CryptoJS from 'crypto-js'

export function useEncryptedLocalStorage<T>(
  keyName: string,
  defaultValue: T,
): [T, (value: T) => void] {
  const secretKey: string = '111141277106458227980240276844959103223194531487196222630920778908889714447117'
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(keyName)
      if (item) {
        const bytes = CryptoJS.AES.decrypt(item, secretKey)
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        return decryptedData
      }
    } catch (error) {
      console.error(`Error loading "${keyName}" from localStorage: `, error)
    }
    return defaultValue
  })

  const setValue = (value: T): void => {
    try {
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(value),
        secretKey
      ).toString()
      window.localStorage.setItem(keyName, encryptedData)
      setStoredValue(value)
    } catch (error) {
      console.error(`Error saving "${keyName}" to localStorage: `, error)
    }
  }

  return [storedValue, setValue]
}
export function useLocalStorage<T>(
  keyName: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] =
    useState<
      T>
      (() => {
        try {
          const item = window.localStorage.getItem(keyName)
          return item ? JSON.parse(item) : defaultValue
        } catch (error) {
          console.error(`Error loading "${keyName}" from localStorage: `, error)
          return defaultValue
        }
      })

  const setValue = (value: T): void => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(value))
      setStoredValue(value)
    } catch (error) {
      console.error(`Error saving "${keyName}" to localStorage: `, error)
    }
  }

  return [storedValue, setValue]
}
