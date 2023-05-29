import "../styles/MainPage.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Markerp from "./Marker";

function MainPage({ address, ipAddress, setIpAddress, getEnteredAddress }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    getEnteredAddress();
    setIpAddress("");
  };

  return (
    <main className="page">
      <div className="header">
        <h1>IP Adress Tracker</h1>
        <form autoComplete="off" onSubmit={handleSubmit} className="search">
          <input
            placeholder="Search for any ip address..."
            type="text"
            className="search-input"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <button className="search-btn">
            <span className="sr-only">search</span>
          </button>
        </form>
      </div>
      {address && (
        <>
          <div className="between">
            <div className="p">
              <p>IP ADDRESS</p>
              <p>{address.ip}</p>
            </div>
            <div className="p">
              <p>LOCATION</p>
              <p>
                {address.location.city}, {address.location.region}
              </p>
            </div>
            <div className="p">
              <p>TIMEZONE</p>
              <p>{address.location.timezone}</p>
            </div>
            <div className="p">
              <p>ISP</p>
              <p>{address.isp}</p>
            </div>
          </div>
          <div className="map">
            <MapContainer
              center={[address.location.lat, address.location.lng]}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: "500px", width: "100vw" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Markerp address={address} />
            </MapContainer>
          </div>
        </>
      )}
    </main>
  );
}

export default MainPage;
