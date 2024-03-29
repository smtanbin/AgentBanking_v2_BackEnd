import { Icon } from "@rsuite/icons"
const Logo = ({ color = "#6b5aa4" }) => {
  const SvgIcon = `<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 167.14 97.29"><defs><style>.cls-1{fill:${color}}</style></defs><path class="cls-1" d="M0,4.45c27.86,15.37,55.71,30.75,83.57,46.12,27.86-15.37,55.71-30.75,83.57-46.12V97.29C148.86,64.86,130.57,32.43,112.29,0c-9.57,32.43-19.14,64.86-28.71,97.29C74.14,64.86,64.71,32.43,55.29,0,36.86,32.43,18.43,64.86,0,97.29V4.45Z"/></svg>`
  return <Icon as={SvgIcon} />
}

export default Logo
