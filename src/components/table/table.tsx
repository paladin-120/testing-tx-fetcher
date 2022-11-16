import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import "./index.css";

export interface DataType {
  signature: string;
  block: number;
  timestamp: number;
  instructions: string;
  by: string;
  fee: number;
}

interface TxTableProps {
  data: DataType[];
  loading: boolean;
}

const TxColumns: ColumnsType<DataType> = [
  {
    title: "Signature",
    dataIndex: "signature",
    key: "signature",
    width: "200px",
    render: (signature) => (
      <a href={"https://solscan.io/tx/" + signature}>{signature}</a>
    ),
  },
  {
    title: "Block",
    dataIndex: "block",
    key: "block",
    width: "120px",
    render: (text) => `#${text}`,
  },
  {
    title: "Time",
    dataIndex: "timestamp",
    key: "timestamp",
    width: "180px",
    render: (timestamp: number) => (
      <h5 className="tx-timestamp">{moment(timestamp).fromNow()}</h5>
    ),
  },
  {
    title: "Instructions",
    key: "instructions",
    dataIndex: "instructions",
    width: "180px",
    render: (instructions) => (
      <h5 className="tx-instructions"> {instructions} </h5>
    ),
  },
  {
    title: "By",
    key: "by",
    dataIndex: "by",
    width: "200px",
    render: (by) => (
      <a href={"https://solscan.io/account/" + by} className="tx-by">
        {by}
      </a>
    ),
  },
  {
    title: "Fee (SOL)",
    key: "fee",
    dataIndex: "fee",
    width: "120px",
    render: (fee) => <h5 className="tx-fee">{fee}</h5>,
  },
];

const TxTable: React.FC<TxTableProps> = ({ data, loading }) => {
  return (
    <Table
      className="tx-table-container"
      columns={TxColumns}
      dataSource={data}
      loading={loading}
      pagination={{ disabled: true }}
      scroll={{ y: 600 }}
    />
  );
};

export default TxTable;
