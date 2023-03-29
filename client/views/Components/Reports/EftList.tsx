import React, { useState, useEffect } from "react"
import {
  getEftList,
  getEftReturnList,
  getEftSummeryList,
  getReport,
} from "./Functions"

import {
  Container,
  Divider,
  Table,
  Panel,
  IconButton,
  FlexboxGrid,
} from "rsuite"
import { useAuth } from "../../../Context/AuthProvider"
import Api from "../../../app/useApi"


const { Column, HeaderCell, Cell } = Table
import SortDownIcon from "@rsuite/icons/SortDown"

const EftList: React.FC = () => {
  const auth = useAuth()
  const api = new Api(auth)

  const [summeryList, setSummeryList] = useState()
  const [detailList, setDetailList] = useState()
  const [returnList, setReturnList] = useState()
  const [loadingState, setLoadingState] = useState(false)

  const handelReport = () => {


    const fatchdata = async () => {
      setLoadingState(true)
      const _status = await getReport(api)
      setLoadingState(_status)
    }
    fatchdata()
  }

  useEffect(() => {
    const fatchdata = async () => {
      const _setSummeryList = await getEftSummeryList(api);
      setSummeryList(_setSummeryList);

      const _setDetailList = await getEftList(api);
      setDetailList(_setDetailList);

      const _setReturnList = await getEftReturnList(api);
      setReturnList(_setReturnList);
    };
    fatchdata();
  }, [])

  const data = []
  return (
    <Container>
      <Panel header="List of Electronic Funds Transfer (EFT)">
        <IconButton
          color="violet"
          appearance="primary"
          icon={<SortDownIcon />}
          size="lg"
          onClick={handelReport}
          loading={loadingState}
        >
          Download
        </IconButton>
        <Divider />
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={24}>
            <Panel header="List" bordered bodyFill>
              <Table
                loading={!detailList}
                data={detailList}
                virtualized
                wordWrap="fullText"
                autoHeight
              >
                <Column align="center" fixed>
                  <HeaderCell>Id</HeaderCell>
                  <Cell dataKey="index" />
                </Column>

                <Column flexGrow={2} fixed>
                  <HeaderCell>Account No</HeaderCell>
                  <Cell dataKey="ACTNUM" />
                </Column>

                <Column flexGrow={2}>
                  <HeaderCell>Titel</HeaderCell>
                  <Cell dataKey="ABS_AC_TITEL" />
                </Column>
                <Column flexGrow={2}>
                  <HeaderCell>Reciver</HeaderCell>
                  <Cell dataKey="RECIVER" />
                </Column>
                <Column>
                  <HeaderCell>Match</HeaderCell>
                  <Cell dataKey="match" />
                </Column>

                <Column>
                  <HeaderCell>Sender</HeaderCell>
                  <Cell dataKey="SENDER" />
                </Column>
                <Column>
                  <HeaderCell>Orgin Branch</HeaderCell>
                  <Cell dataKey="ORIG_BRANCH_NAME" />
                </Column>
                <Column>
                  <HeaderCell>Orgin Bank</HeaderCell>
                  <Cell dataKey="ORIG_BANK_NAME" />
                </Column>
                <Column>
                  <HeaderCell>Amount</HeaderCell>
                  <Cell dataKey="AMOUNT" />
                </Column>
                <Column>
                  <HeaderCell>Status</HeaderCell>
                  <Cell dataKey="HONOURED" />
                </Column>
                <Column>
                  <HeaderCell>Remarks</HeaderCell>
                  <Cell dataKey="NOTE" />
                </Column>
              </Table>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Divider />
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={8}>
            <div style={{ marginRight: "1rem" }}>
              <Panel header="Summery" bordered bodyFill>
                <Table
                  loading={!summeryList}
                  data={summeryList}
                  resizable
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
            </div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={16}>
            <Panel header="Return" bordered bodyFill>
              <Table
                loading={!returnList}
                data={returnList}
                CompactCell
                resizable
                autoHeight
                virtualized
              >
                <Column width={70} align="center" fixed>
                  <HeaderCell>Id</HeaderCell>
                  <Cell dataKey="id" />
                </Column>

                <Column width={200} fixed>
                  <HeaderCell>Account No</HeaderCell>
                  <Cell dataKey="name" />
                </Column>

                <Column width={200}>
                  <HeaderCell>Reciver</HeaderCell>
                  <Cell dataKey="city" />
                </Column>

                <Column width={300}>
                  <HeaderCell>Titel</HeaderCell>
                  <Cell dataKey="email" />
                </Column>
                <Column width={300}>
                  <HeaderCell>Origin</HeaderCell>
                  <Cell dataKey="email" />
                </Column>
                <Column width={300}>
                  <HeaderCell>Amount</HeaderCell>
                  <Cell dataKey="email" />
                </Column>
                <Column width={300}>
                  <HeaderCell>Status</HeaderCell>
                  <Cell dataKey="email" />
                </Column>
              </Table>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Panel>
    </Container>
  )
}
export default EftList
