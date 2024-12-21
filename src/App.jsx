import "./App.css";

// React imports
import { useEffect, useState } from "react";

// Component imports
import Hero from "./components/hero/Hero";
import IpMap from "./components/ipMap/IpMap";

function App() {
  const [ipData, setIpData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIpData = async (query = "") => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${
          import.meta.env.VITE_API_KEY
        }&${query}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data!");
      }

      const data = await response.json();
      setIpData(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIpData();
  }, []);

  // console.log(ipData);

  return (
    <main className="app">
      <Hero
        ipData={ipData}
        fetchIpData={fetchIpData}
        isLoading={isLoading}
        error={error}
      />

      {ipData && <IpMap ipData={ipData} />}
    </main>
  );
}

export default App;
