export const generateRandomColors = (numColors: number) => {
  const colors: any = []
  for (let i = 0; i < numColors; i++) {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.8)`
    colors.push(color)
  }
  return colors
}
