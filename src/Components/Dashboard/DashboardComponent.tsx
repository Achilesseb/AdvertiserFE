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
import Datepicker, {
  DateRangeType,
  DateValueType,
} from "react-tailwindcss-datepicker";
import { useState } from "react";

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
  const [value, setValue] = useState<DateRangeType>({
    startDate: new Date(),
    endDate: new Date().setMonth(11) as unknown as Date,
  });
  const handleValueChange = (newValue: DateValueType) =>
    setValue(newValue as DateRangeType);
  const defaultPosition: LatLngExpression = [
    DEFAULT_CITY_LATITUDE,
    DEFAULT_CITY_LONGITUDE,
  ];

  const { data, error } = useQuery(GET_DEVICE_ACTIVITY, {
    fetchPolicy: "network-only",
    variables: {
      input: {
        filters: {
          date: value.startDate,
        },
      },
    },
  });
  if (error) {
    toast.custom(<Snackbar type="error" message={"Something went wrong"} />);
  }
  return (
    <div className="desktop:h-[90vh] laptop:h-[87vh] overflow-hidden p-4">
      <div className="relative w-full h-full">
        <Datepicker
          value={value}
          configs={{}}
          primaryColor={"green"}
          onChange={handleValueChange}
          displayFormat={"MM/DD/YYYY"}
          containerClassName="absolute mt-0 top-0 right-0 border-2 border-primary-40 w-2/12 rounded-md mb-0 z-50"
          popoverDirection="down"
          asSingle
          useRange={false}
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
