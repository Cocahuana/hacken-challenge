import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Flex, Select, Space, Table, Spin, Image } from "antd";
const { Text } = Typography;
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/theme/material.css";
interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: ROI | null;
  last_updated: string;
}

interface ROI {
  times: number;
  currency: string;
  percentage: number;
}

interface TableCoinElement {
  key: string;
  name: string;
  image: string;
  current_price: string;
  circulating_supply: string;
}
function App() {
  const [coins, setCoins] = useState<null | CryptoData[]>(null);
  const [dataSource, setDataSource] = useState<null | any>(null);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [, setPageSize] = useState<number>(10);
  const [code, setCode] =
    useState(`import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Flex,
  Select,
  Space,
  Table,
  Spin,
  Image,
  theme,
} from "antd";
const { Text } = Typography;
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: ROI | null;
  last_updated: string;
}

interface ROI {
  times: number;
  currency: string;
  percentage: number;
}

interface TableCoinElement {
  key: string;
  name: string;
  image: string;
  current_price: string;
  circulating_supply: string;
}
function App() {
  const [coins, setCoins] = useState<null | CryptoData[]>(null);
  const [dataSource, setDataSource] = useState<null | any>(null);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [apiUrl, setApiUrl] = useState<string>(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );

  const getCoinsBasedOnCurrency = async (url: string) => {
    try {
      setIsTableLoading(true);
      const response: any = await axios.get(url);
      setCoins(response.data);
    } catch (error) {
      setIsTableLoading(false);
      console.log("ERROR - GET ONCHANGE CURRENCY", error);
    }
  };

  const handleOnCurrencyChange = (currency: string) => {
    const urlBasedOnCurrency: string = apiUrl.replace(
      /vs_currency=[^&]+/,
      "vs_currency=" + currency
    );
    setApiUrl(urlBasedOnCurrency);
    getCoinsBasedOnCurrency(urlBasedOnCurrency);
  };
  const handleOnOrderChange = (order: string) => {
    const urlBasedOnCurrency: string = apiUrl.replace(
      /order=[^&]+/,
      "order=" + order
    );
    setApiUrl(urlBasedOnCurrency);
    getCoinsBasedOnCurrency(urlBasedOnCurrency);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setIsTableLoading(true);
        const response: any = await axios.get(apiUrl);
        setCoins(response.data);
        // setCoins(abc);
      } catch (error) {
        setIsTableLoading(false);
        console.error(error);
      }
    };
    if (!coins) {
      fetchCoins();
    } else {
      const dataToShow: TableCoinElement[] = coins.map((coin) => {
        return {
          key: coin.id,
          image: coin.image,
          name: coin.name,
          current_price: coin.current_price.toString(),
          circulating_supply: coin.circulating_supply.toString(),
        };
      });
      setIsTableLoading(false);
      setDataSource(dataToShow);
    }
  }, [apiUrl, coins]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: TableCoinElement) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Image
            src={record.image}
            alt={text}
            style={{
              width: "32px",
            }}
          />
          <Text>{text}</Text>
        </div>
      ),
    },
    {
      title: "Current Price",
      dataIndex: "current_price",
      key: "current_price",
    },
    {
      title: "Circulating Supply",
      dataIndex: "circulating_supply",
      key: "circulating_supply",
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
        <Flex gap={"24px"}>
          <Space wrap>
            <Select
              defaultValue="USD"
              style={{ width: "200px" }}
              onChange={handleOnCurrencyChange}
              options={[
                { value: "USD", label: "USD" },
                { value: "EUR", label: "EUR" },
              ]}
            />
          </Space>
          <Space wrap>
            <Select
              defaultValue="market_cap_desc"
              style={{ width: "200px" }}
              onChange={handleOnOrderChange}
              options={[
                { value: "market_cap_asc", label: "Market cap ascending" },
                { value: "market_cap_desc", label: "Market cap descending" },
              ]}
            />
          </Space>
        </Flex>
        <Spin spinning={isTableLoading}>
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="key"
            pagination={{
              defaultPageSize: 10,
              pageSizeOptions: ["5", "10", "20", "50", "100"],
              showSizeChanger: true,
              onShowSizeChange: (current, size) => setPageSize(size),
            }}
          />
        </Spin>
      </Flex>
    </>
  );
}

export default App;
`);
  const [apiUrl, setApiUrl] = useState<string>(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );

  const getCoinsBasedOnCurrency = async (url: string) => {
    try {
      setIsTableLoading(true);
      const response: any = await axios.get(url);
      setCoins(response.data);
    } catch (error) {
      setIsTableLoading(false);
      console.log("ERROR - GET ONCHANGE CURRENCY", error);
    }
  };

  const handleOnCurrencyChange = (currency: string) => {
    const urlBasedOnCurrency: string = apiUrl.replace(
      /vs_currency=[^&]+/,
      "vs_currency=" + currency
    );
    setApiUrl(urlBasedOnCurrency);
    getCoinsBasedOnCurrency(urlBasedOnCurrency);
  };
  const handleOnOrderChange = (order: string) => {
    const urlBasedOnCurrency: string = apiUrl.replace(
      /order=[^&]+/,
      "order=" + order
    );
    setApiUrl(urlBasedOnCurrency);
    getCoinsBasedOnCurrency(urlBasedOnCurrency);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setIsTableLoading(true);
        const response: any = await axios.get(apiUrl);
        setCoins(response.data);
        // setCoins(abc);
      } catch (error) {
        setIsTableLoading(false);
        console.error(error);
      }
    };
    if (!coins) {
      fetchCoins();
    } else {
      const dataToShow: TableCoinElement[] = coins.map((coin) => {
        return {
          key: coin.id,
          image: coin.image,
          name: coin.name,
          current_price: coin.current_price.toString(),
          circulating_supply: coin.circulating_supply.toString(),
        };
      });
      setIsTableLoading(false);
      setDataSource(dataToShow);
    }
  }, [apiUrl, coins]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: TableCoinElement) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Image
            src={record.image}
            alt={text}
            style={{
              width: "32px",
            }}
          />
          <Text>{text}</Text>
        </div>
      ),
    },
    {
      title: "Current Price",
      dataIndex: "current_price",
      key: "current_price",
    },
    {
      title: "Circulating Supply",
      dataIndex: "circulating_supply",
      key: "circulating_supply",
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
        <Flex gap={"24px"}>
          <Space wrap>
            <Select
              defaultValue="USD"
              style={{ width: "200px" }}
              onChange={handleOnCurrencyChange}
              options={[
                { value: "USD", label: "USD" },
                { value: "EUR", label: "EUR" },
              ]}
            />
          </Space>
          <Space wrap>
            <Select
              defaultValue="market_cap_desc"
              style={{ width: "200px" }}
              onChange={handleOnOrderChange}
              options={[
                { value: "market_cap_asc", label: "Market cap ascending" },
                { value: "market_cap_desc", label: "Market cap descending" },
              ]}
            />
          </Space>
        </Flex>
        <Spin spinning={isTableLoading}>
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="key"
            pagination={{
              defaultPageSize: 10,
              pageSizeOptions: ["5", "10", "20", "50", "100"],
              showSizeChanger: true,
              onShowSizeChange: (size) => setPageSize(size),
            }}
          />
        </Spin>
        <Text style={{ fontSize: "24px", marginTop: "24px" }}>
          App source code
        </Text>
        <CodeMirror
          value={code}
          options={{
            lineNumbers: true,
            mode: "typescript",
            extraKeys: { "Ctrl-Space": "autocomplete" },
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            theme: "material",
          }}
          onBeforeChange={(value) => {
            setCode(value);
          }}
        />
      </Flex>
    </>
  );
}

export default App;
