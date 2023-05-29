import { useEffect, useState } from "react";
import MainPage from "./components/MainPage";

function App() {
  const [address, setAddress] = useState('');
  const [ipAddress, setIpAddress] = useState("");

  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_lXLBxDRThKoswphAM2YrWz9s89jdn&ipAddress=8.8.8.8";
        const api = async () => {
          const response = await fetch(url);
          const data = await response.json();
          return data;
        };
        const data = await api();
        setAddress(data);
      } catch (error) {
        console.error("Error occurred while fetching initial data:", error);
      }
    };

    getInitialData();
  }, [ipAddress]);

  async function getEnteredAddress() {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_lXLBxDRThKoswphAM2YrWz9s89jdn&${
        checkIpAddress.test(ipAddress)
          ? "ipAddress=" + ipAddress
          : checkDomain.test(ipAddress)
          ? "domain=" + ipAddress
          : ""
      }`
    );
    const data = await res.json();
    setAddress(data);
  }

  return (
    <div className="app">
      <MainPage
        address={address}
        setAddress={setAddress}
        ipAddress={ipAddress}
        getEnteredAddress={getEnteredAddress}
        setIpAddress={setIpAddress}
      />
    </div>
  );
}

const Root = () => {
  return <App />;
};

export default Root;
