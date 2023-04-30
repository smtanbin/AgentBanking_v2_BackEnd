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
export const generateRandomHexColors = (numColors: number) => {
    const colors: any = [];
    for (let i = 0; i < numColors; i++) {
        let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        while (color.length < 7) {
            color += "0";
        }
        colors.push(color);
    }
    return colors;
}
export const generateColor = () => {
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.8)`

  return color
}