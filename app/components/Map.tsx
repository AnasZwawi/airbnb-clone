"use client";
import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries } from "../lib/getCountries";
import { icon } from "leaflet";


const ICON = icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25613.png',
  iconSize: [55, 50]
})

function Map({ locationValue }: { locationValue: string }) {
  const {getCountryByValue} = useCountries();
  const latlang = getCountryByValue(locationValue)?.latlang
  return (
    <MapContainer
      scrollWheelZoom={false}
      className="rounded-lg h-[50vh] max-h-[500px] relative z-0"
      center={latlang ?? [52.505, -0.09]}
      zoom={8}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={latlang ?? [52.505, -0.09]} icon={ICON} opacity={0.9}/>
    </MapContainer>
  );
}

export default Map;
