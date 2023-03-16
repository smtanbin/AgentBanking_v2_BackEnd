import React from "react";
import { Panel, PanelGroup, Placeholder, Row, Col, Container } from "rsuite";
// Charts
import BalanceChart from "./dashboard/Charts/BalanceChart";
import LineChart from "./dashboard/Charts/TransactionChart";
// Tabels
import GlobalEvent from "./dashboard/Tables/GlobalEvent";
import PendingEvent from "./dashboard/Tables/PendingEvent";

const Card: React.FC = (props) => (
  <Panel {...props} header="Card title">
    <Placeholder.Paragraph />
  </Panel>
);

const Cards: React.FC = () => {
  return (
    <Row>
      <div style={{ paddingTop: "2rem" }}>
        <Col sm={6}>
          <Card />
          <br />
          <Card />
        </Col>
        <Col sm={6}>
          <Card />
          <br />
          <Card />
        </Col>
        <Col sm={12}>
          <Panel header="Transaction Chart" bodyFill>
            <LineChart />
          </Panel>
        </Col>
      </div>
    </Row>
  );
};

const DataChart: React.FC = () => {
  return (
    <Row className="show-grid">
      <div style={{ paddingTop: "2rem" }}>
        <Col xs={16}>
          <PanelGroup accordion>
            <Panel header="Pending Events" bodyFill defaultExpanded>
              <PendingEvent />
            </Panel>
            <Panel header="Events" bodyFill defaultExpanded>
              <GlobalEvent />
            </Panel>
          </PanelGroup>
        </Col>
        <Col xs={8}>
          <Panel header="Balance Chart" bodyFill>
            <div style={{ padding: "2rem" }}>
              <BalanceChart />
            </div>
          </Panel>
        </Col>
      </div>
    </Row>
  );
};

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Cards />
      <br />
      <DataChart />
    </Container>
  );
};

export default Dashboard;
