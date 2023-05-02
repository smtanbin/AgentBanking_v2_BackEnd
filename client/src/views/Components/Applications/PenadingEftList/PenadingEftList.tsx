import React, { useState, useEffect } from "react"

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
import { getReport, getEftSummeryList, getEftList, getEftReturnList } from "./EftFunctions"


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
            const _status = await getReport(api, (error: any) => {
                console.log(error)
            })
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
