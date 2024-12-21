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

  // Rate limiting state
  const MAX_REQUESTS_PER_DAY = 16;
  const STORAGE_KEY = "geo-tracker-requests";

  const checkRateLimit = () => {
    const today = new Date().toDateString();
    const storedCount = localStorage.getItem(STORAGE_KEY);
    const requests = storedCount ? JSON.parse(storedCount) : {};

    // Reset if it's new day: a previously stored date key won’t match "today", so reset the count
    if (!requests[today]) {
      const newRequests = { [today]: 1 };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRequests));

      // Allow a request to proceed
      return true;
    }

    if (requests[today] < MAX_REQUESTS_PER_DAY) {
      requests[today] += 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));

      // Allow a request to proceed
      return true;
    }

    // Prevent a request from proceeding
    return false;
  };

  const fetchIpData = async (query = "") => {
    try {
      setIsLoading(true);
      setError(null);

      if (!checkRateLimit()) {
        throw new Error(
          "Daily request limit reached! Please try again tomorrow."
        );
      }

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
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getRemainingRequests = () => {
    const today = new Date().toDateString();
    const storedCount = localStorage.getItem(STORAGE_KEY);
    const requests = storedCount ? JSON.parse(storedCount) : {};

    return MAX_REQUESTS_PER_DAY - (requests[today] || 1);
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
        remainingRequests={getRemainingRequests()}
        isLoading={isLoading}
        error={error}
      />

      {ipData && <IpMap ipData={ipData} />}
    </main>
  );
}

export default App;
