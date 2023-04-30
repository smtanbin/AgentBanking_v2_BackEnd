import { useEffect, useState, memo } from "react";
import { useAuth } from "../../../../Context/AuthProvider";
import Api from "../../../../app/useApi";
import { Table } from "rsuite";
import moment from "moment";

const MemoizedTable = memo(({ data }: { data: any[] }) => {
    const { Column, HeaderCell, Cell } = Table;

    return (
        <Table wordWrap="break-word" autoHeight data={data}>
            <Column flexGrow={1} align="center" fixed>
                <HeaderCell>Contact</HeaderCell>
                <Cell dataKey="MPHONE" />
            </Column>
            <Column flexGrow={0.7}>
                <HeaderCell>Timestamp</HeaderCell>
                <Cell dataKey="IN_TIME">
                    {(rowData: any) =>
                        moment(rowData.IN_TIME).format("MMMM DD, YYYY HH:mm:ss")
                    }
                </Cell>
            </Column>
            <Column flexGrow={5} resizable>
                <HeaderCell>Content</HeaderCell>
                <Cell dataKey="OUT_MSG" />
            </Column>
            <Column flexGrow={1}>
                <HeaderCell>Status</HeaderCell>
                <Cell dataKey="STATUS" />
            </Column>
        </Table>
    );
});

export default () => {
    const auth = useAuth();
    const api = new Api(auth);
    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.useApi("GET", "/massageLog/list");
                setTableData(response);
            } catch (e) {
                console.log("Error" + e);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <h3 style={{ color: "#34c3ff", marginBottom: "1rem" }}>System Log</h3>
            <MemoizedTable data={tableData} />
        </>
    );
};
