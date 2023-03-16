import React, { useCallback, useEffect, useState } from "react";
import { Panel, Placeholder } from "rsuite";
import axios from "axios";
import { useAuth } from "../../../../Context/AuthProvider";
import { Table } from "rsuite";
import { Column, HeaderCell, Cell } from "rsuite-table";
import { toast } from "react-toastify";

const GlobalEvent: React.FC = () => {
  const { token }: any = useAuth();
  const [error, setError] = useState<boolean>(true);
  const [tableData, setTableData] = useState<any[]>();

  const getBalanceChartData = useCallback(async () => {
    try {
      const response = await axios.get<any>(
        process.env.VITE_API_URL + "/api/dashboard/tables/event",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.token,
            refrash_key: token.refreshToken,
          },
        }
      );

      if (response.status === 200) {
        setError(false);
        setTableData(response.data);
      } else {
        toast.error("Error retrieving balance chart: " + response.statusText);
        setError(true);
      }
    } catch (err) {
      toast.error("Error retrieving balance chart" + err);
    }
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      getBalanceChartData();
    }, 13 * 60 * 1000); // 13 minutes

    return () => clearInterval(interval);
  }, [getBalanceChartData]);

  useEffect(() => {
    getBalanceChartData();
  }, [getBalanceChartData]);

  return (
    <>
      {error ? (
        <Placeholder.Paragraph />
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
