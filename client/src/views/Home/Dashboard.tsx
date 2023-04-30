import React, { Dispatch, SetStateAction, useState } from "react";
import { Panel, PanelGroup, Placeholder, Row, Col, Container } from "rsuite";
// Charts
import BalanceChart from "./dashboard/Charts/BalanceChart";
import TransactionChart from "./dashboard/Charts/TransactionChart";

// Tabels
import GlobalEvent from "./dashboard/Tables/GlobalEvent";
import PendingEvent from "./dashboard/Tables/PendingEvent";
import BalanceDifference from "./dashboard/Charts/balanceDifference";


const Card: React.FC = (props) => (
    <Panel {...props} header="Card title">
        <Placeholder.Paragraph />
    </Panel>
);

interface CardsProps {
    totalBalance: number;
}
interface DataChartProps {
    setTotalBalance: Dispatch<SetStateAction<number>>;
}

const Cards: React.FC<CardsProps> = ({ totalBalance }) => {
    return (
        <Row>

            <Col sm={6}>
                <Card />
            </Col>
            <Col sm={6}>
                <Panel header="Total Balance">
                    <h4> {totalBalance ? totalBalance.toFixed(2) : "NAN"} BDT</h4>
                </Panel>
                <Panel header="Balance Difference">
                    <BalanceDifference />
                </Panel>

            </Col>

            <Col sm={12}>
                <Panel header="Transaction Chart" bodyFill>
                    <TransactionChart />
                </Panel>
            </Col>
        </Row>
    );
};

const DataChart: React.FC<DataChartProps> = ({ setTotalBalance }) => {
    return (
        <Row className="show-grid">
            <Col xs={24} md={8}>
                <Panel header="Balance Chart" bodyFill>
                    <BalanceChart setTotalBalance={setTotalBalance} />
                </Panel>
            </Col>
            <Col xs={24} md={16}>
                <div style={{ paddingTop: "2rem" }}>
                    <PanelGroup accordion>
                        <Panel header="Pending Events" bodyFill defaultExpanded>
                            <PendingEvent />
                        </Panel>
                        <Panel header="Events" bodyFill defaultExpanded>
                            <GlobalEvent />
                        </Panel>
                    </PanelGroup>
                </div>
            </Col>
        </Row>
    );
};


const Dashboard: React.FC = () => {

    const [totalBalance, setTotalBalance] = useState<any>(0)

    return (
        <Container>
            <Cards totalBalance={totalBalance} />
            <hr />
            <DataChart setTotalBalance={setTotalBalance} />
        </Container>
    );
};

export default Dashboard;
