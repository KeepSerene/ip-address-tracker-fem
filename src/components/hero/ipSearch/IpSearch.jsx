import "./IpSearch.css";

// React imports
import { useState } from "react";

function IpSearch({ fetchIpData }) {
  const isOnMobile = matchMedia("(width <= 468px").matches;

  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const isValidIp = (input) => {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

    return ipRegex.test(input);
  };

  const isValidDomain = (input) => {
    const domainRegex =
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

    return domainRegex.test(input);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSearching(true);
    const processedQuery = query.trim().toLowerCase();
    let searchQuery;

    if (isValidIp(processedQuery)) {
      searchQuery = `ipAddress=${processedQuery}`;
    } else if (isValidDomain(processedQuery)) {
      searchQuery = `domain=${processedQuery}`;
    }

    try {
      await fetchIpData(searchQuery);
    } finally {
      setQuery("");
      setIsSearching(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ip-search-form">
      <label htmlFor="ip-input" className="sr-only">
        Search for any I P address or domain
      </label>

      <input
        type="text"
        id="ip-input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={
          isOnMobile
            ? "Enter IP address or domain"
            : "Search for any IP address or domain"
        }
      />

      <button
        type="submit"
        disabled={!query.trim() || isSearching}
        aria-label="Search"
        title="Search"
        className="search-btn"
      >
        <img src="/images/icon-arrow.svg" alt="" />
      </button>
    </form>
  );
}

export default IpSearch;
