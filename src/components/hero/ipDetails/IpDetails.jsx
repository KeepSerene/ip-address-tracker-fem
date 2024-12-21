import "./IpDetails.css";

function IpDetails({ ipData }) {
  const { ip, isp, location } = ipData;

  return (
    <div className="ip-details">
      <div className="detail">
        <p className="title">Ip address</p>
        <p className="info">{ip}</p>
      </div>

      <div className="detail">
        <p className="title">Location</p>
        <p className="info">
          {location.city}, {location.country}
        </p>
      </div>

      <div className="detail">
        <p className="title">Timezone</p>
        <p className="info">GMT{location.timezone}</p>
      </div>

      <div className="detail">
        <p className="title">Isp</p>
        <p className="info">{isp}</p>
      </div>
    </div>
  );
}

export default IpDetails;
