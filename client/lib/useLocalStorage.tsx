import { useState } from "react"

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
