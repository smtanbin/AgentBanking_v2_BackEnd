import React, { useCallback, useEffect, useState } from "react";
import { Panel, Placeholder, Table } from "rsuite";
import { Column, HeaderCell, Cell } from "rsuite-table";
import { useAuth } from "../../../../Context/AuthProvider";
import Api from "../../../../app/useApi";
import { toast } from "react-toastify";

const GlobalEvent: React.FC = () => {
  const auth = useAuth();
  const api = new Api(auth);

  const [error, setError] = useState<boolean>(true);
  const [tableData, setTableData] = useState<any[]>();

  const getBalanceChartData = useCallback(async () => {
    try {
      const response = await api.useApi('GET', "/dashboard/tables/event")
      setError(false);
      setTableData(response);
    } catch (err) {
      // toast.error("Error retrieving balance chart: " + err.response.statusText);
      setError(true)
      console.error("Error retrieving balance chart" + err);
      return <div>Error</div>
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getBalanceChartData();
    }, 13 * 60 * 1000); // 13 minutes
    getBalanceChartData()
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   getBalanceChartData();
  // }, []);



  return (
    <>
      {error ? (
        <div>Error</div>
      ) : (
        <Table cellBordered autoHeight data={tableData}>
          <Column flexGrow={1}>
            <HeaderCell>Count</HeaderCell>
            <Cell dataKey="NO" />
          </Column>
          <Column flexGrow={2}>
            <HeaderCell>Event</HeaderCell>
            <Cell dataKey="PARTICULAR" />
          </Column>
          <Column flexGrow={2}>
            <HeaderCell>Amount</HeaderCell>
            <Cell dataKey="AMT" />
          </Column>
        </Table>
      )}
    </>
  );
};

export default GlobalEvent;
