import dayjs from "dayjs";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { DeviceActivityReturnType } from "./DashboardComponent";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
const DashboardMap = ({
  defaultPosition,
  data,
}: {
  defaultPosition: LatLngExpression;
  data: {
    getDevicesLivePosition: {
      data: DeviceActivityReturnType[];
    };
  };
}) => (
  <MapContainer
    className="desktop:h-[100%] laptop:h-[100%] "
    center={defaultPosition}
    zoom={13}
    style={{ zIndex: "0" }}
    scrollWheelZoom={true}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {data &&
      data.getDevicesLivePosition.data.map(
        (deviceData: DeviceActivityReturnType) => {
          const { latitude, longitude } = deviceData ?? {};
          return (
            <Marker position={[latitude, longitude]} key={deviceData.deviceId}>
              <Popup>
                {`Driver: ${deviceData?.name}`} <br />{" "}
                {`Team: ${deviceData?.teamName}`}
                <br />
                {` Last checked: ${dayjs.utc(deviceData?.lastTimeCreated)}`}
              </Popup>
            </Marker>
          );
        }
      )}
  </MapContainer>
);

export default DashboardMap;
