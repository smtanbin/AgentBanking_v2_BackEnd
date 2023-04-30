import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import ReloadIcon from '@rsuite/icons/Reload';
import { Panel, Placeholder, Stack, Carousel, IconButton, Grid, Row, Col, Table } from 'rsuite';
import moment from 'moment';
import { useAuth } from '../../../Context/AuthProvider';
import Api from '../../../app/useApi';
import useDynamicCustomer from './DynamicCustomer/useDynamicCustomer';
import { HeaderCellProps } from 'rsuite/esm/Table';
import { InnerCellProps } from 'rsuite-table/lib/Cell';


type ImageData = {
    sl: string;
    type: string;
    img: string;
}

interface ImageListProps {
    data: ImageData[];
}


const DynamicCustomer = () => {
    const auth = useAuth()
    const api = new Api(auth)
    const handelData = new useDynamicCustomer(api)

    const [data, setData] = useState<any>(undefined)
    const [ministatment, setMinistatment] = useState<any>(undefined)
    const [profilePicture, setProfilePicture] = useState(undefined)
    const [imgData, setImgData] = useState([])
    const [activeIndex, setActiveIndex] = useState(2);

    const { id } = useParams();
    const { Column, HeaderCell, Cell } = Table;
    const CompactHeaderCell = (props: JSX.IntrinsicAttributes & HeaderCellProps & React.RefAttributes<HTMLDivElement>) => <HeaderCell {...props} style={{ padding: 1 }} />;
    const CompactCell = (props: JSX.IntrinsicAttributes & InnerCellProps & React.RefAttributes<HTMLDivElement>) => <Cell {...props} style={{ padding: 1 }} />;

    const ImageList = ({ data }: ImageListProps) => {

        if (!data) {
            return <div>No images found.</div>;
        }
        if (data.length === 0) {
            return <div>No images found.</div>;
        }

        return (
            <Carousel
                shape="bar"
                autoplay
                placement="left"
                activeIndex={activeIndex}
                onSelect={index => {
                    setActiveIndex(index);
                }}
            >
                {data.map(({ sl, type, img }) => (
                    <img
                        key={sl}
                        src={img}
                        height="250"

                    />
                ))}
            </Carousel>
        );
    }

    const handelRefrash = () => {
        setData(undefined)
        setProfilePicture(undefined)
        setMinistatment(undefined)
        setImgData([])

        const fatchData = async () => {
            const response = await handelData.fatchCustomerData(setData, id)
            const payload: any = await handelData.fetchImgData(response.MPHONE)
            handelData.fatchMiniStatment(setMinistatment, response.MPHONE)
            handelData.fetchProfilePicture(setProfilePicture, response.MPHONE)
            setImgData(payload)
        }
        fatchData()
    }

    useEffect(() => {
        setData(undefined)
        setProfilePicture(undefined)
        setMinistatment(undefined)
        setImgData([])

        const fatchData = async () => {
            const response = await handelData.fatchCustomerData(setData, id)
            const payload: any = await handelData.fetchImgData(response.MPHONE)
            handelData.fatchMiniStatment(setMinistatment, response.MPHONE)
            handelData.fetchProfilePicture(setProfilePicture, response.MPHONE)
            setImgData(payload)
        }
        fatchData()
    }, [id])

    return (
        <Panel

            header={
                <Stack justifyContent="space-between">
                    <h3>{id}</h3>
                    <IconButton
                        circle={true}
                        onClick={handelRefrash}
                        icon={<ReloadIcon />}
                        appearance="primary"
                    ></IconButton>

                </Stack>
            }
        >
            <hr />
            {!data ? (<Placeholder.Paragraph rows={50} graph="image" />) : (
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={24} md={12}>
                            <Panel bordered>
                                <Col xs={24} md={12}>
                                    <Panel header={<h5 style={{ color: 'cornflowerblue' }}>Account Information</h5>}>
                                        <p>
                                            Account No: {data.MPHONE} <br />
                                            Agent: {data.PMPHONE} <br />
                                            Reg Status: {
                                                data.REG_STATUS === 'P' ? <span style={{ color: 'green' }}>Active</span>
                                                    : data.REG_STATUS === 'R' ? <span style={{ color: 'red' }}>Reject</span>
                                                        : data.REG_STATUS === 'L' ? <span style={{ color: 'blue' }}>Pending</span>
                                                            : <span>Unknown</span>
                                            } <br />
                                            Status: {
                                                data.STATUS === 'A' ? <span style={{ color: 'green' }}>Active</span>
                                                    : data.STATUS === 'C' ? <span style={{ color: 'red' }}>Close</span>
                                                        : data.STATUS === 'F' ? <span style={{ color: 'blue' }}>Cold</span>
                                                            : <span>Unknown</span>
                                            } <br />
                                            Register Date: {moment(data.REG_DATE).format('MMMM Do YYYY')} <br />
                                        </p>
                                    </Panel>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Panel header={<h5 style={{ color: 'cornflowerblue' }}>Account Holder Photo</h5>}>
                                        {profilePicture ?
                                            <img src={profilePicture} />
                                            : <Placeholder.Paragraph graph="image" />
                                        }
                                    </Panel>
                                </Col>


                            </Panel>
                            <br />
                            <Panel bordered header={<h5 style={{ color: 'cornflowerblue' }}>Personal Information</h5>}>
                                <p>
                                    Name: {data.NAME} <br />
                                    Father Name: {data.FATHER_NAME} <br />
                                    Mother name: {data.MOTHER_NAME} <br />
                                    Photo ID: {data.NID_NO} <br />
                                    Date of Birth: {moment(data.DOB).format('MMMM Do YYYY')} <br />
                                </p>
                            </Panel>
                            <br />
                            <Panel bordered header={<h5 style={{ color: 'cornflowerblue' }}>Photo</h5>}>
                                <ImageList data={imgData} />
                            </Panel>
                        </Col>

                        <Col xs={24} md={12} xsHidden>
                            <Panel bordered header={<h5 style={{ color: 'cornflowerblue' }}>Recent Transactions</h5>}>
                                <Table
                                    virtualized
                                    height={400}
                                    data={ministatment}
                                >

                                    <Column width={30} align="center" fullText fixed>
                                        <CompactHeaderCell>SL</CompactHeaderCell>
                                        <CompactCell dataKey="SL" />
                                    </Column>

                                    <Column width={120} fullText fixed>
                                        <CompactHeaderCell>Timestamp</CompactHeaderCell>
                                        <CompactCell dataKey="TRANS_DATE" />
                                    </Column>

                                    <Column width={120} fullText>
                                        <CompactHeaderCell>No</CompactHeaderCell>
                                        <CompactCell dataKey="TRANS_NO" />
                                    </Column>

                                    <Column width={70} align='right' fullText>
                                        <CompactHeaderCell>Debit</CompactHeaderCell>
                                        <CompactCell dataKey="DR_AMT" />
                                    </Column>

                                    <Column width={70} align='right' fullText>
                                        <CompactHeaderCell>Credit</CompactHeaderCell>
                                        <CompactCell dataKey="CR_AMT" />
                                    </Column>

                                    <Column width={70} align='right' fullText>
                                        <CompactHeaderCell>Balance</CompactHeaderCell>
                                        <Cell dataKey="BALANCE" />
                                    </Column>

                                    <Column width={150} fullText>
                                        <CompactHeaderCell>Remarks</CompactHeaderCell>
                                        <CompactCell dataKey="PARTICULAR" />
                                    </Column>
                                </Table>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>

            )}
        </Panel>
    )
}

export default DynamicCustomer