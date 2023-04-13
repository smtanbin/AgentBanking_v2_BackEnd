export const capitalizeWords = (str: string): string => {
  if (str) {
    str = str.toLowerCase()
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  } else return str
}
