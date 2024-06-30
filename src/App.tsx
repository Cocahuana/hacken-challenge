import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Flex,
  Pagination,
  PaginationProps,
  Select,
  Space,
  Table,
  Spin,
} from "antd";
const { Text } = Typography;
import abc from "../data.json";
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
  current_price: string;
  circulating_supply: string;
}
function App() {
  const [coins, setCoins] = useState<null | CryptoData[]>(null);
  const [dataSource, setDataSource] = useState<null | any>(null);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10); // Estado para el tamaño de página

  const BASE_URL = "https://api.coingecko.com/api/v3/coins/markets";
  const USD = "usd";
  const EUR = "eur";
  const CURRENCY = "vs_currency";
  const ASENDING = "asce";
  const DESENDING = "desc";
  const ORDER = "market_cap";
  const PAGES = "per_page";
  const MISC = "page=1&sparkline=false";
  const finalURL = `${BASE_URL}?${CURRENCY}=${USD}&order=${ORDER}_${DESENDING}&${PAGES}=100&${MISC}`;
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

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setIsTableLoading(true);
        // const response: any = await axios.get(finalURL);
        setCoins(abc);
        // setCoins(response.data);
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
          name: coin.name,
          current_price: coin.current_price.toString(),
          circulating_supply: coin.circulating_supply.toString(),
        };
      });
      setIsTableLoading(false);
      setDataSource(dataToShow);
    }
  }, [coins, finalURL]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
  console.log("final", dataSource);
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
        <Spin spinning={isTableLoading}>
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="key"
            pagination={{
              defaultPageSize: 10,
              pageSizeOptions: ["5", "10", "20", "50", "100"],
              showSizeChanger: true,
              onShowSizeChange: (current, size) => setPageSize(size), // Manejar cambio de tamaño de página
            }}
          />
        </Spin>

        {/* <Pagination
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={3}
          total={500}
        /> */}
        {/* <Select
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
        /> */}
      </Flex>
    </>
  );
}

export default App;
