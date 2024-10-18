import { Table } from 'antd';


const CustomTable = ({columns, data, isLoading, onChange, tableParams }) => {

    return (
        <Table
            pagination={tableParams.pagination}
            onChange={onChange}
            columns={columns}
            dataSource={data}
            loading={isLoading}
        />
    )
};
export default CustomTable;