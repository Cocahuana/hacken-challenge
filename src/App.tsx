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
  Image,
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
  image: string;
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
  const ASCENDING = "asce";
  const DESCENDING = "desc";
  const ORDER = "market_cap";
  const PAGES = "per_page";
  const MISC = "page=1&sparkline=false";
  const finalURL = `${BASE_URL}?${CURRENCY}=${USD}&order=${ORDER}_${DESCENDING}&${PAGES}=100&${MISC}`;

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
    console.log(`selected currency: ${currency}`);
    const urlBasedOnCurrency: string = `${BASE_URL}?${CURRENCY}=${currency}&order=${ORDER}_${DESCENDING}&${PAGES}=100&${MISC}`;
    getCoinsBasedOnCurrency(urlBasedOnCurrency);
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
        const response: any = await axios.get(finalURL);
        setCoins(response.data);
        // setCoins(abc);
      } catch (error) {
        setIsTableLoading(false);
        console.error(error);
      }
    };
    if (!coins) {
      // fetchCoins();
      handleOnCurrencyChange(USD);
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
  }, [coins, finalURL]);

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
              defaultValue="descending"
              style={{ width: "200px" }}
              // onChange={handleChange}
              options={[
                { value: "ascending", label: "Market cap ascending" },
                { value: "descending", label: "Market cap descending" },
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
              onShowSizeChange: (current, size) => setPageSize(size), // Manejar cambio de tamaño de página
            }}
          />
        </Spin>
      </Flex>
    </>
  );
}

export default App;
