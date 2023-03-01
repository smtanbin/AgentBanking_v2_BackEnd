export const formatDateString = (input: any) => formatDate(new Date(input))

export const formatDate = (input: any) => {
  const date = new Date(input)
  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "short" })
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

// Account Number format
export const checkAccountNumber = (str: any) =>
  str.startsWith("108") ? str : alert("Please enter a valid account number")
