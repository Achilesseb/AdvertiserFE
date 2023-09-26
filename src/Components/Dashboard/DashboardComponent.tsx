"use Client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { useQuery } from "@apollo/client";
import { GET_DEVICE_ACTIVITY } from "@/graphql/schemas/devicesSchema";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  DEFAULT_CITY_LATITUDE,
  DEFAULT_CITY_LONGITUDE,
} from "@/constants/magicNumbers";
import toast from "react-hot-toast";
import { Snackbar } from "../SnackBar";
import { LatLngExpression } from "leaflet";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

dayjs.extend(utc);

export type DeviceActivityReturnType = {
  deviceId: string;
  lastTimeCreated: string;
  latitude: number;
  longitude: number;
  name: string;
  teamName: string;
};

export const DashboardComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const defaultPosition: LatLngExpression = [
    DEFAULT_CITY_LATITUDE,
    DEFAULT_CITY_LONGITUDE,
  ];

  const { data, error } = useQuery(GET_DEVICE_ACTIVITY, {
    fetchPolicy: "network-only",
    variables: {
      input: {
        filters: {
          ...(startDate && { date: startDate }),
        },
      },
    },
  });
  if (error) {
    toast.custom(<Snackbar type="error" message={"Something went wrong"} />);
  }

  return (
    <div className="desktop:h-[95vh] laptop:h-[87vh] overflow-hidden">
      <div className="relative w-full h-full">
        <DatePicker
          showIcon
          selected={startDate}
          onChange={(date) => setStartDate(date as Date)}
          className="border-2 border-primary-40 absolute left-12 top-5 z-50 self-end "
          calendarClassName="top-10 left-14"
        />
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
                  <Marker
                    position={[latitude, longitude]}
                    key={deviceData.deviceId}
                  >
                    <Popup>
                      {`Driver: ${deviceData?.name}`} <br />{" "}
                      {`Team: ${deviceData?.teamName}`}
                      <br />
                      {` Last checked: ${dayjs.utc(
                        deviceData?.lastTimeCreated
                      )}`}
                    </Popup>
                  </Marker>
                );
              }
            )}
        </MapContainer>
      </div>
    </div>
  );
};
