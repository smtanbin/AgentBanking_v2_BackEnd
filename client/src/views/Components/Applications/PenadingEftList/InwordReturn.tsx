import React, { RefAttributes } from "react"
import { Panel, Table } from "rsuite"
import { InnerCellProps } from "rsuite-table/lib/Cell"


interface InwordListProps {
    returnList: any;
}


export const InwordReturn: React.FC<InwordListProps> = ({ returnList }) => {
    const { Column, HeaderCell, Cell } = Table

    const CompactCell = (props: JSX.IntrinsicAttributes & InnerCellProps & RefAttributes<HTMLDivElement>) => <Cell {...props} style={{ padding: 6 }} />

    return (<Panel header="Return" bordered bodyFill>
        <Table
            loading={!returnList}
            data={returnList}
            autoHeight
            virtualized
        >
            <Column width={70} align="center" fixed>
                <HeaderCell>Id</HeaderCell>
                <CompactCell dataKey="id" />
            </Column>

            <Column width={200} fixed>
                <HeaderCell>Account No</HeaderCell>
                <CompactCell dataKey="name" />
            </Column>

            <Column width={200}>
                <HeaderCell>Reciver</HeaderCell>
                <CompactCell dataKey="city" />
            </Column>

            <Column width={300}>
                <HeaderCell>Titel</HeaderCell>
                <CompactCell dataKey="email" />
            </Column>
            <Column width={300}>
                <HeaderCell>Origin</HeaderCell>
                <CompactCell dataKey="email" />
            </Column>
            <Column width={300}>
                <HeaderCell>Amount</HeaderCell>
                <CompactCell dataKey="email" />
            </Column>
            <Column width={300}>
                <HeaderCell>Status</HeaderCell>
                <CompactCell dataKey="email" />
            </Column>
        </Table>
    </Panel>)

}