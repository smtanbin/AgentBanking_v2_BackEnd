<<<<<<< HEAD
import React, { useState, useEffect } from "react"
import {
    getEftList,
    getEftReturnList,
    getEftSummeryList,
    getReport,
} from "../../Reports/EftFunctions"

import {
    Container,
    Divider,
    Table,
    Panel,
    IconButton,
    FlexboxGrid
} from "rsuite"
import { useAuth } from "../../../../Context/AuthProvider"
import Api from "../../../../app/useApi"


const { Cell } = Table
import SortDownIcon from "@rsuite/icons/SortDown"
import { InnerCellProps } from "rsuite-table/lib/Cell"
import { InwordList } from "./InwordList"
import { InwordSummeryList } from "./InwordSummeryList"
import { InwordReturn } from "./InwordReturn"


const CompactCell = (props: JSX.IntrinsicAttributes & InnerCellProps & React.RefAttributes<HTMLDivElement>) => <Cell {...props} style={{ padding: 6 }} />




const PenadingEftList: React.FC = () => {
    const auth = useAuth()
    const api = new Api(auth)

    const [summeryList, setSummeryList] = useState<any>()
    const [detailList, setDetailList] = useState<any>()
    const [returnList, setReturnList] = useState<any>()
    const [loadingState, setLoadingState] = useState<boolean>(false)


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

    return (

        <Container>
            <Panel header="List of Electronic Funds Transfer (EFT)">
                <IconButton

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
                        <InwordList detailList={detailList} />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <Divider />
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={8}>
                        <InwordSummeryList summeryList={summeryList} />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={16}>
                        <InwordReturn returnList={returnList} />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Panel>
        </Container>
    )
}
export default PenadingEftList
=======
import React, { useState, useEffect } from "react"
import {
    getEftList,
    getEftReturnList,
    getEftSummeryList,
    getReport,
} from "./EftFunctions"

import {
    Container,
    Divider,
    Table,
    Panel,
    IconButton,
    Button,
    FlexboxGrid
} from "rsuite"
import { useAuth } from "../../../../Context/AuthProvider"
import Api from "../../../../app/useApi"


const { Column, HeaderCell, Cell } = Table
import SortDownIcon from "@rsuite/icons/SortDown"
import { InnerCellProps } from "rsuite-table/lib/Cell"
import { InwordList } from "./InwordList"
import { InwordSummeryList } from "./InwordSummeryList"
import { InwordReturn } from "./InwordReturn"


const CompactCell = (props: JSX.IntrinsicAttributes & InnerCellProps & React.RefAttributes<HTMLDivElement>) => <Cell {...props} style={{ padding: 6 }} />




const PenadingEftList: React.FC = () => {
    const auth = useAuth()
    const api = new Api(auth)

    const [summeryList, setSummeryList] = useState<any>()
    const [detailList, setDetailList] = useState<any>()
    const [returnList, setReturnList] = useState<any>()
    const [error, setError] = useState<string>()
    const [loadingState, setLoadingState] = useState<boolean>(false)


    const handelReport = () => {
        const fatchdata = async () => {
            setLoadingState(true)
            setError(undefined)
            const _status = await getReport(api, ((note: string) => {
                setError(note)
            }))
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

    return (
        <>
            <Container>
                <Panel header="List of Electronic Funds Transfer (EFT)">
                    <IconButton

                        appearance="primary"
                        color={error ? "red" : "blue"}
                        icon={<SortDownIcon />}
                        size="lg"
                        onClick={handelReport}
                        loading={loadingState}
                    >
                        Download
                    </IconButton>
                    <Divider />
                    {error ?
                        <div style={{ paddingBottom: 15 }}>
                            <Panel
                                header={
                                    <h6 style={{ color: 'red' }
                                    }>
                                        {error}
                                    </h6>}
                                bordered
                                bodyFill>
                                {/* <div style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 15 }}>
                                    <FlexboxGrid>
                                        <FlexboxGrid.Item colspan={24}>
                                            {error}
                                        </FlexboxGrid.Item>
                                    </FlexboxGrid>
                                </div> */}
                            </Panel></div>
                        : <></>}


                    <FlexboxGrid>
                        <FlexboxGrid.Item colspan={24}>
                            <InwordList detailList={detailList} />
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                    <Divider />
                    <FlexboxGrid>
                        <FlexboxGrid.Item colspan={8}>
                            <InwordSummeryList summeryList={summeryList} />
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={16}>
                            <InwordReturn returnList={returnList} />
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Panel>
            </Container></>
    )
}
export default PenadingEftList
>>>>>>> 1f6de8d40a045e02159cbb47d8c4198fffa9cd84
