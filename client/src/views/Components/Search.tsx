import React, { useState } from 'react';
import { Modal, TagPicker, Panel, Placeholder, InputGroup, Input, Table } from 'rsuite';
import { Link } from 'react-router-dom';
const { HeaderCell, Cell, Column } = Table;
import SearchIcon from '@rsuite/icons/Search';
import { useAuth } from '../../Context/AuthProvider';
import Api from '../../app/useApi';
import { InnerCellProps } from 'rsuite-table/lib/Cell';
import { HeaderCellProps } from 'rsuite/esm/Table';


interface SearchProps {
    modelOpen: boolean;
    modelHandleClose: () => void;
}


const defaultColumns = [
    {
        key: 'CUST_ID',
        label: 'Id',
        fixed: true,
        resizable: true,
    },
    {
        key: 'STATUS',
        label: 'Status',
        flexGrow: 1

    },
    {
        key: 'MPHONE',
        label: 'Account No',
        resizable: true
    },

    {
        key: 'PMPHONE',
        label: 'Agent',
        resizable: true
    },
    {
        key: 'NAME',
        label: 'Name',
        resizable: true
    },
    {
        key: 'FATHER_NAME',
        label: 'Father Name',
        resizable: true
    },
    {
        key: 'MOTHER_NAME',
        label: 'Mother Name',
        resizable: true
    },
    {
        key: 'SPOUSE_NAME',
        label: 'Spouse Name',
        resizable: true
    },
    {
        key: 'NID_NO',
        label: 'Photo ID',
        resizable: true
    },
    {
        key: 'DOB',
        label: 'Date of Birth',

    },

    {
        key: 'CON_MOB',
        label: 'Agent',

    },
    {
        key: 'EMAIL',
        label: 'Email',
        resizable: true
    },

    {
        key: 'REG_DATE',
        label: 'Reg Date',
    },
    {
        key: 'REG_STATUS',
        label: 'Reg Status',
    },

    {
        key: 'CUST_ID_TYPE',
        label: 'Customer ID Type',
    }
];





const Search: React.FC<SearchProps> = ({ modelOpen, modelHandleClose }) => {
    const auth = useAuth()
    const api = new Api(auth)

    //    State
    const [data, setData] = useState<any>(undefined)
    const [columnKeys, setColumnKeys] = React.useState(defaultColumns.map(column => column.key));

    // Element
    const CompactCell = (props: JSX.IntrinsicAttributes & InnerCellProps & React.RefAttributes<HTMLDivElement>) => (
        <Cell {...props} style={{ padding: 4 }}>
            {props.dataKey === "CUST_ID" ? (
                <Link to={`/customer/${props.rowData.CUST_ID}`}>{props.rowData.CUST_ID}</Link>
            ) : (
                props.rowData.dataKey
            )}
        </Cell>
    );


    const CompactHeaderCell = (props: JSX.IntrinsicAttributes & HeaderCellProps & React.RefAttributes<HTMLDivElement>) => <HeaderCell {...props} style={{ padding: 4 }} />;


    const handelChange = (event: React.FormEvent<HTMLDivElement>) => {
        const value = (event.target as HTMLInputElement).value;
        api.useApi('POST', '/customer/search', { 'params': value + '%' }).then((response) => {
            // console.log(response)
            setData(response)
        })
    }


    return (
        <Modal
            backdrop="static" role="alertdialog"
            size="lg"
            open={modelOpen}
            onChange={handelChange}
            onClose={modelHandleClose}

        >
            <Modal.Header>
                <Modal.Title>Search</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup inside>
                    <Input />
                    <InputGroup.Addon>
                        <SearchIcon />
                    </InputGroup.Addon>
                </InputGroup>
                {data ? (
                    <><br />
                        <TagPicker
                            data={defaultColumns}
                            labelKey="label"
                            valueKey="key"
                            value={columnKeys}
                            onChange={setColumnKeys}
                            cleanable={false} />
                        <hr />
                        <Table

                            virtualized
                            data={data}
                        >
                            {defaultColumns.map((column: { [x: string]: any; key: any; label: any; }) => {
                                const { key, label, ...rest } = column;
                                return (
                                    <Column {...rest} key={key}>
                                        <CompactHeaderCell>{label}</CompactHeaderCell>
                                        <CompactCell dataKey={key} />
                                    </Column>
                                );
                            })}

                        </Table>
                    </>) : (
                    <Panel>
                        <Placeholder.Paragraph />
                    </Panel>
                )}
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={modelHandleClose} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer> */}
        </Modal>

    );
};

export default Search;
