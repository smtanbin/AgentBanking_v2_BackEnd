import { Container, Panel, FlexboxGrid, Input, InputGroup, Table, Nav } from "rsuite"
import SearchIcon from '@rsuite/icons/Search';
import PushMessageIcon from '@rsuite/icons/PushMessage'

import SystemSms from "./SystemSms";

import { useState } from "react";
import { useAuth } from "../../../../Context/AuthProvider";
import Api from "../../../../app/useApi";


const Navbar = ({ tab, setTab, active, onSelect, ...props }: any) => {
    return (
        <Nav {...props} activeKey={active} onSelect={onSelect} style={{ marginBottom: 50 }}>
            <Nav.Item icon={<PushMessageIcon />} eventKey="system" onClick={() => setTab(!tab)}>
                System Massage Log
            </Nav.Item>
            <Nav.Item icon={<SearchIcon />} eventKey="search" onClick={() => setTab(!tab)}>
                Search Result
            </Nav.Item>
        </Nav>


    );
};



const MassageLog = () => {

    const auth = useAuth()
    const api = new Api(auth)
    const [active, setActive] = useState('system');
    const [tab, setTab] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [errorData, setErrorData] = useState<string | undefined>("")
    const [contact, setContact] = useState<string | undefined>()
    const [tableData, setTableData] = useState<any>()


    const { Column, HeaderCell, Cell } = Table;

    const handelChange = (value: any) => {
        setContact(value)
    }

    const handelSubmit = () => {
        setLoading(true)
        try {
            api.useApi('POST', '/massageLog/search', { 'contact': contact }).then((response) => {
                setTableData(response)
                setErrorData(undefined)
                setLoading(false)
                setTab(false)
            })
        } catch (e: any) {
            setErrorData(e)
            console.log("Error", e);
        }
    }


    const styles = {
        width: "50%",
        marginBottom: 10
    };

    return (
        <Container>
            <Panel header="Push Message Log">
                {errorData ? (
                    <><Panel bordered
                    ></Panel><br /></>
                ) : <></>}

                <Navbar appearance="tabs" tab={tab} setTab={setTab} active={active} onSelect={setActive} />

                {tab ?
                    <><FlexboxGrid>
                        <FlexboxGrid.Item colspan={24}>
                            <InputGroup style={styles}>
                                <Input placeholder="Contact Number or Account number" onChange={handelChange} />
                                <InputGroup.Button onClick={handelSubmit} loading={loading}>
                                    <SearchIcon />
                                    <span style={{ marginLeft: "1rem" }}>Search</span>
                                </InputGroup.Button>
                            </InputGroup>

                        </FlexboxGrid.Item>
                    </FlexboxGrid><FlexboxGrid>

                            <FlexboxGrid.Item colspan={24}>
                                <h3 style={{ color: "#34c3ff", marginBottom: "1rem", }}>Search Result</h3><Table wordWrap="break-word" height={400} data={tableData}>
                                    <Column flexGrow={1} align="center" fixed>
                                        <HeaderCell>Contact</HeaderCell>
                                        <Cell dataKey="MPHONE" />
                                    </Column>

                                    <Column flexGrow={0.7}>
                                        <HeaderCell>Timestamp</HeaderCell>
                                        <Cell dataKey="IN_TIME">
                                            {(rowData: any) => new Intl.DateTimeFormat("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                                second: "numeric",
                                            }).format(new Date(rowData.IN_TIME))}
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
                            </FlexboxGrid.Item>
                        </FlexboxGrid></> : <FlexboxGrid>
                        <FlexboxGrid.Item colspan={24}>
                            <SystemSms />
                        </FlexboxGrid.Item>
                    </FlexboxGrid>}


            </Panel>
        </Container>
    )
}

export default MassageLog