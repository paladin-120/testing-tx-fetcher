import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CopyOutlined } from "@ant-design/icons";
import Layout from "antd/lib/layout";
import Typography from "antd/lib/typography";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import TxTable, { DataType } from "../../components/table/table";
import { PublicKey, Connection } from "@solana/web3.js";

import "antd/dist/antd.css";
import "./index.css";

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const Transactions: React.FC = () => {
  const navigate = useNavigate();
  const { pubkey: searchKey } = useParams();
  const [txs, setTxs] = useState<DataType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [solanaConnection, setSolanaConnection] = useState<Connection>();

  const onSearch = (value: string) => {
    navigate(`/tx/${value}`);
  };

  const getTransactions = useCallback(
    async (address: string, numTx: number) => {
      if (!solanaConnection) {
        return [];
      }
      setLoading(true);
      const pubKey = new PublicKey(address);
      let transactionList = await solanaConnection.getSignaturesForAddress(
        pubKey,
        { limit: numTx }
      );

      //Add this code
      let signatureList = transactionList.map(
        (transaction) => transaction.signature
      );
      let transactionDetails = await solanaConnection.getParsedTransactions(
        signatureList,
        { maxSupportedTransactionVersion: 0 }
      );

      setTxs(
        transactionList?.map((txItem, listIndex) => {
          return {
            signature: txItem?.signature || "",
            block: txItem?.slot || 0,
            timestamp: txItem?.blockTime || 0,
            instructions: "Undefined",
            by: transactionDetails[listIndex]?.transaction?.signatures[0] || "",
            fee: (transactionDetails[listIndex]?.meta?.fee || 0) / 1000000000,
          };
        })
      );
      setLoading(false);
    },
    [solanaConnection]
  );

  useEffect(() => {
    const _solanaConnection = new Connection(
      "https://methodical-stylish-panorama.solana-mainnet.discover.quiknode.pro/ee2193777ea29958f00447162b7c30fc306c61cb/"
    );
    setSolanaConnection(_solanaConnection);
  }, []);

  useEffect(() => {
    console.log("Transactions", searchKey);
    if (searchKey && solanaConnection) {
      getTransactions(searchKey, 10);
    }
  }, [getTransactions, searchKey, solanaConnection]);

  return (
    <Layout className="transactions-layout">
      <Header className="transactions-header">
        <div className="transactions-top-search">
          <Title className="transactions-top-title">Account</Title>
          <Title className="transactions-account-address">
            {searchKey}
            <Button
              className="transactions-account-copy"
              shape="circle"
              icon={
                <CopyOutlined
                  style={{ fontSize: "16px", color: "rbg(139, 139, 139" }}
                />
              }
            />
          </Title>
        </div>
        <Search
          placeholder="Search transactions, blocks, programs and tokens"
          onSearch={onSearch}
          enterButton
          allowClear
          className="transactions-search-box"
        />
      </Header>
      <Content className="transactions-content">
        <TxTable data={txs} loading={isLoading} />
      </Content>
    </Layout>
  );
};

export default Transactions;
