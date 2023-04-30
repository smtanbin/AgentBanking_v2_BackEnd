import React from "react"
import { Container } from "rsuite"
import Dashboard from "./Dashboard"

const Home: React.FC = () => {
  return (
    <Container>
      <div style={{ padding: "1rem" }}>
        <Dashboard />
      </div>
    </Container>
  )
}
export default Home