import { useState } from "react";
import {
  Typography,
  Flex,
  Pagination,
  PaginationProps,
  Select,
  Space,
  Table,
} from "antd";
const { Text } = Typography;
function App() {
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Current Price",
      dataIndex: "Current Price",
      key: "Current Price",
    },
    {
      title: "Circulating Supply",
      dataIndex: "Circulating Supply",
      key: "Circulating Supply",
    },
  ];

  return (
    <>
      <Flex
        style={{ gap: "24px", minHeight: "100vh" }}
        align="stretch"
        vertical
      >
        <Text style={{ fontSize: "24px", marginTop: "24px" }}>
          Coins & Markets
        </Text>
        <Space wrap>
          <Select
            defaultValue="USD"
            style={{ width: 120 }}
            // onChange={handleChange}
            options={[
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
            ]}
          />
        </Space>
        <Space wrap>
          <Select
            defaultValue="descending"
            style={{ width: 120 }}
            // onChange={handleChange}
            options={[
              { value: "ascending", label: "Market cap ascending" },
              { value: "descending", label: "Market cap descending" },
            ]}
          />
        </Space>
        <Table dataSource={dataSource} columns={columns} />;
        {/* <Pagination
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={3}
          total={500}
        /> */}
        <Select
          showSearch
          placeholder="10 / page"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          options={[
            {
              value: "5 / page",
              label: "5 / page",
            },
            {
              value: "10 / page",
              label: "10 / page",
            },
            {
              value: "20 / page",
              label: "20 / page",
            },
            {
              value: "50 / page",
              label: "50 / page",
            },
            {
              value: "100 / page",
              label: "100 / page",
            },
          ]}
        />
      </Flex>
    </>
  );
}

export default App;
