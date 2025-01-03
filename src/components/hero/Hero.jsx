import "./Hero.css";

// Component imports
import IpDetails from "./ipDetails/IpDetails";
import IpSearch from "./ipSearch/IpSearch";

function Hero({ ipData, fetchIpData, remainingRequests, isLoading, error }) {
  return (
    <div className="hero">
      <article className="hero-wrapper | wrapper">
        <h1 className="hero-title">GeoTracker</h1>

        {remainingRequests < 6 && (
          <p className="remaining-requests-text">
            {remainingRequests} requests remaining today!
          </p>
        )}

        <IpSearch fetchIpData={fetchIpData} />

        {isLoading && <p className="loading-text">Fetching information...</p>}
        {error && <p className="error-text">{error}</p>}

        {ipData && <IpDetails ipData={ipData} />}
      </article>
    </div>
  );
}

export default Hero;
