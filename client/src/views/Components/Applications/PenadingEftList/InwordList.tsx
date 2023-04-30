import React, { RefAttributes } from "react"
import { Panel, Table } from "rsuite"
import { InnerCellProps } from "rsuite-table/lib/Cell"


interface InwordListProps {
    detailList: any;
}


export const InwordList: React.FC<InwordListProps> = ({ detailList }) => {
    const { Column, HeaderCell, Cell } = Table

    const CompactCell = (props: JSX.IntrinsicAttributes & InnerCellProps & RefAttributes<HTMLDivElement>) => <Cell {...props} style={{ padding: 6 }} />

    return (<Panel header="List" bordered bodyFill>
        <Table
            loading={!detailList}
            data={detailList}
            rowHeight={30}
            virtualized

            affixHeader
            affixHorizontalScrollbar
        >
            <Column width={50} align="center" fixed>
                <HeaderCell>Id</HeaderCell>
                <CompactCell dataKey="index" />
            </Column>

            <Column width={110} align="center" fullText fixed>
                <HeaderCell>Account No</HeaderCell>
                <CompactCell dataKey="ACTNUM" />
            </Column>

            <Column width={150} fullText>
                <HeaderCell>Titel</HeaderCell>
                <CompactCell dataKey="ABS_AC_TITEL" />
            </Column>
            <Column width={150} fullText>
                <HeaderCell>Reciver</HeaderCell>
                <CompactCell dataKey="RECIVER" />
            </Column>
            <Column width={50} fullText>
                <HeaderCell>Match</HeaderCell>
                <CompactCell dataKey="match" />
            </Column>

            <Column width={150} fullText>
                <HeaderCell>Sender</HeaderCell>
                <CompactCell dataKey="SENDER" />
            </Column>
            <Column width={120} fullText>
                <HeaderCell>Orgin Branch</HeaderCell>
                <CompactCell dataKey="ORIG_BRANCH_NAME" />
            </Column>
            <Column width={120} fullText>
                <HeaderCell>Orgin Bank</HeaderCell>
                <CompactCell dataKey="ORIG_BANK_NAME" />
            </Column>
            <Column width={100} align="right" fullText>
                <HeaderCell>Amount</HeaderCell>
                <CompactCell dataKey="AMOUNT" />
            </Column>
            <Column width={80}>
                <HeaderCell>Status</HeaderCell>
                <CompactCell dataKey="HONOURED" />
            </Column>
            <Column width={150} fullText>
                <HeaderCell>Remarks</HeaderCell>
                <CompactCell dataKey="NOTE" />
            </Column>
        </Table>
    </Panel>)

}