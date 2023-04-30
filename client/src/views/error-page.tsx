import React from "react"

const ErrorPage: React.FC<any> = ({ errorMassage }) => {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{errorMassage ? errorMassage.toString() : "Unknown Error"}</p>
    </div>
  )
}
export default ErrorPage