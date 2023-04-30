import React, { RefAttributes } from "react"
import { Panel, Table } from "rsuite"


interface InwordSummeryListProps {
    summeryList: any;
}


export const InwordSummeryList: React.FC<InwordSummeryListProps> = ({ summeryList }) => {

    const { Column, HeaderCell, Cell } = Table

    return (<div style={{ marginRight: "1rem" }}>
        <Panel header="Summery" bordered bodyFill>
            <Table
                loading={!summeryList}
                data={summeryList}

                autoHeight
            >
                <Column flexGrow={2} align="center">
                    <HeaderCell>Products</HeaderCell>
                    <Cell dataKey="TYPE" />
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Total</HeaderCell>
                    <Cell dataKey="COUNT" />
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Amount</HeaderCell>
                    <Cell dataKey="SUM" />
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Status</HeaderCell>
                    <Cell dataKey="HONOURED" />
                </Column>
            </Table>
        </Panel>
    </div>)

}