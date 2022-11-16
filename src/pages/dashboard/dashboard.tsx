import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "antd/lib/layout";
import Typography from "antd/lib/typography";
import Input from "antd/lib/input";

import "antd/dist/antd.css";
import "./index.css";

const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const onSearch = (value: string) => {
    navigate(`/tx/${value}`);
  };

  return (
    <Layout>
      <Content className="dashboard-content">
        <div className="dashboard-top-search">
          <Title className="dashboard-top-title">
            Explore Solana Blockchain
          </Title>
          <div className="dashboard-top-form">
            <Search
              placeholder="Search transactions, blocks, programs and tokens"
              onSearch={onSearch}
              enterButton
              allowClear
              className="dashboard-search-box"
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;
