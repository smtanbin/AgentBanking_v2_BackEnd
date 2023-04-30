import React, { useCallback, useEffect, useState } from "react";
import { Placeholder } from "rsuite";
import { useAuth } from "../../../../Context/AuthProvider";
import { Table } from "rsuite";
import { Column, HeaderCell, Cell } from "rsuite-table";
import Api from "../../../../app/useApi";

interface TableData {
  EVENT: string;
  STATUS: string;
  TOTAL: number;
  AMT: number;
}

const PendingEvent: React.FC = () => {

  const auth = useAuth();
  const api = new Api(auth);
  const [error, setError] = useState(true);
  const [tableData, setTableData] = useState<TableData[] | undefined>(undefined);

  const getBalanceChartData = useCallback(async () => {
    try {

      const response = await api.useApi('GET', "/dashboard/tables/pendingEvent")

      setError(false);
      setTableData(response);
    } catch (err) {
      // toast.error("Error retrieving balance chart");
      setError(true);
      console.error("Error retrieving balance chart" + err);
    }
  }, [auth.token]);

  useEffect(() => {
    const interval = setInterval(() => {
      getBalanceChartData();
    }, 4 * 60 * 1000); // 4 minutes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getBalanceChartData();
  }, [getBalanceChartData]);

  return (
    <>
      {error ? (
        <Placeholder.Paragraph />
      ) : (
        <Table cellBordered fillHeight data={tableData}>
          <Column flexGrow={2}>
            <HeaderCell>Event</HeaderCell>
            <Cell dataKey="EVENT" />
          </Column>
          <Column flexGrow={2}>
            <HeaderCell>Status</HeaderCell>
            <Cell dataKey="STATUS" />
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>Number</HeaderCell>
            <Cell dataKey="TOTAL" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Amount</HeaderCell>
            <Cell dataKey="AMT" />
          </Column>
        </Table>
      )}
    </>
  );
};

export default PendingEvent;
function setError(arg0: boolean) {
  throw new Error("Function not implemented.");
}

